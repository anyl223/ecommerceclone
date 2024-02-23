package com.ecommerce.india.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecommerce.india.models.User;


@Repository
public interface UserRepo extends JpaRepository<User, Long> {

  User findFirstByUsername(String username);

}
