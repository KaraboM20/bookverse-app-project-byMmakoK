# BookVerse - Online Bookstore Backend

This project is the backend system for **BookVerse**, an online bookstore. The API is built using **Node.js**, **Express**, and **MongoDB**. It allows users to browse books, manage their profiles, and add books to their wishlist. It also provides admin-like functionality to add or remove books from the store.

## 📌 Project Purpose

The purpose of this project is to create a RESTful API that supports the main features of an online bookstore. It handles books, users, and wishlists, with full CRUD operations.

## ⚙️ Technologies Used

- Node.js  
- Express.js  
- MongoDB & Mongoose  
- dotenv  
- Postman (for testing)

## 📁 Features and Endpoints

### 📚 Book Management

Books can be created, read, updated, and deleted. Each book includes:

- `title`
- `author`
- `ISBN`
- `genre`
- `price`
- `stock quantity`

**Endpoints:**

- `POST /api/books` - Add a new book  
- `GET /api/books` - Get all books (or search by title, author, or genre)  
- `GET /api/books/:id` - Get a book by ID  
- `PUT /api/books/:id` - Update a book  
- `DELETE /api/books/:id` - Delete a book

---

### 👤 User Management

Users can be created, viewed, updated, and deleted. Each user includes:

- `username`
- `email`
- `password` 


**Endpoints:**

- `POST /api/users` - Create a new user  
- `GET /api/users/:id` - Get user details  
- `PUT /api/users/:id` - Update user details  
- `DELETE /api/users/:id` - Delete a user

---

### ❤️ Wishlist Management

Users can manage their wishlist by adding or removing books.

**Endpoints:**

- `POST /api/users/:id/wishlist` - Add a book to wishlist  
- `DELETE /api/users/:id/wishlist/:bookId` - Remove a book from wishlist

---

## 🔐 Asynchronous and Error Handling

All database operations are handled using `async/await`. Proper error messages are returned if something goes wrong (e.g., book not found, user does not exist).

---

## 🧪 Testing with Postman

Postman was used to test each endpoint. A collection of test cases was created for:

- Book CRUD operations  
- User CRUD operations  
- Wishlist management  

Each request is documented with example input and response.

---

## 📦 Project Setup

The project link:
