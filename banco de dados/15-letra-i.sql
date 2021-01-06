-- i) Liste os nomes dos empregados que possuam o sobrenome Silva e que estão alocados em algum projeto. (Utilize subconsulta)

SELECT split_part(nome, ' ', array_upper(string_to_array(nome, ' '), 1))
  FROM empregado
    INNER JOIN alocacao
      ON matricula = matric
        WHERE codigop IS NOT NULL;

-- Resultado
-- | nome      |
-- |-----------|
-- | "Inhegas" |
-- | "Irineu"  |
-- | "Souza"   |