
import { get } from 'http';
import Occupancy from '../model/people_count.js';
import { getIo } from '../socket.js';
import moment from 'moment';




/**
 * Update the occupancy data in the database
 * from the data sent in the request body
 */
export const updateOccupancy = async (req, res) => {
    const io = getIo();
    try {
        const { entry, groundFloor, secondFloor } = req.body;
        const newOccupancy = new Occupancy({entry, groundFloor, secondFloor})
        await newOccupancy.save();

        const firstFloor = entry - groundFloor - secondFloor;

        // Using moment.js to format the timestamp
        // Server-side, when preparing data for the frontend
        const formattedTimestamp = moment().format('ddd MMM DD YYYY HH:mm:ss');
        const updatedData = {entry, groundFloor, secondFloor, firstFloor, timestamp: formattedTimestamp};


        io.emit('occupancyUpdated', updatedData);

        res.status(201).send('Occupancy updated successfully');

    } catch (error) {
        console.error('Error updating occupancy: ', error);
        res.status(500).send('Internal server error');
    }
};




/**
 * Get all the occupancy data from the database
 */
export const getAllOccupancyData = async (req, res) => {
    try {
        const allOccupancy = await Occupancy.find();
        res.json(allOccupancy);
    } catch (error) {
        console.error('Error getting all occupancy data: ', error);
        res.status(500).send('Internal server error');
    }
}

/**
 * Get the daily occupancy data from the database
 */
export const fetchDailyOccupancyData = async (req, res) => {
    try {
        const dateOfInterest = req.query.date || "2024-03-06";
        const startOfDay = moment(dateOfInterest).startOf('day');
        const endOfDay = moment(dateOfInterest).endOf('day');

        const dailyData = await Occupancy.find({
            timestamp: { $gte: startOfDay.toDate(), $lte: endOfDay.toDate() }
        }).sort('timestamp');

        res.json({ dailyData }); // Send the data as JSON
    } catch (error) {
        console.error('Error fetching daily occupancy data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};