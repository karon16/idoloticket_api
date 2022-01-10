const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const UserRoute = require('./routes/UserRoute');
const roleRoute = require('./routes/RoleRoute');
const RightRoute = require('./routes/RightsRoute');
const OrganisationRoute = require('./routes/OrganisationRoute');
const CategoryRoute = require('./routes/CategoryRoutes');
const EventRoute = require('./routes/EventRoute');
const TicketRoute = require('./routes/TicketRoute');

const app = express();

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use(cors());
app.use(express.json());

app.use('/api/v1/users', UserRoute);
app.use('/api/v1/roles', roleRoute);
app.use('/api/v1/rights', RightRoute);
app.use('/api/v1/organisations', OrganisationRoute);
app.use('/api/v1/categories', CategoryRoute);
app.use('/api/v1/events', EventRoute);
app.use('/api/v1/tickets', TicketRoute);

module.exports = app;
