import express from "express";
import { Book } from "../models/bookModel.js";
const router = express.Router();

// Route for saving a new book
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).json({ message: "Fill all the required fields" });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook); // using the model which is created in "./models/bookModel.js"

    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//Route for getting all books from database
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({ count: books.length, data: books });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Route for getting one book from database by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const books = await Book.findById(id);
    return res.status(200).json({ count: books.length, data: books });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Router for updating the book
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).json({ message: "Fill all the required fields." });
    }

    const { id } = req.params;

    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({
        message: "The Book which you are trying to update, is not added yet.",
      });
    }

    return res
      .status(200)
      .json({ message: "Book Updated Successfully.", updatedBookInfo: result });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Route for deleting book by id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // console.log(`Deleting book with ID: ${id}`); // Log before deletion

    const result = await Book.findByIdAndDelete(id);

    // console.log(`Deletion result: ${result}`); // Log after deletion

    if (!result) {
      return res.status(404).json({
        message:
          "The Book which you are trying to delete is not added yet or might have been deleted already",
      });
    }

    return res.status(200).json({ message: "Book Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router; //can be imported using any name as it is default export
