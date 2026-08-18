package com.bloxblueprint.bloxblueprint.services.dashboard;

import com.bloxblueprint.bloxblueprint.dtos.dashboard.ExperienceBriefDto;
import com.bloxblueprint.bloxblueprint.dtos.dashboard.ExperienceDataDto;
import com.bloxblueprint.bloxblueprint.dtos.dashboard.ResponseAllDashboardMainDto;
import com.bloxblueprint.bloxblueprint.dtos.user.UserDto;
import com.bloxblueprint.bloxblueprint.entities.*;
import com.bloxblueprint.bloxblueprint.services.auth.AuthService;
import com.bloxblueprint.bloxblueprint.services.experience.ExperienceService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class DashboardService {
    private AuthService authService;
    private ExperienceService experienceService;

    public ResponseAllDashboardMainDto getInitialDashboardData(String username) {
        final UserDto currentUser = authService.getCurrentUser(username);

        List<ExperienceBriefDto> experienceBriefDtos =
                experienceService.getExperienceBriefsByUserId(currentUser.getId());

        if (experienceBriefDtos.isEmpty())
            return null;

        ExperienceDataDto experienceDataDto =
                experienceService.getExperienceDashboardDataById(experienceBriefDtos.getFirst().id());

        return ResponseAllDashboardMainDto.builder()
                .experiences(
                        experienceBriefDtos.stream()
                                .map(exp -> ResponseAllDashboardMainDto.ExperienceStructure.builder()
                                        .id(exp.id())
                                        .title(exp.title())
                                        .build())
                                .toList()
                )
                .experienceData(experienceDataDto)
                .build();
    }
}
