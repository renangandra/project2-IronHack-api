const { Router } = require('express');

const UserController = require('../controllers/UserController.js');
const AuthMiddleware = require('../middlewares/Auth.js');

const UserRoute = new Router();

/* USER ROUTES */
UserRoute.post('/users', UserController.store);
UserRoute.get('/users', AuthMiddleware, UserController.index);
UserRoute.get('/users/:user_id', AuthMiddleware, UserController.show);
UserRoute.put('/users/:user_id', AuthMiddleware, UserController.update);
UserRoute.delete('/users/:user_id', AuthMiddleware, UserController.destroy);

module.exports = UserRoute;