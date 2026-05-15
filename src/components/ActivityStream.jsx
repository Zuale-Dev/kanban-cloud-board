export default function ActivityStream({ activity }) {
  return (
    <div style={{ width: "250px", background: "#f4f4f4", borderRadius: "8px", padding: "1rem" }}>
      <h3>Aktiviteti</h3>
      {activity.length === 0 && <p style={{ color: "#999" }}>Asnjë aktivitet ende</p>}
      {activity.map((ev) => (
        <div key={ev.id} style={{ background: "#fff", borderRadius: "6px", padding: "0.5rem", marginBottom: "0.5rem", fontSize: "13px" }}>
          {ev.text}
        </div>
      ))}
    </div>
  );
}