import Entidade from '../database/Entidade';
import { ChavePrimaria, Coluna, Tabela } from '../database/decorador'
@Tabela({ nome: 'TBLUSUARIO'})
class Usuario extends Entidade{
   @ChavePrimaria()
   id: number;
   
   @Coluna()
   usuario: string;

   @Coluna()
   senha: string;

   @Coluna()
   perfil: string;

   @Coluna()
   empresa: string;

   @Coluna({ somenteLeitura: true })
   dtCriado?: Date;

   @Coluna({ somenteLeitura: true })
   dtAlteracao?: Date;
};

export default Usuario;
