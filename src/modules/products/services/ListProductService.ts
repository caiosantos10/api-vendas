import { getCustomRepository } from "typeorm";
import { ProductsRepository } from "../typeorm/repositores/ProductsRepository";
import Product from "../typeorm/entities/Product";

export default class ListProductService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductsRepository);
    const products = await productsRepository.find();
    return products;
  }
}
