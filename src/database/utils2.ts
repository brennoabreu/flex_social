import Entidade from './Entidade';
import { format } from 'date-fns';

import {
  OpcoesColuna,
  OpcoesTabela,
} from './decorador';
import { Origem, dateFormat } from '.';

export const converteObjeto = <T extends Entidade | Entidade[] = any>(dados: any, Classe: any): T => {
  const dateRegex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;

  if (Array.isArray(dados)) {
    const objeto: Array<T> = [];

    dados.forEach(item => {
      objeto.push(converteObjeto<T>(item, Classe) as T);
    });

    return objeto as any;
  }

  const objeto = new Classe();
  const chavePrimaria = Reflect.getOwnMetadata('ChavePrimaria', Classe);

  if (chavePrimaria) {
    Object.keys(chavePrimaria).forEach(campo => {
      let valor = (dados as any)[campo];
      if (valor === undefined) {
        valor = (dados as any)[campo.toLowerCase()];
      }

      if (typeof valor === 'string') {
        valor = valor.trim();
      }

      if (valor !== undefined && valor !== null) {
        (objeto as any)[campo] = valor;
      }
    });
  }

  const colunas = Reflect.getOwnMetadata('Coluna', Classe);
  if (colunas) {
    Object.keys(colunas).forEach(campo => {
      let valor = (dados as any)[campo];
      if (valor === undefined) {
        valor = (dados as any)[campo.toLowerCase()];
      }
      const opcoes: OpcoesColuna = colunas[campo];
      if (opcoes.casasDecimais) {
        valor = Number(valor);
      } else if (dateRegex.exec(valor)) {
        valor = new Date(valor);
      } else if (typeof valor === 'string') {
        valor = valor.trim();
      }

      if (valor !== undefined && valor !== null) {
        (objeto as any)[campo] = valor;
      }
    });
  }

  return objeto as any;
};


/*
export const construirSelect = (Classe: any, origem: Origem = 'CLIENTE'): string => {
  const tabela: OpcoesTabela = Reflect.getOwnMetadata('Tabela', Classe);
  const camposSelect = retornaCampos(Classe, origem,'SELECT');

  console.log(tabela);
  console.log(camposSelect);

  return `SELECT ${camposSelect} FROM ${tabela.nome}`;
};*/

export const construirSelect = (Classe: any, objeto: Entidade, origem: Origem='CLIENTE'): string => {

  console.log("Entrou construirSelect -> Classe -> ", Classe);
  const tabela: OpcoesTabela = Reflect.getOwnMetadata('Tabela', Classe);
  console.log("Entrou construirSelect -> tabela -> ", tabela);
  console.log("Entrou construirSelect - > objeto", objeto);

  //const camposSelect = retornaCampos(Classe, origem, 'SELECT');
  //console.log("Entrou construirSelect -> camposSelect -> ", camposSelect);

  return `SELECT * FROM ${tabela.nome} WHERE EMPRESA =${objeto.empresa}`;
};


export const construirInsert = (Classe: any, objeto: Entidade, origem: Origem = 'CLIENTE', somenteValores = false): string => {
  console.log("Classe -> ", Classe);
  const tabela: OpcoesTabela = Reflect.getOwnMetadata('Tabela', Classe);

  console.log("tabela -> ",tabela);
  const camposInsert = retornaCampos(Classe, origem, 'INSERT');
  const camposUpdate = retornaCampos(Classe, origem, 'UPDATE');

  let valores = '';
  if (somenteValores) {
    valores += ',';
  }

  for (let i = 0; i < (objeto as any[]).length; i++) {
    const novoObjeto = converteObjeto((objeto as any[])[i], Classe);
    valores += `(${retornaValoresCampos(Classe, novoObjeto, origem)}),`;
  }
  valores = `${valores.slice(0, -1)}`;

  if (somenteValores) {
    return valores;
  }

  return `INSERT INTO ${tabela.nome} (${camposInsert}) VALUES ${valores} ON DUPLICATE KEY UPDATE ${camposUpdate}`;
};


export const retornaCampos = (Classe: any, origem: Origem, operacao: 'INSERT' | 'UPDATE'='INSERT'): string => {
  let campos = '';
  const chavePrimaria = Reflect.getOwnMetadata('ChavePrimaria', Classe);
  Object.keys(chavePrimaria).forEach(campo => {
    if (operacao === 'INSERT') {
      campos += `${campo}, `;
    } else {
      campos += `${campo} = ${campo}, `;
    }
  });

  const colunas = Reflect.getOwnMetadata('Coluna', Classe);
  if (colunas) {
    Object.keys(colunas).forEach(campo => {
      const opcoes: OpcoesColuna = colunas[campo];
      const ignoraCampo = campo.toLocaleLowerCase() === 'regstamp'; // Controlado pelo banco
      const somenteLeitura = opcoes.somenteLeitura && origem === 'CLIENTE';
      const permiteAlterar = !ignoraCampo && !somenteLeitura;
      if (permiteAlterar) {
        if (operacao === 'INSERT') {
          campos += `${campo}, `;
        } else {
          campos += `${campo} = VALUES(${campo}), `;
        }
      }
    });
  }
  campos = campos.slice(0, -2);
  return campos;
};

export const retornaValoresCampos = (Classe: any, objeto: Entidade, origem: Origem): string => {
  let valores = '';
  const chavePrimaria = Reflect.getOwnMetadata('ChavePrimaria', Classe);
  Object.keys(chavePrimaria).forEach(campo => {
    let valor = (objeto as any)[campo];
    valor = trataValor(valor);
    valores += `${valor}, `;
  });

  const colunas = Reflect.getOwnMetadata('Coluna', Classe);
  if (colunas) {
    Object.keys(colunas).forEach(campo => {
      const opcoes: OpcoesColuna = colunas[campo];
      const ignoraCampo = campo.toLocaleLowerCase() === 'regstamp'; // Controlado pelo banco
      const somenteLeitura = opcoes.somenteLeitura && origem === 'CLIENTE';
      const permiteAlterar = !ignoraCampo && !somenteLeitura;
      if (permiteAlterar) {
        let valor = (objeto as any)[campo];
        valor = trataValor(valor);

        if (opcoes.somenteNumeros) {
          valor = valor.replace(/[^0-9]/g, '');
        }

        valores += `${valor}, `;
      }
    });
  }

  valores = valores.slice(0, -2);
  return valores;
};

export const trataValor = (valor: any, formataData = true): any => {
  const dateRegex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;

  if (valor === undefined || valor === null || valor === '' || Number.isNaN(valor)) {
    return null;
  }

  if (dateRegex.exec(valor)) {
    if (formataData) {
      return `'${format(new Date(valor), dateFormat)}'`;
    }

    return new Date(valor);
  }

  if (typeof valor === 'string') {
    return `'${valor}'`;
  }

  if (valor instanceof Date) {
    return `'${format(valor, dateFormat)}'`;
  }

  return valor;
};
