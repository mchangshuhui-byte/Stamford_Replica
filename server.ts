import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini client to prevent startup crashes if GEMINI_API_KEY is not yet defined
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required but missing from secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Newsletter subscription endpoint
app.post("/api/subscribe", (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }
  
  res.json({
    success: true,
    message: `Welcome to the radical community! We've subscribed ${email} for (kinda) regular d.school updates and zine-style ideas.`,
    curiosityPrompt: "Your first design challenge: Find something in your room that has a hinge. Redesign it so it is 10x more playful!"
  });
});

// Checkout / order endpoint
app.post("/api/order", (req, res) => {
  const { items, customer } = req.body;
  if (!items || items.length === 0) {
    return res.status(400).json({ error: "Your shopping cart is empty." });
  }
  if (!customer?.name || !customer?.email || !customer?.address) {
    return res.status(400).json({ error: "Please fill out all billing and shipping information." });
  }

  const orderId = `DS-${Math.floor(100000 + Math.random() * 900000)}`;
  const total = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
  
  res.json({
    success: true,
    orderId,
    total,
    deliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    }),
    message: `Order ${orderId} placed successfully! Get ready to make, break, and explore.`
  });
});

// Curiosity endpoint - Powered by Gemini
app.post("/api/curious", async (req, res) => {
  try {
    const { curiosity, focusArea } = req.body;
    if (!curiosity) {
      return res.status(400).json({ error: "Curiosity description is required." });
    }

    const ai = getGeminiClient();

    const prompt = `You are a master design thinking educator at the Stanford d.school, a champion of radical collaboration, and a creator of playful learning tools.

A learner is curious about: "${curiosity}"
${focusArea ? `They want to connect this curiosity with the design category: "${focusArea}".` : ""}

Generate a highly creative, custom design thinking activity, experiment, or method that allows them to explore this curiosity. Make it feel authentic to the d.school: physically engaging, slightly messy, and intellectually rigorous. Use bold asterisks on specific words in the title to match the d.school graphic styling (e.g. 'The *Empathy* Safari' or 'Designing the *Unseen*').

Provide your response strictly in JSON format matching the schema requested.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are a master d.school professor, author of d.school guides, and champion of radical collaboration. You speak with high-energy intellectual playfulness, combining academic design rigour with messy zine-style prototyping spirit.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "A creative d.school style title, using asterisks for selective emphasis, e.g. 'The *Empathy* Safari: *Designing* for Belonging'" },
            category: { type: Type.STRING, description: "One of: Workshop, Tool, Story, Project" },
            duration: { type: Type.STRING, description: "Estimated duration, e.g., '15 mins', '1 hour', '3-day'" },
            groupSize: { type: Type.STRING, description: "Recommended group size, e.g., '3-5 people', 'Individual', 'Large Groups'" },
            tag: { type: Type.STRING, description: "A core d.school theme tag: Equity, Emerging Tech, Social Impact, Futures, Radical Collaboration, or Curiosity" },
            description: { type: Type.STRING, description: "A rich paragraph detailing what this exercise is, why it matters, and who it helps." },
            materials: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3-5 creative materials needed (e.g., sticky notes, index cards, clay, cardboard, a friendly stranger)"
            },
            steps: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: "Step title, e.g., '1. Frame', '2. Sketch', '3. Break'" },
                  instruction: { type: Type.STRING, description: "Clear, conversational, and active instructions." },
                  time: { type: Type.STRING, description: "Allocated time, e.g., '5 mins', '10 mins'" }
                },
                required: ["name", "instruction", "time"]
              }
            },
            whyItWorks: { type: Type.STRING, description: "A short, inspiring d.school-style wisdom quote or takeaway." }
          },
          required: ["title", "category", "duration", "groupSize", "tag", "description", "materials", "steps", "whyItWorks"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response returned from the Gemini model.");
    }

    const data = JSON.parse(text.trim());
    res.json(data);
  } catch (error: any) {
    console.error("Gemini curiosity API error:", error);
    res.status(500).json({ error: error?.message || "Failed to generate design thinking activity." });
  }
});

// Mount Vite or static server depending on environment
async function setupViteOrStatic() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode with static file assets...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

setupViteOrStatic();
