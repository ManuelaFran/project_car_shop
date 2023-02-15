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

  afterEach(function () {
    sinon.restore();
  });
});