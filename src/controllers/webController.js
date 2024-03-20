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
            res.render('live', {response, page: 'live'});
        } else {
            res.render('live', {response: null, page: 'live'})
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
};





/**
 * render daily.ejs
 */
export const renderDaily = async (req, res) => {
    try {
        // Simply render the daily page without passing data
        res.render('daily', {page: 'daily'});
    } catch (error) {
        console.error('Error rendering daily occupancy page:', error);
        res.status(500).send('Internal server error');
    }
};



/**
 * render floors.ejs
 */
export const renderFloors = async (req, res) => {
    try {
        // Simply render the daily page without passing data
        res.render('floors', {page: 'floors'});
    } catch (error) {
        console.error('Error rendering floors occupancy page:', error);
        res.status(500).send('Internal server error');
    }
};