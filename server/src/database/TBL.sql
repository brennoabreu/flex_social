/*
  SEMANA 1

*/
CREATE TABLE TBLCLIENTE (
  EMPRESA      VARCHAR(40) NOT NULL,
  ID           INT(10) NOT NULL AUTO_INCREMENT,
  NOME         VARCHAR(150) NOT NULL,
  EMAIL        VARCHAR(250),
  CPF          VARCHAR(20),
  CNPJ         VARCHAR(20),
  TIPO         VARCHAR(1),
  DTNASCIMENTO TIMESTAMP,
  DTCRIADO     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  DTALTERACAO  TIMESTAMP on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  PRIMARY KEY(EMPRESA, ID),
  KEY (ID)
);
COMMIT;
