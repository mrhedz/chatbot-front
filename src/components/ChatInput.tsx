import { useState } from "react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const quickActions = ["Hola", "Catalogo", "Bebidas", "Botanas", "Cancelar"];

function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || isLoading) {
      return;
    }

    onSendMessage(trimmedMessage);
    setMessage("");
  };

  const handleQuickAction = (value: string) => {
    if (isLoading) {
      return;
    }

    onSendMessage(value.toLowerCase());
  };

  return (
    <div className="chat-input-wrapper">
      <div className="quick-actions">
        {quickActions.map((action) => (
          <button
            key={action}
            type="button"
            className="quick-action-button"
            onClick={() => handleQuickAction(action)}
            disabled={isLoading}
          >
            {action}
          </button>
        ))}
      </div>

      <form className="chat-input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="chat-input"
          placeholder="Escribe 'catalogo' o elige una opción..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          disabled={isLoading}
        />

        <button type="submit" className="chat-button" disabled={isLoading}>
          {isLoading ? "Enviando..." : "Enviar mensaje"}
        </button>
      </form>
    </div>
  );
}

export default ChatInput;