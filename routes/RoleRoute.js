const express = require('express');
const router = express.Router();
const { createRole, getAllRoles } = require('../controllers/RoleController');
const checkAuth = require('../middlewares/checkAuth');

router.route('/').get(checkAuth, getAllRoles).post(checkAuth, createRole);

module.exports = router;
