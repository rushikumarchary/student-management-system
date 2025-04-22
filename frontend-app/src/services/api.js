import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Helper function to get token from localStorage
const getToken = () => {
    try {
        const tokenState = localStorage.getItem('authTokens');
        if (tokenState) {
            const { token } = JSON.parse(tokenState);
            return token;
        }
        return null;
    } catch (error) {
        console.error('Error getting token:', error);
        return null;
    }
};

// Create axios instance with default config
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle token expiration
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If error is 401 and we haven't retried yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Try to refresh the token
                const tokenState = localStorage.getItem('authTokens');
                if (tokenState) {
                    const { refreshToken } = JSON.parse(tokenState);
                    if (refreshToken) {
                        // Make refresh token request
                        const response = await axios.post(
                            `${import.meta.env.VITE_KEYCLOAK_URL}/realms/${import.meta.env.VITE_KEYCLOAK_REALM}/protocol/openid-connect/token`,
                            new URLSearchParams({
                                grant_type: 'refresh_token',
                                client_id: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
                                client_secret: import.meta.env.VITE_KEYCLOAK_CLIENT_SECRET,
                                refresh_token: refreshToken
                            }),
                            {
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                }
                            }
                        );

                        // Update tokens in localStorage
                        const newTokenState = {
                            token: response.data.access_token,
                            refreshToken: response.data.refresh_token,
                            tokenExpirationTime: Date.now() + (response.data.expires_in * 1000),
                            refreshTokenExpirationTime: Date.now() + (response.data.refresh_expires_in * 1000)
                        };
                        localStorage.setItem('authTokens', JSON.stringify(newTokenState));

                        // Retry the original request with new token
                        originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;
                        return api(originalRequest);
                    }
                }
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                // Clear auth state on refresh failure
                localStorage.removeItem('authTokens');
                localStorage.removeItem('userState');
                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    }
);

export default api; 