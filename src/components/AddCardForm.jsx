import { useState } from "react";

export default function AddCardForm({ column, onAdd }) {
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (!title.trim()) return;
    onAdd(title, column);
    setTitle("");
  };

  return (
    <div style={{ marginTop: "0.5rem" }}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Shto detyrë..."
        style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
      />
      <button onClick={handleAdd} style={{ width: "100%" }}>
        + Shto
      </button>
    </div>
  );
}