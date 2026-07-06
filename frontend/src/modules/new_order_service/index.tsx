import "./style.css";
import { MainLayout } from "../../components/layout/MainLayout";
import { Steppers } from "./step_bar/StepBar";
import { ResumeOs } from "./resume_os/ResumeOs";
import { useState } from "react";
import type {
  Address,
  Customer,
  Service,
  Vehicle,
  VehicleUser,
} from "../../../../packages/shared/src/index";
import {
  initialAddress,
  initialStepData,
  requiredAddressFields,
  requiredCustomerFields,
  requiredVehicleFields,
  requiredVehicleUserFields,
} from "../../constants/newOrder";
import {
  type BaseStepProps,
  type ModalType,
  type StepData,
  type TypeVehicleUser,
  MODAL_TYPE,
  type StepNumber,
  STEPS,
  type StepConfig,
} from "../../types/newOrder";
import VehicleForm from "./vehicle_form/VehicleForm";
import StepVehicle from "./step_vehicle/StepVehicle";
import CustomerForm from "./customer_form/CustomerForm";
import StepCustomer from "./step_customer/StepCustomer";
import StepServices from "./step_services/StepServices";
import StepFinal from "./step_final/StepFinal";
import OrderReview from "./order_review/OrderReview";
import ServiceForm from "./service_form/ServiceForm";
import dayjs from "dayjs";

export function validateRequiredFields<T extends object>(
  obj: T,
  requiredFields: (keyof T)[],
): boolean {
  return requiredFields.every((field) => {
    const value = obj[field];

    if (typeof value === "string") {
      return value.trim() !== "";
    }

    if (typeof value === "number") {
      return value !== 0;
    }

    if (Array.isArray(value)) {
      return value.length > 0;
    }

    return value !== null && value !== undefined;
  });
}

function NewOrderService() {
  const [currentStep, setCurrentStep] = useState<StepNumber>(1);
  const [visitedSteps, setVisitedSteps] = useState<Set<StepNumber>>(new Set());
  const [refresh, setRefresh] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<StepNumber>>(
    new Set(),
  );
  const [currentStepData, setCurrentStepData] =
    useState<StepData>(initialStepData);

  // Concluir step atual, marca step seguinte como visitada e avança para ela
  const handleNextStep = () => {
    const nextStep =
      currentStep === STEPS.length
        ? currentStep
        : ((currentStep + 1) as StepNumber);

    setCompletedSteps((prev) => new Set(prev).add(currentStep));
    setVisitedSteps((prev) => new Set(prev).add(nextStep));
    setCurrentStep(nextStep);
  };

  // Volta para a step anterior
  const prevStep = () => {
    setCurrentStep((prev) => {
      if (prev === STEPS[0]) return prev;

      return (prev - 1) as StepNumber;
    });
  };

  const onNext = currentStep < 4 ? handleNextStep : undefined;
  const onBack = currentStep > 1 ? prevStep : undefined;

  // Atualiza os dados no resumo vindos da step atual
  const updateStepData = <K extends keyof StepData>(
    field: K,
    value: StepData[K],
  ) => {
    setCurrentStepData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Configura validações específicas de cada step
  const stepConfig = {
    1: {
      validations: [
        {
          field: "vehicle",
          requiredFields: requiredVehicleFields,
        },
        {
          field: "driver",
          requiredFields: requiredVehicleUserFields,
        },
        {
          field: "assistant",
          requiredFields: requiredVehicleUserFields,
        },
      ],
    },

    2: {
      validations: [
        {
          field: "customer",
          requiredFields: requiredCustomerFields,
        },
        {
          field: "address",
          requiredFields: requiredAddressFields,
        },
      ],
    },

    3: {
      validate: () => currentStepData.services.length > 0,
    },

    4: {
      validate: () => dayjs(currentStepData.scheduleDate).isValid(),
    },
  } as const;

  // Valida os campos obrigatórios das steps
  function validateStepFields(
    object: Record<string, unknown>,
    requiredFields: string[],
  ) {
    return requiredFields.every((field) => {
      const value = object[field];

      if (Array.isArray(value)) {
        return value.length > 0;
      }

      return value !== null && value !== undefined && value !== "";
    });
  }

  // Valida a step atual para poder avançar/completar
  const validateStep = () => {
    const config = stepConfig[currentStep];

    if ("validate" in config) {
      return config.validate();
    }

    return config.validations.every(({ field, requiredFields }) => {
      return validateStepFields(currentStepData[field], requiredFields);
    });
  };

  // Atualiza dados do Customer no resumo, de acordo com o customer selecionado em sua step
  const handleSelectCustomerStep = (customer: Customer) => {
    updateStepData("customer", customer);
    updateStepData("address", initialAddress);
  };

  // Atualiza dados do Address no resumo, de acordo com o address selecionado em sua step
  const handleSelectAddressStep = (address: Address) => {
    updateStepData("address", address);
  };

  // Atualiza dados do Vehicle no resumo, de acordo com o vehicle selecionado em sua step
  const handleSelectVehicleStep = (vehicle: Vehicle) => {
    updateStepData("vehicle", vehicle);
  };

  // Atualiza dados do Driver/Assistant no resumo, de acordo com o ariver/assistant selecionado em sua step
  const handleSelectVehicleUserStep = (
    vehicleUser: VehicleUser,
    vehicleUserType: TypeVehicleUser,
  ) => {
    updateStepData(vehicleUserType, vehicleUser);
  };

  // Atualiza dados dos services no resumo, de acordo com services com checkbox marcados
  const handleToggleService = (service: Service) => {
    const alreadySelected = currentStepData.services.some(
      (item) => item.id === service.id,
    );

    if (alreadySelected) {
      updateStepData(
        "services",
        currentStepData.services.filter((item) => item.id !== service.id),
      );

      return;
    }

    updateStepData("services", [...currentStepData.services, service]);
  };

  // Atualiza data prevista no resumo, de acordo com seleção no DatePicker
  const handleScheduleDateChange = (scheduleDate: string | null) => {
    updateStepData("scheduleDate", scheduleDate);
  };

  // Atualiza observações no resumo, de acordo com texto escrito
  const handleObservationsChange = (observations: string) => {
    updateStepData("observations", observations);
  };

  // Aciona modal para novo registro ou confirmar OS, de acordo com step atual
  const handleOpenModal = (type: ModalType) => {
    setActiveModal(type);
  };

  // Fecha modal aberto, de acordo com step atual
  const handleCloseModal = () => {
    setActiveModal(null);
    setRefresh((prev) => prev + 1);
  };

  // Para abrir e fechar os modals de novo registro e confirmação da OS
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);
  const modalsConfig: Record<ModalType, React.ComponentType<any>> = {
    [MODAL_TYPE.VEHICLE]: VehicleForm,
    [MODAL_TYPE.CUSTOMER]: CustomerForm,
    [MODAL_TYPE.SERVICE]: ServiceForm,
    [MODAL_TYPE.ORDER_REVIEW]: OrderReview,
  };
  const CurrentModalOpen = activeModal ? modalsConfig[activeModal] : null;

  // Props base para todas as steps
  const baseProps: BaseStepProps = {
    currentStep,
    currentStepData,
    onNext,
    onBack,
    validateStep,
    handleOpenModal,
    handleCloseModal,
  };

  // Configuração de props por step específica
  const stepsConfig: StepConfig[] = [
    {
      component: StepVehicle,
      props: {
        refresh,
        handleSelectVehicleStep,
        handleSelectVehicleUserStep,
      },
      modal: {
        component: CurrentModalOpen,
        props: { handleCloseModal },
      },
    },
    {
      component: StepCustomer,
      props: {
        refresh,
        handleSelectCustomerStep,
        handleSelectAddressStep,
      },
      modal: {
        component: CurrentModalOpen,
        props: { handleCloseModal },
      },
    },
    {
      component: StepServices,
      props: {
        refresh,
        handleToggleService,
      },
      modal: {
        component: CurrentModalOpen,
        props: { handleCloseModal },
      },
    },
    {
      component: StepFinal,
      props: {
        refresh,
        handleScheduleDateChange,
        handleObservationsChange,
      },
      modal: {
        component: CurrentModalOpen,
        props: { currentStepData, handleCloseModal },
      },
    },
  ];

  // Define a step atual a ser renderizada com suas determinadas props
  const CurrentStep = stepsConfig[currentStep - 1];

  // Permite ir para as steps já visitadas
  const handleStepChange = (step: StepNumber) => {
    if (visitedSteps.has(step) || completedSteps.has(step)) {
      setCurrentStep(step);
    }
  };

  return (
    <MainLayout pageTitle="Nova ordem de serviço">
      <Steppers
        currentStep={currentStep}
        visitedSteps={visitedSteps}
        completedSteps={completedSteps}
        onStepChange={handleStepChange}
      />
      <div className="content-steppers">
        <div className="step-content">
          <CurrentStep.component {...baseProps} {...CurrentStep.props} />
        </div>
        <div className="resume-content">
          <ResumeOs currentStepData={currentStepData} />
        </div>
      </div>

      {CurrentModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            {CurrentStep.modal && CurrentStep.modal.component && (
              <CurrentStep.modal.component {...CurrentStep.modal.props} />
            )}
          </div>
        </div>  
      )}
    </MainLayout>
  );
}

export default NewOrderService;
