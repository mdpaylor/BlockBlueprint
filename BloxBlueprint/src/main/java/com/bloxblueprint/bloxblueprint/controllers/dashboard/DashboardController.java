package com.bloxblueprint.bloxblueprint.controllers.dashboard;

import com.bloxblueprint.bloxblueprint.dtos.dashboard.ResponseDashboardMainDto;
import com.bloxblueprint.bloxblueprint.services.dashboard.DashboardService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("api/dashboard")
public class DashboardController {
    private DashboardService dashboardService;

    @GetMapping
    public ResponseEntity<ResponseDashboardMainDto> getAllDashboardInfo(Authentication authentication) {
        ResponseDashboardMainDto responseAllDashboardMainDto =
                dashboardService.getInitialDashboardData(authentication.getName());

        if (responseAllDashboardMainDto == null)
            return ResponseEntity.notFound().build();

        return ResponseEntity.ok(responseAllDashboardMainDto);
    }
}
