import { Injectable } from "@nestjs/common";
import { OrderServiceRepository, OrderServices } from "src/domain/OrderServiceRepository";

@Injectable()
export class ListOrderServiceUseCase{
    constructor(private readonly orderServiceRepository: OrderServiceRepository){}

    async execute():Promise<OrderServices[]>{
        return this.orderServiceRepository.findAll();
    }
}