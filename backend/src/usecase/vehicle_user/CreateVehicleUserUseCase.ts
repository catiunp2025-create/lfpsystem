import { Injectable } from "@nestjs/common";
import { VehicleUser, VehicleUserType } from "@prisma/client";
import { VehicleUserRepository } from "src/domain/VehicleUserRepository";
import { VehicleUserAlreadyExists } from "src/shared/erros/cases/VehicleUserAlreadyExists";

interface Request{
    vehicleId: string;
    userId: string;
    type: VehicleUserType;
}

@Injectable()
export class CreateVehicleUserUseCase{
    constructor(private readonly vehicleUserRepository: VehicleUserRepository){}

    async execute({vehicleId, userId, type}: Request):Promise<VehicleUser>{
        const vehicleUserAlreadyExists = await this.vehicleUserRepository.findBy({vehicleId, userId});

        if(vehicleUserAlreadyExists){
            throw new VehicleUserAlreadyExists();
        }

        return this.vehicleUserRepository.create({vehicleId, userId, type});
    }
}