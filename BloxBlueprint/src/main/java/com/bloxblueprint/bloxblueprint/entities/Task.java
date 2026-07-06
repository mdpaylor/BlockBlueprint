package com.bloxblueprint.bloxblueprint.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "estimated_hours")
    private double estimatedHours;

    @Column(name = "completed_hours")
    private double completedHours;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "due_date")
    private LocalDateTime dueDate;

    @Column(name = "completed_date")
    private Date completedDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "priority")
    private TaskPriority priority;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private TaskStatus status;

    @ManyToOne
    @JoinColumn(name = "experience_id", nullable = false)
    private Experience experience;

    @ManyToOne
    @JoinColumn(name = "update_id")
    private Update update;

    @OneToOne(mappedBy = "task", cascade = CascadeType.ALL)
    private Note note;

    @ManyToMany
    @JoinTable (
            name = "task_tags",
            joinColumns = @JoinColumn(name = "task_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private Set<Tag> tags = new HashSet<>();

    public enum TaskStatus {
        BACKLOG, TODO, IN_PROGRESS, COMPLETED, BLOCKED
    }

    public enum TaskPriority {
        LOW, MEDIUM, HIGH, CRITICAL
    }
}
