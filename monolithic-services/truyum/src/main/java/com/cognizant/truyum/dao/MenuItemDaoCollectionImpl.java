package com.cognizant.truyum.dao;


import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Repository;

import com.cognizant.truyum.model.MenuItem;

@Repository
public class MenuItemDaoCollectionImpl implements MenuItemDao {


	
	static ApplicationContext context = new ClassPathXmlApplicationContext("truyum.xml");
	
	private static List<MenuItem> menuItemList;

	public MenuItemDaoCollectionImpl() {

		if (menuItemList == null) {
	/*		menuItemList = new ArrayList<MenuItem>();
			menuItemList.add(new MenuItem(1, "Sandwich", 99.00f, true, DateUtil.convertToDate("15/03/2017"),
					"Main Course", true));
			menuItemList.add(new MenuItem(2, "Burger", 129.00f, true, DateUtil.convertToDate("23/12/2017"),
					"Main Course", false));
			menuItemList.add(new MenuItem(3, "Pizza", 149.00f, true, DateUtil.convertToDate("21/08/2017"),
					"Main Course", false));
			menuItemList.add(new MenuItem(4, "French Fries", 57.00f, false, DateUtil.convertToDate("02/07/2017"),
					"Starters", true));
			menuItemList.add(new MenuItem(5, "Chocolate Brownie", 32.00f, true, DateUtil.convertToDate("02/11/2022"),
					"Dessert", true));*/
			
			menuItemList = (ArrayList<MenuItem>) context.getBean("menuItemList",ArrayList.class);

		}
	}

	@Override
	public List<MenuItem> getMenuItemListAdmin() {

		return menuItemList;
	}

	@Override
	public List<MenuItem> getMenuItemListCustomer() {

		List<MenuItem> menuItemListCustomer = new ArrayList<MenuItem>();
		Date today = Calendar.getInstance().getTime();
		for (MenuItem menuItem : getMenuItemListAdmin()) {

			if ((menuItem.getDateOfLaunch().before(today)) || (menuItem.getDateOfLaunch().equals(today))) {
				if (menuItem.isActive()) {
					menuItemListCustomer.add(menuItem);
				}

			}
		}

		return menuItemListCustomer;
	}

	// This method will be used to change the menu item data in the list of menu
	// items.
	// This method will be invoked when Customer submits the user form.
	@Override
	public boolean modifyMenuItem(MenuItem menuItem) {

		for (int i = 0; i < menuItemList.size(); i++) {
			if (menuItem.equals(menuItemList.get(i))) {
				menuItemList.set(i, menuItem);
				return true;
			}
		}
		
		return false;

	}

	// This method is used to retrieve a particular menu item’s detail from the
	// menu item list. This method will be invoked when user click on Edit link
	// in menu item listing screen of Admin.
	@Override
	public MenuItem getMenuItem(Long menuItemId) {

		for (int i = 0; i < menuItemList.size(); i++) {
			if (menuItemId == menuItemList.get(i).getId()) {
				return menuItemList.get(i);
			}
		}

		return null;
	}

}