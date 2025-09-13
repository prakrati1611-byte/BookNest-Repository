const express = require('express');
const router = express.Router();
const {
  createAdmin,
  getAdmins,
  updateAdmin,
  setLoanPeriod,
  setFineRules,
  backupDatabase,
  restoreDatabase,
  updatePreferences
} = require('../controllers/adminController');

router.post('/', createAdmin);               // Add new admin
router.get('/', getAdmins);                  // Get all admins
router.put('/:id', updateAdmin);             // Update admin details

router.patch('/loan-period', setLoanPeriod); // Set loan duration
router.patch('/fine-rules', setFineRules);   // Set fine per day

router.post('/backup', backupDatabase);      // Trigger backup
router.post('/restore', restoreDatabase);    // Trigger restore

router.patch('/preferences', updatePreferences); // Update system settings

module.exports = router;
