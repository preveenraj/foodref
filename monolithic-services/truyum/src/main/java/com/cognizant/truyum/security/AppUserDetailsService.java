package com.cognizant.truyum.security;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.cognizant.truyum.exception.UserAlreadyExistsException;
import com.cognizant.truyum.model.AppUser;
import com.cognizant.truyum.model.Role;
import com.cognizant.truyum.model.User;
import com.cognizant.truyum.repository.RoleRepository;
import com.cognizant.truyum.repository.UserRepository;


@Service
public class AppUserDetailsService implements UserDetailsService{
	
	private static final Logger LOGGER = LoggerFactory.getLogger(AppUserDetailsService.class);
	
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	RoleRepository roleRepository;
	


	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByUsername(username);
		if(user==null){
			throw new UsernameNotFoundException("User not found!");
		}
		else
		{
			LOGGER.info("user is:"+user);
			AppUser appUser = new AppUser(user);
			LOGGER.info("userDetails is: "+appUser);
			return appUser;
		}
		
	}

	public AppUserDetailsService(UserRepository userRepository) {
		super();
		this.userRepository = userRepository;
	}
	
	public void signup(User newUser) throws UserAlreadyExistsException{
		LOGGER.info("NEW USER IS: "+newUser);
		User user = userRepository.findByUsername(newUser.getUsername());
		if(user!=null){
			throw new UserAlreadyExistsException();
		} else {
			Role role = roleRepository.findById(2).get();
			LOGGER.info("NEW ROLE IS: "+role);
			List<Role> roles = new ArrayList<Role>();
			roles.add(role);
			newUser.setRoles(roles);
			BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
			String encodedPassword = bCryptPasswordEncoder.encode(newUser.getPassword());
			newUser.setPassword(encodedPassword);
			userRepository.save(newUser);
		}
		
	}
	
	

}


