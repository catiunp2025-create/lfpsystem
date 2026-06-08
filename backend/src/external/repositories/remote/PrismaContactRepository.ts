import {
  ContactRepository,
  Create,
  FindBy,
} from 'src/domain/ContactRepository';
import { PrismaRemoteRepository } from './PrismaRemoteRepository';
import { Contact } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaContactRepository implements ContactRepository {
  constructor(private readonly repository: PrismaRemoteRepository) {}

  async create({ customerId, type, value }: Create): Promise<Contact> {
    return this.repository.contact.create({
      data: { customerId, type, value },
    });
  }

  async findBy({ customerId, value }: FindBy): Promise<Contact | null> {
    return this.repository.contact.findFirst({
      where: { customerId, value },
    });
  }
}
