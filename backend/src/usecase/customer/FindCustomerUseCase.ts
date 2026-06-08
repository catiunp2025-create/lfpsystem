import { Injectable } from '@nestjs/common';
import { CustomerRepository } from 'src/domain/CustomerRepository';
import { CustomerNotFound } from 'src/shared/erros/cases/CustomerNotFound';

interface Request {
  id: string;
}

@Injectable()
export class FindCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute({ id }: Request) {
    const customer = await this.customerRepository.findById({ id });

    if (!customer) {
      throw new CustomerNotFound();
    }

    return customer;
  }
}
