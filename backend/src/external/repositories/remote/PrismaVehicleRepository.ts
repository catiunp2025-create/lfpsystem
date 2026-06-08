import {
  Create,
  FindById,
  FindByPlate,
  VehicleRepository,
} from 'src/domain/VehicleRepository';
import { PrismaRemoteRepository } from './PrismaRemoteRepository';
import { Vehicle } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaVehicleRepository implements VehicleRepository {
  constructor(private readonly repository: PrismaRemoteRepository) {}

  create({ plate, model, color }: Create): Promise<Vehicle> {
    return this.repository.vehicle.create({ data: { plate, model, color } });
  }

  findByPlate({ plate }: FindByPlate): Promise<Vehicle | null> {
    return this.repository.vehicle.findFirst({ where: { plate } });
  }

  findAll(): Promise<Vehicle[]> {
    return this.repository.vehicle.findMany();
  }

  findById({ id }: FindById): Promise<Vehicle | null> {
    return this.repository.vehicle.findFirst({ where: { id } });
  }
}
