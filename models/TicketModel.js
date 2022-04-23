const mongoose = require('mongoose');
const QRCode = require('qrcode');
const Event = require('./EventModel');

const ticketSchema = mongoose.Schema(
	{
		qrCode: String,
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

ticketSchema.pre('save', async function (next) {
	const event = await Event.findById(this.event);
	this.qrCode = await QRCode.toDataURL(event.name);
	next();
});

const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;
