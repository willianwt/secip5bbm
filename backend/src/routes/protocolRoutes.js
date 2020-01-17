import { Router } from 'express';
import protocolController from '../controllers/ProtocolController';

const router = new Router();

router.post('/createProtocol', protocolController.store);

export default router;
