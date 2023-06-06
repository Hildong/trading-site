import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
require('dotenv').config()

import * as getAPI from './API/get';
import * as postAPI from './API/post';

import { connectToDatabase } from './DB/mongoose'

const app = express();
const port = 8080;

/* Middleware */

//Cors to allow frontend API
app.use(cors({
  credentials: true,
  origin: "http://localhost:3000"
})) 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

connectToDatabase();

app.get('/API/getUser', (req, res) => getAPI.getUserInfo(req, res));
app.get('/API/getTradeHistory', getAPI.getTrades);
app.post('/API/updateUser', postAPI.updateUserInfo);
app.post('/API/buyCrypto', postAPI.buyCrypto);
app.post('/API/sellCrypto', postAPI.sellCrypto);



app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});