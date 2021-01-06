-- m) Exclua os empregados que não estão alocados em projetos.

DELETE
  FROM empregado
    WHERE nome NOT IN (
      SELECT *
        FROM empregado
          INNER JOIN alocacao
            ON matricula = matric
    );

-- Resposta do terminal
-- DELETE 4
-- Query returned successfully in 36 msec.