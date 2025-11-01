import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, PaperPlaneTilt, ChatTeardrop } from 'phosphor-react';
import { Trash, CaretUp, CaretDown } from 'phosphor-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ProductPreview } from './ProductPreview';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface Suggestion {
  id: string;
  text: string;
}

// Função para processar texto da mensagem com previews de produtos
function processMessageText(text: string) {
  // Regex para detectar links de produtos - URLs completas ou caminhos relativos
  const productLinkRegex = /(?:https?:\/\/[^\s]*?\/produto\/([a-zA-Z0-9\-]+)|\/produto\/([a-zA-Z0-9\-]+))/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = productLinkRegex.exec(text)) !== null) {
    // Adicionar texto antes do link
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        content: text.slice(lastIndex, match.index),
      });
    }

    // Extrair o handle do produto (pode estar no grupo 1 ou 2)
    const handle = match[1] || match[2];

    // Adicionar preview do produto
    parts.push({
      type: 'product',
      handle: handle,
    });

    lastIndex = match.index + match[0].length;
  }

  // Adicionar texto restante
  if (lastIndex < text.length) {
    parts.push({
      type: 'text',
      content: text.slice(lastIndex),
    });
  }

  return parts;
}

// Converter tags customizadas para markdown
function convertCustomTagsToMarkdown(text: string): string {
  // Converter <roxo>text</roxo> para **text** (bold roxo/purple)
  text = text.replace(/<roxo>(.*?)<\/roxo>/g, '**$1**');
  // Remover completamente <azul>...</azul>, <verde>...</verde> e <rosa>...</rosa>
  text = text.replace(/<azul>(.*?)<\/azul>/g, '$1');
  text = text.replace(/<verde>(.*?)<\/verde>/g, '$1');
  text = text.replace(/<rosa>(.*?)<\/rosa>/g, '$1');
  // Remove aspas duplas do início e fim do texto
  text = text.replace(/^"|"$/g, '');
  // Remove títulos markdown (#, ##, ###) do início das linhas, inclusive colados ao texto
  text = text.replace(/(^|\n)\s*#{1,6}\s*/g, '$1');
  // Remove todos os hashtags (#) do texto
  text = text.replace(/#/g, '');
  return text;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasBeenClosed, setHasBeenClosed] = useState(false);
  // Abrir chat automaticamente após 10s de rolagem
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    let scrolled = false;
    const onScroll = () => {
      scrolled = true;
    };
    window.addEventListener('scroll', onScroll);
    timer = setTimeout(() => {
      if (scrolled && !isOpen && !hasBeenClosed) {
        setIsOpen(true);
      }
    }, 10000);
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (timer) clearTimeout(timer);
    };
  }, [isOpen, hasBeenClosed]);
  const [suggestionsCollapsed, setSuggestionsCollapsed] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('chat-messages');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((msg: any) => ({ ...msg, timestamp: new Date(msg.timestamp) }));
      } catch {
        // Se falhar, retorna mensagem inicial personalizada
          return [
            {
              id: '1',
              text: 'Olá! Eu sou Iris, inteligência artificial da Editora Anglo. Posso te ajudar a conhecer nossa história, livros, autores, políticas e tudo sobre o universo Anglo. Como posso te ajudar hoje?',
              sender: 'bot',
              timestamp: new Date(),
            },
          ];
      }
    }
        return [
          {
            id: '1',
            text: 'Olá! Eu sou Iris, inteligência artificial da Editora Anglo. Posso te ajudar a conhecer nossa história, livros, autores, políticas e tudo sobre o universo Anglo. Como posso te ajudar hoje?',
            sender: 'bot',
            timestamp: new Date(),
          },
        ];
  });
  // Salvar mensagens no localStorage sempre que mudarem
  useEffect(() => {
    localStorage.setItem('chat-messages', JSON.stringify(messages));
  }, [messages]);

  // Função para limpar o chat
  const handleClearChat = () => {
    setMessages([
      {
        id: '1',
        text: 'Chat limpo! Se quiser conversar, é só perguntar. 😊',
        sender: 'bot',
        timestamp: new Date(),
      },
    ]);
    setSuggestions([]);
  };
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll para a última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadSuggestions = async (lastBotMessage: string) => {
    try {
      setIsLoadingSuggestions(true);
      const body = {
        message: lastBotMessage,
        conversationHistory: messages.map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text,
        })),
      };
      console.log('[Sugestões] Corpo enviado para /api/suggestions:', body);
      const response = await fetch('/api/suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Erro ao carregar sugestões');
      }

      const data = await response.json();
      console.log('[Sugestões] Resposta recebida:', data);
      if (data.suggestions && Array.isArray(data.suggestions)) {
        setSuggestions(
          data.suggestions.map((text: string, index: number) => ({
            id: `suggestion-${Date.now()}-${index}`,
            text,
          }))
        );
      }
    } catch (error) {
      console.error('Erro ao carregar sugestões:', error);
      setSuggestions([]);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestionText: string) => {
    setInputValue(suggestionText);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;

    // Adicionar mensagem do usuário
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Chamar API da IA da Editora Anglo (URL fixa)
      const iaBody = { message: inputValue };
      console.log('[IA] Corpo enviado para https://ia.editoraanglo.com/api/chat?page=chat:', iaBody);
      const response = await fetch('https://ia.editoraanglo.com/api/chat?page=chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(iaBody),
      });

      if (!response.ok) {
        throw new Error('Erro ao obter resposta da IA');
      }

      const data = await response.json();
      console.log('[IA] Resposta recebida:', data);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || 'Desculpe, não consegui gerar uma resposta.',
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);

      // Carregar sugestões após a resposta
      await loadSuggestions(data.response);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      setSuggestions([]);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente.',
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Botão Flutuante */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg flex items-center justify-center transition-all duration-300"
      >
        <ChatTeardrop size={24} weight="fill" className="text-beige" />
      </motion.button>

      {/* Modal Chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-2 left-2 md:left-auto md:right-6 z-40 w-auto md:w-96 max-w-[calc(100vw-16px)] md:max-w-[calc(100vw-24px)] bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group cursor-pointer relative"
                  onClick={handleClearChat}
                  title="Excluir chat"
                  style={{ overflow: 'hidden' }}
                >
                  {/* Ícone ChatTeardrop (visível quando não está em hover) */}
                  <span
                    className="absolute left-0 top-0 w-full h-full flex items-center justify-center transition-all duration-300 group-hover:opacity-0 group-hover:pointer-events-none group-hover:rotate-180"
                  >
                    <ChatTeardrop size={20} weight="fill" className="text-beige" />
                  </span>
                  {/* Ícone Trash (visível apenas no hover) */}
                  <span
                    className="absolute left-0 top-0 w-full h-full flex items-center justify-center opacity-0 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:pointer-events-auto"
                  >
                    <Trash size={20} weight="bold" className="text-beige" />
                  </span>
                  {/* Tooltip */}
                  <motion.span
                    initial={{ opacity: 0, y: 8 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-1 text-xs bg-white/90 text-beige px-2 py-1 rounded shadow pointer-events-none"
                  >
                    Excluir chat
                  </motion.span>
                </div>
                <div>
                  <h3 className="font-bold text-sm">Editora Anglo</h3>
                  <p className="text-xs text-primary-foreground/80">Sempre online</p>
                </div>
              </div>
              <motion.button
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setIsOpen(false);
                  setHasBeenClosed(true);
                }}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X size={20} weight="bold" />
              </motion.button>
            </div>

            {/* Messages Area */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-3 rounded-xl text-sm leading-relaxed ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-none'
                        : 'bg-white border border-gray-200 text-foreground rounded-bl-none'
                    }`}
                  >
                    {message.sender === 'bot' ? (
                      <div className="prose prose-sm max-w-none [&_p]:m-0 [&_ul]:my-2 [&_ol]:my-2 [&_li]:my-0 [&_em]:italic [&_strong]:font-bold [&_a]:text-blue-600 [&_a]:underline [&_code]:bg-gray-200 [&_code]:px-1 [&_code]:rounded [&_pre]:bg-gray-100 [&_pre]:p-2 [&_pre]:rounded [&_h1]:text-lg [&_h2]:text-base [&_h3]:text-sm">
                        {processMessageText(convertCustomTagsToMarkdown(message.text)).map((part, index) => {
                          if (part.type === 'text') {
                            return (
                              <ReactMarkdown key={index} remarkPlugins={[remarkGfm]}>
                                {part.content}
                              </ReactMarkdown>
                            );
                          } else if (part.type === 'product') {
                            return <ProductPreview key={index} handle={part.handle} />;
                          }
                          return null;
                        })}
                      </div>
                    ) : (
                      message.text
                    )}
                  </div>
                </motion.div>
              ))}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions Area */}
            {suggestions.length > 0 && (
              <div className="px-4 py-3 border-t border-gray-200 bg-white space-y-2">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => setSuggestionsCollapsed(v => !v)}>
                  <p className="text-xs text-gray-500 font-medium">Sugestões:</p>
                  <span className="text-primary text-xs font-bold flex items-center">
                    {suggestionsCollapsed ? <CaretDown size={18} /> : <CaretUp size={18} />}
                  </span>
                </div>
                {!suggestionsCollapsed && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {suggestions.map((suggestion) => (
                      <motion.button
                        key={suggestion.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSuggestionClick(suggestion.text)}
                        className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-primary/10 hover:text-primary border border-gray-200 rounded-full transition-colors cursor-pointer font-medium"
                      >
                        {suggestion.text}
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Input Area */}
            <form
              onSubmit={handleSendMessage}
              className="border-t border-gray-200 p-4 bg-white flex gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm"
                style={{
                  fontSize: '16px', // Previne zoom no iOS
                  WebkitAppearance: 'none', // Remove aparência nativa
                  WebkitTextSizeAdjust: '100%', // Previne ajuste automático de tamanho
                }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="p-2 rounded-lg bg-primary hover:bg-primary/90 disabled:bg-gray-300 text-primary-foreground transition-colors"
              >
                <PaperPlaneTilt size={18} weight="bold" />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
