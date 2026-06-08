import { AddressRepository, Create } from 'src/domain/AddressRepository';
import { PrismaRemoteRepository } from './PrismaRemoteRepository';
import { Address } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaAddressRepository implements AddressRepository {
  constructor(private readonly repository: PrismaRemoteRepository) {}

  async create({
    customerId,
    street,
    number,
    complement,
    neighborhood,
    postCode,
    city,
    state,
  }: Create): Promise<Address> {
    return this.repository.address.create({
      data: {
        customerId,
        street,
        number,
        complement,
        neighborhood,
        postCode,
        city,
        state,
      },
    });
  }
}
