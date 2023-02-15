import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import Motorcycle from '../../../src/Domains/Motorcycle';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import mocksService from './mocks/mocksService';

const moto = new Motorcycle(mocksService.motoOutput as IMotorcycle);

describe('Testes da camada MotorcycleService', function () {
  it('testa se uma motorcycle é criada com sucesso', async function () {
    sinon.stub(Model, 'create').resolves(mocksService.motoOutput);
   
    const service = new MotorcycleService();  
    const createMoto = await service.create(mocksService.motoInput as IMotorcycle);
    
    expect(createMoto).to.be.deep.equal(moto);
  });

  it('testa se retorna uma lista de motocicletas com sucesso', async function () {
    sinon.stub(Model, 'find').resolves([mocksService.motoOutput, mocksService.motoOutput]);
   
    const service = new MotorcycleService();  
    const listMotos = await service.getAll();
    
    expect(listMotos).to.be.deep.equal([moto, moto]);
  });

  it('testa se retorna uma motocicletas pelo id com sucesso', async function () {
    sinon.stub(Model, 'findOne').resolves(mocksService.motoOutput);
   
    const service = new MotorcycleService();  
    const idMoto = await service.getById('6348513f34c397abcad040b2');
    
    expect(idMoto).to.be.deep.equal(moto);
  });

  it('testa se é possível atualizar uma motocicletas pelo id com sucesso', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(mocksService.motoOutput);
   
    const service = new MotorcycleService();  
    const idMoto = await service
      .update('6348513f34c397abcad040b2', mocksService.motoInput as IMotorcycle);
    
    expect(idMoto).to.be.deep.equal(moto);
  });

  afterEach(function () {
    sinon.restore();
  });
});