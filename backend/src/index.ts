import express, { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";
import path from "path";


mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => 
  console.log("Connected to Database:", process.env.MONGODB_CONNECTION_STRING)
);

// Create express instance
const app = express();

//Set up API body as json object
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://mern-booking-app-3qdq.onrender.com"  || process.env.FRONTEND_URL,
    credentials: true,
  })
);

//Handle user routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use(express.static(path.join(__dirname,"../../frontend/dist")));//Serve static assets

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
