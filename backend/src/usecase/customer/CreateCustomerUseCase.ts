import { Injectable } from '@nestjs/common';
import { Customer, IdentificationType } from '@prisma/client';
import { CustomerRepository } from 'src/domain/CustomerRepository';
import { IdentificationRepository } from 'src/domain/IdentificationRepository';
import { IdentificationAlreadyExists } from 'src/shared/erros/cases/IdentificationAlreadyExists';

interface Request {
  name: string;
  type: IdentificationType;
  value: string;
}

@Injectable()
export class CreateCustomerUseCase {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly identificationRepository: IdentificationRepository,
  ) {}

  async execute({ name, type, value }: Request): Promise<Customer> {
    const valueAlreadyExists = await this.identificationRepository.findByValue({
      value,
    });

    if (valueAlreadyExists) {
      throw new IdentificationAlreadyExists();
    }

    return await this.customerRepository.create({
      name,
      type,
      value,
    });
  }
}
