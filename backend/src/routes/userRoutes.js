import { Router } from 'express';
import userProtocol from '../controllers/userController';

const router = new Router();

router.post('/createUser', userProtocol.store);

export default router;
