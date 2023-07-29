import { Router } from 'express';
import Paths from '../util/paths';
import { addProduct } from '../controllers/productsCtrl';
import isSeller from '../middleware/isSeller';

const router: Router = Router();

router.post(Paths.ADD, isSeller, addProduct);
