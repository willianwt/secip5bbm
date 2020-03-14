import { Router } from 'express';
import protocolController from '../controllers/ProtocolController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/createProtocol', protocolController.store);
router.post('/editProtocol', protocolController.update);
router.get('/listProtocols', loginRequired, protocolController.index);
router.delete('/deleteProtocol/:id', protocolController.delete);

export default router;
