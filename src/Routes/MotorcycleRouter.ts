import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const motoRouter = Router();

motoRouter.post(
  '/motorcycles',
  (req, res, next) => new MotorcycleController(req, res, next).create(),
);
motoRouter.get(
  '/motorcycles',
  (req, res, next) => new MotorcycleController(req, res, next).getAll(),
);
motoRouter.get(
  '/motorcycles/:id',
  (req, res, next) => new MotorcycleController(req, res, next).getById(),
);

export default motoRouter;