import AddCardForm from "./AddCardForm";
import Card from "./Card";

export default function Column({ title, cards, onAdd, onMove, onDelete, allColumns }) {
  return (
    <div style={{ flex: 1, background: "#f4f4f4", borderRadius: "8px", padding: "1rem" }}>
      <h3>{title} ({cards.length})</h3>
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          onMove={onMove}
          onDelete={onDelete}
          allColumns={allColumns}
        />
      ))}
      <AddCardForm column={title} onAdd={onAdd} />
    </div>
  );
}