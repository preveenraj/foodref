package com.cognizant.truyum.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognizant.truyum.dao.cartDTO;
import com.cognizant.truyum.dto.CartDTO;
import com.cognizant.truyum.exception.CartEmptyException;

@Service
public class CartService {
	
/*	@Autowired
	cartDao cartDao;*/
	
	@Autowired
	CartDTO cartDTO;
	
	public boolean addCartItem(String userId, long menuItemId) {
		return cartDTO.addCartItem(userId, menuItemId);
	}

	public CartDTO getAllCartItems(String userId) {
		// TODO Auto-generated method stub
		try {
			if(cartDTO.getAllCartItems(userId)!=null)
			return cartDTO.getAllCartItems(userId);
			else
				return new Cart(new ArrayList<MenuItem>(),0);
				
		} catch (CartEmptyException e) {
			return new Cart(new ArrayList<MenuItem>(),0);
		}
	}



	public void deleteCartItem(String userId, Long menuItemId) {
		// TODO Auto-generated method stub
		cartDTO.removeCartItem(userId, menuItemId);
		
	}



}
