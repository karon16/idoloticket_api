const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

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
		bio: {
			type: String,
			trim: true,
		},
		profilePicture: {
			type: String,
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
		emailToken: {
			type: mongoose.Schema.Types.Mixed,
		},
		phone: {
			type: Number,
			validate: {
				validator: function (v) {
					return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/g.test(
						v
					);
				},
				message: '{VALUE} is not a valid 12 digit number!',
			},
			required: true,
		},
		password: {
			type: String,
			required: [true, 'You must enter a password'],
			min: [6, 'Password must have at least 6 characters'],
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		role: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Role',
				default: '6196aba8c3c96f3ecfa24278',
			},
		],
	},
	{ timestamps: true }
);

userSchema.pre('save', function (next) {
	this.emailToken = crypto.randomBytes(24).toString('hex');

	if (this.password) {
		const salt = bcrypt.genSaltSync(10);
		this.password = bcrypt.hashSync(this.password, salt);
	}
	next();
});

const User = new mongoose.model('User', userSchema);
module.exports = User;
