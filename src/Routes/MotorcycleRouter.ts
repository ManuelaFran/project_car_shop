import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const motoRouter = Router();

motoRouter.post(
  '/motorcycles',
  (req, res, next) => new MotorcycleController(req, res, next).create(),
);

export default motoRouter;