const express = require('express');
const router = express.Router();
const {
	getAllTickets,
	createTicket,
} = require('../controllers/TicketController');
const checkAuth = require('../middlewares/checkAuth');

router.route('/').get(getAllTickets).post(checkAuth, createTicket);

module.exports = router;
