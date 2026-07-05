package com.bloxblueprint.bloxblueprint.repositories;

import com.bloxblueprint.bloxblueprint.entities.Component;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComponentRepository extends JpaRepository<Component, Long> {
}
