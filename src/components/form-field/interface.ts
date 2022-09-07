import IField from "../field/interface";
import {TEvents} from '../../types/common';

interface IFormField {
  name?: string;
  label?: string;
  info?: string;
  errorText?: string;
  field?: IField;
  value?: string;
  events?: TEvents;
}

export default IFormField;
