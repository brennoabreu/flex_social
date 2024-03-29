/*
  TABELA EMPRESA
*/
CREATE TABLE TBLEMPRESA (
  ID                INT(10) NOT NULL AUTO_INCREMENT,
  CNPJCPF           VARCHAR(20) NOT NULL,
  RAZAOSOCIAL       VARCHAR(150) NOT NULL,
  TIPO              ENUM('F','J') DEFAULT 'J',/*F - FISICA, J - JURIDICA*/
  INSCRICAOESTADUAL VARCHAR(20),
  NOMEFANTASIA      VARCHAR(250),
  REGIMETRIBUTARIO  VARCHAR(50),
  SITE              VARCHAR(250),
  EMAIL             VARCHAR(250),
  TELEFONE          VARCHAR(20),
  CELULAR           VARCHAR(20),
  WHATSAPP          VARCHAR(20),
  ESTADO            VARCHAR(2),
  CIDADE            VARCHAR(80),
  ENDERECO          VARCHAR(250),
  NUMERO            VARCHAR(20),
  BAIRRO            VARCHAR(100),
  COMPLEMNTO        VARCHAR(30),
  CEP               VARCHAR(10),
  SISTEMA           ENUM('00000001','00000002') DEFAULT NULL,
  ATIVO	            ENUM('A','I') DEFAULT 'A',/*A->ATIVO, I->INATIVO*/
  DTCRIADO          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  DTALTERACAO       TIMESTAMP on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  PRIMARY KEY(ID));
COMMIT;
