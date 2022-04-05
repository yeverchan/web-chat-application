package com.yeverchan.webchatapplication.model;

import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Message {
    private String type;
    private String content;
    private String sender;
}
