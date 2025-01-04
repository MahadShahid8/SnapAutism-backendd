import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from "cookie-parser";
import {ConsultationManagmentRouter} from './routes/ConsultationRequestManagement.js'
import { setupAdmins,loginAdmin } from './controllers/adminController.js';


// same connection string as that of the app
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Connected to MongoDB Atlas")
  setupAdmins();
})
.catch((err) => {
  console.log("MongoDB Connection Error:", err)
});


const app = express()
const port = 3000


const corsOptions = {
    origin: ['http://localhost:8082', 'http://192.168.1.5:8082', 'http://localhost:3001'],
    credentials: true,
  };

app.use(cors(corsOptions));

app.use(express.json())
app.use(cookieParser())

app.use('/consultationManagement',ConsultationManagmentRouter) 
app.use('/loginAdmin',loginAdmin)

app.get('/', (req, res) => {
    res.send('API is running...');
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${[port]}`)
})