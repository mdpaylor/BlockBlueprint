package com.bloxblueprint.bloxblueprint.services.experience;

import com.bloxblueprint.bloxblueprint.dtos.dashboard.ExperienceBriefDto;
import com.bloxblueprint.bloxblueprint.dtos.dashboard.ExperienceDataDto;
import com.bloxblueprint.bloxblueprint.entities.*;
import com.bloxblueprint.bloxblueprint.repositories.ExperienceRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ExperienceService {
    private ExperienceRepository experienceRepository;

    public ExperienceDataDto getExperienceDashboardDataById(long experienceId) {
        Optional<Experience> experienceOptional  = experienceRepository.findById(experienceId);

        if (experienceOptional.isEmpty())
            return null;

        Experience experience = experienceOptional.get();

        return ExperienceDataDto.builder()
                .id(experienceId)
                .title(experience.getTitle())
                .liveUpdate(getLiveUpdate(experience))
                .componentCount(experience.getComponents().size())
                .tasksInProgressCount(getTasksInProgressCount(experience))
                .plannedUpdatesCount(getPlannedUpdatesCount(experience))
                .usedTagCount(experience.getTags().size())
                .componentTypeCounts(getComponentTypeCounts(experience))
                .tasks(getTaskBriefs(experience))
                .nextUpdate(getNextUpdate(experience))
                .recentNotes(getRecentNoteBriefs(experience))
                .topTags(getTopTagBriefs(experience))
                .build();
    }

    public List<ExperienceBriefDto> getExperienceBriefsByUserId(long userId) {
        return experienceRepository.findExperienceBriefsByUserId(userId);
    }

    private int getTasksInProgressCount(Experience experience) {
        return experience
                .getTasks().stream()
                .filter(task -> task.getStatus() != Task.TaskStatus.COMPLETED)
                .toList()
                .size();
    }

    private int getPlannedUpdatesCount(Experience experience) {
        return experience
                .getUpdates().stream()
                .filter(update -> update.getStatus() != Update.UpdateStatus.RELEASED)
                .toList()
                .size();
    }

    private ExperienceDataDto.LiveUpdate getLiveUpdate(Experience experience) {
        return experience
                .getUpdates().stream()
                .filter(u -> u.getStatus() == Update.UpdateStatus.RELEASED)
                .filter(u -> u.getReleaseDate() != null)
                .max(Comparator.comparing(Update::getReleaseDate))
                .map(u -> ExperienceDataDto.LiveUpdate.builder()
                        .id(u.getId())
                        .version(u.getVersion())
                        .build())
                .orElse(null);
    }

    private List<ExperienceDataDto.ComponentType> getComponentTypeCounts(Experience experience) {
        return experience
                .getComponents().stream()
                .collect(Collectors.groupingBy(Component::getType, Collectors.counting()))
                .entrySet().stream()
                .map(entry -> ExperienceDataDto.ComponentType.builder()
                        .type(entry.getKey())
                        .count(entry.getValue().intValue())
                        .build())
                .toList();
    }

    private List<ExperienceDataDto.TaskBrief> getTaskBriefs(Experience experience) {
        return experience
                .getTasks().stream()
                .filter(task -> task.getStatus() != Task.TaskStatus.COMPLETED)
                .sorted(Comparator.comparingInt(this::getPercentageComplete).reversed())
                .limit(7)
                .map(task -> ExperienceDataDto.TaskBrief.builder()
                        .id(task.getId())
                        .title(task.getTitle())
                        .priority(task.getPriority())
                        .percentageComplete(getPercentageComplete(task))
                        .build())
                .toList();
    }

    private ExperienceDataDto.NextUpdate getNextUpdate(Experience experience) {
        return experience
                .getUpdates().stream()
                .filter(u -> u.getStatus() != Update.UpdateStatus.RELEASED)
                .min(Comparator.comparing(Update::getReleaseDate))
                .map(u -> ExperienceDataDto.NextUpdate.builder()
                        .id(u.getId())
                        .title(u.getTitle())
                        .version(u.getVersion())
                        .status(u.getStatus())
                        .releaseDate(u.getReleaseDate())
                        .taskCount(u.getTasks().size())
                        .build())
                .orElse(null);
    }

    private List<ExperienceDataDto.NoteBrief> getRecentNoteBriefs(Experience experience) {
        return experience
                .getNotes().stream()
                .sorted(Comparator.comparing(Note::getUpdatedAt).reversed())
                .limit(4)
                .map(n -> ExperienceDataDto.NoteBrief.builder()
                        .id(n.getId())
                        .title(n.getTitle())
                        .updatedAt(n.getUpdatedAt())
                        .build())
                .toList();
    }

    private List<ExperienceDataDto.TagBrief> getTopTagBriefs(Experience experience) {
        return experience
                .getTags().stream()
                .sorted(Comparator.comparingInt(this::getTagUseCount)
                        .reversed()
                        .thenComparing(Tag::getTitle))
                .map(tag -> ExperienceDataDto.TagBrief.builder()
                        .id(tag.getId())
                        .title(tag.getTitle())
                        .color(tag.getColor())
                        .useCount(getTagUseCount(tag))
                        .build())
                .toList();
    }

    private int getPercentageComplete(Task task) {
        BigDecimal estimated = task.getEstimatedHours();
        BigDecimal completed = task.getCompletedHours();

        if (estimated == null || completed == null || estimated.signum() == 0)
            return 0;

        return completed
                .divide(estimated, 4, RoundingMode.HALF_UP)
                .multiply(BigDecimal.valueOf(100))
                .setScale(0, RoundingMode.HALF_UP)
                .intValue();
    }

    private int getTagUseCount(Tag tag) {
        return tag.getTasks().size() + tag.getComponents().size();
    }
}
