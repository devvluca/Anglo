import http from 'http';
import url from 'url';
import dotenv from 'dotenv';
import { createRAGSystem } from './lib/rag.js';

dotenv.config();

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  console.log(`\n🚀 [Server] ${req.method} ${req.url}`);

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    console.log('✅ [Server] OPTIONS request');
    res.writeHead(200);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Handle /api/chat endpoint
  if (pathname === '/api/chat' && req.method === 'POST') {
    console.log('💬 [Server] Processing /api/chat POST request');

    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        const { message } = JSON.parse(body);
        console.log('📨 [Server] Message received:', message);

        if (!message) {
          console.log('❌ [Server] Message is empty');
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Message is required' }));
          return;
        }

        console.log('🔍 [Server] Creating RAG system...');
        const rag = createRAGSystem();
        const context = rag.getRelevantContext(message);
        console.log('✅ [Server] Context obtained, size:', context.length, 'chars');

        console.log('🔑 [Server] Checking API Key...');
        const hasKey = !!process.env.GROQ_API_KEY;
        console.log('API Key present:', hasKey ? 'YES' : 'NO');
        if (hasKey) {
          console.log('First 10 chars:', process.env.GROQ_API_KEY.substring(0, 10) + '...');
        }

        const requestBody = {
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'system',
              content: context,
            },
            {
              role: 'user',
              content: message,
            },
          ],
          temperature: 0.7,
          max_tokens: 1000,
        };

        console.log('📤 [Server] Sending request to Groq API...');
        const startTime = Date.now();

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        const elapsedTime = Date.now() - startTime;
        console.log('📥 [Server] Response from Groq API - Status:', response.status, 'Time:', elapsedTime, 'ms');

        if (!response.ok) {
          const errorText = await response.text();
          console.log('❌ [Server] Groq API Error:', errorText);
          throw new Error(`Groq API error: ${response.status} - ${errorText}`);
        }

        const result = await response.json();
        console.log('✅ [Server] Response parsed, choices:', result.choices?.length);

        const responseText = result.choices[0].message.content;
        console.log('📝 [Server] Response size:', responseText.length, 'chars');

        const finalResponse = {
          response: responseText,
          usage: result.usage,
          timestamp: new Date().toISOString(),
        };

        console.log('✅ [Server] Sending response to client');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(finalResponse));
      } catch (error) {
        console.error('❌ [Server] Error:', error.message);
        console.error(error.stack);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          error: 'Internal server error',
          details: error.message,
        }));
      }
    });

    return;
  }

  // Handle root path
  if (pathname === '/') {
    console.log('📄 [Server] Serving homepage');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>AngloIA API Server</h1><p>Server is running on port 3000</p>');
    return;
  }

  // 404
  console.log('❌ [Server] Route not found:', pathname);
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, () => {
  console.log('\n🎉 [Server] AngloIA API Server is running on http://localhost:' + PORT);
  console.log('🔗 [Server] Endpoint: POST http://localhost:' + PORT + '/api/chat\n');
});

server.on('error', (error) => {
  console.error('❌ [Server] Server error:', error.message);
  if (error.code === 'EADDRINUSE') {
    console.error(`⚠️  Port ${PORT} is already in use. Try killing the process or using a different port.`);
  }
  process.exit(1);
});

process.on('SIGINT', () => {
  console.log('\n👋 [Server] Shutting down gracefully...');
  server.close(() => {
    console.log('✅ [Server] Server closed');
    process.exit(0);
  });
});
