const express = require('express');
const { login } = require('../controllers/admin-controller');

const router = express.Router();

//admin login
router.post('/login', login)

module.exports = router;