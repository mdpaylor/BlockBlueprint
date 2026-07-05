package com.bloxblueprint.bloxblueprint.repositories;

import com.bloxblueprint.bloxblueprint.entities.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Long> {
}
