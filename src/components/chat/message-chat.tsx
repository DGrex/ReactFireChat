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
    <div
      className={cn(
        "max-w-37.5 bg-pink-200 p-2",
        isFriend ? "bg-pink-200" : "bg-green-200 ml-auto",
      )}
    >
      <p>{message.text}</p>
      <p className="truncate text-xs">
        {isFriend ? (
          <Suspense fallback={<div>Cargando user info... </div>}>
            <FriendEmail senderId={message.senderId} />
          </Suspense>
        ) : (
          user.email
        )}
      </p>
    </div>
  );
};

export default MessageChat;
