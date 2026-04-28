import { Customer, IdentificationType } from "@prisma/client";

export interface Create {
    name: string;
    type: IdentificationType;
    value: string;
}

export abstract class CustomerRepository {
    abstract create({name, type, value}: Create):Promise<Customer>;
}