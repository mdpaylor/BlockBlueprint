package com.bloxblueprint.bloxblueprint.dtos.dashboard;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResponseDashboardMainDto {
    private List<ExperienceBriefDto> experiences;
}