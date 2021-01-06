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