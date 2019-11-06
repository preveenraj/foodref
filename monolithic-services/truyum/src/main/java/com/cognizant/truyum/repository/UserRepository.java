package com.cognizant.truyum.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.cognizant.truyum.model.MenuItem;
import com.cognizant.truyum.model.User;

public interface UserRepository extends JpaRepository<User, Integer>{


	@Query("SELECT u from User u WHERE u.username=?1")
	User findByUsername(String username);
	
	@Query("SELECT u.menuItems from User u WHERE u.username=?1")
	List<MenuItem> getMenuItems(String username);
	
/*	@Query("SELECT SUM(m.price) from MenuItem m WHERE m.id = (SELECT u.menuItems.id from User u WHERE u.username=?1)")
	int getCartTotal(String username); */
}
