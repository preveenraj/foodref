package com.cognizant.truyum.model;

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
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


@Entity
@Table(name="user")
public class User {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="us_id")
	private int id;
	@NotNull
	@Size(min=4)
	@Column(name="us_username")
	private String username;
	@NotNull
	@Column(name="us_firstname")
	private String firstname;
	@NotNull
	@Column(name="us_lastname")
	private String lastname;
	@NotNull
	@Size(min=8)
	@Column(name="us_password")
	private String password;
	
	
	
	
	 @ManyToMany
	    @JoinTable(name = "cart",
	        joinColumns = @JoinColumn(name = "ct_us_id"), 
	        inverseJoinColumns = @JoinColumn(name = "ct_pr_id"))
	 private List<MenuItem> menuItems;
	 
	 @ManyToMany
	    @JoinTable(name = "user_role",
	        joinColumns = @JoinColumn(name = "ur_us_id"), 
	        inverseJoinColumns = @JoinColumn(name = "ur_ro_id"))
	 private List<Role> roles;
	 
	 
	 
	
	
	public User() {
		super();
	}





	public List<MenuItem> getMenuItems() {
		return menuItems;
	}





	public void setMenuItems(List<MenuItem> menuItems) {
		this.menuItems = menuItems;
	}


	public String getUsername() {
		return username;
	}


	public void setUsername(String username) {
		this.username = username;
	}


	public String getFirstName() {
		return firstname;
	}


	public void setFirstName(String firstname) {
		this.firstname = firstname;
	}


	public String getLastName() {
		return lastname;
	}


	public void setLastName(String lastname) {
		this.lastname = lastname;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", firstname=" + firstname + ", lastname=" + lastname
				+ ", password=" + password + ", menuItems=" + menuItems + ", roles=" + roles + "]";
	}

	public List<Role> getRoles() {
		return roles;
	}

	public void setRoles(List<Role> roles) {
		this.roles = roles;
	}

}