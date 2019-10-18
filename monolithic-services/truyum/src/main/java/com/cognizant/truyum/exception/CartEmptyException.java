package com.cognizant.truyum.exception;

public class CartEmptyException extends Exception {
	public CartEmptyException() {
		super("Cart is Empty");
	}
}
