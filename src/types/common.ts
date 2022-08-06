export type TStringObject = {[key:string]:string};

export type TEvents = Record<string, (e: Event) => void>;
