import { NextFunction, Request, Response } from "express-serve-static-core";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies["auth_token"];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized access token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string); //Verify the token is created by us
    req.userId = (decoded as JwtPayload).userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized access token" });
  }
};

export default verifyToken;