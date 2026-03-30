import type { LastMessage, Message } from "@/schemas/room.schema";
import {
  addDoc,
  collection,
  doc,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";

export const useMessageActions = (roomId: string) => {
  const { data: user } = useUser();
  const db = useFirestore();
  const messageRef = collection(db, "rooms", roomId, "messages");
  const messagesQuery = query(messageRef, orderBy("timestamp", "asc"));
  const { data: messages } = useFirestoreCollectionData(messagesQuery, {
    suspense: true,
    idField: "id",
  });

  const sendMessage = async (text: string) => {
    if (!user) throw new Error("useMessageActions: 401");
    if (!text.trim()) throw new Error("useMessageActions: 400");

    const timestamp = serverTimestamp();

    //Crear un Mensaje
    const messageData: Omit<Message, "id"> = {
      senderId: user.uid,
      text,
      timestamp,
    };
    /*await addDoc(messageRef, messageData);*/

    //Actualizar lastMessage en el room
    const roomRef = doc(db, "rooms", roomId);
    const lastMessage: LastMessage = {
      senderId: user.uid,
      text,
      timestamp,
    };

    /*
    await updateDoc(roomRef, {
      lastMessage,
    });
    */


    await Promise.all([
      updateDoc(roomRef, {
        lastMessage,
      }),
      addDoc(messageRef, messageData),
    ]);
  };

  return {
    messages: messages as Message[],
    sendMessage
  };
};
