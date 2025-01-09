import { getCustomRepository } from "typeorm";
import UserRepository from "../typeorm/repositories/UserRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";
import AppError from "@shared/errors/AppError";
import EtherealMail from "@config/mail/EtherealMail";

interface IRequest {
  email: string;
}

export default class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UserRepository);
    const userTokenRepository = getCustomRepository(UserTokensRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) throw new AppError('User does not exists');

    const { token } = await userTokenRepository.generate(user.id);

    // console.log(token);

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[API Vendas] Recuperação de senha',
      templateData: {
        template: `Olá {{name}}: {{token}}`,
        variables: {
          name: user?.name,
          token,
        }
      }
    });
  }
}
