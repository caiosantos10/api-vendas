import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { hash } from "bcryptjs";
import Customer from "../typeorm/entities/Customer";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";

interface IRequest {
  name: string;
  email: string;
}

export default class CreateCustomerService {
  public async execute({ name, email }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const emailExists = await customersRepository.findByEmail(email);

    if (!!emailExists) {
      throw new AppError('Email address already used.')
    }

    const customer = await customersRepository.create({ name, email });

    await customersRepository.save(customer);

    return customer;
  }
}
