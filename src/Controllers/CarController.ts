import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';
import Messages from '../utils/Messages';

class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async create() {
    const car: ICar = this.req.body;

    try {
      const newCar = await this.service.create(car);
      return this.res.status(201).json(newCar);
    } catch (error) {
      this.next(error);
    }
  }

  public async getAll() {
    try {
      const getCars = await this.service.getAll();
      return this.res.status(200).json(getCars);
    } catch (error) {
      this.next(error);
    }
  }

  public async getById() {
    const { id } = this.req.params;
    try {
      const car = await this.service.getById(id);
      if (!car) {
        return this.res.status(404).json({ message: Messages.CAR_NOT_FOUND });
      }
      return this.res.status(200).json(car);
    } catch (error) {
      if ((error as Error).message === Messages.INVALID_ID) {
        return this.res.status(422).json({ message: Messages.INVALID_ID });
      }
      return this.res.status(500).json((error as Error).message);
    }
  }

  public async update() {
    const { id } = this.req.params;
    const car = this.req.body;
    try {
      const setCar = await this.service.update(id, car);
      if (!setCar) {
        return this.res.status(404).json({ message: Messages.CAR_NOT_FOUND });
      }
      return this.res.status(200).json(setCar);
    } catch (error) {
      if ((error as Error).message === Messages.INVALID_ID) {
        return this.res.status(422).json({ message: Messages.INVALID_ID });
      }
      return this.res.status(500).json((error as Error).message);
    }
  }
}

export default CarController;