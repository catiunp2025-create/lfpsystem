import { Injectable } from '@nestjs/common';
import { Service } from '@prisma/client';
import { ServiceRepository } from 'src/domain/ServiceRepository';
import { ServiceAlreadyExists } from 'src/shared/erros/cases/ServiceAlreadyExists';

interface Request {
  name: string;
  value: number;
  description?: string;
}

@Injectable()
export class CreateServiceUseCase {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async execute({ name, value, description }: Request): Promise<Service> {
    const serviceAlreadyExists = await this.serviceRepository.findByName({
      name,
    });

    if (serviceAlreadyExists) {
      throw new ServiceAlreadyExists();
    }

    return this.serviceRepository.create({
      name,
      value,
      description,
    });
  }
}
