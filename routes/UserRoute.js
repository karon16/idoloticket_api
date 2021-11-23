const express = require('express');

const { createUser, getAllUsers, loginUser } = require('../controllers/UseController');
const router = express.Router();

router.route('/').get(getAllUsers);
router.route('/signin').post(createUser);
router.route('/login').post(loginUser);

module.exports = router;
