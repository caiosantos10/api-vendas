import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import UserRepository from "../typeorm/repositories/UserRepository";
import User from "../typeorm/entities/User";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IRequest {
  email: string;
  password: string;
}
interface IResponse {
  user: User;
  token: string;
}

export default class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UserRepository);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.');
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination.');
    }

    const token = sign({}, '155e7bf674b6b8eef41afce949af5ee9', {
      subject: user.id,
      expiresIn: '1d'
    });

    return {
      user,
      token,
    };
  }
}
