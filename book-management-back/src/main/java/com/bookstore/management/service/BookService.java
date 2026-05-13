package com.bookstore.management.service;

import com.bookstore.management.dto.BookCreateRequest;
import com.bookstore.management.dto.BookResponse;
import com.bookstore.management.dto.BookUpdateRequest;
import java.util.List;

public interface BookService {

    List<BookResponse> getBooks(String keyword);

    BookResponse getBook(Long id);

    BookResponse createBook(BookCreateRequest request);

    BookResponse updateBook(Long id, BookUpdateRequest request);

    void deleteBook(Long id);
}
