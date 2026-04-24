import { Injectable } from "@nestjs/common";
import { Vehicle } from "@prisma/client";
import { VehicleRepository } from "src/domain/VehicleRepository";
import { PlateAlreadyExists } from "src/shared/erros/cases/PlateAlreadyExists";

interface Request{
    model: string;
    plate: string;
    color: string;
}

@Injectable()
export class CreateVehicleUseCase{
    constructor(private readonly vehicleRepository: VehicleRepository){}

    async execute({model, plate, color}: Request): Promise<Vehicle>{
        const plateAlreadyExists = await this.vehicleRepository.findByPlate({plate});

        if(plateAlreadyExists){
            throw new PlateAlreadyExists();
        }

        return this.vehicleRepository.create({
            model, 
            plate, 
            color
        });
    }
}