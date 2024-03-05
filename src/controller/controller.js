import Occupancy from '../model/people_count.js';


/**
 * Get the latest occupancy data from the database
 */
export const getLatestOccupancy = async (req, res) => {
    try {
        const latestOccupancy = await Occupancy.findOne().sort({timestamp: -1});
        if (latestOccupancy) {

            const firstFloor = latestOccupancy.entry - latestOccupancy.groundFloor - latestOccupancy.secondFloor;

            const response = {
                ...latestOccupancy.toObject(),
                firstFloor
            }

            res.json(response);
        } else {
            res.status(404).send('No occupancy data found');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
}


/**
 * Update the occupancy data in the database
 * from the data sent in the request body
 */
export const updateOccupancy = async (req, res) => {
    try {
        const { entry, groundFloor, secondFloor } = req.body;
        const newOccupancy = new Occupancy({entry, groundFloor, secondFloor})
        await newOccupancy.save();
        res.status(201).send('Occupancy updated successfully');
    } catch (error) {
        console.error('Error updating occupancy: ', error);
        res.status(500).send('Internal server error');
    }
}


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

