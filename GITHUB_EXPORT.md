# Exportação para GitHub

Esta cópia é independente do ambiente de criação. Todas as imagens usadas pela página estão versionadas em `client/public/assets/`, e o código usa caminhos locais iniciados por `/assets/`.

Essa estrutura evita dependência de URLs temporárias e impede erros comuns de carregamento de imagem após clonar, publicar ou mover o repositório. Para incluir um novo ativo, coloque o arquivo em `client/public/assets/` e atualize a referência correspondente em `client/src/pages/Home.tsx`.

## GitHub Pages

O repositório inclui o fluxo `.github/workflows/deploy-pages.yml`. Ele usa `pnpm build:static`, envia somente `dist/public` para o GitHub Pages e não executa `server/index.ts`. Ative em **Settings → Pages → Build and deployment → GitHub Actions**. Após o primeiro fluxo concluído, a página será publicada pelo próprio GitHub Pages.
