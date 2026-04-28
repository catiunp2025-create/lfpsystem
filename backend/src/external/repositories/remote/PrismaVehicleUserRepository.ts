import { Injectable } from "@nestjs/common";
import { VehicleUser } from "@prisma/client";
import { Create, FindBy, VehicleUserRepository } from "src/domain/VehicleUserRepository";
import { PrismaRemoteRepository } from "./PrismaRemoteRepository";

@Injectable()
export class PrismaVehicleUserRepository implements VehicleUserRepository{
    constructor(private readonly repository: PrismaRemoteRepository){}

    create({vehicleId, userId, type}:Create):Promise<VehicleUser>{
        return this.repository.extended.vehicleUser.create({
            data:{vehicleId, userId, type}
        }) as Promise<VehicleUser>;
    }

    findBy({ vehicleId, userId }: FindBy): Promise<VehicleUser | null> {
        return this.repository.vehicleUser.findFirst({where:{vehicleId, userId}});
    }
}