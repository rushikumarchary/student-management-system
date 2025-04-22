package com.itrosys.admin_service.service;

import jakarta.ws.rs.core.Response;
import lombok.RequiredArgsConstructor;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class KeycloakUserService {

    private final Keycloak keycloak;
    @Value("${keycloak.realm}")
    private String realm;

    public void createUser(String username, String password, String firstName, String lastName, String email, String role) {

        System.out.println("user information  : password : " +password +" firstName : " +firstName +" lastName : "+ lastName
                                + " email : " + email + " role : " +role + " username "+ username);

        CredentialRepresentation credential = new CredentialRepresentation();
        credential.setTemporary(false);
        credential.setType(CredentialRepresentation.PASSWORD);
        credential.setValue(password);

        UserRepresentation user = new UserRepresentation();
        user.setUsername(username);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(email);
        user.setEnabled(true);
        user.setCredentials(Collections.singletonList(credential));

        // Create user
        Response response = keycloak.realm(realm).users().create(user);
        if (response.getStatus() != 201) {
            throw new RuntimeException("Failed to create user: " + response.getStatus());
        }

        // Assign Role
        String userId = getUserIdByUsername(username);
        RoleRepresentation kcRole = keycloak.realm(realm).roles().get(role).toRepresentation();
        keycloak.realm(realm).users().get(userId).roles().realmLevel().add(List.of(kcRole));
        
    }

    private String getUserIdByUsername(String username) {
        List<UserRepresentation> users = keycloak.realm(realm).users().search(username);
        if (users.isEmpty()) throw new RuntimeException("User not found in Keycloak: " + username);
        return users.get(0).getId();
    }
}
