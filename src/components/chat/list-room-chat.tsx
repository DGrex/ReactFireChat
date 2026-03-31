import { useRoomActions } from "@/hooks/use-room-actions";
import RoomChat from "./button-room-chat";

interface Props {
  handleClickRoomId: (id: string) => void;
  roonId: string;
}

const ListRoomChat = ({ handleClickRoomId, roonId }: Props) => {
  const { rooms } = useRoomActions();
  return (
    <div className="space-y-1">
      {rooms.map((room) => (
        <RoomChat key={room.id} room={room} handleClickRoomId={handleClickRoomId} isActive={roonId === room.id} />
      ))}
    </div>
  );
};

export default ListRoomChat;
