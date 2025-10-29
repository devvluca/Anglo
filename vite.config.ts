import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import type { IncomingMessage, ServerResponse } from "http";
import type { Plugin } from "vite";

// Handle API requests to both /api/chat and /api/suggestions
async function handleApiRequest(req: IncomingMessage, res: ServerResponse, endpoint: string) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  try {
    let body = '';
    req.on('data', (chunk: Buffer) => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        console.log(`[Vite Middleware] Forwarding ${endpoint} request to AngloIA...`);
        console.log('[Vite Middleware] Request body:', body);
        
        const response = await fetch(`https://ia.editoraanglo.com${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: body,
        });

        console.log('[Vite Middleware] Response status:', response.status);
        
        const data = await response.json();
        
        console.log('[Vite Middleware] Response data:', data);

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(response.status);
        res.end(JSON.stringify(data));
      } catch (error) {
        console.error('[Vite Middleware] Error forwarding request to AngloIA:', error);
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(500);
        res.end(JSON.stringify({ error: 'Internal server error', details: String(error) }));
      }
    });
  } catch (error) {
    console.error('[Vite Middleware] Middleware error:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal server error' }));
  }
}

// Middleware plugin to handle /api/chat and /api/suggestions
function apiMiddlewarePlugin(): Plugin {
  return {
    name: 'api-middleware',
    async configureServer(server) {
      return () => {
        server.middlewares.use('/api/chat', async (req: IncomingMessage, res: ServerResponse) => {
          handleApiRequest(req, res, '/api/chat');
        });

        server.middlewares.use('/api/suggestions', async (req: IncomingMessage, res: ServerResponse) => {
          handleApiRequest(req, res, '/api/suggestions');
        });
      };
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), apiMiddlewarePlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
