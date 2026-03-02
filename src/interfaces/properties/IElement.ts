import {type IOption, type IValidator} from "@/interfaces";

export interface IElement {
  id?: string;
  label?: string;
  component: string;
  value: string;
  helpText?: string;
  placeholderText?: string;
  options?: Array<IOption>;
  isRequired?: boolean;
  isValid?: boolean;
  readonly?: boolean,
  visible?: boolean,
  visibleIf?: Array<Function>
  cssClass?: string;
  validators?: Array<IValidator>;
  type?: string;
}