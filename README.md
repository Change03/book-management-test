# 소규모 서점 온라인 도서 관리 시스템

Spring Boot 3.x와 Next.js 15 App Router를 사용해 만든 소규모 서점용 온라인 도서 관리 시스템입니다. 도서 목록 조회, 제목/저자 검색, 도서 등록, 상세 조회, 수정, 삭제 기능을 제공합니다.

## 프로젝트 구조

```text
book-management/
├── book-management-back/
│   ├── gradle/
│   ├── src/main/java/com/bookstore/management/
│   │   ├── config/
│   │   ├── controller/
│   │   ├── dto/
│   │   ├── entity/
│   │   ├── exception/
│   │   ├── repository/
│   │   └── service/
│   ├── src/main/resources/application.yml
│   ├── build.gradle
│   ├── settings.gradle
│   ├── gradlew
│   └── gradlew.bat
├── book-management-front/
│   ├── src/app/
│   │   ├── books/[id]/page.tsx
│   │   ├── books/[id]/edit/page.tsx
│   │   ├── register/page.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   └── error.tsx
│   ├── src/components/
│   ├── src/lib/api.ts
│   ├── src/types/book.ts
│   ├── package.json
│   └── .env.local
└── README.md
```

## 기술 스택

### 백엔드

| 구분 | 내용 |
| --- | --- |
| 언어 | Java 21 |
| 프레임워크 | Spring Boot 3.x |
| 웹 | Spring Web |
| 데이터 | Spring Data JPA, H2 Database |
| 검증 | Spring Validation |
| 편의 도구 | Lombok |
| 빌드 도구 | Gradle |

### 프론트엔드

| 구분 | 내용 |
| --- | --- |
| 프레임워크 | Next.js 15+ |
| UI 라이브러리 | React 19 |
| 언어 | TypeScript |
| 라우팅 | App Router |
| 스타일 | Tailwind CSS |

## 실행 방법

먼저 프로젝트 폴더로 이동합니다.

```bash
cd book-management
```

### 백엔드 실행

```bash
cd book-management-back && ./gradlew bootRun
```

Windows PowerShell에서는 다음 명령을 사용할 수 있습니다.

```powershell
cd book-management-back
.\gradlew.bat bootRun
```

백엔드 실행 주소는 `http://localhost:8080`입니다.

### 프론트엔드 실행

새 터미널에서 프로젝트 폴더로 이동한 뒤 실행합니다.

```bash
cd book-management-front && npm install && npm run dev
```

프론트엔드 실행 주소는 `http://localhost:3000`입니다.

## 환경 변수 설정

프론트엔드의 `book-management-front/.env.local` 파일에 다음 값이 설정되어 있습니다.

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## H2 접속 정보

| 항목 | 값 |
| --- | --- |
| 접속 주소 | `http://localhost:8080/h2-console` |
| JDBC URL | `jdbc:h2:mem:bookdb` |
| 사용자명 | `sa` |
| 비밀번호 | 없음 |

## API 명세

| 기능 | 메서드 | 경로 | 요청 본문 | 성공 응답 | 실패 응답 |
| --- | --- | --- | --- | --- | --- |
| 전체 도서 목록 조회 | GET | `/api/books` | 없음 | 200 | - |
| 제목/저자 검색 | GET | `/api/books?q=keyword` | 없음 | 200 | - |
| 도서 단건 조회 | GET | `/api/books/{id}` | 없음 | 200 | 404 |
| 도서 등록 | POST | `/api/books` | 도서 등록 정보 | 201 | 400 |
| 도서 수정 | PUT | `/api/books/{id}` | 도서 수정 정보 | 200 | 400, 404 |
| 도서 삭제 | DELETE | `/api/books/{id}` | 없음 | 204 | 404 |

### 도서 등록 요청 예시

```json
{
  "title": "작은 책방의 밤",
  "author": "한서윤",
  "price": 14800,
  "available": true
}
```

### 도서 수정 요청 예시

```json
{
  "title": "작은 책방의 밤 개정판",
  "author": "한서윤",
  "price": 15800,
  "available": false
}
```

### 도서 응답 예시

```json
{
  "id": 1,
  "title": "작은 책방의 밤",
  "author": "한서윤",
  "price": 14800,
  "available": true
}
```

### 오류 응답 예시

```json
{
  "status": 404,
  "error": "NOT_FOUND",
  "message": "도서를 찾을 수 없습니다. id=999",
  "path": "/api/books/999",
  "timestamp": "2026-05-12T14:48:06.8024481",
  "validation": null
}
```

## 주요 구현 내용

- 백엔드는 Controller, Service interface, ServiceImpl, Repository, DTO, Entity, Config, Exception Handler 계층으로 구성했습니다.
- Controller는 Repository를 직접 호출하지 않고 Service 계층을 통해 처리합니다.
- 의존성 주입은 생성자 주입을 사용했습니다.
- 없는 도서 조회, 수정, 삭제 요청은 404 JSON 응답으로 처리합니다.
- Validation 실패는 400 JSON 응답으로 처리합니다.
- `/api/**` 경로에 대해 `http://localhost:3000` CORS를 허용합니다.
- CommandLineRunner로 시연용 도서 4개를 초기 등록합니다.
- 프론트엔드는 목록, 상세, 등록, 수정 페이지를 App Router 구조로 구현했습니다.
- 검색, 등록, 수정, 삭제 동작은 백엔드 API와 연동됩니다.

## 시연 순서

1. 백엔드를 실행합니다.
2. H2 콘솔에서 초기 도서 데이터가 생성되었는지 확인합니다.
3. 프론트엔드를 실행하고 `http://localhost:3000`에 접속합니다.
4. 목록 화면에서 초기 도서 카드와 대출 가능 여부 배지를 확인합니다.
5. `등록` 화면에서 새 도서를 등록하고 목록으로 이동되는지 확인합니다.
6. 도서 카드를 클릭해 상세 페이지로 이동합니다.
7. 상세 페이지에서 `수정`을 눌러 도서 정보를 변경합니다.
8. 목록 화면에서 제목 또는 저자 검색을 수행합니다.
9. 상세 페이지에서 도서를 삭제하고 목록에서 사라졌는지 확인합니다.

## 실행 확인 주소

- 백엔드: `http://localhost:8080`
- 프론트엔드: `http://localhost:3000`
- H2 콘솔: `http://localhost:8080/h2-console`
