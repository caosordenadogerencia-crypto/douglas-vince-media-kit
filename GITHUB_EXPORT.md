# Exportação para GitHub

Esta cópia é independente do ambiente de criação. Todas as imagens usadas pela página estão versionadas em `client/public/assets/`, e o código usa caminhos locais iniciados por `/assets/`.

Essa estrutura evita dependência de URLs temporárias e impede erros comuns de carregamento de imagem após clonar, publicar ou mover o repositório. Para incluir um novo ativo, coloque o arquivo em `client/public/assets/` e atualize a referência correspondente em `client/src/pages/Home.tsx`.

## Publicação estática

O comando `pnpm build:static` remove qualquer saída anterior e cria apenas `dist/public`; ele não executa nem inclui `server/index.ts` no pacote final. A branch `gh-pages` deste repositório já contém essa versão estática, com todas as imagens locais.

Para ativar a página, abra **Settings → Pages**, selecione **Deploy from a branch**, escolha a branch **gh-pages** e a pasta **/(root)**, depois clique em **Save**. Esse fluxo serve somente HTML, CSS, JavaScript e imagens e é compatível com GitHub Pages.
