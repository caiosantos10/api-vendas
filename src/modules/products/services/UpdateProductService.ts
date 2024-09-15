import { getCustomRepository } from "typeorm";
import { ProductsRepository } from "../typeorm/repositores/ProductsRepository";
import Product from "../typeorm/entities/Product";
import AppError from "@shared/errors/AppError";

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default class UpdateProductService {
  public async execute({ id, name, price, quantity }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found');
    }

    const productExists = await productsRepository.findByName(name);

    if (productExists && productExists.id !== id) {
      throw new AppError('There is already one product with this name');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    productsRepository.save(product);

    return product;
  }
}
