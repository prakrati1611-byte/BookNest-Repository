const db = require('../db/connection');

// Get all books
exports.getAllBooks = (req, res) => {
  db.query('SELECT * FROM books', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Get book by ID
exports.getBookById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM books WHERE Book_ID = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: 'Book not found' });
    res.json(results[0]);
  });
};

// Search books by title or author
exports.searchBooks = (req, res) => {
  const { query } = req.params;
  const sql = `
    SELECT * FROM books
    WHERE Title LIKE ? OR Author LIKE ?
  `;
  const searchTerm = `%${query}%`;
  db.query(sql, [searchTerm, searchTerm], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Add a new book
exports.addBook = (req, res) => {
  const { Title, Author, Genre, Quantity } = req.body;
  const sql = `INSERT INTO books (Title, Author, Genre, Quantity) VALUES (?, ?, ?, ?)`;
  db.query(sql, [Title, Author, Genre, Quantity], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Book added', id: result.insertId });
  });
};

// Update book details
exports.updateBook = (req, res) => {
  const { id } = req.params;
  const { Title, Author, Genre, Quantity } = req.body;
  const sql = `
    UPDATE books SET Title = ?, Author = ?, Genre = ?, Quantity = ?
    WHERE Book_ID = ?
  `;
  db.query(sql, [Title, Author, Genre, Quantity, id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Book updated' });
  });
};

// Delete a book
exports.deleteBook = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM books WHERE Book_ID = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Book deleted' });
  });
};

// Check availability
exports.checkAvailability = (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT Quantity FROM books WHERE Book_ID = ?
  `;
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: 'Book not found' });
    const available = results[0].Quantity > 0;
    res.json({ available });
  });
};
