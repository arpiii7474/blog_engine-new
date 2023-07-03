import express from 'express';

import dotenv from 'dotenv';

import cors from 'cors';

import bodyParser from 'body-parser';

import Connection from './database/db.js';

import Router from './routes/route.js';

import path from "path";

const __dirname=path.resolve();

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))
app.use('/', Router);

app.use(express.static(path.join(__dirname,"./client/build")));

app.get("*",function(_,res){
    res.sendFile(path.join(__dirname,"./client/build/index.html"),function(err){
        res.status(500).send(err);
    })
})
const PORT = process.env.PORT || 8000;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const URL=process.env.MONGODB_URI||`mongodb://${username}:${password}@ac-s3b9hr7-shard-00-00.7xnspuh.mongodb.net:27017,ac-s3b9hr7-shard-00-01.7xnspuh.mongodb.net:27017,ac-s3b9hr7-shard-00-02.7xnspuh.mongodb.net:27017/?ssl=true&replicaSet=atlas-2jbrik-shard-0&authSource=admin&retryWrites=true&w=majority`;

Connection(URL);

app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));

