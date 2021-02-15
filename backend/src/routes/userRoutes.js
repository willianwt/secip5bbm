import { Router } from 'express';
import userProtocol from '../controllers/userController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/createUser', userProtocol.store);
router.get('/listUsers', loginRequired, userProtocol.index);
router.post('/listUser/:id', userProtocol.listOne);
router.post('/login', userProtocol.login);
router.post('/logout', userProtocol.logout);
router.post('/updateUser', userProtocol.update);

export default router;
