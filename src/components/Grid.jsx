import { F, C } from "../constants.js";
import RecipeCard from "./RecipeCard.jsx";

export default function Grid({ list, onOpen, bp, empty }) {
  const isMobile = bp === "mobile";
  const cols =
    isMobile
      ? "1fr"
      : bp === "tablet"
      ? "repeat(2,1fr)"
      : "repeat(auto-fill,minmax(220px,1fr))";

  if (!list.length)
    return (
      <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🍽️</div>
        <p style={{ fontFamily: F, fontSize: 15, color: C.t2, margin: 0 }}>
          {empty || "Aucune recette."}
        </p>
      </div>
    );

  return (
    <div style={{ display: "grid", gridTemplateColumns: cols, gap: isMobile ? 10 : 14 }}>
      {list.map((r) => (
        <RecipeCard key={r.id} r={r} onOpen={onOpen} isMobile={isMobile} />
      ))}
    </div>
  );
}
