package com.bookstore.management.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public record BookUpdateRequest(
        @NotBlank(message = "도서 제목은 필수입니다.")
        String title,

        @NotBlank(message = "저자는 필수입니다.")
        String author,

        @PositiveOrZero(message = "가격은 0원 이상이어야 합니다.")
        Integer price,

        @NotNull(message = "대출 가능 여부는 필수입니다.")
        Boolean available
) {
}
