import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Groq from 'groq-sdk';
import Parser from 'rss-parser';
import { 
  applications, projects, pipelineHistory, financials, compliance, maturityHistory
} from '../frontend/src/data/eaData.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Initialize Groq client
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const parser = new Parser();

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Node Server running' });
});

// EA Data endpoint
app.get('/api/ea-data', (req, res) => {
  setTimeout(() => {
    res.json({
      applications,
      projects,
      pipelineHistory,
      financials,
      compliance,
      maturityHistory
    });
  }, 1200);
});

// EA News endpoint
app.get('/api/news', async (req, res) => {
  try {
    const feed = await parser.parseURL('https://news.google.com/rss/search?q=%22Enterprise+Architecture%22+OR+%22TOGAF%22+OR+%22IT+Strategy%22&hl=en-US&gl=US&ceid=US:en');
    const articles = feed.items.slice(0, 5).map(item => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      source: item.source || 'Google News'
    }));
    res.json({ articles });
  } catch (error) {
    console.error("RSS Error:", error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Chatbot and Dynamic Insights endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, context } = req.body;
    
    // Inject the EA data context into the system prompt
    const systemPrompt = `You are the Accenture Enterprise Architecture AI Assistant. 
You primarily provide insights based on the current live EA data below. However, if the user asks a general question or a question not covered by the EA data, you MUST fallback to your general knowledge and answer it helpfully as a capable AI assistant.

Here is a summary of the current data:
Applications: ${applications.length} total.
Projects: ${projects.length} total.
IT Spend: $${financials.investmentTotal / 1000}K over 18 months, 3Yr Net Value: $${financials.netValue3yr / 1000}K.
Current EAIMM Score: ${maturityHistory[maturityHistory.length - 1].score}/25.
Pipeline Error Rate: ${((pipelineHistory[pipelineHistory.length-1].servicenow.errors + pipelineHistory[pipelineHistory.length-1].sap.errors) / (pipelineHistory[pipelineHistory.length-1].servicenow.records + pipelineHistory[pipelineHistory.length-1].sap.records) * 100).toFixed(2)}%.
User Context: ${context || 'General Query'}

Keep your responses concise, professional, and data-driven. Do NOT use markdown headers, just paragraphs and bullet points.`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      model: 'openai/gpt-oss-20b',
      max_tokens: 500,
    });

    res.json({ response: chatCompletion.choices[0].message.content });
  } catch (error) {
    console.error("Groq API Error:", error);
    res.status(500).json({ error: 'Failed to connect to Groq API' });
  }
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
