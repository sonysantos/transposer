---
nome: Transposer
idioma: português-brasil
objetivo: transpor cifras de música de um tom para outro
interface: uma página web (index.html) totalmente em javascript frontend, para funcionamento local, sem nodejs, sem precisar de servidor, podendo ser carregada no navegador a partir do explorador de arquivos local.
---

## Definições
- Acidente da nota é representada pelos caracteres "#" para acidente ascendente (sustenido) e "b" para acidente descendente (bemol).

## O que deve ter na página web
- Duas listas de dropdown (select), uma para o tom atual e outra para o tom desejado.
- Um campo para colocar o número de espaços correspondente ao comprimento dos caracteres de acidente "#" ou "b" (id tamanho_acidente).
- Um campo com opção da escolha da fonte para os campos de texto que terão a cifra, com 3 opções: monospaced, sans-serif e serif.
- Um campo de entrada de texto (id cifra_original) onde o usuário pode digitar ou colar a cifra no tom original.
- Um campo de saída de texto (id cifra_final) onde o programa exibirá a cifra transposta.

## Como ativar a transposição automática
- Toda vez que houver mudança nas listas de dropdown
- Toda vez que houver mudança no campo cifra_original
- Toda vez que houver mudança no campo tamanho_acidente

## Detalhes do funcionamento
- A transposição deve ser feita de forma automática, sem precisar de botão para acioná-la.
- Os acordes são identificados no texto pelo regex `/\b(?<nota>[A-G][#b]?)(°|dim|m?(\d[\+M]?)?)(?=(\/|\)| |$|\n))/`
- A nota é a única parte do acorde que será trocada na transposição.
- Para manter o espaçamento original:
  - as notas sem acidente substituídas por notas sem acidente não sofrem alteração de espaçamento;
  - as notas com acidente substituídas por notas com acidente não sofrem alteração de espaçamento;
  - as notas com acidente substituídas por notas sem acidente devem compensar adicionando o número de espaços do campo "tamanho_acidente";
    - quando o tamanho_acidente for par, os espaços devem ser distribuídos igualmente antes e depois do acorde (por exemplo, se tamanho_acidente = 4, deve haver 2 espaços antes e 2 espaços depois);
    - quando o tamanho_acidente for ímpar, o número de espaços à direita deve ser um a mais do que à esquerda;
  - as notas sem acidente substituídas por notas com acidente devem compensar removendo o número de espaços do campo "tamanho_acidente";
    - quando o tamanho_acidente for par, os espaços devem ser removidos igualmente antes e depois do acorde;
    - quando o tamanho_acidente for ímpar, o número de espaços removidos à direita deve ser um a mais que à esquerda;
    - se o acorde estiver no começo da linha, todos os espaços devem ser removidos à direita;
    - se o acorde estiver no final da linha, todos os espaços devem ser removidos à esquerda.
