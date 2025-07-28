import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';    
import ratelimit from 'express-rate-limit';
import path from 'path';
import notesRoutes from "./routes/notesRoutes.js";
import {connectDB} from "./config/db.js";

dotenv.config();
const app=express();
const port= process.env.PORT || 3000;
const __dirname = path.resolve();

if(process.env.NODE_ENV !== 'production'){
    app.use(cors());
}

const limiter = ratelimit({
    windowMs: 60*1000,
    max: 25,
    message: 'Too many requests! Please wait for a minute.',
    standardHeaders: true,
    legacyHeaders: false
});

app.use(express.json());
app.use(limiter);
app.use('/api/notes',notesRoutes);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    try {
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
    });
  } catch (err) {
    console.error("Error in wildcard route:", err);
  }
}

connectDB().then(()=>{
    app.listen(port, ()=>{
        console.log("Server started on port:",port);
    });
});

