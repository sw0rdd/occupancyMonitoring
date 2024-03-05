import express from 'express';
import * as controller from '../controllers/controller.js';

const router = express.Router();

// API route for updating occupancy data
router.post('/occupancy/update', controller.updateOccupancy);

// API route for getting all occupancy data
router.get('/occupancy/all', controller.getAllOccupancyData);

export default router;
