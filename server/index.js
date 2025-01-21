// import express from 'express'
// import dotenv from 'dotenv'
// import cors from 'cors'
// import cookieParser from 'cookie-parser'
// dotenv.config()
// import { UserRouter } from './routes/User.js'
// import { mongoose } from 'mongoose'

// const app = express()
// app.use(express.json())
// app.use(cors({ origin: "http://localhost:5173", credentials: true}));
// // app.use(cors({
// //     origin: 'http://localhost:5173', // Frontend's address
// //     methods: ['GET', 'POST', 'PUT', 'DELETE'],
// //   }));
// app.use(cookieParser())

// app.use('/auth', UserRouter)

// mongoose.connect('mongodb://127.0.0.1:27017/authentication')


// app.listen(process.env.PORT, ()=>{
    
//         console.log(`Server running on ${process.env.PORT}`)   
      
// })








import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { UserRouter } from './routes/User.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // Update origin for production
app.use(cookieParser());

// Routes
app.use('/auth', UserRouter);

// MongoDB Atlas Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,  // Optional in mongoose 6+
    useUnifiedTopology: true, // Optional in mongoose 6+
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Failed to connect to MongoDB', err));

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
