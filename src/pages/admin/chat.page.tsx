import FormMessageChat from "@/components/chat/form-message-chat"
import ListRoomChat from "@/components/chat/list-room-chat"
import MessagesChat from "@/components/chat/messages-chat"
import { Suspense, useState } from "react"



const ChatPage = () => {
  const [roonId, setRoonId] = useState("")
  const handleClickRoomId=(id:string)=>{
    setRoonId(id)
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <section>
        {/*Mostrar las rooms*/}
        <Suspense fallback= {<div>Cargando Rooms...</div>}>
          <ListRoomChat handleClickRoomId={handleClickRoomId}/>
        </Suspense>
        
      </section>
      <section>
        {/*Mostrar los mensajes*/}
        
        {   
          roonId ? (     
          <Suspense fallback= {<div>Cargando Mensajes...</div>}>    
            <FormMessageChat roomId={roonId}/>      
            <MessagesChat roomId={roonId}/>
          </Suspense>
          ):(
            <div>Selecciona una sala para chatear</div>
          )
        }
      </section>
    </div>
  )
}

export default ChatPage
