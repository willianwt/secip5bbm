import { Router } from 'express';
import userProtocol from '../controllers/userController';

const router = new Router();

router.post('/createUser', userProtocol.store);
router.get('/listUsers', userProtocol.index);
router.post('/login', userProtocol.login);

export default router;
