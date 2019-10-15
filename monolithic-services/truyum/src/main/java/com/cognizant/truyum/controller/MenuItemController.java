package com.cognizant.truyum.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.truyum.model.MenuItem;
import com.cognizant.truyum.service.MenuItemService;

@RestController
@RequestMapping("/menu-items")
public class MenuItemController {
	
	@Autowired
	MenuItemService menuItemService;
	
	@GetMapping()
	public ResponseEntity<List<MenuItem>> getAllMenuItems() {
		
		return new ResponseEntity<List<MenuItem>>(menuItemService.getMenuItemListAdmin(),HttpStatus.OK);
	}

}
