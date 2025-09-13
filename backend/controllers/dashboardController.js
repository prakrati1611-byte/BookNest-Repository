const db = require('../db/connection'); // This connects to your MySQL

exports.getDueBooks = (req, res) => {
  const query = `
    SELECT * FROM access_logs
    WHERE return_stamp IS NULL
    AND lend_stamp <= DATE_SUB(NOW(), INTERVAL 11 DAY)
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};
exports.getOverdueBooks = (req, res) => {
  const query = `
    SELECT * FROM access_logs
    WHERE return_stamp IS NULL
    AND lend_stamp <= DATE_SUB(NOW(), INTERVAL 14 DAY)
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};
exports.getRecentReturns = (req, res) => {
  const query = `
    SELECT * FROM access_logs
    WHERE return_stamp IS NOT NULL
    AND return_stamp >= DATE_SUB(NOW(), INTERVAL 7 DAY)
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

