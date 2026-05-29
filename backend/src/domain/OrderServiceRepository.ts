import { OrderService, OrderServiceStatus, Prisma } from "@prisma/client";

export interface CreateOrderService{
    vehicleUserId: string;
    date: Date;
    addressId: string;
    status: OrderServiceStatus
}

export type OrderServices = Prisma.OrderServiceGetPayload<{
    include:{
        vehicleUser:{
            include:{
                vehicle: true,
                user: true
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

export abstract class OrderServiceRepository{
    abstract create({vehicleUserId, date, addressId, status}: CreateOrderService):Promise<OrderService>
    abstract findAll():Promise<OrderServices[]>
    abstract findById({id}: FindById):Promise<OrderServices | null>
}