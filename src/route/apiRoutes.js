import express from 'express';
import * as controller from '../controllers/webController.js';
import * as apiController from '../controllers/apiController.js';

const router = express.Router();

// API route for updating occupancy data
router.post('/occupancy/update', apiController.updateOccupancy);

// API route for getting all occupancy data
router.get('/occupancy/all', apiController.getAllOccupancyData);

router.get('/occupancy/daily-data', apiController.fetchDailyOccupancyData);

export default router;
