import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getSimulatedAetherReply(prompt: string): string {
  const p = (prompt || '').toLowerCase();
  if (p.includes('helicopter') || p.includes('aspen') || p.includes('flight') || p.includes('plane') || p.includes('jet')) {
    return 'Airbus ACH160 & Gulfstream G650ER clearance confirmed for Aspen Pitkin (ASE). Captain De Vries is on standby, cabin pre-conditioned to 68°F, departure slot reserved.';
  }
  if (p.includes('mirazur') || p.includes('table') || p.includes('chef') || p.includes('dining') || p.includes('restaurant')) {
    return "Chef's Table at Mirazur reserved for tonight. Master sommelier pairing with Domaine de la Romanée-Conti 2015 has been pre-decanted in the private salon.";
  }
  if (p.includes('portfolio') || p.includes('liquidity') || p.includes('q3') || p.includes('finance')) {
    return 'Q3 Treasury & Portfolio liquidity verified: $48.2M liquid reserves in Geneva escrow vaults, zero duration risk, real-time capital allocation confirmed.';
  }
  if (p.includes('hyperbaric') || p.includes('wellness') || p.includes('clinic') || p.includes('prairie')) {
    return 'Clinique La Prairie cellular rejuvenation chamber confirmed for 09:00 CEST. Biometric telemetry synced with your neural glass profile.';
  }
  return `Directive acknowledged, Julian. Aether has logged your request into the encrypted private ledger. Live telemetry dispatched to your HUD eyewear.`;
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  const ai = process.env.GEMINI_API_KEY
    ? new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      })
    : null;

  app.post('/api/chat', async (req, res) => {
    try {
      const { message } = req.body;
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message is required' });
      }

      if (ai) {
        try {
          const response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: [
              {
                role: 'user',
                parts: [
                  {
                    text: `You are Aether, an elite luxury AI Concierge for ultra-high-net-worth client Julian. You communicate with quiet opulence, optical precision, absolute discretion, and flawless bespoke hospitality. Answer in 2-3 sentences max. Client request: "${message}"`,
                  },
                ],
              },
            ],
          });
          return res.json({ reply: response.text || getSimulatedAetherReply(message) });
        } catch (genAiError) {
          console.error('Gemini API call failed, falling back:', genAiError);
          return res.json({ reply: getSimulatedAetherReply(message) });
        }
      } else {
        return res.json({ reply: getSimulatedAetherReply(message) });
      }
    } catch (err: any) {
      console.error('API error:', err);
      return res.status(500).json({ reply: 'Aether telemetry momentarily interrupted. Re-synchronizing link.' });
    }
  });

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Aether Concierge Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
