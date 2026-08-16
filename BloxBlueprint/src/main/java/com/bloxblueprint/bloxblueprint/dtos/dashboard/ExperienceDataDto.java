package com.bloxblueprint.bloxblueprint.dtos.dashboard;

import com.bloxblueprint.bloxblueprint.entities.Task;
import com.bloxblueprint.bloxblueprint.entities.Update;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExperienceDataDto {
    private long id;
    private String title;
    private LiveUpdate liveUpdate;
    private int componentCount;
    private int tasksInProgressCount;
    private int plannedUpdatesCount;
    private int usedTagCount;
    private List<ComponentType> componentTypeCounts;
    private List<TaskBrief> tasks;
    private NextUpdate nextUpdate;
    private List<NoteBrief> recentNotes;
    private List<TagBrief> topTags;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class LiveUpdate {
        private long id;
        private String version;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ComponentType {
        private String type;
        private int count;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class TaskBrief {
        private long id;
        private String title;
        private Task.TaskPriority priority;
        private int percentageComplete;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class NextUpdate {
        private long id;
        private String title;
        private String version;
        private Update.UpdateStatus status;
        private LocalDateTime releaseDate;
        private int taskCount;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class NoteBrief {
        private long id;
        private String title;
        private LocalDateTime updatedAt;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class TagBrief {
        private long id;
        private String title;
        private String color;
        private int useCount;
    }
}
