import Keycloak from "keycloak-js";
import axios from "axios";

// Keycloak configuration
const keycloakConfig = {
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
  clientSecret: import.meta.env.VITE_KEYCLOAK_CLIENT_SECRET,
  onLoad: "check-sso",
  silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html",
  enableLogging: true,
  checkLoginIframe: false,
  pkceMethod: "S256",
  responseMode: "fragment",
  flow: "standard",
};

// Singleton instance
let keycloakInstance = null;
let serviceInstance = null;

class KeycloakService {
  constructor() {
    if (serviceInstance) {
      return serviceInstance;
    }

    if (!keycloakInstance) {
      keycloakInstance = new Keycloak(keycloakConfig);

      // Minimal event logging
      keycloakInstance.onAuthSuccess = () => {
        window.dispatchEvent(new Event("authStateChanged"));
      };

      keycloakInstance.onAuthError = (error) => {
        console.error("[KEYCLOAK] Auth Error:", error);
        window.dispatchEvent(new Event("authStateChanged"));
      };

      keycloakInstance.onAuthLogout = () => {
        window.dispatchEvent(new Event("authStateChanged"));
      };
    }

    this.keycloak = keycloakInstance;
    this.initialized = false;
    this.token = null;
    this.refreshToken = null;
    this.tokenExpirationTime = null;
    this.refreshTokenExpirationTime = null;
    this.tokenUpdateInterval = null;
    this.eventListeners = new Map();
    this.userInfo = null;
    this.userRoles = new Set();
    this.error = null;

    // Token refresh configuration based on actual Keycloak token expiration
    this.ACCESS_TOKEN_EXPIRY = 1500 * 1000; // 25 minutes in milliseconds
    this.REFRESH_TOKEN_EXPIRY = 2592000 * 1000; // 30 days in milliseconds
    this.TOKEN_REFRESH_THRESHOLD = 5 * 60 * 1000; // 5 minutes before expiry
    this.TOKEN_CHECK_INTERVAL = 4 * 60 * 1000; // Check every 4 minutes
    this.MAX_REFRESH_RETRIES = 3;
    this.refreshRetryCount = 0;

    // Load cached state
    this.loadCachedState();

    serviceInstance = this;
  }

  loadCachedState() {
    try {
      console.log("[KEYCLOAK] Loading state from localStorage");

      // Load token state
      const tokenStateStr = localStorage.getItem("authTokens");
      const userStateStr = localStorage.getItem("userState");

      if (!tokenStateStr || !userStateStr) {
        console.log("[KEYCLOAK] No cached state found in localStorage");
        return false;
      }

      const tokenState = JSON.parse(tokenStateStr);
      const userState = JSON.parse(userStateStr);
      const now = Date.now();

      console.log("[KEYCLOAK] Found cached tokens:", {
        tokenExpires: new Date(tokenState.tokenExpirationTime).toLocaleString(),
        refreshExpires: new Date(tokenState.refreshTokenExpirationTime).toLocaleString(),
      });

      // Check if refresh token is expired
      const isRefreshTokenExpired = tokenState.refreshTokenExpirationTime && now >= tokenState.refreshTokenExpirationTime;
      const isTokenExpired = tokenState.tokenExpirationTime && now >= tokenState.tokenExpirationTime;

      if (!isRefreshTokenExpired) {
        // Restore token state
        this.token = tokenState.token;
        this.refreshToken = tokenState.refreshToken;
        this.tokenExpirationTime = tokenState.tokenExpirationTime;
        this.refreshTokenExpirationTime = tokenState.refreshTokenExpirationTime;

        // Restore user state with filtered roles
        const allowedRoles = import.meta.env.VITE_APP_ROLES.split(',').map(role => role.trim());
        const filteredRoles = (userState.userInfo?.roles || []).filter(role => allowedRoles.includes(role));
        
        this.userInfo = {
          ...userState.userInfo,
          roles: filteredRoles
        };
        this.userRoles = new Set(filteredRoles);
        this.userRole = filteredRoles.length > 0 ? filteredRoles[0] : null;

        // Update Keycloak instance
        this.keycloak.authenticated = true;
        this.keycloak.token = this.token;
        this.keycloak.refreshToken = this.refreshToken;

        console.log("[KEYCLOAK] Successfully restored state from localStorage:", {
          user: this.userInfo?.preferred_username,
          roles: filteredRoles,
          primaryRole: this.userRole
        });

        // If token is expired but refresh token is valid, refresh immediately
        if (isTokenExpired) {
          console.log("[KEYCLOAK] Token expired, refreshing...");
          this.refreshAccessToken().catch(console.error);
        } else if (this.shouldRefreshToken()) {
          console.log("[KEYCLOAK] Token expiring soon, refreshing...");
          this.refreshAccessToken().catch(console.error);
        }

        this.setupTokenRefresh();
        return true;
      } else {
        console.log("[KEYCLOAK] Refresh token expired, clearing localStorage");
        this.clearCachedState();
      }
    } catch (error) {
      console.error("[KEYCLOAK] Error loading state from localStorage:", error);
      this.clearCachedState();
    }
    return false;
  }

  /**
   * Filter user roles to only include application roles (student, admin, faculty)
   * @param {Array} roles - Array of all user roles
   * @returns {Array} Filtered roles
   */
  filterUserRoles(roles) {
    // Define the roles we want to keep (case insensitive)
    const applicationRoles = ["student", "admin", "faculty"];

    // Filter roles to only include application roles (case insensitive)
    return roles
      .filter((role) =>
        applicationRoles.some(
          (appRole) => role.toLowerCase() === appRole.toLowerCase()
        )
      )
      .map((role) => {
        // Normalize role names to match the expected format in routes
        if (role.toLowerCase() === "student") return "Student";
        if (role.toLowerCase() === "faculty") return "Faculty";
        if (role.toLowerCase() === "admin") return "Admin";
        return role;
      });
  }

  saveCachedState() {
    try {
      console.log("[KEYCLOAK] Saving state to localStorage");

      // Store tokens
      const tokenState = {
        token: this.token,
        refreshToken: this.refreshToken,
        tokenExpirationTime: this.tokenExpirationTime,
        refreshTokenExpirationTime: this.refreshTokenExpirationTime,
      };
      localStorage.setItem("authTokens", JSON.stringify(tokenState));

      // Store user info with filtered roles
      const userState = {
        userInfo: {
          ...this.userInfo,
          roles: Array.from(this.userRoles) // Store only filtered roles
        },
        userRole: this.userRole,
        lastUpdated: Date.now(),
      };
      localStorage.setItem("userState", JSON.stringify(userState));

      console.log("[KEYCLOAK] Successfully saved state:", {
        username: this.userInfo?.preferred_username,
        roles: Array.from(this.userRoles),
        primaryRole: this.userRole,
        tokenExpires: new Date(this.tokenExpirationTime).toLocaleString(),
        refreshExpires: new Date(this.refreshTokenExpirationTime).toLocaleString()
      });
    } catch (error) {
      console.error("[KEYCLOAK] Error saving state to localStorage:", error);
    }
  }

  clearCachedState() {
    try {
      console.log("[KEYCLOAK] Clearing localStorage");
      localStorage.removeItem("authTokens");
      localStorage.removeItem("userState");
      console.log("[KEYCLOAK] Successfully cleared localStorage");
    } catch (error) {
      console.error("[KEYCLOAK] Error clearing localStorage:", error);
    }
  }

  async initKeycloak() {
    if (this.initialized) {
      return this.keycloak.authenticated;
    }

    try {
      // First try to load cached state
      if (this.loadCachedState()) {
        this.initialized = true;
        // Dispatch event to notify auth state change
        window.dispatchEvent(new Event("authStateChanged"));
        return true;
      }

      // If no cached state, do a silent SSO check
      const authenticated = await this.keycloak.init({
        onLoad: "check-sso",
        silentCheckSsoRedirectUri: keycloakConfig.silentCheckSsoRedirectUri,
        pkceMethod: keycloakConfig.pkceMethod,
        checkLoginIframe: false,
        responseMode: keycloakConfig.responseMode,
        promiseType: "native",
        flow: "standard",
        enableLogging: true
      });

      this.initialized = true;

      if (authenticated) {
        await this.updateUserInfo();
        this.saveCachedState();
        this.setupTokenRefresh();
        // Dispatch event to notify auth state change
        window.dispatchEvent(new Event("authStateChanged"));
      } else {
        // Clear any stale state if not authenticated
        this.clearCachedState();
        this.clearTokens();
        this.userRoles.clear();
        this.userInfo = null;
      }

      // Return authenticated state but don't block initialization
      return authenticated;
    } catch (error) {
      console.error("[KEYCLOAK] Initialization error:", error);
      // Don't throw error, just return false and let the app continue
      this.initialized = true;
      this.error = error;
      return false;
    }
  }

  setupEventListeners() {
    this.keycloak.onAuthSuccess = () => {
      this.updateTokens();
      this.dispatchEvent("authSuccess");
    };

    this.keycloak.onAuthError = (error) => {
      console.error("[KEYCLOAK] Auth error:", error);
      this.dispatchEvent("authError", { error });
    };

    this.keycloak.onAuthRefreshSuccess = () => {
      this.updateTokens();
      this.dispatchEvent("authRefreshSuccess");
    };

    this.keycloak.onAuthRefreshError = (error) => {
      console.error("[KEYCLOAK] Auth refresh error:", error);
      this.dispatchEvent("authRefreshError", { error });
    };

    this.keycloak.onAuthLogout = () => {
      this.clearTokens();
      this.dispatchEvent("authLogout");
    };

    this.keycloak.onTokenExpired = () => {
      this.dispatchEvent("tokenExpired");
    };
  }

  updateTokens() {
    this.token = this.keycloak.token;
    this.refreshToken = this.keycloak.refreshToken;
    this.tokenExpirationTime = this.keycloak.tokenParsed?.exp * 1000;
    this.refreshTokenExpirationTime =
      this.keycloak.refreshTokenParsed?.exp * 1000;
  }

  clearTokens() {
    this.token = null;
    this.refreshToken = null;
    this.tokenExpirationTime = null;
    this.refreshTokenExpirationTime = null;
  }

  setupTokenRefresh() {
    if (this.tokenUpdateInterval) {
      clearInterval(this.tokenUpdateInterval);
    }

    const updateTokens = async () => {
      try {
        if (this.shouldRefreshToken()) {
          console.log("[KEYCLOAK] Access token expiring soon, refreshing...");
          await this.refreshAccessToken();
        }
      } catch (error) {
        console.error("[KEYCLOAK] Token refresh error:", error);
        // If refresh fails, try to use cached state
        const cachedState = this.loadCachedState();
        if (!cachedState) {
          this.dispatchEvent("tokenRefreshError", { error });
          this.logout();
        }
      }
    };

    // Check token every TOKEN_CHECK_INTERVAL
    this.tokenUpdateInterval = setInterval(
      updateTokens,
      this.TOKEN_CHECK_INTERVAL
    );
  }

  addEventListener(event, callback) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, new Set());
    }
    this.eventListeners.get(event).add(callback);
  }

  removeEventListener(event, callback) {
    if (this.eventListeners.has(event)) {
      this.eventListeners.get(event).delete(callback);
    }
  }

  dispatchEvent(event, data = {}) {
    if (this.eventListeners.has(event)) {
      this.eventListeners.get(event).forEach((callback) => callback(data));
    }
  }

  getToken() {
    return this.keycloak?.token || localStorage.getItem("token");
  }

  async logout() {
    try {
      console.log("[KEYCLOAK] Starting logout process");

      // Clear intervals first
      if (this.tokenUpdateInterval) {
        clearInterval(this.tokenUpdateInterval);
        this.tokenUpdateInterval = null;
      }

      // Clear state
      this.clearTokens();
      this.userRoles.clear();
      this.clearCachedState();

      // Only call Keycloak logout if instance exists and is authenticated
      if (this.keycloak?.authenticated) {
        console.log("[KEYCLOAK] Calling Keycloak logout");
        // Add proper redirect URL for logout
        const redirectUri = `${window.location.origin}/login`;
        this.keycloak
          .logout({
            redirectUri: redirectUri,
          })
          .catch((error) => {
            console.error("[KEYCLOAK] Logout error:", error);
            // Force redirect even if Keycloak logout fails
            window.location.href = redirectUri;
          });
      } else {
        console.log(
          "[KEYCLOAK] No active Keycloak session, redirecting to login"
        );
        window.location.href = `${window.location.origin}/login`;
      }

      this.dispatchEvent("authLogout");
    } catch (error) {
      console.error("[KEYCLOAK] Logout error:", error);
      // Ensure user is redirected to login even if something fails
      window.location.href = `${window.location.origin}/login`;
    }
  }

  async loginWithGoogle() {
    try {
      console.log("[KEYCLOAK] Initiating Google login");

      // Construct the Google login URL with proper parameters
      const googleLoginUrl = `${import.meta.env.VITE_KEYCLOAK_URL}/realms/${
        import.meta.env.VITE_KEYCLOAK_REALM
      }/protocol/openid-connect/auth`;

      const params = new URLSearchParams({
        client_id: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
        redirect_uri: `${window.location.origin}/auth/callback`,
        response_type: "code",
        scope: "openid profile email",
        kc_idp_hint: "google",
      });

      // Redirect to Google login
      window.location.href = `${googleLoginUrl}?${params.toString()}`;
    } catch (error) {
      console.error("[KEYCLOAK] Google login error:", error);
      throw error;
    }
  }

  async handleAuthCallback(code) {
    try {
      console.log("[KEYCLOAK] Handling auth callback with code");

      const tokenEndpoint = `${import.meta.env.VITE_KEYCLOAK_URL}/realms/${
        import.meta.env.VITE_KEYCLOAK_REALM
      }/protocol/openid-connect/token`;

      const params = new URLSearchParams({
        grant_type: "authorization_code",
        client_id: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
        client_secret: import.meta.env.VITE_KEYCLOAK_CLIENT_SECRET,
        code: code,
        redirect_uri: `${window.location.origin}/auth/callback`,
        scope: "openid profile email",
      });

      console.log("[KEYCLOAK] Token exchange parameters:", {
        endpoint: tokenEndpoint,
        clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
        redirectUri: `${window.location.origin}/auth/callback`,
      });

      const response = await fetch(tokenEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("[KEYCLOAK] Token exchange failed:", errorData);
        throw new Error(`Token exchange failed: ${errorData}`);
      }

      const tokenData = await response.json();
      console.log("[KEYCLOAK] Token exchange successful");

      // Update service state with new tokens
      this.token = tokenData.access_token;
      this.refreshToken = tokenData.refresh_token;
      this.tokenExpirationTime = Date.now() + tokenData.expires_in * 1000;
      this.refreshTokenExpirationTime =
        Date.now() + tokenData.refresh_expires_in * 1000;

      // Update Keycloak instance
      this.keycloak.authenticated = true;
      this.keycloak.token = this.token;
      this.keycloak.refreshToken = this.refreshToken;

      // Fetch user info
      await this.updateUserInfo();

      // Save state
      this.saveCachedState();

      // Setup token refresh
      this.setupTokenRefresh();

      // Dispatch success event
      this.dispatchEvent("authSuccess", {
        userInfo: this.userInfo,
        roles: Array.from(this.userRoles),
      });

      return true;
    } catch (error) {
      console.error("[KEYCLOAK] Auth callback error:", error);
      this.dispatchEvent("authError", { error });
      throw error;
    }
  }

  isAuthenticated() {
    try {
      const authenticated = this.keycloak?.authenticated || false;
      const hasValidToken =
        this.token &&
        this.tokenExpirationTime &&
        Date.now() < this.tokenExpirationTime;

      // If not authenticated but has valid cached state, try to restore it
      if (!authenticated && !hasValidToken && !this.initialized) {
        return this.loadCachedState();
      }

      return authenticated && hasValidToken;
    } catch (error) {
      console.error("[KEYCLOAK] Error checking authentication:", error);
      return false;
    }
  }

  get instance() {
    return this.keycloak;
  }

  /**
   * Extract user roles from Keycloak user info
   * @param {Object} userInfo - User info from Keycloak
   * @returns {Array} Array of user roles
   */
  extractUserRoles(userInfo) {
    if (!userInfo || !userInfo.roles) {
      return [];
    }

    // Get all roles from user info
    const allRoles = userInfo.roles;

    // Get allowed roles from environment variable
    const allowedRoles = import.meta.env.VITE_APP_ROLES.split(',').map(role => role.trim());

    // Filter roles to only include allowed roles
    const filteredRoles = allRoles.filter(role => allowedRoles.includes(role));

    // If no allowed roles found, return empty array
    if (filteredRoles.length === 0) {
      console.warn('[KEYCLOAK] No valid user roles found in:', allRoles);
      return [];
    }

    // Store the first role as the primary role
    this.userRole = filteredRoles[0];
    console.log('[KEYCLOAK] Extracted user roles:', {
      allRoles,
      filteredRoles,
      primaryRole: this.userRole
    });

    return filteredRoles;
  }

  async updateUserInfo() {
    try {
      const userInfo = await this.keycloak.loadUserInfo();
      this.userInfo = userInfo;
      
      // Extract and set roles
      const roles = this.extractUserRoles(userInfo);
      this.userRoles = new Set(roles);

      // Save updated user info with roles
      const userState = {
        userInfo: this.userInfo,
        userRoles: Array.from(this.userRoles),
        userRole: this.userRole,
        lastUpdated: Date.now(),
      };
      localStorage.setItem("userState", JSON.stringify(userState));

      this.dispatchEvent("userInfoUpdated", { 
        userInfo: this.userInfo,
        roles: Array.from(this.userRoles),
        userRole: this.userRole
      });
    } catch (error) {
      console.error("[KEYCLOAK] Error updating user info:", error);
      this.dispatchEvent("error", { error });
    }
  }

  async directLogin(username, password) {
    try {
      console.log("[KEYCLOAK] Attempting direct login for user:", username);

      // Get token from Keycloak
      const tokenResponse = await axios.post(
        `${import.meta.env.VITE_KEYCLOAK_URL}/realms/${
          import.meta.env.VITE_KEYCLOAK_REALM
        }/protocol/openid-connect/token`,
        new URLSearchParams({
          client_id: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
          client_secret: import.meta.env.VITE_KEYCLOAK_CLIENT_SECRET,
          grant_type: "password",
          username,
          password,
          scope: import.meta.env.VITE_KEYCLOAK_SCOPE,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      // Store tokens
      this.token = tokenResponse.data.access_token;
      this.refreshToken = tokenResponse.data.refresh_token;
      this.tokenExpirationTime =
        Date.now() + tokenResponse.data.expires_in * 1000;
      this.refreshTokenExpirationTime =
        Date.now() + tokenResponse.data.refresh_expires_in * 1000;

      // Get user info and roles
      const userInfo = await this.fetchUserInfo();

      // Set authentication state
      this.keycloak.authenticated = true;
      this.keycloak.token = this.token;
      this.keycloak.refreshToken = this.refreshToken;

      // Save state to localStorage
      this.saveCachedState();

      // Setup token refresh
      this.setupTokenRefresh();

      // Dispatch auth success event
      this.dispatchEvent("authSuccess", {
        userInfo,
        roles: Array.from(this.userRoles),
      });

      return true;
    } catch (error) {
      console.error("[KEYCLOAK] Direct login failed:", error);
      this.dispatchEvent("authError", { error });
      throw error;
    }
  }

  parseToken(token) {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("[KEYCLOAK] Error parsing token:", error);
      return null;
    }
  }

  async fetchUserInfo() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_KEYCLOAK_URL}/realms/${
          import.meta.env.VITE_KEYCLOAK_REALM
        }/protocol/openid-connect/userinfo`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );

      this.userInfo = response.data;
      // Extract roles from userinfo response
      this.userRoles = new Set(this.extractUserRoles(response.data));

      return response.data;
    } catch (error) {
      console.error("[KEYCLOAK] Error fetching user info:", error);
      throw error;
    }
  }

  shouldRefreshToken() {
    if (!this.token || !this.tokenExpirationTime) return false;

    const now = Date.now();
    const timeUntilExpiry = this.tokenExpirationTime - now;

    // Refresh if token is about to expire or already expired
    return timeUntilExpiry < this.TOKEN_REFRESH_THRESHOLD;
  }

  async refreshAccessToken() {
    try {
      if (!this.refreshToken || !this.refreshTokenExpirationTime) {
        throw new Error("No refresh token available");
      }

      const currentTime = Date.now();
      if (currentTime >= this.refreshTokenExpirationTime) {
        throw new Error("Refresh token expired");
      }

      const data = new URLSearchParams();
      data.append("grant_type", "refresh_token");
      data.append("client_id", import.meta.env.VITE_KEYCLOAK_CLIENT_ID);
      data.append("client_secret", import.meta.env.VITE_KEYCLOAK_CLIENT_SECRET);
      data.append("refresh_token", this.refreshToken);

      const response = await axios.post(
        `${import.meta.env.VITE_KEYCLOAK_URL}/realms/${
          import.meta.env.VITE_KEYCLOAK_REALM
        }/protocol/openid-connect/token`,
        data,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const tokenData = response.data;
      this.token = tokenData.access_token;
      this.refreshToken = tokenData.refresh_token;

      // Update expiration times using actual values from Keycloak
      const tokenTime = Date.now();
      this.tokenExpirationTime = tokenTime + tokenData.expires_in * 1000;
      this.refreshTokenExpirationTime =
        tokenTime + tokenData.refresh_expires_in * 1000;

      // Reset retry count on successful refresh
      this.refreshRetryCount = 0;

      // Fetch updated user info
      await this.fetchUserInfo();

      // Save updated state
      this.saveCachedState();

      this.dispatchEvent("tokenRefreshed", {
        roles: Array.from(this.userRoles),
        userInfo: this.userInfo,
      });

      return true;
    } catch (error) {
      console.error("[KEYCLOAK] Token refresh error:", error);
      this.refreshRetryCount++;

      if (this.refreshRetryCount >= this.MAX_REFRESH_RETRIES) {
        this.dispatchEvent("tokenRefreshError", { error });
        this.logout();
      }

      throw error;
    }
  }

  // Basic role checking for ProtectedRoute
  hasRole(role) {
    return this.userRoles.has(role);
  }

  getRoles() {
    return Array.from(this.userRoles);
  }

  getUserInfo() {
    return this.userInfo;
  }
}

// Create a single instance of the service
const keycloakService = new KeycloakService();

// Export only the necessary functions
export const directLogin = async (username, password) => {
  try {
    return await keycloakService.directLogin(username, password);
  } catch (error) {
    console.error("Direct login error:", error);
    throw error;
  }
};

export const initKeycloak = () => keycloakService.initKeycloak();
export const hasRole = (role) => keycloakService.hasRole(role);
export const getRoles = () => keycloakService.getRoles();

export default keycloakService;
