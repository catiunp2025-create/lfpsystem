import { UnauthorizedError } from '../base/UnauthorizedError';

const message = 'Wrong email or password.' as const;
const error = 'wrong_password_or_email' as const;

export class WrongPasswordOrEmail extends UnauthorizedError {
  constructor() {
    super(message, error);
  }
}
