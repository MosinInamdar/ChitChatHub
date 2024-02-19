import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';

import connectToMongoDB from './db/connectToMongoDb.js';

const app = express();
const PORT = process.env.PORT || 5000

dotenv.config();

app.use(express.json());//to parse the incoming request from json payloads(from req.body of auth.controller) 
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/user",userRoutes);

// app.get('/',(req,res)=>{
    //root route http://localhost:5000
//     res.send("Hello");
// })


app.listen(PORT, ()=>{
    connectToMongoDB();
    console.log(`Server is listing on ${PORT}`);
})
