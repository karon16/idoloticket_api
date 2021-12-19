const mongoose = require('mongoose');

const rightSchema = mongoose.Schema(
	{
		label: {
			type: String,
			required: true,
			unique: true,
		},
	},
	{ timestamps: true }
);

rightSchema.pre('save', function (next) {
	this.label = this.label.charAt(0).toUpperCase() + this.label.slice(1);
	next();
});
const Right = new mongoose.model('Right', rightSchema);
module.exports = Right;
