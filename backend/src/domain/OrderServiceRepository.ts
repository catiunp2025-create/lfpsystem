import { OrderService, OrderServiceStatus, Prisma } from "@prisma/client";

export interface CreateOrderService{
    date: Date;
    addressId: string;
    status: OrderServiceStatus
}

export type OrderServices = Prisma.OrderServiceGetPayload<{
    include:{
        vehicleUsers:{
            include:{
                vehicleUser:{
                    include:{
                        vehicle: true,
                        user: true
                    }
                }
            }
        },
        address:{
            include:{
                customer:{
                    include:{
                        contact: true
                    }
                }
            }
        },
        services:{
            include:{
                service:true
            }
        }
    }
}>

export interface FindById{
    id: string;
}

export interface UpdateStatus{
    id: string;
    status: OrderServiceStatus;
}

export abstract class OrderServiceRepository{
    abstract create({date, addressId, status}: CreateOrderService):Promise<OrderService>
    abstract findAll():Promise<OrderServices[]>
    abstract findById({id}: FindById):Promise<OrderServices | null>
    abstract updateStatus({id, status}: UpdateStatus):Promise<OrderService>
}