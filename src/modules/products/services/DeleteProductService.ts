import { getCustomRepository } from "typeorm";
import { ProductsRepository } from "../typeorm/repositores/ProductsRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  id: string;
}

export default class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found');
    }

    await productsRepository.remove(product);
  }
}
