const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
	label: {
		type: String,
		required: [true, 'label is a required field'],
		unique: true,
	},
	description: {
		type: String,
		required: [true, 'A description is required for a category'],
		trim: true,
	},
});

const Category = new mongoose.model('Category', categorySchema);
module.exports = Category;
