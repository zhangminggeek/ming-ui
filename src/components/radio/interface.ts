export interface RadioGroupContextProps {
  onChange?: (e: RadioChangeEvent) => void;
  value?: any;
  disabled?: boolean;
  name?: string;
}

export interface RadioChangeEventTarget extends RadioProps {
  checked: boolean;
}

export interface RadioChangeEvent {
  target: RadioChangeEventTarget;
}

export interface RadioProps {
  name?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  value?: any;
  onChange?: (e: RadioChangeEvent) => void;
  children?: React.ReactNode;
}

export interface RadioState {
  checked: boolean;
}
