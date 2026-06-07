import { Vehicle } from "@prisma/client";

export interface Create {
    plate: string;
    model: string;
    color: string;
}

export interface FindByPlate{
    plate: string;
}

export interface FindById{
    id: string;
}

export abstract class VehicleRepository {
    abstract create({plate, model, color}: Create):Promise <Vehicle>;
    abstract findByPlate({plate}: FindByPlate): Promise<Vehicle | null>;
    abstract findById({id}: FindById): Promise<Vehicle | null>;
    abstract findAll():Promise<Vehicle[]>;
}