package com.itrosys.login_service.service;

import com.itrosys.login_service.entity.Role;
import com.itrosys.login_service.repository.RoleRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RoleService {

    private final RoleRepository roleRepo;

    public RoleService(RoleRepository roleRepo) {
        this.roleRepo = roleRepo;
    }

    @Transactional
    public void createRoleIfNotExist(String roleName) {
        if (roleRepo.findByName(roleName) == null) {
            roleRepo.save(new Role(null, roleName)); // ID is auto-generated
        }
    }
}
