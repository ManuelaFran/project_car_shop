import { Router } from 'express';
import CarController from '../Controllers/CarController';

const CarRouter = Router();

CarRouter.post('/cars', (req, res, next) => new CarController(req, res, next).create());
CarRouter.get('/cars', (req, res, next) => new CarController(req, res, next).getAll());
CarRouter.get('/cars/:id', (req, res, next) => new CarController(req, res, next).getById());
CarRouter.put('/cars/:id', (req, res, next) => new CarController(req, res, next).update());

export default CarRouter;