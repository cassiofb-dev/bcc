-- Todas as queries anteriores reunidas para agilidade no teste

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

-- Na parte 2 irei criar as referencias/relações das tabelas

-- Empregado (matricula, nome, datanasc, endereco, sexo, salario, supervisor, depto)
-- depto referencia Departamento
-- supervisor referencia Empregado
ALTER TABLE empregado
  ADD COLUMN supervisor uuid,
  ADD COLUMN depto      uuid,
  ADD CONSTRAINT fk_empregado_supervisor
    FOREIGN KEY (supervisor)
      REFERENCES empregado (matricula)
      ON DELETE CASCADE,
  ADD CONSTRAINT fk_empregado_departamento
    FOREIGN KEY (depto)
      REFERENCES departamento (coddep)
      ON DELETE CASCADE;

-- Departamento (coddep, nome, matgerente, datainicio)
-- matgerente referencia Empregado
ALTER TABLE departamento
  ADD COLUMN     matgerente uuid,
  ADD CONSTRAINT fk_departamento_empregado
    FOREIGN KEY (matgerente)
      REFERENCES empregado (matricula)
      ON DELETE CASCADE;

-- Projeto (codproj, nome, local, depto)
-- depto referencia Departamento
ALTER TABLE projeto
  ADD COLUMN     depto uuid,
  ADD CONSTRAINT fk_projeto_departamento
    FOREIGN KEY (depto)
      REFERENCES departamento (coddep)
      ON DELETE CASCADE;

-- Alocacao (matric,codigop, horas)
-- matric referencia Empregado
-- codigop referencia Projeto
ALTER TABLE alocacao
  ADD COLUMN     matric  uuid,
  ADD COLUMN     codigop uuid,
  ADD CONSTRAINT fk_alocacao_empregado
    FOREIGN KEY (matric)
      REFERENCES empregado (matricula)
      ON DELETE CASCADE,
  ADD CONSTRAINT fk_alocacao_projeto
    FOREIGN KEY (codigop)
      REFERENCES projeto (codproj)
      ON DELETE CASCADE,
  ADD CONSTRAINT alocacao_pk
    PRIMARY KEY (matric, codigop);

-- Agora irei colocar dados para testar algumas queries
-- Nessa primeira parte irei criar dados sem relações/referencias
-- Note que não podemos criar a tabela alocaco pois ela depende de outras

INSERT INTO empregado (nome, datanasc, endereco, sexo, salario) values
  ('Daniel Orivaldo da Silva', '1987/04/13', 'maringá'         , 'm', '5'    ),
  ('Jailson Mendes'          , '1937/03/22', 'rua das delicias', 'g', '51257'),
  ('Luiz Carlos Alborghetti' , '1956/09/10', 'paraná'          , 'm', '7410' ),
  ('Inhegas'                 , '1991/11/13', 'pesadão'         , 'm', '100'  ),
  ('Serjão Berranteiro'      , '1987/04/13', 'rua do perdeu'   , 'm', '0'    ),
  ('Irineu'                  , '1987/04/13', 'rua do perdeu'   , 'm', '3210' ),
  ('João Souza'              , '1920/01/01', 'rua do cefet'    , 'm', '1999' );

INSERT INTO departamento (nome, datainicio) values
  ('Departamento de Memes'   , '1500/04/22'),
  ('Departamento de Bangu'   , '1999/10/14'),
  ('Departamento A'          , '2000/01/01'),
  ('Departamento B'          , '2000/01/02'),
  ('Departamento C'          , '2000/01/03'),
  ('Departamento de Pesquisa', '1978/12/11');

INSERT INTO projeto (nome, area) values
  ('Projeto Fábrica de memes', 'Acre'    ),
  ('Projeto Fábrica de Bangu', 'Bangu'   ),
  ('Projeto a'               , 'alandia' ),
  ('Projeto b'               , 'blandia' ),
  ('Projeto c'               , 'clandia' ),
  ('Mineração de Dados'      , 'CEFET/RJ');

-- Nessa segunda parte irei criar relações/referencias e
-- Inserir dados na tabela alocacao

-- Faz o galo cego supervisionar todo mundo
UPDATE empregado
SET
  supervisor = (
    SELECT matricula FROM empregado
      WHERE nome = 'Daniel Orivaldo da Silva'
  ) WHERE nome <> 'Daniel Orivaldo da Silva';

-- Bota o João Souza como gerente do departamento de pesquisa
UPDATE departamento
SET
  matgerente = (
    SELECT matricula FROM empregado
      WHERE nome = 'João Souza'
  ) WHERE nome = 'Departamento de Pesquisa';

-- Bota o Irineu, Inhegas e o João Souza no Departamento de Pesquisa
UPDATE empregado
SET
  depto = (
    SELECT coddep FROM departamento
      WHERE nome = 'Departamento de Pesquisa'
  ) WHERE (
    nome = 'Irineu'  OR
    nome = 'Inhegas' OR
    nome = 'João Souza'
  );

-- Relaciona o projeto Mineração de Dados com o Departamento de Pesquisa
Update projeto
SET
  depto = (
    SELECT coddep FROM departamento
      WHERE nome = 'Departamento de Pesquisa'
  ) WHERE nome = 'Mineração de Dados';

-- Aloca Irineu, Inhegas e João Souza para Mineração de Dados
INSERT INTO alocacao (matric, codigop, horas) values
  (
    (SELECT matricula FROM empregado WHERE nome = 'Inhegas'),
    (SELECT codproj   FROM projeto   WHERE nome = 'Mineração de Dados'),
    '2019-07-01 00:09:01-06'
  ),(
    (SELECT matricula FROM empregado WHERE nome = 'Irineu'),
    (SELECT codproj   FROM projeto   WHERE nome = 'Mineração de Dados'),
    '2019-03-01 01:00:01-06'
  ),(
    (SELECT matricula FROM empregado WHERE nome = 'João Souza'),
    (SELECT codproj   FROM projeto   WHERE nome = 'Mineração de Dados'),
    '2019-03-01 10:00:01-06'
  );