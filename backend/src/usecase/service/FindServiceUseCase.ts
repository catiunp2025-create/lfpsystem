import { Injectable } from "@nestjs/common";
import { ServiceRepository } from "src/domain/ServiceRepository";
import { ServiceNotFound } from "src/shared/erros/cases/ServiceNotFound";

interface Request {
    id: string;
}

@Injectable()
export class FindServiceUseCase{
    constructor(private readonly serviceRepository: ServiceRepository){}

    async execute({id}: Request){
        const service = await this.serviceRepository.findById({id});
        if(!service){
            throw new ServiceNotFound();
        }
        return service;
    }
}