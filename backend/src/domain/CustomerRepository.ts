import { Address, Contact, Customer, Identification, IdentificationType } from "@prisma/client";

export interface Create {
    name: string;
    type: IdentificationType;
    value: string;
}

export type Customers = Customer &{identification: Identification, address: Address[], contact: Contact[]}

export abstract class CustomerRepository {
    abstract create({name, type, value}: Create):Promise<Customer>;
    abstract findAll():Promise<Customers[]>;
}