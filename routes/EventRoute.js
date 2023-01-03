const express = require('express');
const router = express.Router();
const { getAllEvents, createEvent } = require('../controllers/EventController');
const checkAuth = require('../middlewares/checkAuth');

router.route('/').get(checkAuth, getAllEvents).post(checkAuth, createEvent);

module.exports = router;
