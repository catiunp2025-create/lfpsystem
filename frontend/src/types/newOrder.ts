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

export type StepStatus = "active" | "completed" | "visited" | "inactive";

export type BaseStepProps = {
  currentStep: number;
  currentStepData: StepData;
  onNext?: () => void;
  onBack?: () => void;
  validateStep: () => boolean;
  handleOpenModal?: (type: ModalType) => void;
  handleCloseModal?: () => void;
};

export type StepData = {
  vehicle: Vehicle;
  driver: VehicleUser;
  assistant: VehicleUser;
  customer: Customer;
  address: Address;
  services: Service[];
  scheduleDate: string | null;
  observations?: string;
};

export const VEHICLE_USER_TYPE = {
  DRIVER: "driver",
  ASSISTANT: "assistant",
} as const;

export type TypeVehicleUser =
  (typeof VEHICLE_USER_TYPE)[keyof typeof VEHICLE_USER_TYPE];

export const MODAL_TYPE = {
  VEHICLE: "vehicle",
  CUSTOMER: "customer",
  ORDER_REVIEW: "order_review",
} as const;

export type ModalType = (typeof MODAL_TYPE)[keyof typeof MODAL_TYPE];

export type StepConfig = {
  component: React.ComponentType<any>;
  props?: Record<string, unknown>;
};
