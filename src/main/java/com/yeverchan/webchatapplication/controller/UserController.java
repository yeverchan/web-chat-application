package com.yeverchan.webchatapplication.controller;

import com.yeverchan.webchatapplication.model.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;


@RestController
@CrossOrigin(origins={"http://localhost:63342"}, allowCredentials = "true")
public class UserController {

    private Map<String, String> users = new ConcurrentHashMap<>();

    @GetMapping("/enter")
    public ResponseEntity<Void> enterChatRoom(@RequestParam String sender){
        if(users.containsKey(sender)){
            return ResponseEntity.badRequest().build();
        }

        users.put(sender, "getSessionId");

        return ResponseEntity.ok().build();
    }
}
