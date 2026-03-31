import FormMessageChat from "@/components/chat/form-message-chat";
import FormSearchFriend from "@/components/chat/form-search-friend";
import ListRoomChat from "@/components/chat/list-room-chat";
import MessagesChat from "@/components/chat/messages-chat";
import { Suspense, useState } from "react";
import { MessageSquare } from "lucide-react";

const ChatPage = () => {
  const [roonId, setRoonId] = useState("");
  const handleClickRoomId = (id: string) => {
    setRoonId(id);
  };
  return (
    <div className="max-w-7xl mx-auto p-4 flex flex-col md:flex-row h-full min-h-0 bg-background overflow-hidden">
      {/* Sidebar de chats */}
      <section className="w-full md:w-80 border-r border-border bg-muted/30 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-border">
          <h1 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Mensajes
          </h1>
        </div>
        <div className="flex-1 overflow-y-auto space-y-1 p-2">
          <Suspense
            fallback={
              <div className="p-4 text-center text-sm text-muted-foreground">
                Cargando chats...
              </div>
            }
          >
            <FormSearchFriend handleClickRoomId={handleClickRoomId} />
            <ListRoomChat
              handleClickRoomId={handleClickRoomId}
              roonId={roonId}
            />
          </Suspense>
        </div>
      </section>

      {/* Area de chat */}
      <section className="flex flex-1 flex-col min-h-0 bg-background overflow-hidden">
        {roonId ? (
          <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
            <Suspense
              fallback={
                <div className="flex-1 flex items-center justify-center text-muted-foreground">
                  Cargando chat...
                </div>
              }
            >
              <MessagesChat roomId={roonId} />
            </Suspense>
            <FormMessageChat roomId={roonId} />
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground space-y-4">
            <MessageSquare className="w-16 h-16 opacity-50" />
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">Selecciona un chat</h2>
              <p>Elige una conversación del sidebar para comenzar a chatear</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default ChatPage;
