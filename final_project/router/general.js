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
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
      if (!doesExist(username)) {
        users.push({ "username": username, "password": password });
        return res.status(200).json({ message: "User successfully registered. Now you can login" });
      } else {
        return res.status(404).json({ message: "User already exists!" });
      }
    }
    return res.status(404).json({ message: "Unable to register user." });
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    
    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
        resolve("Promise resolved")
        },2000)})

    console.log("Before calling promise");

    myPromise.then((successMessage) => {
        res.send(JSON.stringify({bookList}, null));
    })
    console.log("After calling promise");
   
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    var filtered_books;
    let myPromise = new Promise((resolve,reject) => {
        const isbn = req.params.isbn;
        filtered_books = bookList.filter((book) => book.isbn === isbn);
        setTimeout(() => {
            resolve("Promise resolved")
        },2000)})

    console.log("Before calling promise");

    myPromise.then((successMessage) => {
        res.send(filtered_books);
    })
    console.log("After calling promise");
   

 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    var filtered_books;
    let myPromise = new Promise((resolve,reject) => {

        const author = req.params.author;
        filtered_books = bookList.filter((book) => book.author === author);
        setTimeout(() => {
            resolve("Promise resolved")
        },2000)})

    console.log("Before calling promise");

    myPromise.then((successMessage) => {
      
        res.send(filtered_books);
    })
    console.log("After calling promise");

});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    var filtered_books;
    let myPromise = new Promise((resolve,reject) => {
        const title = req.params.title;
        filtered_books = bookList.filter((book) => book.title.includes(title));
        setTimeout(() => {
            resolve("Promise resolved")
        },2000)})

    console.log("Before calling promise");

    myPromise.then((successMessage) => {
        res.send(filtered_books);
    })
    console.log("After calling promise");
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    
    var filtered_books;
    let myPromise = new Promise((resolve,reject) => {
        const isbn = req.params.isbn;
        filtered_books = bookList.filter((book) => book.isbn === isbn);
        setTimeout(() => {
           
        },2000)})

    console.log("Before calling promise");

    myPromise.then((successMessage) => {
        res.send(filtered_books[0].reviews);
    })
    console.log("After calling promise");

   
});

module.exports.general = public_users;
