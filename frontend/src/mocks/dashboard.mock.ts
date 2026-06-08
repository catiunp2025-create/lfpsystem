import type { AllOrderService } from "../types/dashboard";

export const mockServiceOrders: AllOrderService[] = [
  {
    id: "os-001",
    vehicleUserId: "user-101",
    addressId: "addr-201",
    status: "COMPLETED",
    date: new Date("2026-06-02T09:15:00"),
    services: [
      {
        id: "srv-001",
        name: "Dedetizacao Residencial",
        value: 250,
        description: "Controle de pragas em ambiente residencial",
      },
      {
        id: "srv-002",
        name: "Controle de Mosquitos",
        value: 180,
        description: "Aplicação para redução de mosquitos",
      },
    ],
  },
  {
    id: "os-001",
    vehicleUserId: "user-101",
    addressId: "addr-201",
    status: "COMPLETED",
    date: new Date("2026-06-01T09:15:00"),
    services: [
      {
        id: "srv-001",
        name: "Dedetizacao Residencial",
        value: 250,
        description: "Controle de pragas em ambiente residencial",
      },
    ],
  },
  {
    id: "os-001",
    vehicleUserId: "user-101",
    addressId: "addr-201",
    status: "COMPLETED",
    date: new Date("2026-05-12T09:15:00"),
    services: [
      {
        id: "srv-001",
        name: "Dedetizacao Residencial",
        value: 250,
        description: "Controle de pragas em ambiente residencial",
      },
      {
        id: "srv-002",
        name: "Controle de Mosquitos",
        value: 180,
        description: "Aplicação para redução de mosquitos",
      },
    ],
  },
  {
    id: "os-002",
    vehicleUserId: "user-102",
    addressId: "addr-202",
    status: "PENDING",
    date: new Date("2026-04-28T14:30:00"),
    services: [
      {
        id: "srv-003",
        name: "Dedetizacao Comercial",
        value: 480,
        description: "Tratamento para ambiente comercial",
      },
      {
        id: "srv-004",
        name: "Sanitizacao de Ambientes",
        value: 320,
        description: "Sanitização contra agentes contaminantes",
      },
      {
        id: "srv-005",
        name: "Laudo Tecnico",
        value: 150,
        description: "Emissão de laudo técnico especializado",
      },
    ],
  },
  {
    id: "os-003",
    vehicleUserId: "user-103",
    addressId: "addr-203",
    status: "COMPLETED",
    date: new Date("2026-03-19T11:00:00"),
    services: [
      {
        id: "srv-006",
        name: "Descupinizacao",
        value: 650,
        description: "Eliminação de cupins",
      },
    ],
  },
  {
    id: "os-004",
    vehicleUserId: "user-104",
    addressId: "addr-204",
    status: "PENDING",
    date: new Date("2026-02-07T16:45:00"),
    services: [
      {
        id: "srv-007",
        name: "Desratizacao",
        value: 390,
        description: "Controle e eliminação de roedores",
      },
      {
        id: "srv-008",
        name: "Dedetizacao Residencial",
        value: 220,
        description: "Aplicação interna e externa",
      },
    ],
  },
  {
    id: "os-005",
    vehicleUserId: "user-105",
    addressId: "addr-205",
    status: "COMPLETED",
    date: new Date("2026-01-25T08:20:00"),
    services: [
      {
        id: "srv-009",
        name: "Limpeza de Caixa d'Agua",
        value: 300,
        description: "Higienização de reservatório",
      },
      {
        id: "srv-010",
        name: "Sanitizacao de Ambientes",
        value: 340,
        description: "Desinfecção preventiva",
      },
      {
        id: "srv-011",
        name: "Controle de Mosquitos",
        value: 170,
        description: "Pulverização especializada",
      },
    ],
  },
  {
    id: "os-006",
    vehicleUserId: "user-106",
    addressId: "addr-206",
    status: "PENDING",
    date: new Date("2025-12-14T13:10:00"),
    services: [
      {
        id: "srv-012",
        name: "Dedetizacao Comercial",
        value: 520,
        description: "Controle em área empresarial",
      },
      {
        id: "srv-013",
        name: "Desratizacao",
        value: 410,
        description: "Proteção contra roedores",
      },
      {
        id: "srv-014",
        name: "Laudo Tecnico",
        value: 200,
        description: "Avaliação técnica detalhada",
      },
      {
        id: "srv-015",
        name: "Sanitizacao de Ambientes",
        value: 360,
        description: "Processo de sanitização profissional",
      },
    ],
  },
  {
    id: "os-007",
    vehicleUserId: "user-107",
    addressId: "addr-207",
    status: "COMPLETED",
    date: new Date("2025-11-03T10:50:00"),
    services: [
      {
        id: "srv-016",
        name: "Descupinizacao",
        value: 710,
        description: "Tratamento estrutural contra cupins",
      },
      {
        id: "srv-017",
        name: "Laudo Tecnico",
        value: 180,
        description: "Inspeção e relatório",
      },
    ],
  },
  {
    id: "os-008",
    vehicleUserId: "user-108",
    addressId: "addr-208",
    status: "PENDING",
    date: new Date("2025-10-18T15:25:00"),
    services: [
      {
        id: "srv-018",
        name: "Limpeza de Caixa d'Agua",
        value: 280,
        description: "Limpeza e vedação",
      },
    ],
  },
  {
    id: "os-009",
    vehicleUserId: "user-109",
    addressId: "addr-209",
    status: "COMPLETED",
    date: new Date("2025-09-09T07:40:00"),
    services: [
      {
        id: "srv-019",
        name: "Controle de Mosquitos",
        value: 160,
        description: "Combate a focos",
      },
      {
        id: "srv-020",
        name: "Dedetizacao Residencial",
        value: 240,
        description: "Proteção residencial",
      },
      {
        id: "srv-021",
        name: "Desratizacao",
        value: 400,
        description: "Barreiras químicas",
      },
    ],
  },
  {
    id: "os-010",
    vehicleUserId: "user-110",
    addressId: "addr-210",
    status: "PENDING",
    date: new Date("2025-08-21T17:35:00"),
    services: [
      {
        id: "srv-022",
        name: "Dedetizacao Comercial",
        value: 500,
        description: "Proteção comercial intensiva",
      },
      {
        id: "srv-023",
        name: "Sanitizacao de Ambientes",
        value: 330,
        description: "Descontaminação de superfícies",
      },
    ],
  },
  {
    id: "os-011",
    vehicleUserId: "user-111",
    addressId: "addr-211",
    status: "COMPLETED",
    date: new Date("2025-07-13T12:00:00"),
    services: [
      {
        id: "srv-024",
        name: "Laudo Tecnico",
        value: 190,
        description: "Análise e documentação",
      },
      {
        id: "srv-025",
        name: "Descupinizacao",
        value: 680,
        description: "Tratamento preventivo e corretivo",
      },
      {
        id: "srv-026",
        name: "Limpeza de Caixa d'Agua",
        value: 310,
        description: "Higienização completa",
      },
      {
        id: "srv-027",
        name: "Controle de Mosquitos",
        value: 175,
        description: "Controle sazonal",
      },
      {
        id: "srv-028",
        name: "Sanitizacao de Ambientes",
        value: 345,
        description: "Sanitização profunda",
      },
    ],
  },
  {
    id: "os-012",
    vehicleUserId: "user-112",
    addressId: "addr-212",
    status: "PENDING",
    date: new Date("2025-06-05T09:55:00"),
    services: [
      {
        id: "srv-029",
        name: "Desratizacao",
        value: 395,
        description: "Controle preventivo",
      },
      {
        id: "srv-030",
        name: "Dedetizacao Residencial",
        value: 230,
        description: "Dedetização completa",
      },
    ],
  },
];
