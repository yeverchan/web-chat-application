package com.yeverchan.webchatapplication.model;

import lombok.*;
import org.springframework.web.socket.WebSocketSession;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class User {
    private String name;
    private String sessionId;
//    private WebSocketSession session;
}
