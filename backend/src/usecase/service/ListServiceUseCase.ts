import { Injectable } from "@nestjs/common";
import { Service } from "@prisma/client";
import { ServiceRepository } from "src/domain/ServiceRepository";

@Injectable()
export class ListServiceUseCase{
    constructor(private readonly servicerepository: ServiceRepository){}

    async execute():Promise<Service[]>{
        return this.servicerepository.findAll()
    }
}