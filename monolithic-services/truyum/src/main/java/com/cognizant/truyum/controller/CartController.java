package com.cognizant.truyum.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.truyum.TruyumApplication;
import com.cognizant.truyum.dto.CartDTO;
import com.cognizant.truyum.service.CartService;

@RestController
@RequestMapping("/carts") 
public class CartController {
	private static final Logger LOGGER = LoggerFactory.getLogger(TruyumApplication.class);
	
	
	@Autowired
	CartService cartService;
	
	  @PostMapping("/{userId}/{menuItemId}") public boolean
	  addCartItem(@PathVariable String userId,@PathVariable Long menuItemId) {
	  System.out.println("userid"+userId);
	  System.out.println("menuItemId"+menuItemId); 
	  cartService.addCartItem(userId,menuItemId); return true; }
	  
	  @GetMapping("/{username}") public ResponseEntity<CartDTO>
	  getAllCartItems(@PathVariable String username){ return new
	  ResponseEntity<CartDTO>(cartService.getAllCartItems(username),HttpStatus.OK); }
	  
	  @DeleteMapping("/{username}/{menuItemId}")
	  public boolean deleteCartItem(@PathVariable String username,@PathVariable Long menuItemId) {
	  System.out.println("delete mapping"); System.out.println("userid"+username);
	  System.out.println("menuItemId"+menuItemId);
	  cartService.deleteCartItem(username, menuItemId);
	  return true; }
	  
	 
}
