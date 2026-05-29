import "./style.css";
import StepHeader from "../step_header/StepHeader";
import { STEP_TYPE, type BaseStepProps } from "../../../types/newOrder";
import type { Address, Customer } from "../../../../../packages/shared/src";
import ActionButton from "../../../components/action_button/ActionButton";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import { useEffect, useState } from "react";
import StepToolbar from "../step_toolbar/StepToolbar";
import api from "../../../services/api";
import SearchBar from "../../../components/search_bar/SearchBar";
import { mockCustomers } from "../../../mocks/entities";
import SelectableCard from "../../../components/selectable_card/SelectableCard";

type StepCustomerProps = BaseStepProps & {
  handleSelectCustomerStep: (customer: Customer) => void;
  handleSelectAddressStep: (address: Address) => void;
};

function StepCustomer({
  currentStep,
  currentStepData,
  onBack,
  onNext,
  validateStep,
  handleNewRegisterChange,
  handleSelectCustomerStep,
  handleSelectAddressStep,
}: StepCustomerProps) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customerLoading, setCustomerLoading] = useState(false);
  const [customerError, setCustomerError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  async function fetchCustomerList() {
    setCustomerLoading(true);
    setCustomerError(null);

    try {
      setCustomerLoading(true);
      setCustomerError(null);

      // const response = await api.get("/customers");

      setCustomers(mockCustomers); // response.data | mockCustomers
    } catch (error) {
      setCustomerError("Não foi possível listar clientes");
    } finally {
      setCustomerLoading(false);
    }
  }

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    fetchCustomerList();
  }, []);

  return (
    <div className="step-customer">
      <StepHeader
        currentStep={currentStep}
        stepTitle="Selecionar Cliente"
        stepSubtitle="Escolha o cliente e o endereco onde o servico sera executado."
      />
      <div className="content-separator-horizontal"></div>
      <StepToolbar>
        <SearchBar
          value={search}
          placeholder="Buscar cliente por nome..."
          onChange={setSearch}
        />

        <ActionButton
          onClick={() =>
            handleNewRegisterChange &&
            handleNewRegisterChange(STEP_TYPE.CUSTOMER)
          }
          disabled={false}
          startIcon={<AddOutlinedIcon fontSize="small" />}
          variant="primary"
        >
          Novo
        </ActionButton>
      </StepToolbar>
      <div className="step-customer_content">
        {
          <div className="step-customer_list">
            {customerLoading ? (
              <div className="loading-skeleton">Carregando dados...</div>
            ) : customerError ? (
              <div>
                <span>{customerError}</span>
                <button className="button-retry" onClick={fetchCustomerList}>
                  Tentar novamente
                </button>
              </div>
            ) : !customers.length ? (
              <p>Ainda sem clientes</p>
            ) : (
              filteredCustomers.map((customer) => (
                <div key={customer.id}>
                  <SelectableCard
                    title={customer.name}
                    subtitle={`${customer.identification.type}: ${customer.identification.value}`}
                    icon={customer.name.charAt(0).toUpperCase()}
                    isSelected={currentStepData.customer.id === customer.id}
                    onClick={() => handleSelectCustomerStep(customer)}
                  />

                  {currentStepData.customer.id === customer.id && (
                    <div className="step-customer_addresses">
                      {customer.address.map((address) => (
                        <SelectableCard
                          key={address.id}
                          title={`${address.street}, ${address.number} - ${address.complement}`}
                          subtitle={`${address.neighborhood} - ${address.city}/${address.state} - ${address.postCode}`}
                          icon={<PlaceOutlinedIcon fontSize="small" />}
                          isSelected={currentStepData.address.id === address.id}
                          onClick={() => handleSelectAddressStep(address)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        }
      </div>
      <div className="content-separator-horizontal"></div>
      <div className="step-customer_footer">
        <ActionButton
          onClick={onBack}
          disabled={false}
          variant="secondary"
          endIcon={<KeyboardBackspaceOutlinedIcon fontSize="small" />}
        >
          Voltar
        </ActionButton>
        <ActionButton
          onClick={onNext}
          disabled={!validateStep()}
          variant="primary"
          endIcon={<EastOutlinedIcon fontSize="small" />}
        >
          Próximo
        </ActionButton>
      </div>
    </div>
  );
}

export default StepCustomer;
