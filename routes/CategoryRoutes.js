const express = require('express');
const router = express.Router();
const { createCategory, getAllCategorys } = require('../controllers/CategoryController');
const checkAuth = require('../middlewares/checkAuth');

router
	.route('/')
	.get(checkAuth, getAllCategorys)
	.post(checkAuth, createCategory);

module.exports = router;
