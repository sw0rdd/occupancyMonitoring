import express from 'express';
import logger from 'morgan';
import mongoose from 'mongoose';
import expressLayout from 'express-ejs-layouts';
import Occupancy from './model/people_count.js';
import occupancyRoute from './route/router.js';


import dotenv from 'dotenv';

dotenv.config();

const app = express();  

app.set('view engine', 'ejs');


mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB...')
  }).catch((err) => {
    console.log('Error connecting to MongoDB', err)
  })

app.use(logger('dev'))
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('layout', 'layouts/layout')
app.use(expressLayout)


// get route 
app.use('/', occupancyRoute)

// post route
app.use('/api/occupancy', occupancyRoute) 



export default (port = process.env.PORT || 3000) => {
    app.listen(port, '0.0.0.0', () => {
        console.log(`Listening on port ${port} on all network interfaces`)
    })
}
      