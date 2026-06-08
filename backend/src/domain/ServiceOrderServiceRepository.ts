import { ServiceOrderService } from '@prisma/client';

export interface CreateServiceOrderService {
  serviceId: string;
  orderServiceId: string;
}

export abstract class ServiceOrderServiceRepository {
  abstract create({
    serviceId,
    orderServiceId,
  }: CreateServiceOrderService): Promise<ServiceOrderService>;
}
