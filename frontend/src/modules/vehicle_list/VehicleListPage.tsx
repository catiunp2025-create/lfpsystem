import "./style.css";
import { useEffect } from "react";
import MainLayout from "../../components/layout/MainLayout";
import ActionButton from "../../components/action_button/ActionButton";
import SearchBar from "../../components/search_bar/SearchBar";
import VehicleForm from "../../components/vehicle_form/VehicleForm";
import { useVehicleList } from "./hooks/useVehicleList";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

export default function VehicleListPage() {
  const {
    loading,
    error,
    refresh,
    search,
    setSearch,
    filteredVehicles,
    isVehicleModalOpen,
    modalMode,
    selectedVehicle,
    openVehicleModal,
    closeVehicleModal,
  } = useVehicleList();

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <MainLayout pageTitle="Veículos">
      <main className="vehicle-list-page">
        <div className="vehicle-list-page__header">
          <SearchBar
            value={search}
            placeholder="Buscar veículo por modelo ou placa..."
            onChange={setSearch}
          />
          <ActionButton
            disabled={false}
            variant="primary"
            startIcon={<AddOutlinedIcon fontSize="small" />}
            onClick={() => openVehicleModal("create")}
          >
            Novo
          </ActionButton>
        </div>

        <div className="vehicle-list-page__card">
          {loading ? (
            <div className="vehicle-list-page__status">Carregando...</div>
          ) : error ? (
            <div className="vehicle-list-page__status vehicle-list-page__status--error">
              {error}
            </div>
          ) : filteredVehicles?.length ? (
            <div className="vehicle-list-page__table-wrapper">
              <table className="vehicle-list-page__table">
                <thead>
                  <tr>
                    <th>Modelo</th>
                    <th>Placa</th>
                    <th>Cor</th>
                    <th className="vehicle-list-page__actions">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVehicles.map((vehicle) => (
                    <tr key={vehicle.id}>
                      <td>{vehicle.model}</td>
                      <td>{vehicle.plate}</td>
                      <td>{vehicle.color}</td>
                      <td className="vehicle-list-page__actions">
                        <button
                          type="button"
                          className="vehicle-list-page__row-action"
                          onClick={() => openVehicleModal("update", vehicle)}
                        >
                          <EditOutlinedIcon fontSize="small" />
                        </button>
                        <button
                          type="button"
                          className="vehicle-list-page__row-action"
                          onClick={() => openVehicleModal("delete", vehicle)}
                        >
                          <DeleteOutlinedIcon fontSize="small" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="vehicle-list-page__status">
              Nenhum veículo encontrado.
            </div>
          )}
        </div>

        {isVehicleModalOpen && (
          <VehicleForm
            mode={modalMode}
            vehicle={selectedVehicle}
            handleCloseModal={closeVehicleModal}
          />
        )}
      </main>
    </MainLayout>
  );
}
