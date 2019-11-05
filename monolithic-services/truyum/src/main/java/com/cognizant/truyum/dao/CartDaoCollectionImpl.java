package com.cognizant.truyum.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.cognizant.truyum.exception.CartEmptyException;
import com.cognizant.truyum.model.MenuItem;


@Repository
public class CartDaoCollectionImpl implements CartDao {

	@Override
	public boolean addCartItem(String userId, long menuItemId) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void removeCartItem(String userId, long menuItemId) {
		// TODO Auto-generated method stub
		
	}

}

/*	public static HashMap<String, Cart> userCarts;

	public CartDaoCollectionImpl() {
		List<MenuItem> MenuItemList = new ArrayList<MenuItem>();
		if (userCarts == null) {
			userCarts = new HashMap<String, Cart>();
			Cart cartDefault = new Cart(MenuItemList, 0);
			userCarts.put("user", cartDefault);

		}

	}

	@Override
	public boolean addCartItem(String userId, long menuItemId) {
		MenuItemDao menuItemDao = new MenuItemDaoCollectionImpl();
		MenuItem menuItem = menuItemDao.getMenuItem(menuItemId);
		Cart cart;
		List<MenuItem> menuItemList;

		if (userCarts.containsKey(userId)) {
			cart = userCarts.get(userId);
			menuItemList = cart.getCartItems();
			menuItemList.add(menuItem);
			cart.setCartItems(menuItemList);
			userCarts.put(userId, cart);
			return true;
		} else { // if user doesn't already exist
			menuItemList = new ArrayList<MenuItem>();
			menuItemList.add(menuItem);
			cart = new Cart(menuItemList, 0);
			userCarts.put(userId, cart);
			return true;
		}
		

	}

	@Override
	public Cart getAllCartItems(String userId) throws CartEmptyException {

		if (userCarts.get(userId) != null) {
			// if the returned list is empty
			if (userCarts.get(userId).getCartItems().isEmpty()) {
				
				throw new CartEmptyException();
			} else { // if the returned list is not empty
				List<MenuItem> CartItems = userCarts.get(userId).getCartItems();
				double total = 0;
				for (MenuItem menuItem : CartItems) {
					total += menuItem.getPrice();
				}
				Cart cart = new Cart(CartItems, total);
				return cart;

			}
		}
		return null;

	}

	@Override
	public void removeCartItem(String userId, long menuItemId) {
		if (userCarts.containsKey(userId)) {
			List<MenuItem> menuItemList = userCarts.get(userId).getCartItems();
			for (int i = 0; i < menuItemList.size(); i++) {
				if (menuItemList.get(i).getId() == menuItemId) {
					menuItemList.remove(i);
					break;
				}
			}
		} else {
			System.out.println("User record not found");
		}

	}
}
*/