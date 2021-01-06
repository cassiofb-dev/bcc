-- Agora irei colocar dados para testar algumas queries
-- Nessa primeira parte irei criar dados sem relações/referencias
-- Note que não podemos criar a tabela alocaco pois ela depende de outras

INSERT INTO empregado (nome, datanasc, endereco, sexo, salario) values
  ('Daniel Orivaldo da Silva', '1987/04/13', 'maringá'         , 'm', '5'    ),
  ('Jailson Mendes'          , '1937/03/22', 'rua das delicias', 'g', '51257'),
  ('Luiz Carlos Alborghetti' , '1956/09/10', 'paraná'          , 'm', '7410' ),
  ('Inhegas'                 , '1991/11/13', 'pesadão'         , 'm', '100'  ),
  ('Serjão Berranteiro'      , '1987/04/13', 'rua do perdeu'   , 'm', '0'    ),
  ('Irineu'                  , '1987/04/13', 'rua do perdeu'   , 'm', '3210' ),
  ('João Souza'              , '1920/01/01', 'rua do cefet'    , 'm', '1999' );

INSERT INTO departamento (nome, datainicio) values
  ('Departamento de Memes'   , '1500/04/22'),
  ('Departamento de Bangu'   , '1999/10/14'),
  ('Departamento A'          , '2000/01/01'),
  ('Departamento B'          , '2000/01/02'),
  ('Departamento C'          , '2000/01/03'),
  ('Departamento de Pesquisa', '1978/12/11');

INSERT INTO projeto (nome, area) values
  ('Projeto Fábrica de memes', 'Acre'    ),
  ('Projeto Fábrica de Bangu', 'Bangu'   ),
  ('Projeto a'               , 'alandia' ),
  ('Projeto b'               , 'blandia' ),
  ('Projeto c'               , 'clandia' ),
  ('Mineração de Dados'      , 'CEFET/RJ');