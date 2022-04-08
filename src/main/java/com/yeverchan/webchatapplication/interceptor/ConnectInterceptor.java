package com.yeverchan.webchatapplication.interceptor;

import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;

import java.util.Objects;

public class ConnectInterceptor implements ChannelInterceptor {

    @Override
    public void postSend(Message<?> head, MessageChannel channel, boolean sent) {

        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(head);

        if(Objects.equals(accessor.getCommand(), StompCommand.DISCONNECT)){

            try {
            }catch (Exception e){
                e.printStackTrace();
            }
        }
    }


}
