package com.yeverchan.webchatapplication.repository;

import lombok.ToString;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@ToString
public class UserRepository {

    private static UserRepository instance;

    private final Map<String, String> users;

    private UserRepository(){
        users = new ConcurrentHashMap<>();
    }

    public static synchronized UserRepository getInstance() {
        if(instance == null){
            instance = new UserRepository();
        }
        return instance;
    }

    public Map<String, String> getUsers() {
        return users;
    }
}
