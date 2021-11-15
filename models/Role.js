const mongoose = require('mongoose');

const roleSchema = mongoose.Schema({
	label: {
		type: String,
		required: true,
		unique: true,
	},
});
const Role = new mongoose.model('Role', roleSchema);
module.exports = Role;
