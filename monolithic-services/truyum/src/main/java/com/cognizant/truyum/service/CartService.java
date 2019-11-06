package com.cognizant.truyum.service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognizant.truyum.TruyumApplication;
import com.cognizant.truyum.dto.CartDTO;
import com.cognizant.truyum.model.MenuItem;
import com.cognizant.truyum.model.User;
import com.cognizant.truyum.repository.MenuItemRepository;
import com.cognizant.truyum.repository.UserRepository;

@Service
public class CartService {
	
	
	private static final Logger LOGGER = LoggerFactory.getLogger(CartService.class);
	
	
/*	@Autowired
	cartDao cartDao;*/
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	MenuItemRepository menuItemRepository;
	
	public boolean addCartItem(String username, long menuItemId) { 
		
		User user = userRepository.findByUsername(username);
		MenuItem menuItem = menuItemRepository.getOne(menuItemId);
		user.getMenuItems().add(menuItem);
		userRepository.save(user);
		return true;
		
//		return cartDTO.addCartItem(userId, menuItemId);
		}
	
	 public CartDTO getAllCartItems(String username) { 
		 
		 CartDTO cartDTO = new CartDTO();
		 cartDTO.setCartItems( userRepository.getMenuItems(username));
		 cartDTO.setTotal(userRepository.getCartTotal(username));
		 
		
		 
		/* try {
			 if(cartDTO.getAllCartItems(userId)!=null)
				 return cartDTO.getAllCartItems(userId); 
			 else return new Cart(new ArrayList<MenuItem>(),0);
		  
		  } catch (CartEmptyException e) { return new Cart(new
		 ArrayList<MenuItem>(),0); } */
		 
		 return cartDTO;
		 
	 
	 }
	 
	 public void deleteCartItem(String username, Long menuItemId) {
//		 	cartDTO.removeCartItem(userId, menuItemId);
			User user = userRepository.findByUsername(username);
			MenuItem menuItem = menuItemRepository.getOne(menuItemId);
			List<MenuItem> userMenuItemList = user.getMenuItems();
			userMenuItemList.removeIf(mItem->{return mItem.getId()==menuItemId; });
		/*	
			System.out.println("deletion1");
			for(MenuItem mItem: userMenuItemList){
				if(mItem.getId()==menuItemId){
					System.out.println("deletion2");
					boolean flag = userMenuItemList.remove(mItem);
					LOGGER.info("flag is: "+flag);
					break;
				}
			}*/
			user.setMenuItems(userMenuItemList);
			userRepository.save(user);
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
