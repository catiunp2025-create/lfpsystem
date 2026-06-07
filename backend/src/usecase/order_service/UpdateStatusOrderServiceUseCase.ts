import { Injectable } from "@nestjs/common";
import { OrderService, OrderServiceStatus } from "@prisma/client";
import { OrderServiceRepository } from "src/domain/OrderServiceRepository";
import { OrderServiceAlreadyFinished } from "src/shared/erros/cases/OrderServiceAlreadyFinished";
import { OrderServiceNotFound } from "src/shared/erros/cases/OrderServiceNotFound";

interface Request {
    id: string;
    status: OrderServiceStatus;
}

@Injectable()
export class UpdateStatusOrderServiceUseCase{
    constructor(private readonly orderServiceRepository: OrderServiceRepository){}

    async execute({id, status}: Request): Promise<OrderService> {
        const orderService = await this.orderServiceRepository.findById({id});

        if(!orderService){
            throw new OrderServiceNotFound();
        }

        if(orderService.status == OrderServiceStatus.FINISHED){
            throw new OrderServiceAlreadyFinished();
        }

        return this.orderServiceRepository.updateStatus({id, status});
    }

}