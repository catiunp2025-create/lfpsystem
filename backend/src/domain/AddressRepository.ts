import { Address } from '@prisma/client';

export interface Create {
  customerId: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  postCode: string;
  city: string;
  state: string;
}

export abstract class AddressRepository {
  abstract create({
    customerId,
    street,
    number,
    complement,
    neighborhood,
    postCode,
    city,
    state,
  }: Create): Promise<Address>;
}
