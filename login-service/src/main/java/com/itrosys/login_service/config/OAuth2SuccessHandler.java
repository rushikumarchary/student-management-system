package com.itrosys.login_service.config;

import com.itrosys.login_service.entity.Role;
import com.itrosys.login_service.entity.User;
import com.itrosys.login_service.entity.UserPrincipal;
import com.itrosys.login_service.repository.RoleRepository;
import com.itrosys.login_service.repository.UserRepository;
import com.itrosys.login_service.service.JWTService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final JWTService jwtService;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public OAuth2SuccessHandler(JWTService jwtService, 
                               UserRepository userRepository,
                               RoleRepository roleRepository) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                      Authentication authentication) throws IOException, ServletException {
        try {
            OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
            
            // Get the registration ID (provider) from the authentication
            String registrationId = request.getRequestURI().contains("/oauth2/authorization/github") ? "github" : "google";
            
            // Extract user information based on the provider
            String email = extractEmail(oAuth2User, registrationId);
            String name = extractName(oAuth2User, registrationId);
            
            // Ensure we have a valid email
            if (email == null || email.isEmpty()) {
                // If email is still null, generate a unique one
                String login = oAuth2User.getAttribute("login");
                if (login != null) {
                    email = login + "@github.com";
                } else {
                    email = "user_" + UUID.randomUUID().toString().substring(0, 8) + "@github.com";
                }
            }
            
            // Check if user exists in database by email
            Optional<User> existingUser = userRepository.findByEmail(email);
            
            User user;
            if (existingUser.isPresent()) {
                user = existingUser.get();
            } else {
                // Create new user if not exists
                user = new User();
                user.setEmail(email);
                
                // Extract username from email (part before @)
                String username = extractUsernameFromEmail(email);
                
                // Check if username exists and make it unique if needed
                User existingUserByUsername = userRepository.findByUsername(username);
                if (existingUserByUsername != null) {
                    // If username exists, append a random string to make it unique
                    username = username + "_" + UUID.randomUUID().toString().substring(0, 4);
                }
                
                user.setUsername(username);
                user.setPassword("password@123"); // OAuth2 users don't need password
                
                // Assign role based on email domain
                Role role;
                if (email != null && email.toLowerCase().endsWith("@itrosys.com")) {
                    role = roleRepository.findByName("FACULTY");
                    if (role == null) {
                        role = new Role();
                        role.setName("FACULTY");
                        role = roleRepository.save(role);
                    }
                } else {
                    role = roleRepository.findByName("STUDENT");
                    if (role == null) {
                        role = new Role();
                        role.setName("STUDENT");
                        role = roleRepository.save(role);
                    }
                }
                
                user.setRole(role);
                user = userRepository.save(user);
            }
            
            // Create UserPrincipal for JWT token generation
            UserPrincipal userPrincipal = new UserPrincipal(user);
            
            // Generate JWT token using existing JWTService
            String token = jwtService.generateToken(userPrincipal);
            
            // Redirect to frontend with token
            String redirectUrl = UriComponentsBuilder.newInstance()
                    .scheme("http")
                    .host("localhost")
                    .port(5173)
                    .path("/oauth2/redirect")
                    .queryParam("token", token)
                    .queryParam("email", email)
                    .queryParam("name", name)
                    .build()
                    .toUriString();
            
            response.sendRedirect(redirectUrl);
            
        } catch (Exception e) {
            // Log the error
            e.printStackTrace();
            
            // Redirect to frontend with error
            String errorRedirectUrl = UriComponentsBuilder.newInstance()
                    .scheme("http")
                    .host("localhost")
                    .port(5173)
                    .path("/oauth2/error")
                    .queryParam("error", "Authentication failed. Please try again.")
                    .build()
                    .toUriString();
                    
            response.sendRedirect(errorRedirectUrl);
        }
    }
    
    /**
     * Extracts the username from the email address (part before @)
     */
    private String extractUsernameFromEmail(String email) {
        if (email == null || !email.contains("@")) {
            return "user_" + UUID.randomUUID().toString().substring(0, 8);
        }
        return email.substring(0, email.indexOf("@"));
    }
    
    /**
     * Extracts the email from the OAuth2User based on the provider
     */
    private String extractEmail(OAuth2User oAuth2User, String registrationId) {
        if ("github".equals(registrationId)) {
            // For GitHub, email might be in a different attribute or might need to be fetched separately
            String email = oAuth2User.getAttribute("email");
            
            // If email is not directly available, try to get it from the attributes map
            if (email == null) {
                Map<String, Object> attributes = oAuth2User.getAttributes();
                
                // Try to get email from various possible locations in the attributes
                if (attributes.containsKey("email")) {
                    email = (String) attributes.get("email");
                } else if (attributes.containsKey("login")) {
                    // If email is not available, use login + @github.com as fallback
                    email = attributes.get("login") + "@github.com";
                }
            }
            
            return email;
        } else {
            // For Google, email is directly available
            return oAuth2User.getAttribute("email");
        }
    }
    
    /**
     * Extracts the name from the OAuth2User based on the provider
     */
    private String extractName(OAuth2User oAuth2User, String registrationId) {
        if ("github".equals(registrationId)) {
            // For GitHub, name might be in a different attribute
            String name = oAuth2User.getAttribute("name");
            
            // If name is not directly available, try to get it from the attributes map
            if (name == null) {
                Map<String, Object> attributes = oAuth2User.getAttributes();
                
                if (attributes.containsKey("name")) {
                    name = (String) attributes.get("name");
                } else if (attributes.containsKey("login")) {
                    // If name is not available, use login as fallback
                    name = (String) attributes.get("login");
                }
            }
            
            return name;
        } else {
            // For Google, name is directly available
            return oAuth2User.getAttribute("name");
        }
    }
} 