/* eslint-disable no-unused-vars */
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const { sendMail } = require('../utils/sendGrid');

exports.createUser = async (req, res) => {
	try {
		const isUser = await User.findOne({ email: req.body.email });
		if (!isUser) {
			req.body.phone * 1;
			const user = await User.create(req.body);

			sendMail(
				user.email,
				'Vérification de compte idolo ticket',
				`Salut ${user.firstName} ,Merci d'avoir créer un compte sur idoloTicket
				Veuillez copier l'adresse ci-dessous pour activer votre compte
				http://${req.headers.host}/api/v1/users/verify_email?token=${user.emailToken}`,
				`<Strong>Salut ${user.firstName}</strong>
				<p>Merci d'avoir créer un compte sur idoloTicket</p>
				<p>Veuillez cliquer sur le lien ci-dessous pour activer votre compte</p>
				<a href="http://${req.headers.host}/api/v1/users/verify_email?token=${user.emailToken}">Activez votre compte</a>
					`
			);

			res.status(200).json({
				status: 'success',
				message:
					'Votre compte a été créer avec succès, veuillez vérifier vos mails et activer votre compte',
			});
		} else {
			res.status(409).json({
				status: 'Fail',
				message: 'user already exist',
			});
		}
	} catch (err) {
		console.log(err);
		res.status(400).json({
			status: 'fail',
			message: err,
		});
	}
};

exports.loginUser = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email }).populate(
			'role',
			'label'
		);
		if (user) {
			const result = await bcrypt.compare(req.body.password, user.password);
			//res.send(result);
			bcrypt.compare(req.body.password, user.password, (err, result) => {
				if (err) {
					res.status(401).json({
						status: 'Failure',
						message: 'Authentication failed',
					});
				} else if (result) {
					const token = jwt.sign(
						{ id: user._id, email: user.email, role: user.role },
						process.env.JWT_KEY,
						{ expiresIn: '2h' }
					);
					res.status(200).json({
						status: 'success',
						message: 'Authenticated successfully',
						data: {
							token,
						},
					});
				} else {
					res.status(401).json({
						status: 'Failure',
						message: 'The email or password is not corrects',
					});
				}
			});
		} else {
			res.status(404).json({
				status: 'Failure',
				message: 'The user does not exist',
			});
		}
	} catch (err) {
		res.status(404).json({
			status: 'error',
			message: err,
		});
	}
};
exports.getAllUsers = async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).json({
			status: 'success',
			result: users.length,
			data: users,
		});
	} catch (err) {
		console.log(err);
	}
};

exports.deleteUser = async (req, res) => {
	try {
		const isUser = await User.findOne({ _id: req.params.id });
		console.log(req.params.id);
		if (isUser) {
			await User.deleteOne({ _id: req.params.id });
			res.status(204).json({
				status: 'Sucess',
				message: 'user deleted successfully',
			});
		} else {
			res.status(409).json({
				status: 'Fail',
				message: 'user fo not exist',
			});
		}
	} catch (err) {
		res.status(400).json({
			status: 'error',
			message: 'cannot delete user',
		});
	}
};

exports.forgotPassword = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });

		if (user) {
			const token = jwt.sign(
				{ id: user._id, email: user.email },
				process.env.JWT_KEY + user.password,
				{ expiresIn: '1h' }
			);
			const uniqueLink = `http://${req.headers.host}/api/v1/users/reset-password/${user._id}/${token}`;

			sendMail(
				user.email,
				'Réinitialisez votre mot de passe',
				`Nous avons appris que vous avez perdu votre mot de passe idoloTicket. Nous en sommes désolés !
				Mais ne vous inquiétez pas ! Vous pouvez utiliser le liensuivant pour réinitialiser votre mot de passe :
				${uniqueLink}`,
				`<Strong>Réinitialisez votre mot de passe</strong>
				<p>Nous avons appris que vous avez perdu votre mot de passe idoloTicket. Nous en sommes désolés !</p>
				<p>Mais ne vous inquiétez pas ! Vous pouvez utiliser le liensuivant pour réinitialiser votre mot de passe :</p>
				<a href=${uniqueLink}>Réinitialiser votre mot de passe</a>
					`
			);
			res.status(200).json({
				status: 'success',
				message: 'veuillez vérifier vos mails et réinitiliser votre compte',
			});
		} else {
			res.status(404).json({
				status: 'Fail',
				message: 'Email not found ',
			});
		}
	} catch (err) {
		res.status(400).json({
			status: 'Fail',
			message: err,
		});
	}
};

exports.validatePasswordReset = async (req, res) => {
	try {
		const { id, token } = req.params;
		const user = await User.findOne({ _id: id });

		console.log(token);

		if (!user) {
			res.status(404).json({
				status: 'Error',
				message: 'Invalid id, contact us for assistance',
			});
			return;
		}

		const secret = process.env.JWT_KEY + user.password;
		const payload = jwt.verify(token, secret);
		res.redirect('www.google.com');
	} catch (err) {
		console.log(err);
		res.status(400).json({
			status: 'fail',
			message: err,
		});
	}
};

exports.resetPassword = async (req, res) => {};

exports.verifyEmail = async (req, res) => {
	try {
		const user = await User.findOne({ emailToken: req.query.token });
		if (!user) {
			res.status(404).json({
				status: 'Error',
				message: 'Invalid token, contact us for assistance',
			});
		}
		user.emailToken = null;
		user.markModified('emailToken');
		user.isVerified = true;
		await user.save();
		res.redirect('http://localhost:3000');
	} catch (error) {
		console.log(error);
	}
};
