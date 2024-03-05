import express from 'express';

import * as controller from '../controller/controller.js';

const router = express.Router();


router.get('/latest', controller.getLatestOccupancy);

router.post('/update', controller.updateOccupancy);

router.get('/all', controller.getAllOccupancyData);

export default router;
