import { Identification } from '@prisma/client';

export interface FindByValue {
  value: string;
}

export abstract class IdentificationRepository {
  abstract findByValue({ value }: FindByValue): Promise<Identification | null>;
}
