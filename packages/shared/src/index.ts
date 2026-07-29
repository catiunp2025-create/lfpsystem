export type Role = "MANAGER" | "EMPLOYEE";
export type VehicleUserType = "DRIVER" | "ASSISTANT";
export type IdentificationType = "CNPJ" | "CPF";
export type ContactType = "PHONE" | "EMAIL";
export type OrderServiceStatus = "AVAILABLE" | "FINISHED";

export type User = {
  id: string;
  name: string;
  role: Role;
  credential: {
    id: string;
    email: string;
  };
};

export type Vehicle = {
  id: string;
  plate: string;
  model: string;
  color: string;
};

export type Address = {
  id: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  postCode: string;
  city: string;
  state: string;
};

export type Contact = {
  id: string;
  type: ContactType;
  value: string;
};

export type VehicleUser = {
  id: string;
  vehicleId: string;
  userId: string;
  type: VehicleUserType;
  user: {
    id: string;
    name: string;
    role: Role;
  };
  vehicle: Vehicle;
};

export type Customer = {
  id: string;
  name: string;
  identification: {
    id: string;
    type: IdentificationType;
    value: string;
  };
  address: Address[];
  contact: Contact[];
};

export type Service = {
  id: string;
  name: string;
  value: number;
  description?: string;
};

export type OrderServices = {
  id: string;
  date: string;
  status: OrderServiceStatus;
  vehicleUsers: {
    vehicleUser: {
      id: string;
      type: VehicleUserType;
      vehicle: Vehicle;
      user: {
        id: string;
        name: string;
        role: Role;
      };
    };
  }[];
  address: {
    id: string;
    street: string;
    number: string;
    complement: string | null;
    neighborhood: string;
    postCode: string;
    city: string;
    state: string;
    customer: {
      id: string;
      name: string;
      contact: Contact[];
    };
  };
  services: {
    service: Service;
  }[];
};
