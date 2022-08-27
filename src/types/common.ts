export type TStringObject = {[key:string]:string};

export type TEvents = Record<string, (e: Event) => void>;

export type TIndexedObject = {[key: string]: any};

export type TValidationRules = {[key:string]: {rule: string, errorText: string}};

export type ResponseError = {"reason": string;}
