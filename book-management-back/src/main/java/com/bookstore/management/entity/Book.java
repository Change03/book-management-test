package com.bookstore.management.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table(name = "books")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String author;

    private Integer price;

    @Column(nullable = false)
    private Boolean available = true;

    @Builder
    public Book(String title, String author, Integer price, Boolean available) {
        this.title = title;
        this.author = author;
        this.price = price;
        this.available = available != null ? available : true;
    }

    public void update(String title, String author, Integer price, Boolean available) {
        this.title = title;
        this.author = author;
        this.price = price;
        this.available = available;
    }
}
