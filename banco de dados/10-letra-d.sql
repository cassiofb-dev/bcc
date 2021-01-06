-- d) Mostre os nomes dos empregados que estejam em projetos de Mineração de Dados.

SELECT nome
  FROM empregado
    INNER JOIN alocacao
      ON matricula = matric
        WHERE codigop IN (
          SELECT codproj
            FROM projeto
              WHERE nome = 'Mineração de Dados'
        );

-- Resposta
-- | nome         |
-- |--------------|
-- | "Inhegas"    |
-- | "Irineu"     |
-- | "João Souza" |