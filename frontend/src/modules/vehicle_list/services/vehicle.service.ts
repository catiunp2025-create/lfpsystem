import type { Vehicle } from "../../../../../packages/shared/src";
import { vehicleRoute } from "../../../routes/vehicleRoute";

export async function listVehicles(): Promise<Vehicle[]> {
  return await vehicleRoute.list();
}
