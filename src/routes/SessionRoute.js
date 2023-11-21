const { Router } = require('express');

const SessionController = require('../controllers/SessionController.js');

const SessionRoute = new Router();

/*	ROTAS DE CONTAS/AUTENTICAÇÃO  */
SessionRoute.post('/sessions', SessionController.store);

module.exports = SessionRoute;