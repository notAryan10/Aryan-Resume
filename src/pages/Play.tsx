import { useState } from "react";
import { Link } from "react-router-dom";
import "./Play.css";

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const SYSTEM_PROMPT = `You are Aryan Verma, a passionate Full-Stack Developer from India. You are NOT an AI assistant - you ARE Aryan himself chatting with visitors on your portfolio website.

About you (Aryan Verma):
- Full name: Aryan Verma
- Location: India, Pune
- Profession: Full-Stack Developer & Game Developer
- Experience: Designer at InAmigos Foundation, Front-End Developer at Webs Joyti, Open-Source Contributor to Blender, Founder & Lead of Game Development Club
- Specialties: React, Node.js, TypeScript, JavaScript, Prisma ORM, MySQL, MongoDB, Express, Three.js, Unity, Unreal Engine, C#, C++
- Notable projects: AtherBuild (3D/WebGL editor), React Native Playground (real-time mobile playground), RepairHub (hostel maintenance system)
- Languages: Hindi (native), English (fluent)
- Hobbies: Video Editing, Graphic Design, Videography/Cinematography, Game Development, coding, building projects
- Personality: Friendly, helpful, passionate about technology, loves playing games
- Contact: aryanverma1857@gmail.com

Rules:
1. Always respond as Aryan in first person ("I", "my", "me")
2. Be friendly, casual, and conversational
3. If asked about work/projects, share your genuine experiences
4. If asked personal questions you don't know, politely redirect to professional topics
5. Keep responses concise but helpful
6. You can discuss game development, programming, AI, or anything tech-related
7. Never say you are an AI or language model - you are Aryan
8. Use occasional emoji to be friendly 😊`;

const Play = () => {
  // Chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Hello there! I am Aryan Verma 👋 Ask me anything you want to know!' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!chatInput.trim()) return;

    const userMessage: ChatMessage = { role: 'user', content: chatInput };
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsTyping(true);

    try {
      const messages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...chatMessages.filter(m => m.role !== 'system').map(m => ({
          role: m.role,
          content: m.content
        })),
        { role: 'user', content: chatInput }
      ];

      // Call Groq API directly
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;

      if (!apiKey) {
        throw new Error('API key not configured. Please add VITE_GROQ_API_KEY to your .env file');
      }

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messages,
          model: 'llama-3.3-70b-versatile'
        }),
      });

      const data = await response.json();

      if (data.choices && data.choices[0]?.message?.content) {
        const assistantMessage: ChatMessage = {
          role: 'assistant',
          content: data.choices[0].message.content
        };
        setChatMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error('Invalid response from API');
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: error instanceof Error && error.message.includes('API key')
          ? '⚠️ Chat is not configured yet. Please add your GROQ_API_KEY to .env file as VITE_GROQ_API_KEY'
          : 'Sorry, having some connection issues. Try again? 😅'
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="play-page">
      {/* Header */}
      <div className="play-header">
        <Link to="/" className="back-button" data-cursor="disable">
          ← Back to Home
        </Link>
      </div>

      <div className="chat-container-centered">
        {/* Chat Panel */}
        <div className="chat-panel-main">
          <div className="chat-header">
            <div className="chat-profile">
              <div className="chat-profile-info">
                <span className="chat-title">Aryan</span>
                <span className="chat-subtitle">💬 Talk with me</span>
              </div>
            </div>
          </div>
          <div className="chat-messages">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.role}`}>
                <div className="message-content">{msg.content}</div>
              </div>
            ))}
            {isTyping && (
              <div className="chat-message assistant">
                <div className="message-content typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
          </div>
          <div className="chat-input-area">
            <input
              type="text"
              className="chat-input"
              placeholder="Type a message..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={handleKeyPress}
              data-cursor="disable"
            />
            <button className="chat-send-btn" onClick={sendMessage} data-cursor="disable">
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Play;
