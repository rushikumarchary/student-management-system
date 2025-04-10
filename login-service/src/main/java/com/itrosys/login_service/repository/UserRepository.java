package com.itrosys.login_service.repository;

import com.itrosys.login_service.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    User findByUsername(String username);

//    boolean findByEmail(String email);

    Optional<User> findByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.username = :username OR u.email = :email")
    List<User> findByUsernameOrEmail(@Param("username") String username, @Param("email") String email);

}
