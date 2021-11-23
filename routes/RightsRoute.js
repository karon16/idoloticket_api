const express = require('express');
const router = express.Router();
const {
	createRight,
	getAllRights,
} = require('../controllers/RightsController');
const checkAuth = require('../middlewares/checkAuth');

router.route('/').get(checkAuth, getAllRights).post(checkAuth, createRight);

module.exports = router;
