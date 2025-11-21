import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface Ipayload {
  sub: string;
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization;

  if (!authToken)
    return res.status(401).json({
      error: "Token is missing",
      code: "token.missing",
    });

  const [, token] = authToken.split(" ");

  try {
    const secret = process.env.JWT_SECRET;

    if (!secret) throw new Error("JWT_SECRET not found env");

    const { sub } = verify(token, secret) as Ipayload;
    req.user_id = sub;

    return next();
  } catch (error) {
    return res.status(401).json({
      error: "Token invalid or expired",
      code: "token.expired",
    });
  }
}
