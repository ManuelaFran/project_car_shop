import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import Car from '../../../src/Domains/Car';
import CarService from '../../../src/Services/CarService';
import mocksService from './mocks/mocksService';

const car = new Car(mocksService.carOutput);

describe('Testes da camada CarService', function () {
  it('testa se um carro é criado com sucesso', async function () {
    sinon.stub(Model, 'create').resolves(mocksService.carOutput);
   
    const service = new CarService();  
    const createCar = await service.create(mocksService.carInput);
    
    expect(createCar).to.be.deep.equal(car);
  });

  it('testa se retorna uma lista de carros com sucesso', async function () {
    sinon.stub(Model, 'find').resolves([mocksService.carOutput, mocksService.carOutput]);
   
    const service = new CarService();  
    const listCar = await service.getAll();
    
    expect(listCar).to.be.deep.equal([car, car]);
  });

  it('testa se retorna um carro pelo id com sucesso', async function () {
    sinon.stub(Model, 'findOne').resolves(mocksService.carOutput);
   
    const service = new CarService();  
    const idCar = await service.getById('634852326b35b59438fbea2f');
    
    expect(idCar).to.be.deep.equal(car);
  });

  it('testa se é possível atualizar um carro pelo id com sucesso', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(mocksService.carOutput);
   
    const service = new CarService();  
    const idCar = await service.update('634852326b35b59438fbea2f', mocksService.carInput);
    
    expect(idCar).to.be.deep.equal(car);
  });

  afterEach(function () {
    sinon.restore();
  });
});
