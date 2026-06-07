import type {
  Address,
  Customer,
  Vehicle,
  VehicleUser,
} from "../../../packages/shared/src";
import type { StepData, StepNumber } from "../types/newOrder";

export type Step = {
  id: StepNumber;
  title: string;
  subTitle: string;
};

export const steppers: Step[] = [
  {
    id: 1,
    title: "Veículo",
    subTitle: "Equipe e transporte",
  },
  {
    id: 2,
    title: "Cliente",
    subTitle: "Dados e endereço",
  },
  {
    id: 3,
    title: "Serviços",
    subTitle: "Itens da ordem",
  },
  {
    id: 4,
    title: "Finalizar",
    subTitle: "Revisão e abertura",
  },
];

export const initialAddress: Address = {
  id: "",
  street: "",
  number: "",
  complement: "",
  neighborhood: "",
  postCode: "",
  city: "",
  state: "",
};

export const requiredVehicleFields: (keyof Vehicle)[] = [
  "id",
  "plate",
  "model",
  "color",
];

export const requiredVehicleUserFields: (keyof VehicleUser)[] = [
  "id",
  "vehicleId",
  "userId",
  "type",
  "user",
  "vehicle",
];

export const requiredAddressFields: (keyof Address)[] = [
  "id",
  "street",
  "number",
  "neighborhood",
  "postCode",
  "city",
  "state",
];

export const requiredCustomerFields: (keyof Customer)[] = [
  "id",
  "name",
  "identification",
  "address",
  "contact",
];

export const initialStepData: StepData = {
  vehicle: {
    id: "",
    plate: "",
    model: "",
    color: "",
  },
  driver: {
    id: "",
    vehicleId: "",
    userId: "",
    type: "DRIVER",
    user: {
      id: "",
      name: "",
      role: "EMPLOYEE",
    },
    vehicle: {
      id: "",
      plate: "",
      model: "",
      color: "",
    },
  },
  assistant: {
    id: "",
    vehicleId: "",
    userId: "",
    type: "ASSISTANT",
    user: {
      id: "",
      name: "",
      role: "EMPLOYEE",
    },
    vehicle: {
      id: "",
      plate: "",
      model: "",
      color: "",
    },
  },
  customer: {
    id: "",
    name: "",
    identification: {
      id: "",
      type: "CNPJ",
      value: "",
    },
    address: [],
    contact: [],
  },
  address: initialAddress,
  services: [],
  scheduleDate: null,
};
