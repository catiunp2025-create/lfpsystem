import type { StepData } from "../types/newOrder";

export const mockStepData: StepData = {
  vehicle: {
    id: "veh_8f3k9p2m-x7v9",
    plate: "KJA-7H45",
    model: "Hilux SW4 SRX 4x4",
    color: "Prata",
  },

  driver: {
    id: "vu_drv_5t7y9u1i",
    vehicleId: "veh_8f3k9p2m-x7v9",
    userId: "user_9q2w3e4r",
    type: "DRIVER",
    user: {
      id: "user_9q2w3e4r",
      name: "João Silva Santos",
      role: "EMPLOYEE",
    },
    vehicle: {
      id: "veh_8f3k9p2m-x7v9",
      plate: "KJA-7H45",
      model: "Hilux SW4 SRX 4x4",
      color: "Prata",
    },
  },

  assistant: {
    id: "vu_ass_3m5n7p9q",
    vehicleId: "veh_8f3k9p2m-x7v9",
    userId: "user_4x5c6v7b",
    type: "ASSISTANT",
    user: {
      id: "user_4x5c6v7b",
      name: "Carlos Oliveira",
      role: "EMPLOYEE",
    },
    vehicle: {
      id: "veh_8f3k9p2m-x7v9",
      plate: "KJA-7H45",
      model: "Hilux SW4 SRX 4x4",
      color: "Prata",
    },
  },

  customer: {
    id: "cust_61b50621-9158-43df-af27-384dceabf2bd",
    name: "Favorito Supermercado Ltda",
    identification: {
      id: "ident_c95bc202-cf9a-49be-b32e-3a1475e1f5b0",
      type: "CNPJ",
      value: "05.959.479/0014-26",
    },
    address: [
      {
        id: "addr_8c2f529d-7b51-4990-bdf0-ba149b5b6d26",
        street: "Rua das Flores",
        number: "123",
        complement: "Próximo ao mercado municipal",
        neighborhood: "Centro",
        postCode: "55000-000",
        city: "Caruaru",
        state: "PE",
      },
    ],
    contact: [
      {
        id: "cont_e6be5281-c168-41b6-8b7f-014f6d19cc21",
        type: "EMAIL",
        value: "contato@favoritosupermercado.com.br",
      },
      {
        id: "cont_9p0o8i7u6y5t",
        type: "PHONE",
        value: "(81) 3721-9876",
      },
    ],
  },

  address: {
    id: "addr_8c2f529d-7b51-4990-bdf0-ba149b5b6d26",
    street: "Rua das Flores",
    number: "123",
    complement: "Próximo ao mercado municipal",
    neighborhood: "Centro",
    postCode: "55000-000",
    city: "Caruaru",
    state: "PE",
  },

  services: [
    {
      id: "svc_dedet_com",
      name: "Dedetização Comercial",
      value: 580.0,
      description: "Dedetização para estabelecimentos comerciais",
    },
    {
      id: "svc_sanitizacao",
      name: "Sanitização de Ambientes",
      value: 450.0,
      description: "Sanitização completa do ambiente",
    },
    {
      id: "svc_laudo",
      name: "Laudo Técnico",
      value: 200.0,
      description: "Emissão de laudo técnico",
    },
  ],
};
