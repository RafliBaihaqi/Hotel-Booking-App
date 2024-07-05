"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
//Step 1: Create login route
router.post("/login", 
//Step 2: Create field check
[
    (0, express_validator_1.check)("email", "Email is required").isEmail(),
    (0, express_validator_1.check)("password", "Password is required").isLength({ min: 6 }),
], 
//Step 3: Create  response if the field is empty
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //Step 4: Extract email and password from the request body
    const { email, password } = req.body;
    try {
        //Step 5: Check if the email exists
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        //Step 6: Check password is matches
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        //Step 7: Create access token
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
        //Step 8: Create Cookie
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
        });
        res.status(200).json({ userId: user._id });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Oops! Something went wrong" });
    }
}));
//Check cookie validity
router.get("/validate-token", auth_1.default, (req, res) => {
    res.status(200).send({ userId: req.userId });
});
router.post("/logout", (req, res) => {
    res.cookie("auth_token", "", {
        expires: new Date(0),
    });
    res.send();
});
exports.default = router;
