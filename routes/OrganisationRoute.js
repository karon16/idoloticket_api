const express = require('express');
const router = express.Router();
const {
	createOrganisation,
	getAllOrganisations,
} = require('../controllers/OrganisationController');
const checkAuth = require('../middlewares/checkAuth');

router.route('/').get(getAllOrganisations).post(checkAuth, createOrganisation);

module.exports = router;
