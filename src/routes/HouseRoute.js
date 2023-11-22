const { Router } = require('express');
const multer = require('multer');

const HouseController = require('../controllers/HouseController.js');
const MulterMiddleware = require('../middlewares/multer.js');
const AuthMiddleware = require('../middlewares/Auth.js');

const upload = multer(MulterMiddleware);
const HouseRoute = new Router();

/*	ROTAS DE USUÁRIOS  */
HouseRoute.post('/houses', AuthMiddleware, upload.single('thumbnail'), HouseController.store);
HouseRoute.get('/houses', HouseController.index);
HouseRoute.get('/houses-by-user', AuthMiddleware, HouseController.showByUser);
HouseRoute.get('/houses/:house_id', AuthMiddleware, HouseController.show);
HouseRoute.put('/houses/:house_id', AuthMiddleware, upload.single('thumbnail'), HouseController.update);
HouseRoute.delete('/houses/:house_id', AuthMiddleware, HouseController.destroy);

module.exports = HouseRoute;