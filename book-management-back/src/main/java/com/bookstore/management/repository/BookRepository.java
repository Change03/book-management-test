package com.bookstore.management.repository;

import com.bookstore.management.entity.Book;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {

    List<Book> findAllByOrderByIdDesc();

    List<Book> findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCaseOrderByIdDesc(
            String titleKeyword,
            String authorKeyword
    );
}
