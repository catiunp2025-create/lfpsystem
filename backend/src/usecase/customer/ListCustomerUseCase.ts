import { Injectable } from '@nestjs/common';
import { CustomerRepository, Customers } from 'src/domain/CustomerRepository';

@Injectable()
export class ListCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(): Promise<Customers[]> {
    return this.customerRepository.findAll();
  }
}
