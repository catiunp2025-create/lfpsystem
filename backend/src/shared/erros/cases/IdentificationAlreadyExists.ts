import { AlreadyExistsError } from "../base/AlreadyExistsError";

const message = 'Identification Already exists.' as const;
const error = `identification_already_exists` as const;

export class IdentificationAlreadyExists extends AlreadyExistsError{
    constructor(){
        super(message, error)
    }
}