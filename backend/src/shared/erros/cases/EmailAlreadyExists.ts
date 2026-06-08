import { AlreadyExistsError } from '../base/AlreadyExistsError';

const message = 'Email Already exists.' as const;
const error = `email_already_exists` as const;

export class EmailAlreadyExists extends AlreadyExistsError {
  constructor() {
    super(message, error);
  }
}
