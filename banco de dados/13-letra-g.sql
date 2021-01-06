-- g) Mostre a média dos salários dos empregados por sexo, que sejam maiores de 60 anos e
-- cuja média seja menor que R$2000,00.

SELECT *
  FROM (
    SELECT sexo, CAST(AVG(salario) AS DECIMAL (12,2))
      FROM empregado
        WHERE date_part('year', age(datanasc)) > 60
          GROUP BY sexo
  ) as foo
WHERE foo.avg < 2000;

-- Resultado
-- | sexo | avg |
-- |------|-----|