# BookVerse - Online Bookstore Backend

This project is the backend system for **BookVerse**, an online bookstore. The API is built using **Node.js**, **Express**, and **MongoDB**. It allows users to browse books, manage their profiles, and add books to their wishlist. It also provides admin-like functionality to add or remove books from the store.

## 📌 Project Purpose

The purpose of this project is to create a RESTful API that supports the main features of an online bookstore. It handles books, users, and wishlists, with full CRUD operations.

## ⚙️ Technologies Used

- Node.js  
- Express.js  
- MongoDB & Mongoose  
- dotenv  
  

## 📁 Features

### 📚 Book Management

Books can be created, read, updated, and deleted. Each book includes a title, author, ISBN, genre, price, and stock quantity.

---

### 👤 User Management

Users can be created, viewed, updated, and deleted. Each user includes a username, email, password, and a wishlist (an array of book IDs).

---

### ❤️ Wishlist Management

Users can manage their wishlist by adding or removing books they are interested in.

---

## 🔐 Asynchronous and Error Handling

All database operations are handled using `async/await`. Proper error messages are returned if something goes wrong (e.g., book not found, user does not exist).

---

## 🧪 Testing with Postman

Postman was used to test each feature. A collection of test cases was created for:

- Book operations  
- User operations  
- Wishlist management  

Each request was documented with example input and response.

---

## 📦 The Project Link: https://bookeverse-app-project-bykarabo.netlify.app/
