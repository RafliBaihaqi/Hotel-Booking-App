import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.get("/me", verifyToken, async (req: Request, res: Response) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      res.status(400).json({ message: "user not found" });
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Oops! Something went wrong" });
  }
});

// @route POST /api/users/register
router.post(
  "/register",
  [
    check("firstName", "First name is required").isString(),
    check("lastName", "Last name is required").isString(),
    check("email", "Email is required").isEmail(),
    check(
      "password",
      "Password length with 6 or more character required"
    ).isLength({ min: 6 }),
  ],

  // @desc Register a new user
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Check if the user already exists
    try {
      let user = await User.findOne({
        email: req.body.email,
      });
      // If the user exists, return an error
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }
      // If the user does not exist, create a new user
      user = new User(req.body);
      await user.save();
      // Return a success message
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "1d" }
      );
      // Send the token in a cookie
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });

      // Send the user object as response
      return res.status(200).send({ message: "User Registered!" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Oops! Something went wrong" });
    }
  }
);

export default router;
