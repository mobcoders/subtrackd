import { job } from './scheduledTasks/subscriptionChecker';


require('./scheduledTasks/subscriptionChecker')

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; 
import {router} from './router';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', router);


//MongoDB connection 
mongoose.connect(process.env.MONGODB_URI)
.then(()=> console.log('MongoDB connected'))
.catch((err: Error) => console.error('Could not connect to MongoDB...', err));

job.start();

const port = process.env.port || 3000;
app.listen(port, ()=>{
 console.log(`Server running on port ${port}`)
})
