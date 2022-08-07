export interface IErrorScreen {
  isClient: boolean;
  code: number;
  description?: string | HTMLElement;
}

export default IErrorScreen;
