const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth');
const { contactLimiter } = require('../middlewares/rateLimiter');
const { submitContact, getContacts, updateContact, deleteContact } = require('../controllers/contactController');

router.post('/', contactLimiter, submitContact);
router.use(protect, authorize('admin', 'superadmin'));
router.get('/', getContacts);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);

module.exports = router;
