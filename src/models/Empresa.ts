import Entidade from '../database/Entidade';
import { ChavePrimaria, Coluna, Tabela } from '../database/decorador'
@Tabela({ nome: 'TBLEMPRESA'})
class Empresa extends Entidade{
   @ChavePrimaria()
   id: number;

   @Coluna()
   cnpjcpf: string;

   @Coluna()
   razaoSocial: string;

   @Coluna()
   tipo: 'F'|'J';

   @Coluna()
   inscricaoEstadual:string;

   @Coluna()
   nomeFantasia: string;

   @Coluna()
   regimeTributario: string;

   @Coluna()
   site: string;

   @Coluna()
   email: string;

   @Coluna()
   telefone: string;

   @Coluna()
   celular: string;

   @Coluna()
   estado: string;

   @Coluna()
   cidade: string;

   @Coluna()
   endereco: string;

   @Coluna()
   numero: string;

   @Coluna()
   bairro: string;

   @Coluna()
   complemento: string;

   @Coluna()
   cep: string;

   @Coluna()
   sistema: '00000001';

   @Coluna({ somenteLeitura: true })
   ativo?: 'S'|'N';

   @Coluna({ somenteLeitura: true })
   dtCriado?: Date;

   @Coluna({ somenteLeitura: true })
   dtAlteracao?: Date;
};

export default Empresa;
