# 🚀 Deployment Guide - AngloIA + Anglo

## Para Deployar na Vercel

### 1. AngloIA Backend (https://ia.editoraanglo.com)

O AngloIA já está deployado na Vercel. Para manter funcionando, você precisa:

**Na dashboard da Vercel do projeto AngloIA:**
1. Vá para **Settings** → **Environment Variables**
2. Adicione (ou confirme que existe):
   ```
   GROQ_API_KEY = gsk_xxxxxxxxxxxxxx (sua chave Groq)
   ```

A chave Groq já está configurada lá, então tudo deve funcionar.

### 2. Anglo Frontend (seu domínio principal)

O projeto Anglo vai ser deployado em um domínio próprio (ex: editoraanglo.com).

**Não precisa de nenhuma variável de ambiente especial!** 

Porque:
- ✅ O middleware encaminha requisições para `https://ia.editoraanglo.com/api/chat`
- ✅ O backend AngloIA já cuida da autenticação com Groq
- ✅ O frontend só faz fetch para `/api/chat`, que é interceptado e redirecionado

**Variáveis que você PRECISA na Vercel (para o Anglo):**
```
VITE_SHOPIFY_STORE_DOMAIN = seu-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN = sua-token-shopify
```

## ✅ Checklist de Deploy

### AngloIA (Backend)
- [ ] Verificar `GROQ_API_KEY` está em Settings → Environment Variables
- [ ] Fazer push para branch `main` do AngloIA
- [ ] Vercel auto-deploya (ou clique em "Deploy")
- [ ] Testar: `curl https://ia.editoraanglo.com/api/chat`

### Anglo (Frontend)  
- [ ] Adicionar `VITE_SHOPIFY_STORE_DOMAIN` em Environment Variables
- [ ] Adicionar `VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN` em Environment Variables
- [ ] Fazer push para branch `main` do Anglo
- [ ] Vercel auto-deploya
- [ ] Testar chat widget no site deployado

## 🔗 URLs de Referência

- AngloIA Backend: https://ia.editoraanglo.com
- Anglo Frontend: https://seu-dominio.com (configure seu domínio na Vercel)
- Endpoint do Chat: https://ia.editoraanglo.com/api/chat

## 🎯 Resumo

| Projeto | Chaves Necessárias | Deploy |
|---------|-------------------|--------|
| **AngloIA** | `GROQ_API_KEY` | Vercel (já está setup) |
| **Anglo** | `VITE_SHOPIFY_*` | Vercel (novo deploy) |

Tudo pronto! A integração funciona porque ambos estão na Vercel e conseguem se comunicar. 🚀
