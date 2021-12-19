const Ticket = require('../models/TicketModel');

exports.createTicket = async (req, res) => {
	try {
		await Ticket.create(req.body);
		res.status(200).json({
			status: 'success',
			message: 'ticket created successfully',
		});
	} catch (err) {
		console.log(err);
		res.status(400).json({
			status: 'fail',
			message: err,
		});
	}
};

exports.getAllTickets = async (req, res) => {
	try {
		const tickets = await Ticket.find();
		res.status(200).json({
			status: 'success',
			result: tickets.length,
			data: tickets,
		});
	} catch (err) {
		console.log(err);
		res.status(400).json({
			status: 'fail',
			message: err,
		});
	}
};
