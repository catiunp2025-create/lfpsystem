import { OrderService, OrderServiceStatus } from "@prisma/client";

export interface CreateOrderService{
    vehicleUserId: string;
    date: Date;
    addressId: string;
    status: OrderServiceStatus
}

export abstract class OrderServiceRepository{
    abstract create({vehicleUserId, date, addressId, status}: CreateOrderService):Promise<OrderService>
}