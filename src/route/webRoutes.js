import express from 'express';
import * as controller from '../controllers/controller.js';


const router = express.Router();

// Web route for serving the live occupancy data page
router.get('/occupancy/live', controller.getLatestOccupancy);

// Home page route
router.get('/', (req, res) => {
  res.render('index');
});

export default router;
