const express = require('express');
const router = express.Router();
const {
	createCategory,
	getAllCategories,
	getEventCategories,
	getOrganisationCategorys,
} = require('../controllers/CategoryController');
const checkAuth = require('../middlewares/checkAuth');

router
	.route('/')
	.get(checkAuth, getAllCategories)
	.post(checkAuth, createCategory);
router.route('/event').get(checkAuth, getEventCategories);
router.route('/organisation').get(checkAuth, getOrganisationCategorys);

module.exports = router;
