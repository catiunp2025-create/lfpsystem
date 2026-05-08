import { AlreadyExistsError } from "../base/AlreadyExistsError";

const message = 'Service Already exists.' as const;
const error = `Service_already_exists` as const;

export class ServiceAlreadyExists extends AlreadyExistsError{
    constructor(){
        super(message, error)
    }
}