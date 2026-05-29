import { NotFoundError } from "../base/NotFoundError";

const message = 'OrderService not found' as const;
const error = `order_service_not_found` as const;

export class OrderServiceNotFound extends NotFoundError{
    constructor(){
        super(message, error);
    }
}