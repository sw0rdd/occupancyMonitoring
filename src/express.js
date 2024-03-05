import express from 'express';
import logger from 'morgan';
import mongoose from 'mongoose';
import expressLayout from 'express-ejs-layouts';
import webRouter from './route/webRoutes.js';
import apiRouter from './route/apiRoutes.js';
import { initIo } from './socket.js';
import {createServer} from 'http';


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

app.set('layout', 'layouts/layout')
app.use(express.static('public'))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(expressLayout)


// Use API and Web routes
app.use('/api', apiRouter);
app.use('/', webRouter);



export default (port = process.env.PORT || 3000) => {
  const httpServer = createServer(app)
  initIo(httpServer)

  httpServer.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
}
