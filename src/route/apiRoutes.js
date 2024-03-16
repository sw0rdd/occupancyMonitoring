import express from 'express';
import * as apiController from '../controllers/apiController.js';

import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

function checkApiKey(req, res, next) {
    const apiKey = req.headers['x-api-key'];
    console.log(`received api key: ${apiKey}`)
    console.log(`expected api key: ${process.env.API_KEY}`)
    if (!apiKey || apiKey !== process.env.API_KEY) {
        return res.status(401).send('Unauthorized');
    }
    next();
}


// API route for updating occupancy data
router.post('/occupancy/update', checkApiKey, apiController.updateOccupancy);


router.get('/occupancy/daily-data', apiController.fetchDailyOccupancyData);

router.get('/occupancy/floors-data', apiController.fetchFloorsOccupancyData);


export default router;
