const db = require('../db/connection');

// Get all logs
exports.getAllLogs = (req, res) => {
  db.query('SELECT * FROM access_logs', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Get log by ID
exports.getLogById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM access_logs WHERE Log_ID = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: 'Log not found' });
    res.json(results[0]);
  });
};

// Get logs by member
exports.getLogsByMember = (req, res) => {
  const { memberId } = req.params;
  db.query('SELECT * FROM access_logs WHERE Enrolment_ID = ?', [memberId], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Get logs by book
exports.getLogsByBook = (req, res) => {
  const { bookId } = req.params;
  db.query('SELECT * FROM access_logs WHERE Book_ID = ?', [bookId], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Add new log (issue book)
exports.addLog = (req, res) => {
  const { Book_ID, Enrolment_ID, lend_stamp } = req.body;
  const query = `
    INSERT INTO access_logs (Book_ID, Enrolment_ID, lend_stamp)
    VALUES (?, ?, ?)
  `;
  db.query(query, [Book_ID, Enrolment_ID, lend_stamp], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Log added', id: result.insertId });
  });
};

// Update return timestamp
exports.updateReturnStamp = (req, res) => {
  const { id } = req.params;
  const { return_stamp } = req.body;
  const query = `
    UPDATE access_logs SET return_stamp = ?
    WHERE Log_ID = ?
  `;
  db.query(query, [return_stamp, id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Return timestamp updated' });
  });
};

// Delete log
exports.deleteLog = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM access_logs WHERE Log_ID = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Log deleted' });
  });
};
