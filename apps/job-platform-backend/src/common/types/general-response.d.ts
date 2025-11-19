export interface GeneralResponseMessageType {
  status: string;
  message: string;
}
export interface GeneralResponseType {
  [key: string]: GeneralResponseMessageType;
}
