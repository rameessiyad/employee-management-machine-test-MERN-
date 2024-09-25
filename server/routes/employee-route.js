const express = require('express');
const isAuth = require('../middlewares/auth-middleware');
const { upload } = require('../utils/image-upload');
const { createEmployee, listEmployees, editEmployee, deleteEmployee } = require('../controllers/employee-controller');

const router = express.Router();

router.post('/create', isAuth, upload.single('f_image'), createEmployee);
router.get('/list', isAuth, listEmployees);
router.put('/edit/:id', isAuth, upload.single('f_image'), editEmployee);
router.delete('/delete/:id', isAuth, deleteEmployee);

module.exports = router