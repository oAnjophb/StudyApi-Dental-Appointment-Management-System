import { Request, Response } from "express";
import { UserService } from "../../services/v1/user.service";

const userService = new UserService();

export class UserController {
  createUser = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;
    try {
      const result = await userService.createUser({
        name,
        email,
        password,
      });
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Unexpected error" });
    }
  };

  getAllUsers = async (req: Request, res: Response) => {
    try {
      const result = await userService.getAllUsers();
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Unexpected error" });
    }
  };
}
