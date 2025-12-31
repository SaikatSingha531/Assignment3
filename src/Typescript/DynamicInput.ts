import type { Control, FieldErrors } from "react-hook-form";

export interface DynamicInputProps<T> {
  control: Control;
  errors: FieldErrors;
  name: keyof T;
  placeholder?: string;
}