export type JwtPayload = {
  id: string;
  email: string;
  token_type: TokenEnum;
};

export enum TokenEnum {
  ACCESS = 'ACCESS',
  REFRESH = 'REFRESH',
}
