import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const motoRouter = Router();
const path = '/motorcycles/:id';

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
motoRouter.put(
  path,
  (req, res, next) => new MotorcycleController(req, res, next).update(),
);
motoRouter.delete(
  path,
  (req, res, next) => new MotorcycleController(req, res, next).remove(),
);

export default motoRouter;