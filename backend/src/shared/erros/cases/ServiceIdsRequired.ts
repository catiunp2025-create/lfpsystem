import { BadRequestError } from "../base/BadRequestError";

const message = 'At least one service is required' as const;
const error = `service_ids_not_found` as const;

export class ServiceIdsRequires extends BadRequestError{
    constructor(){
        super(message, error);
    }
}