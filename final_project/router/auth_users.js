const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

// Verifica si el username es válido (si no existe ya)
const isValid = (username) => {
  return users.some(user => user.username === username);
}

// Verifica si el username y password coinciden
const authenticatedUser = (username, password) => {
  let validusers = users.filter((user) => {
    return (user.username === username && user.password === password);
  });
  return validusers.length > 0;
}

// Tarea 7: Login para usuarios registrados
regd_users.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(404).json({ message: "Error logging in" });
  }

  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign({
      data: password,
      username: username
    }, 'access', { expiresIn: 60 * 60 });

    req.session.authorization = {
      accessToken, username
    }
    
    // DEVOLVER EL TOKEN para usar con Bearer
    return res.status(200).json({ 
      message: "User successfully logged in",
      token: accessToken
    });
  } else {
    return res.status(208).json({ message: "Invalid Login. Check username and password" });
  }
});

// Tarea 8: Añadir o modificar una reseña de libro
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.query.review;
  const username = req.user.username; // Obtener del token decodificado

  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (!review) {
    return res.status(400).json({ message: "Review is required" });
  }

  // Añadir o modificar la reseña
  books[isbn].reviews[username] = review;

  return res.status(200).json({ 
    message: "Review successfully added/updated",
    reviews: books[isbn].reviews 
  });
});

// Tarea 9: Eliminar una reseña de libro
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.user.username; // Obtener del token decodificado

  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (books[isbn].reviews[username]) {
    delete books[isbn].reviews[username];
    return res.status(200).json({ 
      message: "Review successfully deleted",
      reviews: books[isbn].reviews 
    });
  } else {
    return res.status(404).json({ message: "Review not found for this user" });
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;