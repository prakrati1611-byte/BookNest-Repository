const db = require('../db/connection');

// Get all members
exports.getAllMembers = (req, res) => {
  db.query('SELECT * FROM users WHERE Role = "member"', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Get member by ID
exports.getMemberById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM users WHERE Enrolment_ID = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: 'Member not found' });
    res.json(results[0]);
  });
};

// Search members by name or email
exports.searchMembers = (req, res) => {
  const { query } = req.params;
  const sql = `
    SELECT * FROM users
    WHERE Role = "member" AND (Name LIKE ? OR Email LIKE ?)
  `;
  const searchTerm = `%${query}%`;
  db.query(sql, [searchTerm, searchTerm], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Add a new member
exports.addMember = (req, res) => {
  const { Name, Email, Enrolment_ID } = req.body;
  const sql = `INSERT INTO users (Name, Email, Enrolment_ID, Role) VALUES (?, ?, ?, "member")`;
  db.query(sql, [Name, Email, Enrolment_ID], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Member added', id: result.insertId });
  });
};

// Update member details
exports.updateMember = (req, res) => {
  const { id } = req.params;
  const { Name, Email } = req.body;
  const sql = `UPDATE users SET Name = ?, Email = ? WHERE Enrolment_ID = ?`;
  db.query(sql, [Name, Email, id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Member updated' });
  });
};

// Delete member
exports.deleteMember = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM users WHERE Enrolment_ID = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Member deleted' });
  });
};

// Get borrowing history
exports.getMemberLogs = (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT access_logs.*, books.Title
    FROM access_logs
    JOIN books ON access_logs.Book_ID = books.Book_ID
    WHERE access_logs.Enrolment_ID = ?
    ORDER BY lend_stamp DESC
  `;
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};
