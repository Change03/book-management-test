package com.bookstore.management.config;

import com.bookstore.management.entity.Book;
import com.bookstore.management.repository.BookRepository;
import java.util.List;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initBooks(BookRepository bookRepository) {
        return args -> {
            if (bookRepository.count() > 0) {
                return;
            }

            bookRepository.saveAll(List.of(
                    Book.builder()
                            .title("작은 책방의 밤")
                            .author("한서윤")
                            .price(14800)
                            .available(true)
                            .build(),
                    Book.builder()
                            .title("도시와 문장들")
                            .author("문지호")
                            .price(16500)
                            .available(true)
                            .build(),
                    Book.builder()
                            .title("커피가 식기 전에 읽는 소설")
                            .author("서해린")
                            .price(13200)
                            .available(false)
                            .build(),
                    Book.builder()
                            .title("초록 표지의 여행")
                            .author("윤다원")
                            .price(19000)
                            .available(true)
                            .build()
            ));
        };
    }
}
