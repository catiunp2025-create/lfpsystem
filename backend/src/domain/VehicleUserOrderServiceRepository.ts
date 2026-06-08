import { VehicleUserOrderService } from '@prisma/client';

export interface Create {
  vehicleUserId: string;
  orderServiceId: string;
}

export abstract class VehicleUserOrderServiceRepository {
  abstract create({
    vehicleUserId,
    orderServiceId,
  }: Create): Promise<VehicleUserOrderService>;
}
