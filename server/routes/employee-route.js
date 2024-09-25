const express = require('express');
const isAuth = require('../middlewares/auth-middleware');
const { upload } = require('../utils/image-upload');
const { createEmployee } = require('../controllers/employee-controller');

const router = express.Router();

router.post('/create', isAuth, upload.single('f_image'), createEmployee)

module.exports = router