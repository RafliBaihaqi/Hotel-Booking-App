import express, { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import myHotelsRoutes from "./routes/my-hotels"; // Import myHotelsRoutes module
import hotelRoutes from "./routes/hotels"; // Import hotelRoutes
import bookingRoutes from "./routes/my-booking"; // Import bookingRoutes
import cookieParser from "cookie-parser";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() =>
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
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://frontend-service",
        "http://167.86.71.68:8081",
        "http://167.86.71.68:30050",
        "http://167.86.71.68:5001"
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    credentials: true,
  })
);

app.options("*", cors());
//Handle user routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/my-hotels", myHotelsRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/my-bookings", bookingRoutes);

// app.use(express.static(path.join(__dirname, "../../frontend/dist"))); //Serve static assets

// //Pass on any req to our url that are not endpoint and let the react-router-dom
// app.get("*", (req: Request, res: Response) => {
//   res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
// });

app.listen(5000, "0.0.0.0", () => {
  console.log("Server is running on port 5000");
});

