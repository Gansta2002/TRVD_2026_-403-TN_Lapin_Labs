# Лабораторна робота №2
## Тема: Архітектура системи та технологічний стек

---

## 1. Технологічний стек

### Back-end:
Node.js (Express)

### Front-end:
React

### База даних:
PostgreSQL

### DevOps:
GitHub (зберігання коду)

### Обґрунтування:
Node.js обрано через простоту розробки та популярність для вебдодатків.  
React використовується для створення динамічного інтерфейсу.  
PostgreSQL забезпечує надійне зберігання структурованих даних.  
GitHub використовується для контролю версій.

---

## 2. C4 Model

### Рівень 1: Context Diagram
Система: Вебдодаток бібліотеки  
Користувачі:
- Читач
- Адміністратор  

Взаємодія:
Користувач працює через браузер із системою.

---

### Рівень 2: Container Diagram

Контейнери:
- Frontend (React)
- Backend API (Node.js)
- Database (PostgreSQL)

Взаємодія:
Frontend → Backend (HTTP)  
Backend → Database (SQL)

---

### Рівень 3: Component Diagram (Backend)

Компоненти:
- AuthController
- BookController
- UserService
- BookService
- Database Layer

---

## 3. База даних (ER-модель)

Сутності:

User:
- id (PK)
- name
- email

Book:
- id (PK)
- title
- author

Order:
- id (PK)
- user_id (FK)
- book_id (FK)

Зв'язки:
- User 1:N Order
- Book 1:N Order

---

## 4. Відповіді на питання

C4 модель — це спосіб опису архітектури:
- Context — загальна картина
- Container — частини системи
- Component — внутрішня структура

---

SQL vs NoSQL:
- SQL — таблиці, чітка структура
- NoSQL — гнучка структура

---

CAP теорема:
Система не може одночасно гарантувати:
- узгодженість
- доступність
- стійкість до розділення

---

Мікросервіси vs Моноліт:
Мікросервіси:
+ масштабованість
- складність

Моноліт:
+ простота
- складно масштабувати
