"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = __importDefault(require("./routes/users"));
const auth_1 = __importDefault(require("./routes/auth"));
const my_hotels_1 = __importDefault(require("./routes/my-hotels")); // Import myHotelsRoutes module
const hotels_1 = __importDefault(require("./routes/hotels")); // Import hotelRoutes
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
mongoose_1.default
    .connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => console.log("Connected to Database:", process.env.MONGODB_CONNECTION_STRING));
// Create express instance
const app = (0, express_1.default)();
//Set up API body as json object
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: "" || process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(express_1.default.static(path_1.default.join(__dirname, "../../frontend/dist"))); //Serve static assets
//Handle user routes
app.use("/api/users", users_1.default);
app.use("/api/auth", auth_1.default);
app.use("/api/my-hotels", my_hotels_1.default);
app.use("/api/hotels", hotels_1.default);
//Pass on any req to our url that are not endpoint and let the react-router-dom
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../../frontend/dist/index.html"));
});
app.listen(5000, () => {
    console.log("Server is running on localhosts:5000");
});
