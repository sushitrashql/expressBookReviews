const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Tarea 6: Registrar nuevo usuario
public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) {
      users.push({ "username": username, "password": password });
      return res.status(200).json({ message: "User successfully registered. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user." });
});

// Tarea 1: Obtener la lista de libros disponibles
public_users.get('/', function (req, res) {
  return res.status(200).json(books);
});

// Tarea 2: Obtener detalles del libro por ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.status(200).json(books[isbn]);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

// Tarea 3: Obtener libros por autor
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  let booksByAuthor = [];

  for (let key in books) {
    if (books[key].author.toLowerCase() === author.toLowerCase()) {
      booksByAuthor.push(books[key]);
    }
  }

  if (booksByAuthor.length > 0) {
    return res.status(200).json(booksByAuthor);
  } else {
    return res.status(404).json({ message: "No books found by this author" });
  }
});

// Tarea 4: Obtener libros por título
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  let booksByTitle = [];

  for (let key in books) {
    if (books[key].title.toLowerCase().includes(title.toLowerCase())) {
      booksByTitle.push(books[key]);
    }
  }

  if (booksByTitle.length > 0) {
    return res.status(200).json(booksByTitle);
  } else {
    return res.status(404).json({ message: "No books found with this title" });
  }
});

// Tarea 5: Obtener reseñas del libro
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.status(200).json(books[isbn].reviews);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

module.exports.general = public_users;