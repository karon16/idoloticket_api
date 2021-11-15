const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			trim: true,
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			match: [
				// eslint-disable-next-line no-useless-escape
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
				'{VALUE} is not a valid email address',
			],
		},
		phone: {
			type: Number,
			validate: {
				validator: function (v) {
					return /d{14}/.test(v);
				},
				message: '{VALUE} is not a valid 10 digit number!',
			},
			required: true,
		},
		password: {
			type: String,
			required: [true, 'You must enter a password'],
			min: [6, 'Password must have at least 6 characters'],
		},
		role: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
	},
	{ timestamps: true }
);

const User = new mongoose.model('User', userSchema);
module.exports = User;
