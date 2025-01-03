import { getCustomRepository } from "typeorm";
import UserRepository from "../typeorm/repositories/UserRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";
import AppError from "@shared/errors/AppError";
import { isAfter, addHours } from "date-fns";
import { hash } from "bcryptjs";

interface IRequest {
  token: string;
  password: string;
}

const TOKEN_EXPIRES_IN = 2;

export default class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UserRepository);
    const userTokenRepository = getCustomRepository(UserTokensRepository);

    const userToken = await userTokenRepository.findByToken(token);
    if (!userToken) throw new AppError('User Token does not exists');

    const user = await usersRepository.findById(userToken.user_id);
    if (!user) throw new AppError('User does not existis');

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, TOKEN_EXPIRES_IN);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired.');
    }

    user.password = await hash(password, 8);
  }
}
