package com.cognizant.truyum.model;


import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name="menu_item")
public class MenuItem {
	

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="me_id")
	private long id;
	@Column(name="me_name")
	private String title;
	@Column(name="me_price")
	private float price;
	@Column(name="me_active")
	private boolean active;
	@Column(name="me_date_of_launch")
	private Date dateOfLaunch;
	@Column(name="me_category")
	private String category;
	@Column(name="me_free_delivery")
	private boolean freeDelivery;
	@Column(name="me_image_url")
	private String imageUrl;
	
	 @ManyToMany
	    @JoinTable(name = "cart",
	        joinColumns = @JoinColumn(name = "ct_pr_id"), 
	        inverseJoinColumns = @JoinColumn(name = "ct_us_id"))
	private List<User> users;

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public MenuItem() {
		super();
	}




	public MenuItem(long id, String title, float price, boolean active, Date dateOfLaunch, String category,
			boolean freeDelivery, String imageUrl) {
		super();
		this.id = id;
		this.title = title;
		this.price = price;
		this.active = active;
		this.dateOfLaunch = dateOfLaunch;
		this.category = category;
		this.freeDelivery = freeDelivery;
		this.imageUrl = imageUrl;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}


	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public Date getDateOfLaunch() {
		return dateOfLaunch;
	}

	public void setDateOfLaunch(Date dateOfLaunch) {
		this.dateOfLaunch = dateOfLaunch;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public boolean isFreeDelivery() {
		return freeDelivery;
	}

	public void setFreeDelivery(boolean freeDelivery) {
		this.freeDelivery = freeDelivery;
	}

	@Override
	public String toString() {
		return "MenuItem [id=" + id + ", title=" + title + ", price=" + price + ", active=" + active + ", dateOfLaunch="
				+ dateOfLaunch + ", category=" + category + ", freeDelivery=" + freeDelivery + ", imageUrl=" + imageUrl
				+ "]";
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		MenuItem other = (MenuItem) obj;
		if (id != other.id)
			return false;
		return true;
	}

}