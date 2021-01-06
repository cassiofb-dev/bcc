-- b) Obtenha a data de nascimento e endereço do empregado João Souza.

SELECT datanasc, endereco
  FROM empregado
    WHERE nome = 'João Souza';

-- Resposta
-- | datanasc     | endereco       |
-- |--------------|----------------|
-- | "1920-01-01" | "rua do cefet" |