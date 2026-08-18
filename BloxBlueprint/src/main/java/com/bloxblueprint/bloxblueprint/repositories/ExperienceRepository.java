package com.bloxblueprint.bloxblueprint.repositories;

import com.bloxblueprint.bloxblueprint.dtos.dashboard.ExperienceBriefDto;
import com.bloxblueprint.bloxblueprint.entities.Experience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ExperienceRepository extends JpaRepository<Experience, Long>
{
    @Query("""
        SELECT new com.bloxblueprint.bloxblueprint.dtos.dashboard.ExperienceBriefDto(
            e.id,
            e.title
        )
        FROM Experience e
        WHERE e.user.id = :userId
        ORDER BY e.id
    """)
    List<ExperienceBriefDto> findExperienceBriefsByUserId(
            @Param("userId") long userId
    );

}
