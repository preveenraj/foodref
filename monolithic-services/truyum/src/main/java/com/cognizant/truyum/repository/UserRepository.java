package com.cognizant.truyum.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cognizant.truyum.model.User;

public interface UserRepository extends JpaRepository<User, Integer>{

}
