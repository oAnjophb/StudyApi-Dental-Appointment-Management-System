import { Request, Response } from "express";
import { AuthService } from "./auth.service";

export class AuthController {
  handleLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const authService = new AuthService();

    try {
      const result = await authService.authenticate({
        email,
        password,
      });

      return res.json(result);
    } catch (error) {
      if (error instanceof Error)
        return res.status(401).json({ error: error.message });
    }
    return res.status(500).json({ error: "Unexpected error" });
  };

  handleError = async (req: Request, res: Response) => {};
}
