package com.yeverchan.webchatapplication.controller;

import com.yeverchan.webchatapplication.model.User;
import com.yeverchan.webchatapplication.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = {"http://localhost:63342"}, allowCredentials = "true")
public class UserController {

    @PostMapping("/enter")
    public ResponseEntity<Void> enterChatRoom(@RequestBody User user) {
        if ((UserRepository.getInstance().getUsers().containsKey(user.getName()))) {
            return ResponseEntity.badRequest().build();
        }
        UserRepository.getInstance().getUsers().put(user.getName(), "");
        return ResponseEntity.ok().build();
    }
}
