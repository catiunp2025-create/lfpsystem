import type { Vehicle, VehicleUser } from "../../../packages/shared/src";

export const mockVehicles: Vehicle[] = [
  {
    id: "veh_1a2b3c4d",
    plate: "ABC-1234",
    model: "Toyota Hilux SW4",
    color: "Prata",
  },
  {
    id: "veh_5e6f7g8h",
    plate: "DEF-5678",
    model: "Honda Civic",
    color: "Preto",
  },
  {
    id: "veh_9i0j1k2l",
    plate: "GHI-9012",
    model: "Volkswagen Amarok",
    color: "Branco",
  },
  {
    id: "veh_3m4n5o6p",
    plate: "JKL-3456",
    model: "Ford Ranger",
    color: "Azul",
  },
  {
    id: "veh_7q8r9s0t",
    plate: "MNO-7890",
    model: "Chevrolet S10",
    color: "Vermelho",
  },
  {
    id: "veh_2u3v4w5x",
    plate: "PQR-1122",
    model: "Jeep Compass",
    color: "Cinza",
  },
  {
    id: "veh_6y7z8a9b",
    plate: "STU-3344",
    model: "Toyota Corolla",
    color: "Branco Perolado",
  },
  {
    id: "veh_0c1d2e3f",
    plate: "VWX-5566",
    model: "Fiat Strada",
    color: "Preto",
  },
];

export const mockVehicleUsers: VehicleUser[] = [
  {
    id: "vu_7x9q2w4e",
    vehicleId: "veh_1a2b3c4d",
    userId: "user_abc123",
    type: "DRIVER",
    user: { id: "user_abc123", name: "Carlos Silva", role: "MANAGER" },
    vehicle: mockVehicles[0],
  },
  {
    id: "vu_3m5n7p9q",
    vehicleId: "veh_5e6f7g8h",
    userId: "user_def456",
    type: "DRIVER",
    user: { id: "user_def456", name: "Mariana Oliveira", role: "EMPLOYEE" },
    vehicle: mockVehicles[1],
  },
  {
    id: "vu_1q2w3e4r",
    vehicleId: "veh_9i0j1k2l",
    userId: "user_ghi789",
    type: "ASSISTANT",
    user: { id: "user_ghi789", name: "João Pedro Santos", role: "EMPLOYEE" },
    vehicle: mockVehicles[2],
  },
  {
    id: "vu_5t7y9u1i",
    vehicleId: "veh_1a2b3c4d",
    userId: "user_jkl012",
    type: "ASSISTANT",
    user: { id: "user_jkl012", name: "Ana Beatriz Costa", role: "MANAGER" },
    vehicle: mockVehicles[0],
  },
  {
    id: "vu_4b5n6m7v",
    vehicleId: "veh_3m4n5o6p",
    userId: "user_mno345",
    type: "DRIVER",
    user: { id: "user_mno345", name: "Ricardo Almeida", role: "EMPLOYEE" },
    vehicle: mockVehicles[3],
  },
  {
    id: "vu_8c9v0x1z",
    vehicleId: "veh_7q8r9s0t",
    userId: "user_pqr678",
    type: "DRIVER",
    user: { id: "user_pqr678", name: "Fernanda Lima", role: "MANAGER" },
    vehicle: mockVehicles[4],
  },
  {
    id: "vu_2d3f4g5h",
    vehicleId: "veh_2u3v4w5x",
    userId: "user_stu901",
    type: "ASSISTANT",
    user: { id: "user_stu901", name: "Lucas Mendes", role: "EMPLOYEE" },
    vehicle: mockVehicles[5],
  },
  {
    id: "vu_6j7k8l9p",
    vehicleId: "veh_6y7z8a9b",
    userId: "user_vwx234",
    type: "DRIVER",
    user: { id: "user_vwx234", name: "Patrícia Rocha", role: "EMPLOYEE" },
    vehicle: mockVehicles[6],
  },
];
