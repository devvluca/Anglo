import dotenv from 'dotenv';
dotenv.config();

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { message, conversationHistory } = req.body;

    console.log('📋 [SUGGESTIONS] Requisição recebida');
    console.log('Mensagem:', message);

    if (!message) {
      console.log('❌ [SUGGESTIONS] Mensagem vazia');
      return res.status(400).json({ error: 'Mensagem é obrigatória' });
    }

    // Compilar histórico para evitar repetição
    let historyContext = '';
    if (conversationHistory && Array.isArray(conversationHistory)) {
      historyContext = '\n\nHistórico da conversa:\n';
      conversationHistory.forEach(msg => {
        historyContext += `- ${msg.role === 'user' ? 'Usuário' : 'Iris'}: ${msg.content.substring(0, 100)}\n`;
      });
    }

    const prompt = `Você é um especialista em gerar perguntas de acompanhamento para conversas sobre a Editora Anglo.

Com base nesta resposta, gere EXATAMENTE 3 perguntas naturais e relevantes que um visitante poderia fazer. As perguntas devem:
- Ser curtas (máximo 8 palavras)
- Ser em forma de pergunta (com "?")
- Ser específicas e relevantes ao contexto
- Estar em português brasileiro coloquial
- **IMPORTANTE**: NÃO repetir a mesma pergunta que o usuário já fez ou que já foi respondida
- Levar a conversa para frentes diferentes (exemplo: se falou sobre autor, pergunte sobre livro; se falou sobre preço, pergunte sobre frete)
- Explorar tópicos relacionados mas ainda não abordados
- **NUNCA sugerir desconto** - não existem descontos na Editora Anglo
- **NUNCA sugerir e-book ou versão digital** - apenas livro físico

Resposta recebida:
"${message}"
${historyContext}

IMPORTANTE: Retorne APENAS um JSON válido em uma única linha, sem explicações:
["Pergunta 1?", "Pergunta 2?", "Pergunta 3?"]`;

    console.log('📤 [SUGGESTIONS] Enviando requisição para Groq API...');

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: 'Você é um assistente que gera sugestões de perguntas em formato JSON.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 200
      })
    });

    console.log('📥 [SUGGESTIONS] Resposta da Groq:', response.status, response.statusText);

    if (!response.ok) {
      const errorData = await response.text();
      console.log('❌ [SUGGESTIONS] Erro na resposta:', errorData);
      throw new Error(`Groq API error: ${response.status} - ${errorData}`);
    }

    const result = await response.json();
    const suggestionsText = result.choices[0].message.content.trim();
    console.log('✅ [SUGGESTIONS] Resposta processada');
    console.log('Conteúdo:', suggestionsText);
    
    // Tentar fazer parse do JSON
    try {
      const jsonMatch = suggestionsText.match(/\[[\s\S]*?\]/);
      const suggestions = JSON.parse(jsonMatch ? jsonMatch[0] : suggestionsText);
      
      console.log('✅ [SUGGESTIONS] JSON parseado com sucesso');
      
      if (Array.isArray(suggestions)) {
        const filtered = suggestions.filter(s => s && typeof s === 'string').slice(0, 3);
        console.log('Sugestões retornadas:', filtered);
        return res.status(200).json({
          suggestions: filtered
        });
      }
    } catch (e) {
      // Se falhar, retornar sugestões padrão
      console.error('❌ [SUGGESTIONS] Erro ao fazer parse das sugestões:', e);
    }

    // Fallback
    console.log('⚠️ [SUGGESTIONS] Usando sugestões padrão como fallback');
    return res.status(200).json({
      suggestions: [
        'Quero comprar o livro',
        'Qual o valor do frete?',
        'Mais informações'
      ]
    });

  } catch (error) {
    console.error('❌ [SUGGESTIONS] ERRO CAPTURADO:', error.message);
    console.error('Stack trace:', error.stack);
    return res.status(500).json({
      error: 'Erro ao gerar sugestões',
      details: error.message
    });
  }
}
