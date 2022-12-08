import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { NewEvent } from "../../types";

export async function SetNewEvent(props: NewEvent) {
    const docRef = collection(db, "events")

    const newDoc = {
        title: props.title,
        color: props.color,
        start: props.start,
        end: props.end,
        userId: props.userId
    }

    await addDoc(docRef, newDoc)
}