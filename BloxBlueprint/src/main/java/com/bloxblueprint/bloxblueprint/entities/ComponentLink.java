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

    @ManyToOne
    @JoinColumn(name = "from_component_id")
    private Component fromComponent;

    @ManyToOne
    @JoinColumn(name = "to_component_id")
    private Component toComponent;

    @Enumerated(EnumType.STRING)
    @Column(name = "relationship_type")
    private ComponentLinkRelationshipType relationshipType;

    public enum ComponentLinkRelationshipType {
        USES, CALLS, REQUIRES, PARENTS, REFERENCES
    }
}
