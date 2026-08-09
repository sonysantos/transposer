# Transposer

Transpositor de cifras de música para a web. Uma única página (`index.html`) com JavaScript puro, sem dependências, sem servidor e sem Node — basta abrir o arquivo no navegador a partir do explorador de arquivos.

## Como usar

1. Abra o `index.html` no navegador.
2. Escolha o **Tom atual** (tom da cifra colada/digitada) e o **Tom desejado**.
3. Cole ou digite a cifra no campo **Cifra no tom original**.
4. A cifra transposta aparece automaticamente no campo **Cifra transposta**.

A transposição é recalculada automaticamente a cada mudança nos seletores de tom, no campo de texto ou no campo **Tamanho do acidente** — não há botão de transposição.

## Recursos

- **Transposição automática e instantânea**: sem botão de acionar; basta alterar qualquer campo.
- **Autodetecção do tom original ao colar**: ao colar uma cifra (botão **Colar cifra** ou Ctrl+V), o campo *Tom atual* é ajustado automaticamente para a última nota encontrada no texto, de acordo com o regex de acordes. Edição manual do texto não altera o tom.
- **Botão "Colar cifra"**: cola o conteúdo da área de transferência no campo de entrada.
- **Botão "Copiar cifra"**: copia a cifra transposta para a área de transferência (com feedback "Copiado!").
- **Grafia enarmônica pelo tom escolhido**: teclas pretas aparecem com ambas as grafias (C#/Db, D#/Eb, F#/Gb, G#/Ab, A#/Bb); a grafia do tom desejado define os acidentes usados na saída.
- **Preservação do espaçamento**: as notas são substituídas mantendo o alinhamento do texto:
  - nota com acidente → nota sem acidente: adiciona o número de espaços definido em *Tamanho do acidente* (par: metade antes e metade depois; ímpar: um a mais à direita);
  - nota sem acidente → nota com acidente: remove o mesmo número de espaços; no começo da linha os espaços são removidos à direita e no fim da linha à esquerda;
  - sem mudança de acidente: espaçamento intacto.
- **Autoajuste do tamanho do acidente**: ao trocar a fonte das cifras, o campo *Tamanho do acidente* é ajustado automaticamente — **1** para fonte monospaced, **2** para sans-serif ou serif.
- **Escolha da fonte**: monospaced, sans-serif ou serif para os campos de texto da cifra.
- **Baixo com barra**: acordes como `C/G` têm o baixo transposto junto (ex.: `C/G` → `G/D`).

## Identificação dos acordes

Os acordes são identificados pelo regex:

```
/\b(?<nota>[A-G][#b]?)(°|dim|m?(\d[\+M]?)?)(?=(\/|\)| |$|\n))/
```

Somente a parte da **nota** é trocada na transposição; sufixos como `m`, `7`, `dim` e `°` são preservados. Nota: sufixos fora desse regex (ex.: `maj7`, `A+`, `m7b5`) não são reconhecidos e permanecem como estão.

## Testes

O arquivo `test_transposer.js` (Node) valida a transposição, o espaçamento e a autodetecção:

```
node test_transposer.js
```

Todos os casos de teste devem exibir `PASS`.
