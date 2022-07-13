require('dotenv').config();
const mongoose = require('mongoose');
const mongoDB = process.env.MONGO_CONNECTION_URL;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true, }).then(() => {
    console.log('connected');
}).catch(err => console.log(err));

