import { Injectable } from "@nestjs/common";
import { Service } from "@prisma/client";
import { ServiceRepository } from "src/domain/ServiceRepository";

@Injectable()
export class ListServiceUseCase{
    constructor(private readonly serviceRepository: ServiceRepository){}

    async execute():Promise<Service[]>{
        return this.serviceRepository.findAll()
    }
}