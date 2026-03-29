# Лабораторна робота №3
## Тема: Реалізація API та бізнес-логіки

---

## 1. Data Access Layer

Використано ORM: Sequelize

Створено сутності:

User:
- id
- name
- email

Book:
- id
- title
- author

Order:
- id
- userId
- bookId

---

## 2. Service Layer

Реалізовано сервіси:
- UserService
- BookService
- OrderService

Сервіси відповідають за бізнес-логіку та взаємодію з базою даних.

---

## 3. REST API

Методи:

GET /books — отримати список книг  
GET /books/:id — отримати одну книгу  
POST /books — створити книгу  
PUT /books/:id — оновити книгу  
DELETE /books/:id — видалити книгу  

Статус-коди:
- 200 OK
- 201 Created
- 404 Not Found
- 400 Bad Request

---

## 4. DTO

BookDTO:
- id
- title
- author

DTO використовується для передачі даних клієнту замість сутностей БД.

---

## 5. Приклади коду

### DTO
```js
class BookDTO {
  constructor(book) {
    this.id = book.id;
    this.title = book.title;
    this.author = book.author;
  }
}
