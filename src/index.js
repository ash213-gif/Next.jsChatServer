// Simple Express server with Socket.io for real-time chat
const express = require('express');
require('dotenv').config()
const routes =require('./routes/routes')
const message =require('./routes/chatroute')
const mongoose =require('mongoose')
const cors = require('cors');
const { Socket } = require('socket.io');


const app = express();
app.use(express.json())
app.use(cors());


mongoose.connect(process.env.MongoDburl)
  .then(() => { console.log('mongoDB is connected'); }) 
  .catch((e) => {  console.error('mongoose not connected'); });
  
const port = process.env.Port || 4040;

app.use('/',routes )
app.use('/message',message)

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});