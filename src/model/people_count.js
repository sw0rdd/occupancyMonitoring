import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();



// Occupancy data schema 
const occupancySchema = new mongoose.Schema({
    zone: String,
    occupancy: Number,
    timestamp: Date
});


export default mongoose.model('Occupancy', occupancySchema);

// const occupancySchema = new mongoose.Schema({
//     zone: { type: String, unique: true }, // Ensure zone names are unique
//     occupancy: Number,
//     timestamp: { type: Date, default: Date.now } // Automatically set to the current time on update
// });