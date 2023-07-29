import { Router } from 'express';
import { getCurrentUser } from '../controllers/usersCtrl';

const router: Router = Router();

router.get('/current', getCurrentUser);

export default router;
