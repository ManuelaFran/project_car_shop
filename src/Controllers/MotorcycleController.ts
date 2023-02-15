import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';
import Messages from '../utils/Messages';

class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public async create() {
    const moto: IMotorcycle = this.req.body;

    try {
      const newMoto = await this.service.create(moto);
      return this.res.status(201).json(newMoto);
    } catch (error) {
      this.next(error);
    }
  }

  public async getAll() {
    try {
      const getMotos = await this.service.getAll();
      return this.res.status(200).json(getMotos);
    } catch (error) {
      this.next(error);
    }
  }

  public async getById() {
    const { id } = this.req.params;
    try {
      const moto = await this.service.getById(id);
      if (!moto) {
        return this.res.status(404).json({ message: Messages.MOTO_NOT_FOUND });
      }
      return this.res.status(200).json(moto);
    } catch (error) {
      if ((error as Error).message === Messages.INVALID_ID) {
        return this.res.status(422).json({ message: Messages.INVALID_ID });
      }
      this.next(error);
    }
  }

  public async update() {
    const { id } = this.req.params;
    const moto = this.req.body;
    try {
      const setMoto = await this.service.update(id, moto);
      if (!setMoto) {
        return this.res.status(404).json({ message: Messages.MOTO_NOT_FOUND });
      }
      return this.res.status(200).json(setMoto);
    } catch (error) {
      if ((error as Error).message === Messages.INVALID_ID) {
        return this.res.status(422).json({ message: Messages.INVALID_ID });
      }
      this.next(error);
    }
  }

  public async remove() {
    const { id } = this.req.params;
    try {
      const moto = await this.service.remove(id);
      if (!moto) {
        return this.res.status(404).json({ message: Messages.MOTO_NOT_FOUND });
      }
      return this.res.status(204).json(moto);
    } catch (error) {
      if ((error as Error).message === Messages.INVALID_ID) {
        return this.res.status(422).json({ message: Messages.INVALID_ID });
      }
      this.next(error);
    }
  }
}

export default MotorcycleController;