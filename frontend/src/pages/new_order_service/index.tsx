import "./style.css";
import { MainLayout } from "../../components/layout/MainLayout";
import { Steppers } from "./step_bar/StepBar";
import { ResumeOs } from "./resume_os/ResumeOs";
import { useState } from "react";
import type {
  Address,
  Customer,
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
import { mockStepData } from "../../mocks/stepdata.mock";
import {
  type BaseStepProps,
  type RegisterType,
  type StepData,
  type TypeVehicleUser,
  STEP_TYPE,
  type StepNumber,
  STEPS,
} from "../../types/newOrder";
import VehicleForm from "./vehicle_form/VehicleForm";
import StepVehicle from "./step_vehicle/StepVehicle";

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
  const [maxVisitedStep, setMaxVisitedStep] = useState<StepNumber>(1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [currentStepData, setCurrentStepData] =
    useState<StepData>(mockStepData); // mockStepData | initialStepData
  const [registerType, setRegisterType] = useState<RegisterType | null>(null);

  // Para chamar os formulários de criar novo durante a step
  const isModalOpen = registerType !== null;
  const registerFormConfig = {
    [STEP_TYPE.VEHICLE]: VehicleForm,
    //[REGISTER_TYPE.CUSTOMER]: CustomerForm,
  };
  const CurrentRegisterForm = registerType
    ? registerFormConfig[registerType]
    : null;

  // Concluir step atual, marca step seguinte como visitada e avança para ela
  const handleNextStep = () => {
    setCompletedSteps((prev) => new Set(prev).add(currentStep));

    setCurrentStep((prev) => {
      if (prev === STEPS.length) return prev;

      return (prev + 1) as StepNumber;
    });

    if (currentStep > maxVisitedStep) {
      setMaxVisitedStep(currentStep);
    }
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

  // Permite ir para as steps já visitadas
  const handleStepChange = (step: StepNumber) => {
    if (step <= maxVisitedStep) {
      setCurrentStep(step);
    }
  };

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
          requiredFields: requiredVehicleFields as string[],
        },
        {
          field: "driver",
          requiredFields: requiredVehicleUserFields as string[],
        },
        {
          field: "assistant",
          requiredFields: requiredVehicleUserFields as string[],
        },
      ],
    },

    2: {
      validations: [
        {
          field: "customer",
          requiredFields: requiredCustomerFields as string[],
        },
        {
          field: "address",
          requiredFields: requiredAddressFields as string[],
        },
      ],
    },

    3: {
      validate: () => currentStepData.services.length > 0,
    },

    4: {
      validate: () => currentStepData.scheduleDate !== null,
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

  // Aciona form de novo registro de vehicle ou customer, de acordo com step atual
  const handleNewRegisterChange = (type: RegisterType) => {
    setRegisterType(type);
  };

  // Props base para todas as steps
  const baseProps: BaseStepProps = {
    currentStep,
    onNext,
    onBack,
    validateStep,
    handleNewRegisterChange,
  };

  // Configuração de props por step específica
  const stepsConfig = [
    {
      component: StepVehicle,
      props: {
        handleSelectVehicleStep,
        handleSelectVehicleUserStep,
      },
    },
  ];

  // Define a step atual a ser renderizada com suas determinadas props
  const CurrentStep = stepsConfig[currentStep - 1];

  return (
    <MainLayout pageTitle="Nova ordem de serviço">
      <Steppers
        currentStep={currentStep}
        maxVisitedStep={maxVisitedStep}
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
    </MainLayout>
  );
}

export default NewOrderService;
