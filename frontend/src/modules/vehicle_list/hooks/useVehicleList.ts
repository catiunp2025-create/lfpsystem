import { useCallback, useState } from "react";
import type { Vehicle } from "../../../../../packages/shared/src";
import type { VehicleFormMode } from "../../../components/vehicle_form/VehicleForm";
import { listVehicles } from "../services/vehicle.service";

export function useVehicleList() {
  const [vehicles, setVehicles] = useState<Vehicle[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [modalMode, setModalMode] = useState<VehicleFormMode>("create");
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const lowerSearch = search.trim().toLowerCase();
  const vehiclesData = vehicles ?? [];

  const filteredVehicles = !lowerSearch
    ? vehiclesData
    : vehiclesData.filter(
        (vehicle) =>
          vehicle.plate?.toLowerCase().includes(lowerSearch) ||
          vehicle.model?.toLowerCase().includes(lowerSearch),
      );

  const openVehicleModal = (
    mode: VehicleFormMode = "create",
    vehicle?: Vehicle | null,
  ) => {
    setModalMode(mode);
    setSelectedVehicle(vehicle ?? null);
    setIsVehicleModalOpen(true);
  };

  const closeVehicleModal = () => {
    setIsVehicleModalOpen(false);
    setModalMode("create");
    setSelectedVehicle(null);
    void load();
  };

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const data = await listVehicles();
      setVehicles(data);
    } catch (error) {
      setError("Não foi possível carregar os dados.");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    refresh: load,
    search,
    setSearch,
    filteredVehicles,
    isVehicleModalOpen,
    modalMode,
    selectedVehicle,
    openVehicleModal,
    closeVehicleModal,
  };
}
