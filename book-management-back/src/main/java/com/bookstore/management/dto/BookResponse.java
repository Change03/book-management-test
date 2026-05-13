package com.bookstore.management.dto;

import com.bookstore.management.entity.Book;

public record BookResponse(
        Long id,
        String title,
        String author,
        Integer price,
        Boolean available
) {

    public static BookResponse from(Book book) {
        return new BookResponse(
                book.getId(),
                book.getTitle(),
                book.getAuthor(),
                book.getPrice(),
                book.getAvailable()
        );
    }
}
