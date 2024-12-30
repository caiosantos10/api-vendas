import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import UserRepository from "../typeorm/repositories/UserRepository";
import User from "../typeorm/entities/User";
import path from "path";
import uploadConfig from "@config/upload";
import fs from "fs";

interface IRequest {
  user_id: string;
  avatarFileName: string;
}

export default class UpdateUserAvatarService {
  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const usersRepository = await getCustomRepository(UserRepository);

    const user = await usersRepository.findById(user_id);

    if (!user) throw new AppError('User not found.');


    /* Caso possua avatar cadastrado, deleta o arquivo da pasta */
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExistis = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExistis) {
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    /* Cadastra avatar */
    user.avatar = avatarFileName;

    await usersRepository.save(user);

    return user;
  }
}
