const express = require('express');
const router = express.Router();

const {
  getDueBooks,
  getOverdueBooks,
  getRecentReturns
} = require('../controllers/dashboardController');

router.get('/due-books', getDueBooks);
router.get('/overdue-books', getOverdueBooks);
router.get('/recent-returns', getRecentReturns);

module.exports = router;
