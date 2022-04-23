const express = require('express');
const checkAuth = require('../middlewares/checkAuth');

const {
	createUser,
	getAllUsers,
	loginUser,
	deleteUser,
	verifyEmail,
	forgotPassword,
	resetPassword,
	validatePasswordReset,
	getOneUser,
} = require('../controllers/UseController');
const router = express.Router();

router.route('/').get(getAllUsers);
router.route('/:id').get(checkAuth, getOneUser);
router.route('/verify_email').get(verifyEmail);
router.route('/forgot-password').post(forgotPassword);
router
	.route('/reset-password/:id/:token')
	.get(validatePasswordReset)
	.post(resetPassword);
router.route('/signup').post(createUser);
router.route('/login').post(loginUser);
router.route('/:id').delete(deleteUser);

module.exports = router;
