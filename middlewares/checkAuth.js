const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization;
		const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_KEY);
		req.userData = decoded;
		next();
	} catch (err) {
		return res.status(401).json({
			status: 'fail',
			message: 'User not authorized',
		});
	}
};
