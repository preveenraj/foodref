package com.cognizant.truyum.service;

import java.util.List;

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

	public Cart getAllCartItems(Long userId) throws CartEmptyException {
		// TODO Auto-generated method stub
		return cartDao.getAllCartItems(userId);
	}



}
