-- e) Mostre a quantidade de empregados para cada projeto.

SELECT nome, COUNT(matric)
  FROM (
    SELECT * 
      FROM projeto 
        LEFT JOIN alocacao 
          ON codproj = codigop
  ) as foo
    GROUP BY nome;

-- Resultado
-- | projeto                    | empregados |
-- |----------------------------|------------|
-- | "Projeto Fábrica de Bangu" | 0          |
-- | "Mineração de Dados"       | 3          |
-- | "Projeto Fábrica de memes" | 0          |
-- | "Projeto a"                | 0          |
-- | "Projeto b"                | 0          |
-- | "Projeto c"                | 0          |