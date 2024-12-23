import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
import ListUserService from "../services/ListUserService";

export default class UsersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listUser = new ListUserService();
    const users = await listUser.execute();

    return res.json(users);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body as unknown as { name: string, email: string, password: string };

    const createUser = new CreateUserService();
    const user = await createUser.execute({ name, email, password });

    return res.json(user);
  }
}
