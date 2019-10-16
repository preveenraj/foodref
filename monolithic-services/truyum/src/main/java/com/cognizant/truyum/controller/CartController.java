package com.cognizant.truyum.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.truyum.TruyumApplication;
import com.cognizant.truyum.exception.CartEmptyException;
import com.cognizant.truyum.model.Cart;
import com.cognizant.truyum.model.MenuItem;
import com.cognizant.truyum.service.CartService;

@RestController
@RequestMapping("/carts") 
public class CartController {
	private static final Logger LOGGER = LoggerFactory.getLogger(TruyumApplication.class);
	
	
	@Autowired
	CartService cartService;
	
	@PostMapping("/{userId}/{menuItemId}")
	public boolean addCartItem(@PathVariable Long userId,@PathVariable Long menuItemId) {
		LOGGER.info("userid"+userId);
		LOGGER.info("menuItemId"+menuItemId);
		return cartService.addCartItem(userId, menuItemId);
	}
	
	@GetMapping("/{userId}")
	public ResponseEntity<Cart> getAllCartItems(@PathVariable Long userId) throws CartEmptyException {
		return new ResponseEntity<Cart>(cartService.getAllCartItems(userId),HttpStatus.OK);
		}
	

}
