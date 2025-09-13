const db = require('../db/connection');

// Create new admin
exports.createAdmin = (req, res) => {
  const { name, email, role } = req.body;
  const query = `INSERT INTO users (Name, Email, Role) VALUES (?, ?, ?)`;
  db.query(query, [name, email, role], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Admin created', id: result.insertId });
  });
};

// Get all admins
exports.getAdmins = (req, res) => {
  const query = `SELECT * FROM users WHERE Role = 'admin' OR Role = 'staff'`;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Update admin details
exports.updateAdmin = (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;
  const query = `UPDATE users SET Name = ?, Email = ?, Role = ? WHERE Enrolment_ID = ?`;
  db.query(query, [name, email, role, id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Admin updated' });
  });
};

// Set loan period
exports.setLoanPeriod = (req, res) => {
  const { days } = req.body;
  const query = `UPDATE settings SET loan_period = ?`;
  db.query(query, [days], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: `Loan period set to ${days} days` });
  });
};

// Set fine rules
exports.setFineRules = (req, res) => {
  const { rate } = req.body;
  const query = `UPDATE settings SET fine_per_day = ?`;
  db.query(query, [rate], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: `Fine rate set to ₹${rate}/day` });
  });
};

// Backup database (placeholder)
exports.backupDatabase = (req, res) => {
  // You can trigger a shell script or dump logic here
  res.json({ message: 'Backup triggered (placeholder)' });
};

// Restore database (placeholder)
exports.restoreDatabase = (req, res) => {
  // You can trigger restore logic here
  res.json({ message: 'Restore triggered (placeholder)' });
};

// Update system preferences
exports.updatePreferences = (req, res) => {
  const { theme, notifications } = req.body;
  const query = `UPDATE settings SET theme = ?, notifications = ?`;
  db.query(query, [theme, notifications], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Preferences updated' });
  });
};
