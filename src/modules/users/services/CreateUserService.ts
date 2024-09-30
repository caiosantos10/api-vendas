import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import UserRepository from "../typeorm/repositories/UserRepository";
import User from "../typeorm/entities/User";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UserRepository);
    const emailExists = await usersRepository.findByEmail(email);

    if (!!emailExists) {
      throw new AppError('Email address already used.')
    }

    const user = await usersRepository.create({ name, email, password });

    await usersRepository.save(user);

    return user;
  }
}
