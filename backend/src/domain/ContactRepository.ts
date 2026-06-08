import { Contact, ContactType } from '@prisma/client';

export interface Create {
  customerId: string;
  type: ContactType;
  value: string;
}

export interface FindBy {
  customerId: string;
  value: string;
}

export abstract class ContactRepository {
  abstract create({ customerId, type, value }: Create): Promise<Contact>;
  abstract findBy({ customerId, value }: FindBy): Promise<Contact | null>;
}
