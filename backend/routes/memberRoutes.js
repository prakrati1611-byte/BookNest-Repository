const express = require('express');
const router = express.Router();
const {
  getAllMembers,
  getMemberById,
  searchMembers,
  addMember,
  updateMember,
  deleteMember,
  getMemberLogs
} = require('../controllers/memberController');

router.get('/', getAllMembers);               // List all members
router.get('/:id', getMemberById);            // Get member by ID
router.get('/search/:query', searchMembers);  // Search by name/email
router.post('/', addMember);                  // Add new member
router.put('/:id', updateMember);             // Update member
router.delete('/:id', deleteMember);          // Delete member
router.get('/:id/logs', getMemberLogs);       // Get borrowing history

module.exports = router;
