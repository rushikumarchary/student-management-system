package com.itrosys.admin_service.repository;

import com.itrosys.admin_service.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findByVerifiedAndRole(Boolean verified, String role);

    List<User> findByRole(String role);
}
