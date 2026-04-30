import { Injectable } from "@nestjs/common";
import { Vehicle } from "@prisma/client";
import { VehicleRepository } from "src/domain/VehicleRepository";

@Injectable()
export class ListVehicleUseCase {
    constructor(private readonly vehicleRepository: VehicleRepository){}

    async execute():Promise<Vehicle[]>{
        return this.vehicleRepository.findAll();
    }
}