package com.bloxblueprint.bloxblueprint.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "monetizations")
public class Monetization {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "m_type")
    private MonetizationType type;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private MonetizationStatus status = MonetizationStatus.IDEA;

    @Column(name = "price")
    private Long price;

    @ManyToOne
    @JoinColumn(name = "experience_id", nullable = false)
    private Experience experience;

    @ManyToOne
    @JoinColumn(name = "component_id")
    private Component component;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public enum MonetizationType {
        GAMEPASS, DEVELOPER_PRODUCT
    }

    public enum MonetizationStatus {
        IDEA,  IN_DEVELOPMENT,  READY,  LIVE,  PAUSED
    }
}
