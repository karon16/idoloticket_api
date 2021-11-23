const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({});

const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;
