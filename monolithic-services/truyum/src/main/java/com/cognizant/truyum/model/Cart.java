package com.cognizant.truyum.model;


import java.util.ArrayList;
import java.util.List;

public class Cart {
	private List<MenuItem> cartItems = new ArrayList<MenuItem>();
	private double total;

	public Cart() {
		super();
	}

	

	public Cart(List<MenuItem> cartItems, double total) {
		super();
		this.cartItems = cartItems;
		this.total = total;
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
		Cart other = (Cart) obj;
		if (Double.doubleToLongBits(total) != Double.doubleToLongBits(other.total))
			return false;
		return true;
	}

}