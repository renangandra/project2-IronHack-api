const { Router } = require('express');

const HouseController = require('../controllers/HouseController.js');
const AuthMiddleware = require('../middlewares/Auth.js');

const HouseRoute = new Router();

/*	ROTAS DE USUÁRIOS  */
HouseRoute.post('/houses', AuthMiddleware, HouseController.store);
HouseRoute.get('/houses', AuthMiddleware, HouseController.index);
HouseRoute.get('/houses/:house_id', AuthMiddleware, HouseController.show);
HouseRoute.put('/houses/:house_id', AuthMiddleware, HouseController.update);
HouseRoute.delete('/houses/:house_id', AuthMiddleware, HouseController.destroy);

module.exports = HouseRoute;