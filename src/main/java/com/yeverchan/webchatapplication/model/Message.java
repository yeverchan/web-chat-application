package com.yeverchan.webchatapplication.model;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Message {
    private String type;
    private String content;
    private String sender;
    private String uid;
}
