package com.bloxblueprint.bloxblueprint.repositories;

import com.bloxblueprint.bloxblueprint.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository  extends JpaRepository<User, Long> {
}
