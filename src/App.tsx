import { useState } from "react";
import axios from "axios";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";
import type { ChatMessage } from "./types/chat";

const API_URL = import.meta.env.VITE_API_URL;
const USER_ID = "portfolio-user-1";

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: crypto.randomUUID(),
      text: "Hola 👋 Soy tu asistente virtual.",
      sender: "bot",
    },
    {
      id: crypto.randomUUID(),
      text: "Puedo ayudarte a consultar productos y simular pedidos en segundos.",
      sender: "bot",
    },
    {
      id: crypto.randomUUID(),
      text: "Prueba escribiendo 'catalogo' o usa las opciones rápidas 👇",
      sender: "bot",
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (message: string) => {
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      text: message,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await axios.post(
        API_URL,
        { message },
        {
          headers: {
            "Content-Type": "application/json",
            "x-user-id": USER_ID,
          },
        }
      );

      const botMessage: ChatMessage = {
        id: crypto.randomUUID(),
        text: response.data.botReply,
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch {
      const errorMessage: ChatMessage = {
        id: crypto.randomUUID(),
        text: "Ocurrió un error al conectar con el chatbot.",
        sender: "bot",
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const visibleMessages = [
    ...messages,
    ...(isLoading
      ? [
          {
            id: "typing-indicator",
            text: "Escribiendo...",
            sender: "bot" as const,
          },
        ]
      : []),
  ];

  return (
    <main className="app-container">
      <section className="chat-shell">
        <div className="chat-hero">
          <div className="chat-hero-copy">
            <span className="chat-label">Demo interactiva</span>
            <h1>Asistente de Ventas</h1>
            <p>
              Una experiencia conversacional enfocada en atención, catálogo y
              simulación de pedidos.
            </p>
          </div>

          <div className="chat-hero-panel">
            <div className="hero-stat">
              <span className="hero-stat-label">Flujo</span>
              <strong>Guiado</strong>
            </div>

            <div className="hero-stat">
              <span className="hero-stat-label">Integración</span>
              <strong>API lista</strong>
            </div>

            <div className="hero-stat">
              <span className="hero-stat-label">Uso</span>
              <strong>Ventas</strong>
            </div>
          </div>
        </div>

        <section className="chat-card">
          <ChatWindow messages={visibleMessages} />
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </section>
      </section>
    </main>
  );
}

export default App;