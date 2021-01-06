-- Na parte 1 irei criar as tabelas sem referencias/relações

-- Extensão para gerenciar os IDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Empregado (matricula, nome, datanasc, endereco, sexo, salario, supervisor, depto)
-- depto referencia Departamento
-- supervisor referencia Empregado
CREATE TABLE empregado (
  matricula uuid           DEFAULT uuid_generate_v4 (),
  nome      VARCHAR(1023)  NOT NULL,
  datanasc  DATE           NOT NULL,
  endereco  VARCHAR(1023)  NOT NULL,
  sexo      CHAR(1)        NOT NULL,
  salario   NUMERIC        NOT NULL,
  CONSTRAINT empregados_pk PRIMARY KEY (matricula)
);

-- Departamento (coddep, nome, matgerente, datainicio)
-- matgerente referencia Empregado
CREATE TABLE departamento (
  coddep     uuid            DEFAULT uuid_generate_v4 (),
  nome       VARCHAR(1023)   NOT NULL,
  datainicio DATE            NOT NULL,
  CONSTRAINT departamento_pk PRIMARY KEY (coddep)
);

-- Projeto (codproj, nome, local, depto)
-- depto referencia Departamento
-- obs: no sql LOCAL é uma palavra reservada
--      então irei mudar local para area
CREATE TABLE projeto(
  codproj    uuid          DEFAULT uuid_generate_v4 (),
  nome       VARCHAR(1023) NOT NULL,
  area       VARCHAR(1023) NOT NULL,
  CONSTRAINT projeto_pk    PRIMARY KEY (codproj)
);

-- Alocacao (matric,codigop, horas)
-- matric referencia Empregado
-- codigop referencia Projeto
CREATE TABLE alocacao(
  horas timestamptz NOT NULL
);