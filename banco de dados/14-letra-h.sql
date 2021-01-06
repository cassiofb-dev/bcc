-- h) Liste os nomes de departamentos que não possuem gerentes.

SELECT nome
  FROM departamento
    WHERE matgerente IS NULL;

-- Resposta
-- | nome                    |
-- |-------------------------|
-- | "Departamento de Memes" |
-- | "Departamento de Bangu" |
-- | "Departamento A"        |
-- | "Departamento B"        |
-- | "Departamento C"        |