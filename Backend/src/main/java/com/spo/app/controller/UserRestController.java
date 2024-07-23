package com.spo.app.controller;
<<<<<<< HEAD
import com.spo.app.entity.User;
import com.spo.app.services.IUserService;
=======
<<<<<<< Updated upstream

import com.spo.app.entity.Session;
import com.spo.app.entity.User;
import com.spo.app.services.interfaces.IUserService;
=======
import com.spo.app.entity.User;
import com.spo.app.services.IUserService;
>>>>>>> Stashed changes
>>>>>>> 9a0e8d7cd80e12fd230a4077d9e5fb9446455c9a
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserRestController {
    @Autowired
    IUserService userService;
    @GetMapping("/retrieve-all-users")
    @ResponseBody
    public List<User> getUsers() {
        List<User> listUsers = userService.retrieveUsers();
<<<<<<< HEAD
        System.out.println("khalil"+listUsers.size());
=======
<<<<<<< Updated upstream
=======
        System.out.println("khalil"+listUsers.size());
>>>>>>> Stashed changes
>>>>>>> 9a0e8d7cd80e12fd230a4077d9e5fb9446455c9a
        return listUsers;
    }
}
