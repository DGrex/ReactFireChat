import type { Message } from "@/schemas/room.schema";
import { useUser } from "reactfire";
import FriendEmail from "./friend-email";
import { cn } from "@/lib/utils";
import { Suspense } from "react";

interface Props {
  message: Message;
}
const MessageChat = ({ message }: Props) => {
  const { data: user } = useUser();
  const isFriend = user?.uid !== message.senderId;
  return (
    <div className={cn("flex gap-2 animate-in fade-in-50 duration-300", isFriend ? "justify-start" : "justify-end")}>
      <div
        className={cn(
          "max-w-xs lg:max-w-md px-4 py-2 rounded-lg wrap-break-word text-sm shadow-sm",
          isFriend
            ? "bg-muted text-foreground rounded-bl-none"
            : "bg-primary text-primary-foreground rounded-br-none",
        )}
      >
        <p className="whitespace-pre-wrap">{message.text}</p>
        {isFriend && (
          <p className="truncate text-xs opacity-70 mt-1">
            <Suspense fallback={<span>Cargando...</span>}>
              <FriendEmail senderId={message.senderId} />
            </Suspense>
          </p>
        )}
      </div>
    </div>
  );
};

export default MessageChat;
