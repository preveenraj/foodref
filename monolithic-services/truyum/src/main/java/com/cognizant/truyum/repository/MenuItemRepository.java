package com.cognizant.truyum.repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.cognizant.truyum.model.MenuItem;

public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
	
	
	@Query("SELECT m from MenuItem m WHERE m.active=true AND m.dateOfLaunch<=CURRENT_DATE")
	public List<MenuItem> FilterItemsForCustomer(); 

}
