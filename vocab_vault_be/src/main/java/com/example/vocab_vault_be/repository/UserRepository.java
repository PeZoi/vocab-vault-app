package com.example.vocab_vault_be.repository;

import com.example.vocab_vault_be.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query("select u from User u WHERE u.status <> 'DELETED' OR u.status IS NULL")
    List<User> findAllUsers();
    @Modifying
    @Query("update User u set u.status = 'DELETED' WHERE u.id = ?1")
    void deleteUser(Long id);

    boolean existsByEmail(String email);
    boolean existsByEmailAndType(String email, String type);
    Optional<User> findByEmail(String email);

    @Modifying
    @Query("update User u set u.enabled = true, u.verificationCode = null where u.id = ?1")
    void enable(Long id);

    User findUserByResetPasswordToken(String token);
}
