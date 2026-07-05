package com.bloxblueprint.bloxblueprint.entities;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "component_links")
public class ComponentLink {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "from_component_id")
    private Long fromComponentId;

    @Column(name = "to_component_id")
    private Long toComponentId;

    @Enumerated(EnumType.STRING)
    @Column(name = "relationship_type")
    private String relationshipType;
}
