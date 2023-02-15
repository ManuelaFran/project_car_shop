import express from 'express';
import CarRouter from './Routes/CarRouter';
import motoRouter from './Routes/MotorcycleRouter';

const app = express();

app.use(express.json());
app.use('/', CarRouter);
app.use('/', motoRouter);

export default app;
