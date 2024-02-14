import { Router } from "express";
import CorridaController from '../controllers/CorridaController';

const router = Router();

router.post('create-corrida',CorridaController.createCorrida);

export default router;