import { OrderService } from "@prisma/client";
import { PrismaRemoteRepository } from "./PrismaRemoteRepository";
import { Injectable } from "@nestjs/common";
import { CreateOrderService, FindById, OrderServiceRepository, OrderServices, UpdateStatus } from "src/domain/OrderServiceRepository";

@Injectable()
export class PrismaOrderServiceRepository implements OrderServiceRepository{
    constructor(private readonly repository: PrismaRemoteRepository){}

    create({vehicleUserId, date, addressId, status}:CreateOrderService):Promise<OrderService>{
        return this.repository.orderService.create({
            data:{vehicleUserId, date, addressId, status}
        })
    }

    findAll(): Promise<OrderServices[]> {
        return this.repository.orderService.findMany({
            include:{
                vehicleUser:{
                    include:{
                        vehicle:true,
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
                        service: true
                    }
                }
            }
        });
    }

    findById({id}: FindById): Promise<OrderServices | null> {
        return this.repository.orderService.findFirst({
            where:{id},
            include:{
                vehicleUser:{
                    include:{
                        vehicle:true,
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
                        service: true
                    }
                }
            }
        });
    }

    updateStatus({id, status}: UpdateStatus): Promise<OrderService> {
        return this.repository.orderService.update({
            where:{id},
            data:{status}
        })
    }
}