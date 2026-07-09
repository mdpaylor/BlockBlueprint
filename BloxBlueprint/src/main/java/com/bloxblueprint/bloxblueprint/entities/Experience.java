package com.bloxblueprint.bloxblueprint.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

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
@Table(name = "experiences")
public class Experience {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false, nullable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "experience")
    private Set<Component> components =  new HashSet<>();

    @OneToMany(mappedBy = "experience")
    private Set<Task> tasks =  new HashSet<>();

    @OneToMany(mappedBy = "experience")
    private Set<Update>  updates = new HashSet<>();

    @OneToMany(mappedBy = "experience")
    private Set<Note> notes = new HashSet<>();

    @OneToMany(mappedBy = "experience")
    private Set<Monetization> monetizations = new HashSet<>();
}
