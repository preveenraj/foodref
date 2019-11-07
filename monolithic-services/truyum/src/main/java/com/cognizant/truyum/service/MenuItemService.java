package com.cognizant.truyum.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognizant.truyum.dao.MenuItemDao;
import com.cognizant.truyum.model.MenuItem;
import com.cognizant.truyum.repository.MenuItemRepository;

@Service
public class MenuItemService {
	
	@Autowired
	MenuItemDao menuItemDao;
	
	@Autowired
	MenuItemRepository menuItemRepository;
	
	@Transactional
	public List<MenuItem> getMenuItemListCustomer(){
//		return menuItemDao.getMenuItemListCustomer();
		return menuItemRepository.FilterItemsForCustomer();
	}

	@Transactional
	public List<MenuItem> getMenuItemListAdmin() {
//		return menuItemDao.getMenuItemListAdmin();
		return menuItemRepository.findAll();
	}

	@Transactional
	public MenuItem getMenuItem(Long id) {

//		return menuItemDao.getMenuItem(id);
		return menuItemRepository.findById(id).get();
	}

	@Transactional
	public boolean modifyMenuItem(MenuItem menuItem) {
		// TODO Auto-generated method stub
//		return menuItemDao.modifyMenuItem(menuItem);
		Optional<MenuItem> opMenuItem = menuItemRepository.findById(menuItem.getId());
		if(opMenuItem.isPresent()) {
			menuItemRepository.save(menuItem);
			return true;
		}
		else
			return false;
		
	}

}
