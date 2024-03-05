import { get } from 'http';
import Occupancy from '../model/people_count.js';
import { getIo } from '../socket.js';
import moment from 'moment';


/**
 * Get the latest occupancy data from the database
 */
export const getLatestOccupancy = async (req, res) => {
    try {
        const latestOccupancy = await Occupancy.findOne().sort({timestamp: -1});
        if (latestOccupancy) {
            const firstFloor = latestOccupancy.entry - latestOccupancy.groundFloor - latestOccupancy.secondFloor;

            // Format the timestamp using moment.js
            const formattedTimestamp = moment(latestOccupancy.timestamp).format('ddd MMM DD YYYY HH:mm:ss');

            const response = {
                ...latestOccupancy.toObject(),
                firstFloor,
                timestamp: formattedTimestamp // Using the formatted timestamp
            };
            res.render('live', {response});
        } else {
            res.status(404).send('No occupancy data found');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
};



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

