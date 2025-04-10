package com.itrosys.login_service.config;

import com.itrosys.login_service.service.RoleService;
import com.itrosys.login_service.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataSetupConfig {

    private final RoleService roleService;
    private final UserService userService;

    public DataSetupConfig(RoleService roleService, UserService userService) {
        this.roleService = roleService;
        this.userService = userService;
    }

    @Bean
    CommandLineRunner setupData() {
        return args -> {
            roleService.createRoleIfNotExist("ADMIN");
            roleService.createRoleIfNotExist("TEACHER");
            roleService.createRoleIfNotExist("FACULTY");
            roleService.createRoleIfNotExist("STUDENT");
            roleService.createRoleIfNotExist("USER");
            userService.createAdminUserIfNotExist();
        };
    }
}
