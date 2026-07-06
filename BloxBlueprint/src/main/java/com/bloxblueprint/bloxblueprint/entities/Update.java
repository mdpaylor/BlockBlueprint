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
@Table(name = "updates")
public class Update {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "u_version")
    private String version;

    @Column(name = "release_date")
    private LocalDateTime releaseDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private UpdateStatus status;

    @Column(name = "createdAt")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "experience_id", nullable = false)
    private Experience experience;

    public enum UpdateStatus {
        PLANNING, IN_PROGRESS, RELEASED
    }
}
