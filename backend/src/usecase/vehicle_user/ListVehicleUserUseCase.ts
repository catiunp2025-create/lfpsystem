import { Injectable } from '@nestjs/common';
import {
  FindAll,
  VehicleUserRepository,
} from 'src/domain/VehicleUserRepository';

@Injectable()
export class ListVehicleUserUseCase {
  constructor(private readonly vehicleUserRepository: VehicleUserRepository) {}

  async execute(): Promise<FindAll[]> {
    return this.vehicleUserRepository.findAll();
  }
}
