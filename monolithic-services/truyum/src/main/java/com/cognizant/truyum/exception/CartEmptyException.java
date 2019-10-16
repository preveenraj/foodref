package com.cognizant.truyum.exception;

public class CartEmptyException extends Exception {
	public CartEmptyException() {
		super("\nCart is Empty");
	}
}
