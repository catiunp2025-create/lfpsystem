import { Injectable } from '@nestjs/common';
import { ServiceOrderService } from '@prisma/client';
import {
  CreateServiceOrderService,
  ServiceOrderServiceRepository,
} from 'src/domain/ServiceOrderServiceRepository';
import { PrismaRemoteRepository } from './PrismaRemoteRepository';

@Injectable()
export class PrismaServiceOrderServiceRepository implements ServiceOrderServiceRepository {
  constructor(private readonly repository: PrismaRemoteRepository) {}

  create({
    serviceId,
    orderServiceId,
  }: CreateServiceOrderService): Promise<ServiceOrderService> {
    return this.repository.serviceOrderService.create({
      data: { serviceId, orderServiceId },
    });
  }
}
