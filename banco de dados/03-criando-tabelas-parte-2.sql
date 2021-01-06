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