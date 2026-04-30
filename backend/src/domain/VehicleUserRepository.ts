import { User, Vehicle, VehicleUser, VehicleUserType } from "@prisma/client";

export interface Create {
    vehicleId: string;
    userId: string;
    type: VehicleUserType
}

export interface FindBy{
    vehicleId: string;
    userId: string;
}

export type FindAll = VehicleUser &{user: User, vehicle: Vehicle};

export abstract class VehicleUserRepository{
    abstract create({vehicleId, userId, type}: Create):Promise<VehicleUser>;
    abstract findBy({vehicleId, userId}: FindBy): Promise<VehicleUser | null>;
    abstract findAll(): Promise<FindAll[]>;
}