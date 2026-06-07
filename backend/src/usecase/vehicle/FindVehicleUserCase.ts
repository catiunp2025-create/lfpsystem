import { Injectable } from "@nestjs/common";
import { VehicleRepository } from "src/domain/VehicleRepository";
import { VehicleNotFound } from "src/shared/erros/cases/VehicleNotFound";

interface Request {
    id: string;
}

@Injectable()
export class FindVehicleUseCase{
    constructor(private readonly vehicleRepository: VehicleRepository){}

    async execute({id}: Request){
        const vehicle = await this.vehicleRepository.findById({id});

        if(!vehicle){
            throw new VehicleNotFound();
        }

        return vehicle;
    }
}