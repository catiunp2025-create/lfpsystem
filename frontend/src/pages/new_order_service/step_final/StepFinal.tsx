import "./style.css";
import "../../../styles/variables.css";
import { MODAL_TYPE, type BaseStepProps } from "../../../types/newOrder";
import StepHeader from "../step_header/StepHeader";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import updateLocale from "dayjs/plugin/updateLocale";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import ActionButton from "../../../components/action_button/ActionButton";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";

type StepFinalProps = BaseStepProps & {
  handleScheduleDateChange: (value: string | null) => void;
  handleObservationsChange: (observations: string) => void;
};

function StepFinal({
  currentStep,
  currentStepData,
  onBack,
  validateStep,
  handleOpenModal,
  handleScheduleDateChange,
  handleObservationsChange,
}: StepFinalProps) {
  dayjs.extend(updateLocale);
  dayjs.updateLocale("pt-br", {
    weekdaysMin: ["D", "S", "T", "Q", "Q", "S", "S"],
  });

  return (
    <div className="step-final">
      <StepHeader
        currentStep={currentStep}
        stepTitle="Finalizar Ordem"
        stepSubtitle="Preencha os dados restantes e confirme a abertura da OS."
      />
      <div className="content-separator-horizontal"></div>
      <section className="step-final_content">
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
          <DatePicker
            label="Data prevista"
            minDate={dayjs()}
            value={
              currentStepData.scheduleDate
                ? dayjs(currentStepData.scheduleDate)
                : null
            }
            slotProps={{
              textField: {
                fullWidth: true,
                size: "small",
                sx: {
                  maxWidth: 320,
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "var(--color-primary)",
                  },

                  "& .MuiPickersOutlinedInput-notchedOutline": {
                    borderColor: "#CBD5E1",
                  },

                  "& .MuiPickersInputBase-root.Mui-focused .MuiPickersOutlinedInput-notchedOutline":
                    {
                      borderColor: "var(--color-primary) !important",
                      borderWidth: 1,
                      boxShadow: "var(--shadow-selected-card)",
                    },
                },
              },
            }}
            onChange={(value) =>
              handleScheduleDateChange(value?.format("YYYY-MM-DD") ?? null)
            }
          />
        </LocalizationProvider>
        <textarea
          className="step-final_observations"
          placeholder="Imformacoes adicionais..."
          onChange={(event) => handleObservationsChange(event.target.value)}
        />
      </section>
      <div className="content-separator-horizontal"></div>
      <div className="step-final_footer">
        <ActionButton
          onClick={onBack}
          disabled={false}
          variant="secondary"
          startIcon={<KeyboardBackspaceOutlinedIcon fontSize="small" />}
        >
          Voltar
        </ActionButton>
        <ActionButton
          onClick={() =>
            handleOpenModal && handleOpenModal(MODAL_TYPE.ORDER_REVIEW)
          }
          disabled={!validateStep()}
          variant="primary"
          endIcon={<EastOutlinedIcon fontSize="small" />}
        >
          Finalizar
        </ActionButton>
      </div>
    </div>
  );
}

export default StepFinal;
