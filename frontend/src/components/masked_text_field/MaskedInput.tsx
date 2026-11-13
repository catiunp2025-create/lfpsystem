import { forwardRef, useImperativeHandle, useRef } from "react";
import { IMaskInput } from "react-imask";

export const MaskedInput = forwardRef(function MaskedInput(props: any, ref) {
  const { onAccept, ...other } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    get value() {
      return inputRef.current?.value;
    },
  }));

  return <IMaskInput {...other} inputRef={inputRef} onAccept={onAccept} />;
});
