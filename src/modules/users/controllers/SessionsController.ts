import { Request, Response } from "express";
import CreateSessionService from "../services/CreateSessionService";

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body as unknown as { email: string, password: string };

    const createUser = new CreateSessionService();
    const user = await createUser.execute({ email, password });

    return res.json(user);
  }
}
