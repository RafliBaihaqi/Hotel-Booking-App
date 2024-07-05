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
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
mongoose_1.default.connect(process.env.MONGODB_CONNECTION_STRING).then(() => console.log("Connected to Database:", process.env.MONGODB_CONNECTION_STRING));
// Create express instance
const app = (0, express_1.default)();
//Set up API body as json object
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
// app.get("/test", async (req: Request, res: Response) => {
//     res.json({message: "Testing API with Express and TypeScript."});
// });
//Handle user routes
app.use("/api/users", users_1.default);
app.use("/api/auth", auth_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, "../../frontend/dist"))); //Serve static assets
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
