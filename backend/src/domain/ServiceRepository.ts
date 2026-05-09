import { Service } from "@prisma/client";

export interface Create {
    name: string;
    value: number;
    description?: string;
}

export interface FindByName {
    name: string;
}

export abstract class ServiceRepository{
    abstract create({name, value, description}:Create):Promise<Service>;
    abstract findByName({name}:FindByName):Promise<Service | null>;
    abstract findAll():Promise<Service[]>;
}