import { job } from './scheduledTasks/subscriptionChecker';


require('./scheduledTasks/subscriptionChecker')

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const subscriptionRoutes = require('./router');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', subscriptionRoutes);


//MongoDB connection 
mongoose.connect(process.env.MONGODB_URI)
.then(()=> console.log('MongoDB connected'))
.catch((err: Error) => console.error('Could not connect to MongoDB...', err));

job.start();

const port = process.env.port || 3000;
app.listen(port, ()=>{
 console.log(`Server running on port ${port}`)
})
