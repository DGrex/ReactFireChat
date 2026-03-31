import type { Room } from "@/schemas/room.schema"
import { useUser } from "reactfire"
import { Button } from "../ui/button"
import FriendEmail from "./friend-email"
import { cn } from "@/lib/utils"

interface Props{
    room: Room,
    handleClickRoomId: (id: string) => void,
    isActive?: boolean
}

const RoomChat = ({room,handleClickRoomId, isActive}:Props) => {
    const {data:user} = useUser()
    const friendUID = room.participants.find((id)=>id !== user?.uid) || ""
  return( 
  <Button 
    onClick={()=>handleClickRoomId(room.id)}
    className={cn(
      "w-full justify-start h-auto py-3 px-3 rounded-lg transition-colors",
      isActive ? "bg-primary text-primary-foreground" : "bg-transparent text-foreground hover:bg-accent"
    )}
    variant="ghost"
  >
    <div className="flex flex-col items-start gap-1">
      <span className="text-sm font-medium">
        <FriendEmail senderId={friendUID}/>
      </span>
      <span className="text-xs text-muted-foreground">Click para chatear</span>
    </div>
  </Button>
  )
}

export default RoomChat
