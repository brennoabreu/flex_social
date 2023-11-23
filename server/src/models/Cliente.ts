export interface Cliente {
  id: number;
  empresa: string;
  nome: string;
  email: string;
  dt_nascimento: Date;
  dt_criado?: Date;
}
