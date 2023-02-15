import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

class CarService {
  createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public async create(car: ICar) {
    const carODM = new CarODM();
    const createCar = await carODM.create(car);
    return this.createCarDomain(createCar);
  }

  public async getAll() {
    const carODM = new CarODM();
    const getCars = await carODM.getAll();
    return getCars.map((car) => this.createCarDomain(car));
  }

  public async getById(id: string) {
    const carODM = new CarODM();
    const getCarId = await carODM.getById(id);
    return this.createCarDomain(getCarId);
  }

  public async update(id: string, car: ICar) {
    const carODM = new CarODM();
    const setCar = await carODM.update(id, car);
    return this.createCarDomain(setCar as ICar);
  }

  public async remove(id: string) {
    const carODM = new CarODM();
    const removeCar = await carODM.remove(id);
    return this.createCarDomain(removeCar); 
  }
}

export default CarService;