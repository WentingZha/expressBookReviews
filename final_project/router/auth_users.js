const express = require('express');
const token = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [
    {"username":"zhawenting","password":"123"}
];

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

const isValid = (username)=>{ //returns boolean
    let filtered_users = authenticatedUser.filter((user) => book.username === username);
    return filtered_users.length > 0;
}

const authenticatedUser = (username,password)=>{ //returns boolean
    let validusers = users.filter((user) => {
        return user.username === username && user.password === password;
      });
      return validusers.length > 0;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const user = req.body.user;
    if (!user) {
        return res.status(404).json({ message: "Body Empty" });
    }
    // Generate JWT access token
    let accessToken = token.sign({
        data: user
    }, 'access', { expiresIn: 60 * 60 });

    // Store access token in session
    req.session.authorization = {
        accessToken
    }
    return res.status(200).send("User successfully logged in");
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  let filtered_books = bookList.filter((user) => user.isbn === isbn);
  
  if (filtered_books.length > 0) {
      // Select the first matching user and update attributes if provided
      var filtered_book = filtered_books[0];
      let bookList1 = bookList.filter((book) => book.isbn != isbn);
      filtered_book.reviews = {
        "date":"2/2/2025",
        "reviewer":"zhawenting",
        "commanded":"Chapter2"}
      bookList1.push(filtered_book);
      
      // Send success message indicating the user has been updated
      res.send(bookList1);
  } else {
      // Send error message if no user found
      res.send("Unable to find book!");
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    let filtered_books = bookList.filter((user) => user.isbn === isbn);
    
    if (filtered_books.length > 0) {
        // Select the first matching user and update attributes if provided
        var filtered_book = filtered_books[0];
        let bookList1 = bookList.filter((book) => book.isbn != isbn);
        filtered_book.reviews = {
          "date":"2/2/2025",
          "reviewer":"zhawenting",
          "commanded":"Chapter2"}
        bookList1.push(filtered_book);
        
        // Send success message indicating the user has been updated
        res.send(bookList1);
    } else {
        // Send error message if no user found
        res.send("Unable to find book!");
    }
  });


  regd_users.delete("auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    var bookList1 = bookList.filter((book) => book.isbn === isbn);
    bookList1[0].reviews = "";
    res.send(bookList1);
});


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
