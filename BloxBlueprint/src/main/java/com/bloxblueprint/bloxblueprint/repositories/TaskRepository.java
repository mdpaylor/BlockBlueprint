package com.bloxblueprint.bloxblueprint.repositories;

import com.bloxblueprint.bloxblueprint.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
