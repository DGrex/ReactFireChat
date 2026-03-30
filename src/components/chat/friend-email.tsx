import { useFriendInfo } from "@/hooks/use-friend-info"

interface Props{
    senderId:string
}

const FriendEmail = ({senderId}:Props) => {
    
    const {friend} = useFriendInfo(senderId)
  
    return friend.email
}

export default FriendEmail
