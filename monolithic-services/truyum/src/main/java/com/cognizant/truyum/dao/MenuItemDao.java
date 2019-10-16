package com.cognizant.truyum.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.cognizant.truyum.model.MenuItem;

@Repository
public interface MenuItemDao {
	public List<MenuItem> getMenuItemListAdmin();

	public List<MenuItem> getMenuItemListCustomer();

	public boolean modifyMenuItem(MenuItem menuItem);

	public MenuItem getMenuItem(Long menuItemId);
}
