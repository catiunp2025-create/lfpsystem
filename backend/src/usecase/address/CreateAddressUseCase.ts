import { Injectable } from '@nestjs/common';
import { Address } from '@prisma/client';
import { AddressRepository } from 'src/domain/AddressRepository';

interface Request {
  customerId: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  postCode: string;
  city: string;
  state: string;
}

@Injectable()
export class CreateAddressUseCase {
  constructor(private readonly addressRepository: AddressRepository) {}

  async execute({
    customerId,
    street,
    number,
    complement,
    neighborhood,
    postCode,
    city,
    state,
  }: Request): Promise<Address> {
    return this.addressRepository.create({
      customerId,
      street,
      number,
      complement,
      neighborhood,
      postCode,
      city,
      state,
    });
  }
}
