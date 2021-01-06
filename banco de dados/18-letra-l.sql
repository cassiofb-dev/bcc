-- l) Faça uma atualização de 10% nos salários dos empregados maiores de 60 anos.

UPDATE empregado
SET
  salario = salario * 1.1
    WHERE date_part('year', age(datanasc)) > 60;

-- Resposta do terminal
-- UPDATE 3
-- Query returned successfully in 37 msec.