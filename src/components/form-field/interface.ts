import IField from "../field/interface";

interface IFormField {
  name?: string;
  label?: string;
  info?: string;
  errorText?: string;
  field?: IField
}

export default IFormField;
