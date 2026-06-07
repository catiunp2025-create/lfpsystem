import { BadRequestError } from "../base/BadRequestError";


const message = 'Order Service is already finished.' as const;
const error = `order_service_already_finished` as const;

export class OrderServiceAlreadyFinished extends BadRequestError{ 
    constructor(){
        super(message, error)
    }
}