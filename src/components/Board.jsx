import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import Column from "./Column";
import ActivityStream from "./ActivityStream";

const COLUMNS = ["To Do", "In Progress", "Done"];

export default function Board() {
  const [cards, setCards] = useState([]);
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    const unsubCards = onSnapshot(collection(db, "cards"), (snapshot) => {
      setCards(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    const unsubActivity = onSnapshot(
      collection(db, "activity"),
      (snapshot) => {
        const sorted = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .sort((a, b) => b.timestamp?.seconds - a.timestamp?.seconds);
        setActivity(sorted);
      }
    );

    return () => {
      unsubCards();
      unsubActivity();
    };
  }, []);

  const addCard = async (title, column) => {
    await addDoc(collection(db, "cards"), {
      title,
      column,
      createdAt: serverTimestamp(),
    });
    await addDoc(collection(db, "activity"), {
      text: `Karta "${title}" u shtua në "${column}"`,
      timestamp: serverTimestamp(),
    });
  };

  const moveCard = async (card, toColumn) => {
    await updateDoc(doc(db, "cards", card.id), { column: toColumn });
    await addDoc(collection(db, "activity"), {
      text: `Karta "${card.title}" u lëviz në "${toColumn}"`,
      timestamp: serverTimestamp(),
    });
  };

  const deleteCard = async (card) => {
    await deleteDoc(doc(db, "cards", card.id));
    await addDoc(collection(db, "activity"), {
      text: `Karta "${card.title}" u fshi`,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
      {COLUMNS.map((col) => (
        <Column
          key={col}
          title={col}
          cards={cards.filter((c) => c.column === col)}
          onAdd={addCard}
          onMove={moveCard}
          onDelete={deleteCard}
          allColumns={COLUMNS}
        />
      ))}
      <ActivityStream activity={activity} />
    </div>
  );
}