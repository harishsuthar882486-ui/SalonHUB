import express from 'express';
import { getSalons} from '../controller/salonsController.js';
import { requests } from '../controller/salonReqController.js';


export const salonsRouter = express.Router();

salonsRouter.get('/', getSalons);
salonsRouter.get('/requests', requests)
