export type Role = 'MANAGER' | 'EMPLOYEE';
export type VehicleUserType = 'DRIVER' | 'ASSISTANT';
export type IdentificationType = 'CNPJ' | 'CPF';
export type ContactType = 'PHONE' | 'EMAIL';

export type Users = {
    id: string;
    name: string;
    role: Role;
    credential:{
        id: string;
        email:string;
    }
}

export type Vehicle = {
    id: string;
    plate: string;
    model: string;
    color: string
}

export type VehicleUser = {
    id: string;
    vehicleId: string;
    userId:string;
    type: VehicleUserType
    user:{
        id: string;
        name: string;
        role:Role;
    };
    vehicle:Vehicle
}

export type Customer = {
    id: string;
    name: string;
    identification:{
        id: string;
        type: IdentificationType;
        value: string;
    },
    address:{
        id:string;
        street: string;
        number: string;
        complement?: string;
        neighborhood: string;
        postCode: string;
        city: string;
        state: string;
    }[],
    contact:{
        id: string;
        type: ContactType;
        value: string;

    }[]
}