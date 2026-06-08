import { IsUUID } from 'class-validator';

export class CustomerParamDTO {
  @IsUUID()
  customerId!: string;
}
