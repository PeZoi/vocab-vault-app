package com.example.vocab_vault_be.entity;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;

@Getter
@Setter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class Auditable {
    @Column(name = "create_at", nullable = false, updatable = false)
    @CreatedDate
    private Instant createAt;

    @Column(name = "update_at", insertable = false)
    @LastModifiedDate
    private Instant updatedAt;
}
