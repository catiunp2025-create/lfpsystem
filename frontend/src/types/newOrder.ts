import type {
  Vehicle,
  VehicleUser,
  Customer,
  Address,
  Service,
} from "../../../packages/shared/src";

/* Para usar nas Steps como tipo de props padrão */

export const STEPS = [1, 2, 3, 4] as const;

export type StepNumber = (typeof STEPS)[number];

export type BaseStepProps = {
  currentStep: number;
  onNext?: () => void;
  onBack?: () => void;
  validateStep: () => boolean;
  handleNewRegisterChange?: (type: RegisterType) => void;
};

export type StepData = {
  vehicle: Vehicle;
  driver: VehicleUser;
  assistant: VehicleUser;
  customer: Customer;
  address: Address;
  services: Service[];
  scheduleDate?: Date;
  observations?: string;
};

export const VEHICLE_USER_TYPE = {
  DRIVER: "driver",
  ASSISTANT: "assistant",
} as const;

export type TypeVehicleUser =
  (typeof VEHICLE_USER_TYPE)[keyof typeof VEHICLE_USER_TYPE];

export const STEP_TYPE = {
  VEHICLE: "vehicle",
} as const;

export type RegisterType = (typeof STEP_TYPE)[keyof typeof STEP_TYPE];
