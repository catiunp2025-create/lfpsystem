import { NotFoundError } from "../base/NotFoundError";

const message = 'Vehicle not found' as const;
const error = `vehicle_not_found` as const;

export class VehicleNotFound extends NotFoundError{
    constructor(){
        super(message, error);
    }
}