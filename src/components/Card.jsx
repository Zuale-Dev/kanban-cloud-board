export default function Card({ card, onMove, onDelete, allColumns }) {
  return (
    <div style={{ background: "#fff", borderRadius: "6px", padding: "0.75rem", marginBottom: "0.5rem" }}>
      <p style={{ margin: 0 }}>{card.title}</p>
      <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
        {allColumns.filter((col) => col !== card.column).map((col) => (
          <button key={col} onClick={() => onMove(card, col)}>
            → {col}
          </button>
        ))}
        <button onClick={() => onDelete(card)} style={{ color: "red" }}>
          Fshi
        </button>
      </div>
    </div>
  );
}