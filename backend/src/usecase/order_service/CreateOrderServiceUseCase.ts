import { Injectable } from "@nestjs/common";
import { OrderService, OrderServiceStatus } from "@prisma/client";
import { OrderServiceRepository } from "src/domain/OrderServiceRepository";
import { ServiceOrderServiceRepository } from "src/domain/ServiceOrderServiceRepository";
import { ServiceIdsRequires } from "src/shared/erros/cases/ServiceIdsRequired";

interface Request{
    vehicleUserId: string;
    date: Date;
    addressId: string;
    serviceIds:string[];
    
}

@Injectable()
export class CreateOrderSericeUseCase{
    constructor(
        private readonly orderServiceRepository: OrderServiceRepository,
        private readonly serviceOrderServiceRepository: ServiceOrderServiceRepository
    ){}

    async execute({vehicleUserId, date, addressId, serviceIds}):Promise<OrderService>{
        if(serviceIds.length===0){
            throw new ServiceIdsRequires();
        }

        const orderService = await this.orderServiceRepository.create({
            vehicleUserId,
            date,
            status: OrderServiceStatus.AVAILABLE,
            addressId,
        })

        for(const serviceId of serviceIds){
            await this.serviceOrderServiceRepository.create({
                orderServiceId: orderService.id,
                serviceId
            })
        }

        return orderService;
    }
}