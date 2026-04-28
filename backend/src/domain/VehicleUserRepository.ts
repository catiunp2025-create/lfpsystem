import { VehicleUser, VehicleUserType } from "@prisma/client";

export interface Create {
    vehicleId: string;
    userId: string;
    type: VehicleUserType
}

export interface FindBy{
    vehicleId: string;
    userId: string;
}

export abstract class VehicleUserRepository{
    abstract create({vehicleId, userId, type}: Create):Promise<VehicleUser>;
    abstract findBy({vehicleId, userId}: FindBy): Promise<VehicleUser | null>;
}