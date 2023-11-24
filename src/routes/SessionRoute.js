const { Router } = require('express');

const SessionController = require('../controllers/SessionController.js');

const SessionRoute = new Router();

/*	ACCOUNT/AUTHENTICATION ROUTES  */
SessionRoute.post('/sessions', SessionController.store);

module.exports = SessionRoute;