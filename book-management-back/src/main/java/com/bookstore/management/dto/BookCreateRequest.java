package com.bookstore.management.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;

public record BookCreateRequest(
        @NotBlank(message = "도서 제목은 필수입니다.")
        String title,

        @NotBlank(message = "저자는 필수입니다.")
        String author,

        @PositiveOrZero(message = "가격은 0원 이상이어야 합니다.")
        Integer price,

        Boolean available
) {
}
