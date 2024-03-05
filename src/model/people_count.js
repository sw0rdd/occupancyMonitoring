import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();



// Occupancy data schema 
// const occupancySchema = new mongoose.Schema({
//     zone: String,
//     occupancy: Number,
//     timestamp: Date
// });


const occupancySchema = new mongoose.Schema({
  entry: {
    type: Number,
    required: true
  },
  groundFloor: {
    type: Number,
    required: true
  },
  secondFloor: {
    type: Number,
    required: true
  },
  // Calculated field for first floor, not stored in DB but derived from other values
  timestamp: {
    type: Date,
    default: Date.now
  }
});

occupancySchema.virtual('firstFloor').get(function() {
  // Assuming 'entry' is the total count of people in the library
  return this.entry - this.groundFloor - this.secondFloor;
});



export default mongoose.model('Occupancy', occupancySchema);



