-- a) Liste o nome, endereço e nascimento de todos os empregados de maneira ordenada.

SELECT nome, endereco
  FROM empregado
    ORDER BY nome ASC;

-- Resultado
-- | nome                       | endereco           |
-- |----------------------------|--------------------|
-- | "Daniel Orivaldo da Silva" | "maringá"          |
-- | "Inhegas"                  | "pesadão"          |
-- | "Irineu"                   | "rua do perdeu"    |
-- | "Jailson Mendes"           | "rua das delicias" |
-- | "João Souza"               | "rua do cefet"     |
-- | "Luiz Carlos Alborghetti"  | "paraná"           |
-- | "Serjão Berranteiro"       | "rua do perdeu"    |