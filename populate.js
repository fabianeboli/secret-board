#! /usr/bin/env node

console.log(
  "This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true"
);
require('dotenv').config();
var async = require("async");
var User = require("./models/User.model.js");
var Messages = require("./models/Message.model.js");

const uri = process.env.DB_URI;

var mongoose = require("mongoose");
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const users = [],
  messages = [];

const userCreate = (
  firstName,
  lastName,
  username,
  password,
 
  cb
) => {
  const UserDetail = {
    firstName,
    lastName,
    username,
    password,
   
  };
  const user = new User(UserDetail);
  user.save(error => {
    if (error) console.error("error:", error);
    users.push(user);
    cb(null, user);
  });
};

const messageCreate = (author, title, message, cb) => {
  const messageDetail = { author, title, message };
  const newMessage = new Messages(messageDetail);
  newMessage.save(error => {
    if (error) console.log("error", error);
    messages.push(newMessage);
    console.log("New Message", newMessage);
    cb(null, newMessage);
  });
};

// function createGenreAuthors(cb) {
//   async.series(
//     [
//       function(callback) {
//         authorCreate("Patrick", "Rothfuss", "1973-06-06", false, callback);
//       },
//       function(callback) {
//         authorCreate("Ben", "Bova", "1932-11-8", false, callback);
//       },
//       function(callback) {
//         authorCreate("Isaac", "Asimov", "1920-01-02", "1992-04-06", callback);
//       },
//       function(callback) {
//         authorCreate("Bob", "Billings", false, false, callback);
//       },
//       function(callback) {
//         authorCreate("Jim", "Jones", "1971-12-16", false, callback);
//       },
//       function(callback) {
//         genreCreate("Fantasy", callback);
//       },
//       function(callback) {
//         genreCreate("Science Fiction", callback);
//       },
//       function(callback) {
//         genreCreate("French Poetry", callback);
//       }
//     ],
//     // optional callback
//     cb
//   );
// }

const createMessages = cb => {
  async.series(
    [
      callback => {
    messageCreate("John", "A simple message", "Lorum ipsum is Awesome", callback);
      },
      callback => {
        messageCreate("Mary", "A second simple message", "Lorum ipsum is Super Awesome", callback);
      },
      callback => {
        messageCreate("Sarah", "A third simple message", "Lorum ipsum is Ultra Awesome", callback);
      }
    ],
    cb
  );
};

function createUsers(cb) {
  async.parallel(
    [
      callback => {
        userCreate(
            "John",
            "Smith",
            "JohnSmith",
            "notSafe",
          callback
        );
      },
      callback => {
        userCreate(
            "Mary",
            "Green",
            "BloodyMary",
            "Edgelord",
          callback
        );
      },
      callback => {
        userCreate(
            "Sarah",
            "McMuffin",
            "SarahTheHorse",
            "horsehorse",
          callback
        );
      }
    ],
    // optional callback
    cb
  );
}

// function createBookInstances(cb) {
//   async.parallel(
//     [
//       function(callback) {
//         bookInstanceCreate(
//           books[0],
//           "London Gollancz, 2014.",
//           false,
//           "Available",
//           callback
//         );
//       },
//       function(callback) {
//         bookInstanceCreate(
//           books[1],
//           " Gollancz, 2011.",
//           false,
//           "Loaned",
//           callback
//         );
//       },
//       function(callback) {
//         bookInstanceCreate(
//           books[2],
//           " Gollancz, 2015.",
//           false,
//           false,
//           callback
//         );
//       },
//       function(callback) {
//         bookInstanceCreate(
//           books[3],
//           "New York Tom Doherty Associates, 2016.",
//           false,
//           "Available",
//           callback
//         );
//       },
//       function(callback) {
//         bookInstanceCreate(
//           books[3],
//           "New York Tom Doherty Associates, 2016.",
//           false,
//           "Available",
//           callback
//         );
//       },
//       function(callback) {
//         bookInstanceCreate(
//           books[3],
//           "New York Tom Doherty Associates, 2016.",
//           false,
//           "Available",
//           callback
//         );
//       },
//       function(callback) {
//         bookInstanceCreate(
//           books[4],
//           "New York, NY Tom Doherty Associates, LLC, 2015.",
//           false,
//           "Available",
//           callback
//         );
//       },
//       function(callback) {
//         bookInstanceCreate(
//           books[4],
//           "New York, NY Tom Doherty Associates, LLC, 2015.",
//           false,
//           "Maintenance",
//           callback
//         );
//       },
//       function(callback) {
//         bookInstanceCreate(
//           books[4],
//           "New York, NY Tom Doherty Associates, LLC, 2015.",
//           false,
//           "Loaned",
//           callback
//         );
//       },
//       function(callback) {
//         bookInstanceCreate(books[0], "Imprint XXX2", false, false, callback);
//       },
//       function(callback) {
//         bookInstanceCreate(books[1], "Imprint XXX3", false, false, callback);
//       }
//     ],
//     // Optional callback
//     cb
//   );
// }

async.series(
  [createUsers, createMessages],
  // Optional callback
  function(err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("Results: " + results);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
