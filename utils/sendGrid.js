const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRIDAPI);

exports.sendMail = (recipient, subject, text, html) => {
	const msg = {
		to: recipient,
		from: 'christopherbuhendwa2000@gmail.com',
		subject,
		text,
		html,
	};

	sgMail
		.send(msg)
		.then(() => {
			console.log('email sent');
		})
		.catch((error) => {
			console.log(error);
		});
};
