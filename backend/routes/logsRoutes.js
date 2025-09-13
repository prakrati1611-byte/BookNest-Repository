const express = require('express');
const router = express.Router();
const {
  getAllLogs,
  getLogById,
  getLogsByMember,
  getLogsByBook,
  addLog,
  updateReturnStamp,
  deleteLog
} = require('../controllers/logsController');

router.get('/', getAllLogs);                   // All logs
router.get('/:id', getLogById);                // Single log by ID
router.get('/member/:memberId', getLogsByMember); // Logs by member
router.get('/book/:bookId', getLogsByBook);    // Logs by book
router.post('/', addLog);                      // Add new log (issue book)
router.patch('/return/:id', updateReturnStamp); // Mark book as returned
router.delete('/:id', deleteLog);              // Delete log entry

module.exports = router;
