# Lista 2

## Sumário
- [Lista 2](#lista-2)
  - [Sumário](#sumário)
  - [Sobre](#sobre)
  - [Questão 01](#questão-01)
  - [Questão 02](#questão-02)
  - [Questão 03](#questão-03)
  - [Questão 04](#questão-04)
  - [Questão 05](#questão-05)
  - [Questão 06](#questão-06)
  - [Questão 07](#questão-07)
  - [Questão 08](#questão-08)
  - [Questão 09](#questão-09)
    - [a)](#a)
    - [b)](#b)
    - [c)](#c)
    - [d)](#d)
    - [e)](#e)

## Sobre
Resolução da segunda lista de organização e estrutura de arquivos.

## Questão 01
<p align="center">
  <img
    alt="solução"
    src="https://i.imgur.com/mXsrPtD.png"
  />
</p>

## Questão 02
<p align="center">
  <img
    alt="solução"
    src="https://i.imgur.com/IxMKtUE.png"
  />
</p>

## Questão 03
<p align="center">
  Arvore B - Final
  <img
    alt="solução"
    src="https://i.imgur.com/Zo04eyx.png"
  />
</p>
<p align="center">
  Arvore B+ - Final
  <img
    alt="solução"
    src="https://i.imgur.com/FRyd9Qt.png"
  />
</p>

## Questão 04
|          X          |  Arvore B |  Arvore B+ |
|:-------------------:|:---------:|:----------:|
|  Páginas (2 bytes)  |     4     |      5     |
|   Chaves (4 bytes)  |     10    |     13     |
| Ponteiros (4 bytes) |     3     |      7     |
|   Tamanho (bytes)   | 8+4x13=60 | 10+4x20=90 |

## Questão 05
|       X       |                                                   Arvore B                                                  |                        Arvore B+                       |
|:-------------:|:-----------------------------------------------------------------------------------------------------------:|:------------------------------------------------------:|
| Armazenamento |                               Informação associada armazanada em todos os nós                               | Informação associada armazenada somente nos nós folhas |
|  Redundância  |                                          Sem redundância de chaves                                          |            Chaves redundantes podem existir            |
|     Folha     |                                                 Não ligadas                                                 |       Folhas ligadas formando uma lista encadeada      |
|  Escaneamento | Para visitar todos os nós precisa fazer um percurso de arvore com O(n+n-1)=O(n) de tempo porém O(h) memória |   A visita de todos é mais rápida e usa O(1) memória   |

## Questão 06
<p align="center">
  <img
    alt="solução"
    src="https://i.imgur.com/60stPOq.png"
  />
</p>

## Questão 07
<p align="center">
  <img
    alt="solução"
    src="https://i.imgur.com/3U25efe.png"
  />
</p>
<p align="center">
  <img
    alt="solução"
    src="https://i.imgur.com/6owURMO.png"
  />
</p>

## Questão 08
```py
fi = open(indexName, "r+b")
vazio = 0

for i in range(hashSize):
  indexRecord = indexStruct.unpack(fi.read(indexStruct.size))

  if(indexRecord is None):
    vazio = vazio + 1
  
```

## Questão 09
### a)
20

### b)
O método `length` retorna o tamanho em bytes.

### c)
O método `read` retorna -1 no final do arquivo.

### d)
> Fase de Divisão
1. Divida o arquivo em k arquivos que caibam na RAM
2. Ordene os k arquivos com um algoritmo de ordenação eficiente, O(nlog(n)), adequado
3. Armazene cada um dos k arquivos em disco

> Fase de Conquista
1. Junte os k arquivos com um *k-way merge*

### e)
Não