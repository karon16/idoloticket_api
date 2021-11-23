/* eslint-disable no-undef */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');

//Replacing the database password in the connection link stored in env variables
const DB = process.env.DATABASE.replace(
	'<PASSWORD>',
	process.env.DATABASE_PASSWORD
);

//The connection is made to the mongoDB database
(async () => {
	try {
		await mongoose.connect(DB);
		console.log('connected');
	} catch (error) {
		console.log(error);
	}
})();

const port = process.env.PORT || 8800;
app.listen(port, () => console.log(`server running on port ${port} `));
