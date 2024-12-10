import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import UserRepository from "../typeorm/repositories/UserRepository";
import User from "../typeorm/entities/User";
import { hash } from "bcryptjs";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UserRepository);
    const emailExists = await usersRepository.findByEmail(email);

    const hashedPassword = await hash(password, 8);

    if (!!emailExists) {
      throw new AppError('Email address already used.')
    }

    const user = await usersRepository.create({ name, email, password: hashedPassword });

    await usersRepository.save(user);

    return user;
  }
}
