# Anglo

Um e-commerce minimalista e moderno construído com React, integrando perfeitamente a Shopify Storefront API para gestão de produtos e Supabase para funcionalidades backend. Focado em oferecer uma experiência de compra leve, rápida e intuitiva.

---

## 🛠 Features Principais

- **Storefront Personalizado**: Integração robusta com a GraphQL Storefront API do Shopify.
- **Design Minimalista**: Interface limpa utilizando Radix UI e Shadcn UI.
- **Animações Fluidas**: Transições de página e componentes movidos a Framer Motion.
- **Iconografia Moderna**: Utilização da biblioteca Phosphor Icons.
- **Gerenciamento de Estado & Requisições**: Otimizado com React Query.

## 💻 Tech Stack

- [Vite](https://vitejs.dev/) & [React](https://react.dev/) (TypeScript)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/) / [Radix UI](https://www.radix-ui.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Shopify Storefront API](https://shopify.dev/docs/api/storefront)
- [Supabase](https://supabase.com/)

---

## 🚀 Como começar

### Pré-requisitos
- Node.js & npm instalados
- Uma loja Shopify com Storefront API configurada (Access Token)
- Projeto Supabase configurado (opcional, dependendo dos recursos habilitados)

### Instalação

**Passo 1:** Clone o repositório
```sh
git clone https://github.com/devvluca/Anglo.git
cd Anglo
```

**Passo 2:** Instale as dependências
```sh
npm install
```

**Passo 3:** Configure as Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto e adicione as credenciais (veja `src/lib/shopify/config.ts`):
```env
VITE_SHOPIFY_STORE_DOMAIN=sua-loja.myshopify.com
VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=seu_access_token_aqui
VITE_SHOPIFY_API_VERSION=2024-10
```

**Passo 4:** Inicie o servidor de desenvolvimento
```sh
npm run dev
```
Acesse em: `http://localhost:5173/`

## 📦 Build e Deploy

Para gerar uma versão de produção otimizada:
```sh
npm run build
```

O projeto pode ser facilmente hospedado em ferramentas de deploy modernas como Vercel, Netlify ou integrado com a plataforma Lovable.
