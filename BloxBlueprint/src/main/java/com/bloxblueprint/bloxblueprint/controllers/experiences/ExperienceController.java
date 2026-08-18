package com.bloxblueprint.bloxblueprint.controllers.experiences;

import com.bloxblueprint.bloxblueprint.dtos.dashboard.ExperienceDataDto;
import com.bloxblueprint.bloxblueprint.services.experience.ExperienceService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/api/experiences")
public class ExperienceController {
    private ExperienceService experienceService;

    @GetMapping("/{experienceId}/dashboard")
    public ResponseEntity<ExperienceDataDto> getExperienceDashboardData(@PathVariable long experienceId) {
        ExperienceDataDto experienceDataDto = experienceService.getExperienceDashboardDataById(experienceId);

        if (experienceDataDto == null)
            return ResponseEntity.notFound().build();

        return ResponseEntity.ok(experienceDataDto);
    }
}
