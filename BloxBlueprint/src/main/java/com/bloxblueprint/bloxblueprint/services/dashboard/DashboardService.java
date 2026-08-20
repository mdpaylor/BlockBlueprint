package com.bloxblueprint.bloxblueprint.services.dashboard;

import com.bloxblueprint.bloxblueprint.dtos.dashboard.ExperienceBriefDto;
import com.bloxblueprint.bloxblueprint.dtos.dashboard.ResponseDashboardMainDto;
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

    public ResponseDashboardMainDto getInitialDashboardData(String username) {
        final UserDto currentUser = authService.getCurrentUser(username);

        List<ExperienceBriefDto> experienceBriefDtos =
                experienceService.getExperienceBriefsByUserId(currentUser.getId());

        if (experienceBriefDtos.isEmpty())
            return null;

        return ResponseDashboardMainDto.builder()
                .experiences(experienceBriefDtos)
                .build();
    }
}
