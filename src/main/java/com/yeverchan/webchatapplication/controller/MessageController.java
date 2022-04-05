package com.yeverchan.webchatapplication.controller;

import com.yeverchan.webchatapplication.model.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MessageController {

    private final SimpMessageSendingOperations simpMessageSendingOperations;

    @MessageMapping("/pub")
    public void message(@Payload Message message){
        simpMessageSendingOperations.convertAndSend("/topic/public", message);
    }
}
