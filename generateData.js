import dotenv from 'dotenv';
dotenv.config(); // Ensure this is at the top to load your environment variables first

import mongoose from 'mongoose';
import moment from 'moment';
import Occupancy from './src/model/people_count.js'; // Make sure this path is correct

async function generateData() {
    await mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => {
      console.error('Error connecting to MongoDB:', err);
      process.exit(1); // Exit in case of connection error to prevent further execution
    });

    const startDate = moment('2024-03-07T08:00:00+01:00');
    const endDate = moment('2024-03-07T20:00:00+01:00');

    for (let m = moment(startDate); m.isBefore(endDate); m.add(1, 'hours')) {
        const entry = Math.floor(Math.random() * 100); // Random number of entries
        const groundFloor = Math.floor(Math.random() * entry); // Random distribution
        const secondFloor = Math.floor(Math.random() * (entry - groundFloor));
        const timestamp = m.toDate();

        const occupancyData = new Occupancy({
            entry,
            groundFloor,
            secondFloor,
            timestamp
        });
      
        await occupancyData.save();
    }

    console.log('Data generation complete');
    process.exit(0); // Exit successfully after completing data generation
}

generateData().catch(console.error);
