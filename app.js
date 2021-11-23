const express = require('express');
const morgan = require('morgan');

const UserRoute = require('./routes/UserRoute');
const roleRoute = require('./routes/RoleRoute');
const RightRoute = require('./routes/RightsRoute');
const OrganisationRoute = require('./routes/OrganisationRoute');

const app = express();

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/v1/users', UserRoute);
app.use('/api/v1/roles', roleRoute);
app.use('/api/v1/rights', RightRoute);
app.use('/api/v1/organisations', OrganisationRoute);

module.exports = app;
