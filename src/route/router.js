import express from 'express';

import * as controller from '../controller/controller.js';

const occupancyRoute = express.Router();


occupancyRoute.get('/', controller.getOccupancy);

occupancyRoute.post('/', controller.postOccupancy);

// occupancyRoute.put('/api/occupancy/:zone', controller.updateOccupancy);


export default occupancyRoute;