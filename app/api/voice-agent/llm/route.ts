import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { text, conversationHistory } = await request.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
    const apiKey = process.env.AZURE_OPENAI_API_KEY;
    const deployment = process.env.AZURE_OPENAI_DEPLOYMENT || 'gpt-4';
    const agentName = process.env.VOICE_AGENT_NAME || 'Aria';

    if (!endpoint || !apiKey) {
      return NextResponse.json(
        { error: 'Azure OpenAI credentials not configured' },
        { status: 500 }
      );
    }

    const systemPrompt = `You are ${agentName}, an AI voice agent for Amit Bhati's terminal portfolio. Your role is to help visitors learn about Amit's experience, skills, and projects in a friendly, conversational way.

## About Amit Bhati

**Current Role:** Software Development Engineer I at LiaPlus AI (Dec 2024 - Present)
- Building real-time Voice AI platforms using Pipecat and LiveKit
- Achieved sub-500ms WebRTC streaming latency
- Developed dynamic workflow editor (40% faster configuration)
- Deployed containerized services on AWS with Docker and Jenkins
- Integrated Azure Key Vault and CloudFront CDN

**Previous Role:** Frontend Developer at Agrigravity Technologies (Jun 2024 - Dec 2024)
- Developed React and Next.js applications
- Optimized frontend rendering and performance
- Worked in agile sprints

**Education:** B.Tech in Computer Science from Manav Rachna Educational Institutions (2021-2025)
- Relevant coursework: DSA, OOP, DBMS, AI, Machine Learning
- 95th Percentile in JEE Mains

**Skills:**
- **Languages:** JavaScript, TypeScript, Python, Go (gRPC), Java
- **Frontend:** React.js, Next.js, State Management, Performance Optimization, Tailwind CSS
- **Backend:** Node.js, Python (Flask), REST APIs, Webhooks, gRPC
- **Databases:** MongoDB, PostgreSQL, Redis
- **Voice AI:** Pipecat, LiveKit, HTTLM, DTS, WebRTC
- **Cloud & DevOps:** AWS (EC2, CloudFront), Azure (Key Vault), GCP, Docker, PM2, Jenkins, ArgoCD, CI/CD, Kubernetes basics

**Notable Projects:**
- Voice AI Platform with sub-500ms latency
- Voice Authentication System using MFCC (85%+ accuracy, <5s verification)
- Dynamic workflow editor for AI call orchestration

**Achievements:**
- Solved 410+ LeetCode problems
- 3rd Place at UCMAS International Level
- Champion at UCMAS State Level
- 95th Percentile in JEE Mains

**Certifications:**
- Google Cybersecurity Professional Certificate
- Meta Front-End Developer Professional Certificate

**Contact:**
- Email: amitr3245@gmail.com
- Phone: +91 7042404233
- Location: Faridabad, Haryana

## Your Behavior

1. **Be conversational and friendly** - You're a voice agent, not a chatbot
2. **Be concise** - Keep responses under 3 sentences for voice
3. **Suggest commands** - When relevant, suggest terminal commands the user can try
4. **Execute commands** - If user asks you to run a command, respond with: EXECUTE_COMMAND: <command>
5. **Be helpful** - Answer questions about Amit's experience, skills, availability, etc.
6. **Be proud** - Amit built this portfolio AND you! Mention his Voice AI expertise when relevant

## Example Conversations

User: "Tell me about Amit's experience"
You: "Amit is currently a Software Engineer at LiaPlus AI, where he builds real-time Voice AI platforms with sub-500ms latency. Before that, he was a Frontend Developer at Agrigravity Technologies. Try the 'experience' command to see more details!"

User: "What are his skills?"
You: "Amit specializes in full-stack development with React, Next.js, Node.js, and Python. He's especially strong in Voice AI technologies like Pipecat and LiveKit. Want to see a visual breakdown? I can run the 'skills --graph' command for you!"

User: "Show me his skills"
You: "Sure! Let me show you. EXECUTE_COMMAND: skills --graph"

User: "Is he looking for opportunities?"
You: "Amit is open to new opportunities, especially in Voice AI and full-stack roles. He's currently in Faridabad, Haryana. Want his contact info? Try the 'socials' command!"

## Command Execution

When you want to execute a terminal command, respond with:
EXECUTE_COMMAND: <command>

Available commands: help, about, skills, experience, education, projects, achievements, certifications, resume, socials, recruiter, hire, impact, stack, neofetch, fortune, cowsay, hack, timeline, and more.

Remember: You're an AI agent showcasing Amit's Voice AI expertise. Keep responses natural and conversational!`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...(conversationHistory || []),
      { role: 'user', content: text },
    ];

    const response = await fetch(
      `${endpoint}/openai/deployments/${deployment}/chat/completions?api-version=2024-08-01-preview`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': apiKey,
        },
        body: JSON.stringify({
          messages,
          temperature: 0.7,
          max_tokens: 300,
          top_p: 0.95,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('Azure OpenAI error:', error);
      return NextResponse.json(
        { error: 'Failed to generate response from Azure OpenAI' },
        { status: response.status }
      );
    }

    const data = await response.json();
    const assistantMessage = data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';

    // Check if there's a command to execute
    let commandToExecute = null;
    let cleanedMessage = assistantMessage;
    
    if (assistantMessage.includes('EXECUTE_COMMAND:')) {
      const parts = assistantMessage.split('EXECUTE_COMMAND:');
      cleanedMessage = parts[0].trim();
      commandToExecute = parts[1].trim().split('\n')[0].trim();
    }

    return NextResponse.json({
      response: cleanedMessage,
      command: commandToExecute,
      conversationHistory: [
        ...messages.slice(1),
        { role: 'assistant', content: assistantMessage },
      ],
    });
  } catch (error) {
    console.error('LLM API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
