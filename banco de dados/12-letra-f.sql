-- f) Mostre o nome do empregado que tem o menor salário.

SELECT nome
  FROM empregado
    WHERE salario = (
      SELECT MIN(salario)
        FROM empregado
    );

-- Resultado
-- | nome                 |
-- |----------------------|
-- | "Serjão Berranteiro" |