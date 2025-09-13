const express = require('express');
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  searchBooks,
  addBook,
  updateBook,
  deleteBook,
  checkAvailability
} = require('../controllers/booksController');

router.get('/', getAllBooks);                  // List all books
router.get('/:id', getBookById);               // Get book by ID
router.get('/search/:query', searchBooks);     // Search by title/author
router.post('/', addBook);                     // Add new book
router.put('/:id', updateBook);                // Update book
router.delete('/:id', deleteBook);             // Delete book
router.get('/availability/:id', checkAvailability); // Check stock

module.exports = router;
