import Occupancy from '../model/people_count.js';


export const getOccupancy = async (req, res) => {
    try {
        const occupancyData = await Occupancy.find();
        res.render('index', {occupancyData: occupancyData}); // Make sure this matches your EJS variable
    } catch (error) {
        console.log('Error fetching occupancy data', error);
        res.render('index', {occupancyData: []}); // Ensuring an empty array is passed if there's an error
    }
};



export const postOccupancy = async (req, res) => {
    const occupancyData = req.body;

    const newOccupancy = new Occupancy(occupancyData);
    await newOccupancy.save()
    .then(() => res.status(201).send('Occupancy data saved'))
    .catch((err) => res.status(500).send('Error saving occupancy data'))
}


export const updateOccupancy = async (req, res) => {
    const { zone } = req.params;
    const { occupancy } = req.body;

    const updatedOccupancy = await Occupancy.findOneAndUpdate(
        { zone },
        { occupancy, timestamp: Date.now() },
        { new: true, upsert: true } // upsert option creates the document if it doesn't exist
    );

    res.json(updatedOccupancy);
    }

