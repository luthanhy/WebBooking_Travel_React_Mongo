import express from 'express';
import { getUserCount, getTourCount } from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/userCount', getUserCount);
router.get('/tourCount', getTourCount);

export default router;
