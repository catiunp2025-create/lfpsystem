import { OrderService } from "@prisma/client";
import { PrismaRemoteRepository } from "./PrismaRemoteRepository";
import { Injectable } from "@nestjs/common";
import { CreateOrderService, OrderServiceRepository } from "src/domain/OrderServiceRepository";

@Injectable()
export class PrismaOrderServiceRepository implements OrderServiceRepository{
    constructor(private readonly repository: PrismaRemoteRepository){}

    create({vehicleUserId, date, addressId, status}:CreateOrderService):Promise<OrderService>{
        return this.repository.orderService.create({
            data:{vehicleUserId, date, addressId, status}
        })
    }
}