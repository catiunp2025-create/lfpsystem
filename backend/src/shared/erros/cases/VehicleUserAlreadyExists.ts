import { AlreadyExistsError } from "../base/AlreadyExistsError";

const message = 'VehicleUser Already exists.' as const;
const error = `Vehicle_user_already_exists` as const;

export class VehicleUserAlreadyExists extends AlreadyExistsError{
    constructor(){
        super(message, error)
    }
}