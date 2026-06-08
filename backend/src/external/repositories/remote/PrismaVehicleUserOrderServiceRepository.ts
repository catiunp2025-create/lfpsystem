import { Injectable } from '@nestjs/common';
import { VehicleUserOrderService } from '@prisma/client';
import {
  Create,
  VehicleUserOrderServiceRepository,
} from 'src/domain/VehicleUserOrderServiceRepository';
import { PrismaRemoteRepository } from './PrismaRemoteRepository';

@Injectable()
export class PrismaVehicleUserOrderServiceRepository implements VehicleUserOrderServiceRepository {
  constructor(private readonly repository: PrismaRemoteRepository) {}

  create({
    vehicleUserId,
    orderServiceId,
  }: Create): Promise<VehicleUserOrderService> {
    return this.repository.vehicleUserOrderService.create({
      data: { vehicleUserId, orderServiceId },
    });
  }
}
