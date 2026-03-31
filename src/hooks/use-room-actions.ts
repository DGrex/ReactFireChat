import type { Room } from "@/schemas/room.schema";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";

export const useRoomActions = () => {
  const db = useFirestore();
  const { data: user } = useUser();
  const roomRef = collection(db, "rooms");

  //user.uid
  const roomQuery = query(
    roomRef,
    where("participants", "array-contains", user?.uid),
  );

  const { data: rooms } = useFirestoreCollectionData(roomQuery, {
    suspense: true,
    idField: "id",
  });

  //Buscar un user con email
  const searchUserWithEmail = async (email: string) => {
    const userRef = collection(db, "users");
    const q = query(userRef, where("email", "==", email));

    const querySnapShot = await getDocs(q);

    if (querySnapShot.empty) {
      return null;
    }

    const doc = querySnapShot.docs[0];

    return doc.data();
  };

  const findOrCreateRoomn = async (friendEmail: string) => {
    if (!user)
      return {
        success: false,
        message: "401 no autorizado",
        roomId: null,
      };

    if (user.email === friendEmail) {
      return {
        success: false,
        message: "400 no te puedes buscar a ti mismo",
        roomId: null,
      };
    }

    const friend = await searchUserWithEmail(friendEmail);
    if (!friend)
      return {
        success: false,
        message: "404 Frien no encontrado",
        roomId: null,
      };

    const existRoom = rooms.find((room) =>
      room.participants.find((uid: string) => uid === friend.uid),
    );

    if (existRoom)
      return {
        success: true,
        message: "200 Sala encontrada",
        roomId: existRoom.id,
      };

    const newRoom: Omit<Room, "id"> = {
      createdAt: serverTimestamp(),
      lastMessage: null,
      participants: [friend.uid, user.uid],
    };

    const document = await addDoc(roomRef, newRoom);

    return {
      success: true,
      message: "200 Sala Creada",
      roomId: document.id,
    };
  };

  return {
    rooms: rooms as Room[],
    findOrCreateRoomn,
  };
};
