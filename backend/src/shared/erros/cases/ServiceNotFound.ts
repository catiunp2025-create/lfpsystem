import { NotFoundError } from '../base/NotFoundError';

const message = 'Service not found' as const;
const error = `service_not_found` as const;

export class ServiceNotFound extends NotFoundError {
  constructor() {
    super(message, error);
  }
}
