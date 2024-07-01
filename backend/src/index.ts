import express, {Request, Response} from 'express'
import "dotenv/config";
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/users';

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

// Create express instance
const app = express();

//Set up API body as json object
app.use(express.json());

app.use(express.urlencoded({extended: true}));
app.use(cors());

// app.get("/test", async (req: Request, res: Response) => {
//     res.json({message: "Testing API with Express and TypeScript."});
// });

//Handle user routes
app.use("/api/users", userRoutes);

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});