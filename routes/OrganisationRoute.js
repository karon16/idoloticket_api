const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/checkAuth');

const {
	createOrganisation,
	getAllOrganisations,
	getUserOrganisations,
} = require('../controllers/OrganisationController');
// const checkAuth = require('../middlewares/checkAuth');

router.route('/').get(getAllOrganisations).post(createOrganisation);
router.route('/:id').get(checkAuth, getUserOrganisations);

module.exports = router;
