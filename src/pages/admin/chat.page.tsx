import FormMessageChat from "@/components/chat/form-message-chat";
import FormSearchFriend from "@/components/chat/form-search-friend";
import ListRoomChat from "@/components/chat/list-room-chat";
import MessagesChat from "@/components/chat/messages-chat";
import { Suspense, useState } from "react";

const ChatPage = () => {
  const [roonId, setRoonId] = useState("");
  const handleClickRoomId = (id: string) => {
    setRoonId(id);
  };
  return (
    <div className="flex h-full min-h-0 bg-background overflow-hidden">
      {/* Sidebar de chats */}
      <section className="w-full md:w-80 border-r border-border bg-muted/30 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-border">
          <h1 className="text-xl font-semibold text-foreground">Mensajes</h1>
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
      <section className="hidden md:flex flex-1 flex-col min-h-0 bg-background overflow-hidden">
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
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Selecciona un chat para comenzar
          </div>
        )}
      </section>
    </div>
  );
};

export default ChatPage;
