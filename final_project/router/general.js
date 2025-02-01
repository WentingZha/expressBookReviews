const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

let bookList = [

    {"author": "Chinua Achebe","title": "Things Fall Apart", "isbn":"1","reviews": {"date":"1/2/2025","reviewer":"zhawenting","commanded":"Chapter1"} },
    {"author": "Hans Christian Andersen","title": "Fairy tales", "reviews": {} },
    {"author": "Dante Alighieri","title": "The Divine Comedy", "reviews": {} },
    {"author": "Unknown","title": "The Epic Of Gilgamesh", "reviews": {} },
    {"author": "Unknown","title": "The Book Of Job", "reviews": {} },
    {"author": "Unknown","title": "One Thousand and One Nights", "reviews": {} },
    {"author": "Unknown","title": "Nj\u00e1l's Saga", "reviews": {} },
    {"author": "Jane Austen","title": "Pride and Prejudice", "reviews": {} },
    {"author": "Honor\u00e9 de Balzac","title": "Le P\u00e8re Goriot", "reviews": {} },
    {"author": "Samuel Beckett","title": "Molloy, Malone Dies, The Unnamable, the trilogy", "reviews": {} }
]

public_users.post("/register", (req,res) => {
    if (req.session.authorization) { // Get the authorization object stored in the session
        token = req.session.authorization['accessToken']; // Retrieve the token from authorization object
        jwt.verify(token, "access", (err, user) => { // Use JWT to verify token
          if (!err) {
            req.user = user;
            next();
          } else {
            return res.status(403).json({ message: "User not authenticated" });
          }
        });
      } else {
        return res.status(403).json({ message: "User not logged in" });
      }
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    res.send(JSON.stringify({bookList}, null));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    let filtered_books = bookList.filter((book) => book.isbn === isbn);
    res.send(filtered_books);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    let filtered_books = bookList.filter((book) => book.author === author);
    res.send(filtered_books);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    let filtered_books = bookList.filter((book) => book.title.includes(title));
    res.send(filtered_books);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    console.log(isbn)
    let filtered_books = bookList.filter((book) => book.isbn === isbn);
    res.send(filtered_books[0].reviews);
});

module.exports.general = public_users;
