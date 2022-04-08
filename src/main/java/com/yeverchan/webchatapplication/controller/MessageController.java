package com.yeverchan.webchatapplication.controller;

import com.yeverchan.webchatapplication.model.Message;
import com.yeverchan.webchatapplication.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MessageController {

    private final SimpMessageSendingOperations simpMessageSendingOperations;

    @MessageMapping("/connection")
    public void connection(@Payload Message message, StompHeaderAccessor headerAccessor) {

        String sessionId = headerAccessor.getSessionId();

        try {
            if (message.getType().equals("out")) {
                String name = UserRepository.getInstance().getUserName(sessionId);

                UserRepository.getInstance().getUsers().remove(name);

                message.setContent(name + "님이 나갔습니다.");

                message.setSender("system");
                message.setUid(null);

                simpMessageSendingOperations.convertAndSend("/topic/public", message);
                return;
            }
        }catch (Exception e){
            e.printStackTrace();
        }

        message.setUid(sessionId);

        UserRepository.getInstance().getUsers().put(message.getSender(), sessionId);

        message.setContent(message.getSender() + "님이 들어왔습니다.");

        message.setSender("system");
        message.setUid(null);

        simpMessageSendingOperations.convertAndSend("/topic/public", message);
    }

    @MessageMapping("/send")
    public void sendMessage(@Payload Message message) {

        message.setUid(UserRepository.getInstance().getUsers().get(message.getSender()));

        simpMessageSendingOperations.convertAndSend("/topic/public", message);
    }
}
