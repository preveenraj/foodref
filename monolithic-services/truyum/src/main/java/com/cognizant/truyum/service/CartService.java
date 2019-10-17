package com.cognizant.truyum.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognizant.truyum.dao.CartDao;
import com.cognizant.truyum.exception.CartEmptyException;
import com.cognizant.truyum.model.Cart;
import com.cognizant.truyum.model.MenuItem;

@Service
public class CartService {
	
	@Autowired
	CartDao cartDao;
	
	public boolean addCartItem(long userId, long menuItemId) {
		return cartDao.addCartItem(userId, menuItemId);
	}

	public Cart getAllCartItems(Long userId) {
		// TODO Auto-generated method stub
		try {
			return cartDao.getAllCartItems(userId);
		} catch (CartEmptyException e) {
			System.out.println("scene aane cart empty");
			return new Cart(new ArrayList<MenuItem>(),0);
		}
	}



	public void deleteCartItem(Long userId, Long menuItemId) {
		// TODO Auto-generated method stub
		cartDao.removeCartItem(userId, menuItemId);
		
	}



}
