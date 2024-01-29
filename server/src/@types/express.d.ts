declare namespace Express {
  export interface Request {
    usuario: {
      empresa: string;
      codigo:number;
    };
  }
}
