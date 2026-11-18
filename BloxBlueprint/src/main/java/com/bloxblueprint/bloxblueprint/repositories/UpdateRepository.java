package com.bloxblueprint.bloxblueprint.repositories;

import com.bloxblueprint.bloxblueprint.entities.Update;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UpdateRepository extends JpaRepository<Update, Long> {
    @Query("""
        SELECT u.experience.id, u.version, u.releaseDate
        FROM Update u
        WHERE u.experience.id IN :experienceIds
          AND u.status = com.bloxblueprint.bloxblueprint.entities.Update.UpdateStatus.RELEASED
    """)
    List<Object[]> findReleasedUpdateInfoByExperienceIds(
            @Param("experienceIds") List<Long> experienceIds
    );
}
