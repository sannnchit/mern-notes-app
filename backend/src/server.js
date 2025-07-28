import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';    
import ratelimit from 'express-rate-limit';
import notesRoutes from "./routes/notesRoutes.js";
import {connectDB} from "./config/db.js";

dotenv.config();
const app=express();
const port= process.env.PORT || 3000;

const limiter = ratelimit({
    windowMs: 60*1000,
    max: 25,
    message: 'Too many requests! Please wait for a minute.',
    standardHeaders: true,
    legacyHeaders: false
});

app.use(cors());
app.use(express.json());
app.use(limiter);
app.use('/api/notes',notesRoutes);

connectDB().then(()=>{
    app.listen(port, ()=>{
        console.log("Server started on port:",port);
    });
});

