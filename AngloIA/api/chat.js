import dotenv from 'dotenv';
dotenv.config();
import { createRAGSystem } from '../lib/rag.js';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  console.log('🚀 [CHAT] ===== INÍCIO DA REQUISIÇÃO =====');
  console.log('Método:', req.method);
  console.log('URL:', req.url);
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    console.log('✅ [CHAT] Respondendo OPTIONS');
    return res.status(200).end();
  }

  // Se for GET, servir páginas
  if (req.method === 'GET') {
    console.log('📄 [CHAT] Requisição GET para página');
    const { page } = req.query;
    console.log('Página solicitada:', page);
    
    let filePath;
    if (page === 'chat') {
      filePath = path.join(process.cwd(), 'public', 'chat-widget.html');
    } else {
      filePath = path.join(process.cwd(), 'public', 'index.html');
    }
    
    try {
      const html = fs.readFileSync(filePath, 'utf8');
      res.setHeader('Content-Type', 'text/html');
      console.log('✅ [CHAT] Página servida:', filePath);
      return res.status(200).send(html);
    } catch (error) {
      console.log('❌ [CHAT] Página não encontrada:', filePath);
      return res.status(404).json({ error: 'Página não encontrada' });
    }
  }

  // Se não for POST, retornar erro
  if (req.method !== 'POST') {
    console.log('❌ [CHAT] Método não permitido:', req.method);
    return res.status(405).json({ error: 'Método não permitido' });
  }

  // Processar chat (POST)
  try {
    console.log('💬 [CHAT] Processando POST do chat');
    const { message } = req.body;

    console.log('📨 [CHAT] Mensagem recebida:', message ? 'SIM (tamanho: ' + message.length + ' chars)' : 'NÃO');
    console.log('📨 [CHAT] Conteúdo da mensagem:', message);

    if (!message) {
      console.log('❌ [CHAT] Mensagem vazia - retornando erro 400');
      return res.status(400).json({ error: 'Mensagem é obrigatória' });
    }

    console.log('🔍 [CHAT] Criando sistema RAG...');
    const rag = createRAGSystem();
    console.log('✅ [CHAT] Sistema RAG criado');
    
    console.log('🔍 [CHAT] Obtendo contexto relevante...');
    const context = rag.getRelevantContext(message);
    console.log('✅ [CHAT] Contexto obtido, tamanho:', context.length, 'caracteres');

    console.log('🔑 [CHAT] Verificando API Key...');
    const hasKey = !!process.env.GROQ_API_KEY;
    console.log('API Key presente:', hasKey ? 'SIM' : 'NÃO');
    if (hasKey) {
      console.log('Primeiros 10 chars:', process.env.GROQ_API_KEY.substring(0, 10) + '...');
    }

    const requestBody = {
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: context
        },
        {
          role: 'user',
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    };

    console.log('📤 [CHAT] Enviando requisição para Groq API...');
    console.log('  - URL: https://api.groq.com/openai/v1/chat/completions');
    console.log('  - Modelo:', requestBody.model);
    console.log('  - Mensagens:', requestBody.messages.length);
    console.log('  - Timestamp:', new Date().toISOString());

    const startTime = Date.now();
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });
    const elapsedTime = Date.now() - startTime;

    console.log('📥 [CHAT] Resposta recebida da Groq');
    console.log('  - Status:', response.status, response.statusText);
    console.log('  - Tempo de resposta:', elapsedTime, 'ms');

    if (!response.ok) {
      const errorData = await response.text();
      console.log('❌ [CHAT] ERRO NA RESPOSTA:');
      console.log('  - Dados do erro:', errorData);
      throw new Error(`Groq API error: ${response.status} ${response.statusText} - ${errorData}`);
    }

    console.log('✅ [CHAT] Status OK, parseando JSON...');
    const result = await response.json();
    console.log('✅ [CHAT] JSON parseado com sucesso');
    console.log('  - Choices disponíveis:', result.choices ? result.choices.length : 0);
    console.log('  - Tokens usados:', result.usage);
    
    const responseText = result.choices[0].message.content;
    console.log('  - Tamanho da resposta:', responseText.length, 'caracteres');
    
    console.log('✅ [CHAT] Enviando resposta ao cliente...');
    const finalResponse = {
      response: responseText,
      usage: result.usage,
      timestamp: new Date().toISOString()
    };
    
    console.log('🎉 [CHAT] REQUISIÇÃO CONCLUÍDA COM SUCESSO');
    console.log('🚀 [CHAT] ===== FIM DA REQUISIÇÃO =====\n');
    
    return res.status(200).json(finalResponse);

  } catch (error) {
    console.error('❌❌❌ [CHAT] ERRO CAPTURADO NA REQUISIÇÃO');
    console.error('  - Mensagem de erro:', error.message);
    console.error('  - Tipo de erro:', error.name);
    console.error('  - Stack trace completo:');
    console.error(error.stack);
    console.error('🚀 [CHAT] ===== FIM DA REQUISIÇÃO (COM ERRO) =====\n');
    
    return res.status(500).json({
      error: 'Erro interno do servidor',
      details: error.message
    });
  }
}