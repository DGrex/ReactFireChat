import { useMessageActions } from "@/hooks/use-messages-actions";
import MessageChat from "./message-chat";
import { useEffect, useRef } from "react";

interface Props {
  roomId: string;
}

const MessagesChat = ({ roomId }: Props) => {
  const { messages } = useMessageActions(roomId);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setTimeout(() => scrollToBottom(), 100);
  }, [roomId]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      const isNearBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 100;
      if (isNearBottom) {
        scrollToBottom();
      }
    }
  }, [messages]);

  return (
    <div ref={messagesContainerRef} className="flex-1 min-h-0 max-h-full overflow-y-auto p-4 space-y-3 flex flex-col justify-start bg-background">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center text-muted-foreground text-sm h-full">
          Sin mensajes aún. ¡Comienza la conversación!
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <MessageChat key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  );
};

export default MessagesChat;
