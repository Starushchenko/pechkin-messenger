export interface IField {
  name: string;
  type: string;
  class?: string;
  required?: boolean;
  value?: string;
  placeholder?: string;
  minlength?: number;
  maxlength?: number;
  rule?: string | RegExp;
  autocomplete?: string;
}

export default IField;
