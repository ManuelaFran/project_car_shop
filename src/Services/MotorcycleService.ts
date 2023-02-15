import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

class MotorcycleService {
  createMotorcycleDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }
    return null;
  }

  public async create(motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const createMoto = await motorcycleODM.create(motorcycle);
    return this.createMotorcycleDomain(createMoto);
  }

  public async getAll() {
    const motorcycleODM = new MotorcycleODM();
    const getMotos = await motorcycleODM.getAll();
    return getMotos.map((motorcycle) => this.createMotorcycleDomain(motorcycle));
  }

  public async getById(id: string) {
    const motorcycleODM = new MotorcycleODM();
    const getMotoId = await motorcycleODM.getById(id);
    return this.createMotorcycleDomain(getMotoId);
  }

  public async update(id: string, moto: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const setMotorcycle = await motorcycleODM.update(id, moto);
    return this.createMotorcycleDomain(setMotorcycle as IMotorcycle);
  }
}

export default MotorcycleService;