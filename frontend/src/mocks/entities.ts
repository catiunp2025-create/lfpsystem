import type {
  Address,
  Contact,
  Customer,
  Users,
  Vehicle,
} from "../../../packages/shared/src";

export const mockUsers: Users[] = [
  {
    id: "user_1a2b3c4d",
    name: "João Silva",
    role: "MANAGER",
    credential: {
      id: "cred_9x8y7z6w",
      email: "joao.silva@garagem.com",
    },
  },
  {
    id: "user_5e6f7g8h",
    name: "Maria Oliveira",
    role: "EMPLOYEE",
    credential: {
      id: "cred_4v3u2t1s",
      email: "maria.oliveira@garagem.com",
    },
  },
  {
    id: "user_9i8j7k6l",
    name: "Carlos Santos",
    role: "EMPLOYEE",
    credential: {
      id: "cred_2q1w3e4r",
      email: "carlos.santos@garagem.com",
    },
  },
];

export const mockVehicles: Vehicle[] = [
  {
    id: "veh_1p2o3i4u",
    plate: "ABC-1234",
    model: "Toyota Corolla XEI 2023",
    color: "Prata",
  },
  {
    id: "veh_5y6t7r8e",
    plate: "DEF-5678",
    model: "Honda Civic EX 2022",
    color: "Preto",
  },
  {
    id: "veh_9w8q7z6x",
    plate: "GHI-9012",
    model: "Volkswagen Gol 1.6 MSI",
    color: "Branco",
  },
];

export const mockAddresses: Address[] = [
  {
    id: "addr_1a2s3d4f",
    street: "Rua das Flores",
    number: "245",
    complement: "Apto 302",
    neighborhood: "Centro",
    postCode: "55000-000",
    city: "Caruaru",
    state: "PE",
  },
  {
    id: "addr_5g6h7j8k",
    street: "Avenida Agamenon Magalhães",
    number: "1890",
    complement: "Sala 05",
    neighborhood: "Manoel de Freitas",
    postCode: "55025-430",
    city: "Caruaru",
    state: "PE",
  },
  {
    id: "addr_9l0p1o2i",
    street: "Rua do Comércio",
    number: "567",
    complement: undefined,
    neighborhood: "São José",
    postCode: "55100-120",
    city: "Caruaru",
    state: "PE",
  },
];

export const mockContacts: Contact[] = [
  {
    id: "cont_1q2w3e4r",
    type: "PHONE",
    value: "(81) 98765-4321",
  },
  {
    id: "cont_5t6y7u8i",
    type: "EMAIL",
    value: "maria.oliveira@email.com",
  },
  {
    id: "cont_9o0p1a2s",
    type: "PHONE",
    value: "(81) 99988-7766",
  },
  {
    id: "cont_3f4g5h6j",
    type: "EMAIL",
    value: "contato@autopeças.com",
  },
];

export const mockCustomers: Customer[] = [
  {
    id: "cust_1z2x3c4v",
    name: "Auto Peças Caruaru Ltda",
    identification: {
      id: "ident_7b8n9m0l",
      type: "CNPJ",
      value: "12.345.678/0001-90",
    },
    address: [mockAddresses[0], mockAddresses[1]],
    contact: [mockContacts[0], mockContacts[3]],
  },
  {
    id: "cust_5v6b7n8m",
    name: "Ana Clara Mendes",
    identification: {
      id: "ident_3k4j5h6g",
      type: "CPF",
      value: "987.654.321-00",
    },
    address: [mockAddresses[2]],
    contact: [mockContacts[2], mockContacts[1]],
  },
  {
    id: "cust_9f8d7s6a",
    name: "Roberto Nunes",
    identification: {
      id: "ident_1q2w3e4r",
      type: "CPF",
      value: "123.456.789-01",
    },
    address: [mockAddresses[1]],
    contact: [mockContacts[0]],
  },
];

export const mockServices: Service[] = [
  {
    id: "svc_dedet_res_001",
    name: "Dedetizacao Residencial",
    value: 350.0,
    description:
      "Controle de pragas em ambientes residenciais com produtos atóxicos.",
  },
  {
    id: "svc_dedet_com_002",
    name: "Dedetacao Comercial",
    value: 580.0,
    description:
      "Tratamento completo para estabelecimentos comerciais e escritórios.",
  },
  {
    id: "svc_desrat_003",
    name: "Desratizacao",
    value: 420.0,
    description: "Controle e eliminação de roedores com iscas profissionais.",
  },
  {
    id: "svc_descup_004",
    name: "Descupinizacao",
    value: 750.0,
    description:
      "Tratamento contra cupins em estruturas de madeira e alvenaria.",
  },
  {
    id: "svc_limpeza_caixa_005",
    name: "Limpeza de Caixa d'Agua",
    value: 280.0,
    description: "Higienização e desinfecção de reservatórios de água.",
  },
  {
    id: "svc_controle_mosquito_006",
    name: "Controle de Mosquitos",
    value: 390.0,
    description:
      "Nebulização e larvicida para controle de Aedes e outros mosquitos.",
  },
  {
    id: "svc_sanitizacao_007",
    name: "Sanitizacao de Ambientes",
    value: 450.0,
    description: "Desinfecção profissional de ambientes internos.",
  },
  {
    id: "svc_laudo_008",
    name: "Laudo Tecnico",
    value: 200.0,
    description: "Emissão de laudo tecnico para ANVISA e vigilância sanitária.",
  },
];
