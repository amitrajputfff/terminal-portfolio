# 🚀 Quick Start - AI Voice Agent

## Step 1: Add Your API Keys

Create `.env.local` file:

```bash
# Azure Speech Services
AZURE_SPEECH_KEY=your_azure_speech_key
AZURE_SPEECH_REGION=eastus

# Azure OpenAI
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_API_KEY=your_azure_openai_key
AZURE_OPENAI_DEPLOYMENT=gpt-4

# Optional: Customize
VOICE_AGENT_NAME=Aria
VOICE_AGENT_VOICE=en-US-AriaNeural
```

## Step 2: Start the Server

```bash
npm run dev
```

## Step 3: Activate Voice Agent

In the terminal, type:
```
agent
```

## That's It!

The AI agent will:
- Listen to your voice 🎤
- Understand context about Amit 🧠
- Respond naturally 🗣️
- Execute commands automatically ⚡

## Example Conversations

Try saying:
- "Tell me about Amit's experience"
- "What are his skills?"
- "Show me his projects"
- "Is he looking for opportunities?"

## Need Help?

See `VOICE_AGENT_SETUP.md` for detailed setup instructions.
See `VOICE_AGENT_FEATURES.md` for complete feature documentation.
