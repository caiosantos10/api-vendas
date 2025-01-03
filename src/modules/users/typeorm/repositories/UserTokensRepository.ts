import { EntityRepository, Repository } from "typeorm";
import UserToken from "../entities/UserToken";

@EntityRepository(UserToken)
export default class UserRepository extends Repository<UserToken> {
  public async findByName(token: string): Promise<UserToken | undefined> {
    const userToken = await this.findOne({ where: { token } });

    return userToken;
  }
  public async generate(user_id: string): Promise<UserToken | undefined> {
    const userToken = await this.create({ user_id });

    await this.save(userToken)

    return userToken;
  }
}
