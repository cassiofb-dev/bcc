-- j) Obter a lista do nome de todos os projetos que envolvem algum empregado cujo sobrenome é Souza como trabalhador ou como gerente do departamento que controla o projeto.

SELECT projeto.nome
  FROM empregado
    INNER JOIN alocacao
      ON matricula = matric
        INNER JOIN projeto
          ON codproj = codigop
            INNER JOIN departamento
              ON coddep = projeto.depto
                WHERE split_part(
                  empregado.nome,
                  ' ',
                  array_upper(
                    string_to_array(
                      empregado.nome,
                      ' '
                    ),
                    1
                  )
                ) = 'Souza' OR matricula = matgerente;

-- Resposta
-- | nome                 |
-- |----------------------|
-- | "Mineração de Dados" |