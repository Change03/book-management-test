package com.bookstore.management.service;

import com.bookstore.management.dto.BookCreateRequest;
import com.bookstore.management.dto.BookResponse;
import com.bookstore.management.dto.BookUpdateRequest;
import com.bookstore.management.entity.Book;
import com.bookstore.management.exception.BookNotFoundException;
import com.bookstore.management.repository.BookRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;

    @Override
    public List<BookResponse> getBooks(String keyword) {
        List<Book> books;
        if (StringUtils.hasText(keyword)) {
            String trimmedKeyword = keyword.trim();
            books = bookRepository.findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCaseOrderByIdDesc(
                    trimmedKeyword,
                    trimmedKeyword
            );
        } else {
            books = bookRepository.findAllByOrderByIdDesc();
        }

        return books.stream()
                .map(BookResponse::from)
                .toList();
    }

    @Override
    public BookResponse getBook(Long id) {
        Book book = findBook(id);
        return BookResponse.from(book);
    }

    @Override
    @Transactional
    public BookResponse createBook(BookCreateRequest request) {
        Book book = Book.builder()
                .title(request.title().trim())
                .author(request.author().trim())
                .price(request.price())
                .available(request.available())
                .build();

        return BookResponse.from(bookRepository.save(book));
    }

    @Override
    @Transactional
    public BookResponse updateBook(Long id, BookUpdateRequest request) {
        Book book = findBook(id);
        book.update(
                request.title().trim(),
                request.author().trim(),
                request.price(),
                request.available()
        );
        return BookResponse.from(book);
    }

    @Override
    @Transactional
    public void deleteBook(Long id) {
        Book book = findBook(id);
        bookRepository.delete(book);
    }

    private Book findBook(Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new BookNotFoundException(id));
    }
}
