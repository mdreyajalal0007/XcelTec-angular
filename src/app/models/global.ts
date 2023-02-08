import { ValidatorFn, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

export interface IHitApi {
  url: string;
  requestMethod: RequestMethod;
  input: object;
  ignoreToken?: boolean;
  ignoreBaseUrl?: boolean;
  response: Function;
  errorFunction?: Function;
  endFunction?: Function;
  hideResponseMsg?: boolean;
  hideLoader?: boolean;
}

export enum RequestMethod {
  GET,
  POST,
  PUT,
  DELETE,
}

export interface IDropdown {
  placeholder: string;
  data: {
    text: string;
    value: string | number;
    groupBy?: string;
  }[];
  mode?: 'CheckBox' | null;
  selected?: string | number;
}
