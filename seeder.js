const { Book } = require("./models/Book");
const { Author } = require("./models/Author");
const { books, authors } = require("./data");
const connectToDb = require("./config/db");
require("dotenv").config();
connectToDb();

//ImportBooks
const importBooks = async () => {
  try {
    await Book.insertMany(books);
    console.log("Books Imported");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// Remove Books
const removeBooks = async () => {
  try {
    await Book.deleteMany();
    console.log("Books Removed");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-import") {
  importBooks();
} else if (process.argv[2] === "-remove") {
  removeBooks();
}
//ImportAuthor
const importAuthor = async () => {
  try {
    await Author.insertMany(authors);
    console.log("Author Imported");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// Remove Author
const removeAuthor = async () => {
  try {
    await Author.deleteMany();
    console.log("Author Removed");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-import-books") {
  importBooks();
} 
if (process.argv[2] === "-import-authors") {
  importAuthor();
} 
else if (process.argv[2] === "-remove-books") {
  removeBooks();
}
 else if (process.argv[2] === "-remove-author") {
  removeAuthor();
}
