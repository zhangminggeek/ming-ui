export interface RadioGroupContextProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
  className?: string;
  style?: React.CSSProperties;
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
