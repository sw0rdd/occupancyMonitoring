
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
        const { entry, groundFloor, secondFloor, timestamp } = req.body;

        const providedTimestamp = timestamp ? moment(timestamp).toDate() : new Date(); 
        const formattedTimestamp = moment(providedTimestamp).format('YYYY-MM-DD HH:mm:ss');


        const newOccupancy = new Occupancy({
        entry, 
        groundFloor, 
        secondFloor,
        timestamp: providedTimestamp
        });
        await newOccupancy.save();

        const firstFloor = entry - groundFloor - secondFloor;
        const updatedData = {entry, groundFloor, secondFloor, firstFloor, timestamp: formattedTimestamp};

        console.log('Occupancy updated:', updatedData);

        io.emit('occupancyUpdated', updatedData);

        res.status(201).send('Occupancy updated successfully');

    } catch (error) {
        console.error('Error updating occupancy: ', error);
        res.status(500).send('Internal server error');
    }
};




/**
 * Get the daily occupancy data from the database
 */
export const fetchDailyOccupancyData = async (req, res) => {
    try {
        const dateOfInterest = req.query.date || moment().format('YYYY-MM-DD');
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


/**
 * Get the hourly occupancy data from the database
 */
export const fetchFloorsOccupancyData = async (req, res) => {
    try {
        const dateOfInterest = req.query.date || moment().format('YYYY-MM-DD');
        const startOfDay = moment(dateOfInterest).startOf('day').toDate();
        const endOfDay = moment(dateOfInterest).endOf('day').toDate();

        const occupancyData = await Occupancy.aggregate([
            {
                $match: {
                    timestamp: { $gte: startOfDay, $lte: endOfDay }
                }
            },
            {
                $project: {
                    hour: { $hour: "$timestamp" },
                    groundFloor: 1,
                    secondFloor: 1,
                    firstFloor: { 
            $subtract: [
                "$entry",
                { $add: ["$groundFloor", "$secondFloor"] }
            ]
                    },
                }
            },
            {
                $group: {
                    _id: "$hour",
                    groundFloorAvg: { $avg: "$groundFloor" },
                    secondFloorAvg: { $avg: "$secondFloor" },
                    firstFloorAvg: { $avg: "$firstFloor" },
                }
            },
            {
                $sort: { _id: 1 } // Sort by hour for chronological order
            }
        ]);

        res.json({ occupancyData });
    } catch (error) {
        console.error('Error fetching floors occupancy data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};