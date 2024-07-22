package com.spo.app.services;
import com.spo.app.dao.UserRepository;
import com.spo.app.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements IUserService {
    @Autowired
    UserRepository userRepository;
    @Override
    public List<User> retrieveUsers() {
        return userRepository.findAll();
    }
}
