package com.itrosys.login_service.service;

import com.itrosys.login_service.entity.UserPrincipal;
import com.itrosys.login_service.entity.User;
import com.itrosys.login_service.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    private UserRepository userRepository;

    public MyUserDetailsService(UserRepository userRepository){
        this.userRepository=userRepository;
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user =userRepository.findByUsername(username);
        if (user == null){
            System.out.println("user Not Found");
            throw new UsernameNotFoundException("user Not found");
        }
        return new UserPrincipal(user);
    }
}
