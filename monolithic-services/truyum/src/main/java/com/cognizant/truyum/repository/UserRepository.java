package com.cognizant.truyum.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.cognizant.truyum.model.MenuItem;
import com.cognizant.truyum.model.User;

public interface UserRepository extends JpaRepository<User, Integer>{


	User findByUsername(String username);
	
	@Query("SELECT u.menuItems from User u WHERE u.username=?1")
	List<MenuItem> getMenuItems(String username);
	
	//TODO
	@Query("SELECT SUM(m.price) from MenuItem m")
	double getCartTotal(String username); 
}
