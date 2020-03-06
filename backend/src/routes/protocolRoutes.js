import { Router } from 'express';
import protocolController from '../controllers/ProtocolController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/createProtocol', protocolController.store);
router.get('/listProtocols', loginRequired, protocolController.index);

export default router;
