import { Injectable } from "@nestjs/common";
import { OrderService, OrderServiceStatus } from "@prisma/client";
import { OrderServiceRepository } from "src/domain/OrderServiceRepository";
import { ServiceOrderServiceRepository } from "src/domain/ServiceOrderServiceRepository";
import { VehicleUserOrderServiceRepository } from "src/domain/VehicleUserOrderServiceRepository";
import { ServiceIdsRequires } from "src/shared/erros/cases/ServiceIdsRequired";

interface Request{
    vehicleUserIds: string[];
    date: Date;
    addressId: string;
    serviceIds: string[];
}

@Injectable()
export class CreateOrderServiceUseCase{
    constructor(
        private readonly orderServiceRepository: OrderServiceRepository,
        private readonly serviceOrderServiceRepository: ServiceOrderServiceRepository,
        private readonly vehicleUserOrderServiceRepository: VehicleUserOrderServiceRepository
    ){}

    async execute({vehicleUserIds, date, addressId, serviceIds}: Request):Promise<OrderService>{
        if(serviceIds.length === 0){
            throw new ServiceIdsRequires();
        }

        const orderService = await this.orderServiceRepository.create({
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

        for(const vehicleUserId of vehicleUserIds){
            await this.vehicleUserOrderServiceRepository.create({
                orderServiceId: orderService.id,
                vehicleUserId
            })
        }

        return orderService;
    }
}