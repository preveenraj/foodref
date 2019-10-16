package com.cognizant.truyum.dao;
import org.springframework.stereotype.Repository;

import com.cognizant.truyum.exception.CartEmptyException;
import com.cognizant.truyum.model.Cart;

@Repository
public interface CartDao {
	public boolean addCartItem(long userId, long menuItemId);

	// Create a class called CartEmptyException
	public Cart getAllCartItems(long userId) throws CartEmptyException;

	public void removeCartItem(long userId, long menuItemId);
}

