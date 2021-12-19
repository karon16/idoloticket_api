const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema(
	{
		qrCode: {
			type: String,
		},
		isValid: {
			type: Boolean,
			default: true,
		},
		ticketNumber: {
			type: Number,
			autoincrement: true,
		},
		event: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Event',
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{ timestamps: true }
);

const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;
