import 'reflect-metadata';

export interface OpcoesTabela {
  nome: string;
}

export interface OpcoesChavePrimaria {
  autoIncremento?: boolean;
  chaveIntegracao?: boolean;
}

export interface OpcoesColuna {
  chaveIntegracao?: boolean;
  casasDecimais?: number;
  somenteNumeros?: boolean;
  blob?: boolean;
  somenteLeitura?: boolean;
}

export const Tabela = (opcoes: OpcoesTabela): ClassDecorator => {
  return (target: any) => {
    Reflect.defineMetadata('Tabela', opcoes, target);
  };
};

export const ChavePrimaria = (opcoes: OpcoesChavePrimaria = {}): PropertyDecorator => {
  return (target, property) => {
    const metadata =    Reflect.getMetadata('ChavePrimaria', target.constructor) || {};
    metadata[property] = opcoes;
    Reflect.defineMetadata('ChavePrimaria', metadata, target.constructor);
  };
};

export const Coluna = (opcoes: OpcoesColuna = {}): PropertyDecorator => {
  return (target, property) => {
    const metadata = Reflect.getMetadata('Coluna', target.constructor) || {};
    metadata[property] = opcoes;
    Reflect.defineMetadata('Coluna', metadata, target.constructor);
  };
};
