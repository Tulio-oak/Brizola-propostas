# João Leonel Brizola — Guia de Propostas

Landing page estática. Nenhuma dependência, nenhum build.

## Estrutura

```
index.html        markup completo (estilos inline por elemento)
css/styles.css    resets, @keyframes e todos os estados :hover
js/main.js        reveal no scroll, acordeões, header, scroll-spy, barra de progresso
assets/logo.png   logotipo (PNG com fundo transparente)
```

## Como rodar no VS Code

1. Abra a pasta no VS Code.
2. Instale a extensão **Live Server** e clique em *Go Live* — ou apenas abra `index.html` no navegador.

## Ajustes rápidos

No topo de `js/main.js`:

```js
var CONFIG = {
  animacoes: true,       // reveal no scroll + parallax da onda
  barraProgresso: true,  // barra colorida no topo
  abrirPropostas: false  // abre todos os acordeões ao carregar
};
```

## Paleta (manual de identidade visual)

| Cor | Hex | Uso |
| --- | --- | --- |
| Azul | `#003B77` | base institucional, títulos |
| Azul escuro | `#002A55` | fundos profundos, footer |
| Amarelo | `#FAD200` | destaque, CTA, item ativo |
| Verde | `#098C40` | eixo Educação, ondas |
| Vermelho | `#D10504` | eixo Saúde, oposição |
| Cinza claro | `#F4F6FA` | fundo das seções claras |

## Tipografia

Archivo (500–900) para títulos e rótulos; Barlow (300–700) para texto corrido. Carregadas via Google Fonts no `<head>` — para uso offline, baixe os `.woff2` e troque o `<link>` por `@font-face` em `css/styles.css`.

## Seções

1. Hero — logo, título, onda animada com parallax
2. Introdução
3. Herança trabalhista — 5 cards de referências
4. Contra o que lutamos — 4 opositores (hover preenche em vermelho)
5. Eixos I–IV — nav sticky com scroll-spy + propostas em acordeão
6. Citação de fechamento
7. Assinatura e footer

## Publicar no GitHub

Na raiz desta pasta:

```bash
git init
git add .
git commit -m "Landing page: Guia de Propostas"
git branch -M main
git remote add origin git@github.com:SEU-USUARIO/SEU-REPO.git
git push -u origin main
```

Se o repositório já existe e já tem conteúdo, copie os arquivos para dentro dele e faça só `git add . && git commit && git push`.

### GitHub Pages

Settings → Pages → Source: *Deploy from a branch* → `main` / `/ (root)`. O arquivo `.nojekyll` já está incluído para o Jekyll não interferir.

## Pasta `design/`

Contém o arquivo de design original (`.dc.html`) que gerou este site, mantido apenas como referência de origem. O site publicado é o da raiz — `design/` pode ser removido sem qualquer efeito.
