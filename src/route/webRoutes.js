import express from 'express';
import * as webController from '../controllers/webController.js';


const router = express.Router();

// Web route for serving the live occupancy data page
router.get('/occupancy/live', webController.getLatestOccupancy);

// Web route for serving the daily occupancy data page
router.get('/occupancy/daily', webController.renderDaily);

// Home page route
router.get('/', (req, res) => {
  res.render('index');
});

export default router;
