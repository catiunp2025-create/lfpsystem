import { AlreadyExistsError } from '../base/AlreadyExistsError';

const message = 'Plate Already exists.' as const;
const error = `plate_already_exists` as const;

export class PlateAlreadyExists extends AlreadyExistsError {
  constructor() {
    super(message, error);
  }
}
