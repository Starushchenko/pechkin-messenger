import {TEvents} from '../../types/common';

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
  events?: TEvents;
}

export default IField;
