package com.cognizant.truyum.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognizant.truyum.dto.CartDTO;
import com.cognizant.truyum.exception.CartEmptyException;
import com.cognizant.truyum.model.MenuItem;
import com.cognizant.truyum.model.User;
import com.cognizant.truyum.repository.MenuItemRepository;
import com.cognizant.truyum.repository.UserRepository;

@Service
public class CartService {
	
/*	@Autowired
	cartDao cartDao;*/
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	MenuItemRepository menuItemRepository;
	
	public boolean addCartItem(int userId, long menuItemId) { 
		
		User user = userRepository.getOne(userId);
		MenuItem menuItem = menuItemRepository.getOne(menuItemId);
		user.getMenuItems().add(menuItem);
		userRepository.save(user);
		return true;
		
//		return cartDTO.addCartItem(userId, menuItemId);
		}
	
	 public CartDTO getAllCartItems(String username) { 
		 
		 CartDTO cartDTO = new CartDTO();
		 cartDTO.setCartItems( userRepository.getMenuItems(username));
		 
		
		 
		/* try {
			 if(cartDTO.getAllCartItems(userId)!=null)
				 return cartDTO.getAllCartItems(userId); 
			 else return new Cart(new ArrayList<MenuItem>(),0);
		  
		  } catch (CartEmptyException e) { return new Cart(new
		 ArrayList<MenuItem>(),0); } */
		 
		 return null;
		 
	 
	 }
	

	/*
	 * public boolean addCartItem(String userId, long menuItemId) { return
	 * cartDTO.addCartItem(userId, menuItemId); }
	 * 
	 * public CartDTO getAllCartItems(String userId) { // TODO Auto-generated method
	 * stub try { if(cartDTO.getAllCartItems(userId)!=null) return
	 * cartDTO.getAllCartItems(userId); else return new Cart(new
	 * ArrayList<MenuItem>(),0);
	 * 
	 * } catch (CartEmptyException e) { return new Cart(new
	 * ArrayList<MenuItem>(),0); } }
	 * 
	 * 
	 * 
	 * public void deleteCartItem(String userId, Long menuItemId) { // TODO
	 * Auto-generated method stub cartDTO.removeCartItem(userId, menuItemId);
	 * 
	 * }
	 */


}
