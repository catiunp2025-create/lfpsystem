import { Injectable } from "@nestjs/common";
import { OrderServiceRepository } from "src/domain/OrderServiceRepository";
import { OrderServiceNotFound } from "src/shared/erros/cases/OrderServiceNotFound";

interface Request {
    id: string;
}

@Injectable()
export class FindOrderServiceUseCase{
    constructor(private readonly orderServiceRepository: OrderServiceRepository){}

    async execute({id}: Request){
        const orderService = await this.orderServiceRepository.findById({id});

        if(!orderService){
            throw new OrderServiceNotFound();
        }
        
        return orderService;
    }
}