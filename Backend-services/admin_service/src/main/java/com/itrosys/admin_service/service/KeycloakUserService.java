package com.itrosys.admin_service.service;

import jakarta.ws.rs.core.Response;
import lombok.RequiredArgsConstructor;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.GroupRepresentation;
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

    public String createUser(String username, String password, String firstName, String lastName, String email, String role) {

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
        System.out.println("user Created this this value ");
        System.out.println(response);
        if (response.getStatus() != 201) {
            throw new RuntimeException("Failed to create user: " + response.getStatus());
        }

        // Get Keycloak ID
        String userId = getUserIdByUsername(username);

        //  Assign to group
        GroupRepresentation group = keycloak.realm(realm).groups().groups().stream()
                .filter(g -> g.getName().equalsIgnoreCase(role)) // "student" or "faculty"
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Group not found: " + role));

        keycloak.realm(realm).users().get(userId).joinGroup(group.getId());

        return userId;
    }


    private String getUserIdByUsername(String username) {
        List<UserRepresentation> users = keycloak.realm(realm).users().search(username);
        if (users.isEmpty()) throw new RuntimeException("User not found in Keycloak: " + username);
        return users.get(0).getId();
    }
}
