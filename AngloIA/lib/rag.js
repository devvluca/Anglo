import fs from 'fs';
import path from 'path';

export function createRAGSystem() {
  const documentsPath = path.join(process.cwd(), 'data', 'docs');
  const promptsPath = path.join(process.cwd(), 'data', 'prompts');
  
  // Carregar documentos
  const documents = {};
  
  try {
    if (fs.existsSync(documentsPath)) {
      const files = fs.readdirSync(documentsPath);
      files.forEach(file => {
        if (file.endsWith('.md')) {
          const content = fs.readFileSync(path.join(documentsPath, file), 'utf8');
          documents[file] = content;
        }
      });
    }
  } catch (error) {
    console.error('Erro ao carregar documentos:', error);
  }

  // Carregar prompt do sistema
  let systemPrompt = '';
  try {
    const promptFile = path.join(promptsPath, 'system-prompt.md');
    if (fs.existsSync(promptFile)) {
      systemPrompt = fs.readFileSync(promptFile, 'utf8');
    }
  } catch (error) {
    console.error('Erro ao carregar prompt:', error);
  }

  function getRelevantContext(userMessage) {
    const message = userMessage.toLowerCase();
    let context = systemPrompt || getDefaultPrompt();
    
    // Adicionar contexto relevante baseado na mensagem
    if (message.includes('livro') || message.includes('margens') || message.includes('invisíveis')) {
      context += '\n\n### Informações do Livro:\n\n' + (documents['margens-invisiveis.md'] || '');
    }
    
    if (message.includes('editora') || message.includes('anglo') || message.includes('sobre')) {
      context += '\n\n### Sobre a Editora:\n\n' + (documents['sobre-editora.md'] || '');
    }
    
    if (message.includes('frete') || message.includes('entrega') || message.includes('envio')) {
      context += '\n\n### Políticas de Entrega:\n\n' + (documents['politicas-entrega.md'] || '');
    }
    
    return context;
  }

  function getDefaultPrompt() {
    return `Você é um assistente da Editora Anglo, especializada em literatura cristã.
Atualmente temos o livro "Margens Invisíveis" do Bispo Ivan Rocha da Catedral da Reconciliação em Recife.
Seja caloroso, cristão e prestativo.`;
  }

  return {
    getRelevantContext,
    documents
  };
}
