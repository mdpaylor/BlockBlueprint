package com.bloxblueprint.bloxblueprint.dtos.dashboard;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResponseAllDashboardMainDto {
    private List<ExperienceStructure> experiences;
    private ExperienceDataDto experienceDataDto;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ExperienceStructure {
        private long id;
        private String title;
    }
}