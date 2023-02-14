import { Router } from 'express';
import CarController from '../Controllers/CarController';

const CarRouter = Router();

CarRouter.post('/cars', (req, res, next) => new CarController(req, res, next).create());

export default CarRouter;