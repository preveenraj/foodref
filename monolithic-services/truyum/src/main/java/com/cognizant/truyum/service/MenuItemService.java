package com.cognizant.truyum.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.cognizant.truyum.dao.MenuItemDao;
import com.cognizant.truyum.model.MenuItem;

@Service
public class MenuItemService {
	
	@Autowired
	MenuItemDao menuItemDao;
	
	
	public List<MenuItem> getMenuItemListCustomer(){
		
		return menuItemDao.getMenuItemListCustomer();
	}


	public List<MenuItem> getMenuItemListAdmin() {
		return menuItemDao.getMenuItemListAdmin();
	}


	public MenuItem getMenuItem(Long id) {

		return menuItemDao.getMenuItem(id);
	}


	public boolean modifyMenuItem(MenuItem menuItem) {
		// TODO Auto-generated method stub
		return menuItemDao.modifyMenuItem(menuItem);
	}

}
