import { Router } from 'express';
import {
	getCurrentUser,
	placeOrder,
	updateWishlist,
} from '../controllers/usersCtrl';
import Paths from '../constants/paths';

const router: Router = Router();

router.get(Paths.CURRENT, getCurrentUser);

router.put(Paths.CURRENT, getCurrentUser);

router.post(`${Paths.WISHLIST}/:productIdOrId`, updateWishlist(true));

router.delete(`${Paths.WISHLIST}/:productIdOrId`, updateWishlist(false));

router.post(Paths.ORDER, placeOrder);

export default router;
