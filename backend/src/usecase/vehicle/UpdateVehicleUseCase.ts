import { Injectable } from '@nestjs/common';
import { Vehicle } from '@prisma/client';
import { VehicleRepository } from 'src/domain/VehicleRepository';
import { PlateAlreadyExists } from 'src/shared/erros/cases/PlateAlreadyExists';
import { VehicleNotFound } from 'src/shared/erros/cases/VehicleNotFound';

interface Request {
  id: string;
  model?: string;
  plate: string;
  color?: string;
}

@Injectable()
export class UpdateVehicleUseCase {
  constructor(private readonly vehicleRepository: VehicleRepository) {}

  async execute({ id, model, plate, color }: Request): Promise<Vehicle> {
    const existingVehicle = await this.vehicleRepository.findById({ id });

    if (!existingVehicle) {
      throw new VehicleNotFound();
    }

    const plateAlreadyExists = await this.vehicleRepository.findByPlate({
      plate,
    });

    if (plateAlreadyExists && plateAlreadyExists.id !== id) {
      throw new PlateAlreadyExists();
    }

    return this.vehicleRepository.update({ id, model, plate, color });
  }
}
