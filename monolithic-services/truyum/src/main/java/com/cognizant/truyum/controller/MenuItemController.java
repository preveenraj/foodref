package com.cognizant.truyum.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.truyum.model.MenuItem;
import com.cognizant.truyum.service.MenuItemService;

@RestController
@RequestMapping("/menu-items")
public class MenuItemController {
	
	@Autowired
	MenuItemService menuItemService;
	
	@Autowired
	InMemoryUserDetailsManager inMemoryUserDetailsManager;

	
	@GetMapping
	public ResponseEntity<List<MenuItem>> getAllMenuItems() {

				Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
				String user = authentication.getName();
				if(!user.equalsIgnoreCase("anonymoususer")){
					UserDetails userDetails = inMemoryUserDetailsManager.loadUserByUsername(user);
					String role = userDetails.getAuthorities().toArray()[0].toString();
					System.out.println("role is "+role);
					if(role.equals("ROLE_USER"))
						return new ResponseEntity<List<MenuItem>>(menuItemService.getMenuItemListCustomer(),HttpStatus.OK);
					else 
					if(role.equals("ROLE_ADMIN"))
						return new ResponseEntity<List<MenuItem>>(menuItemService.getMenuItemListAdmin(),HttpStatus.OK);
				}
				return new ResponseEntity<List<MenuItem>>(menuItemService.getMenuItemListCustomer(),HttpStatus.OK);
	}
	
	
	
	@GetMapping("/{id}")
	public ResponseEntity<MenuItem> getMenuItem(@PathVariable Long id) {
		
		return new ResponseEntity<MenuItem>(menuItemService.getMenuItem(id),HttpStatus.OK);

	}
	
	@PutMapping
	public ResponseEntity<Boolean> modifyMenuItem(@RequestBody MenuItem menuItem) {
		
		return new ResponseEntity<Boolean>(menuItemService.modifyMenuItem(menuItem),HttpStatus.OK);
		
	}

}
