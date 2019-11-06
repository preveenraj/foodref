package com.cognizant.truyum.dto;


import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import com.cognizant.truyum.model.MenuItem;

public class CartDTO {
	
	private List<MenuItem> cartItems = new ArrayList<MenuItem>();

	private double total;

	public CartDTO() {
		super();
	}
	


	public List<MenuItem> getCartItems() {
		return cartItems;
	}



	public void setCartItems(List<MenuItem> cartItems) {
		this.cartItems = cartItems;
	}



	public double getTotal() {
		return total;
	}

	public void setTotal(double total) {
		this.total = total;
	}



	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		CartDTO other = (CartDTO) obj;
		if (cartItems == null) {
			if (other.cartItems != null)
				return false;
		} else if (!cartItems.equals(other.cartItems))
			return false;
		if (Double.doubleToLongBits(total) != Double.doubleToLongBits(other.total))
			return false;
		return true;
	}

	

	

}
