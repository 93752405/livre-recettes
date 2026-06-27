import { useState } from "react";
import { Clock } from "lucide-react";
import { F, C, CBG, CEM } from "../constants.js";
import { StatusPill, Stars, Pill } from "./ui.jsx";

export default function RecipeCard({ r, onOpen, isMobile }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onClick={() => onOpen(r)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: C.card,
        borderRadius: 18,
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: hov
          ? "0 8px 32px rgba(0,0,0,0.10)"
          : "0 2px 12px rgba(0,0,0,0.06)",
        transition: "box-shadow 0.2s, transform 0.2s",
        transform: hov && !isMobile ? "translateY(-2px)" : "none",
        display: isMobile ? "flex" : "block",
        alignItems: "stretch",
      }}
    >
      {/* Vignette emoji */}
      <div
        style={{
          width: isMobile ? 100 : "auto",
          minWidth: isMobile ? 100 : "auto",
          height: isMobile ? "auto" : 120,
          flexShrink: 0,
          background: CBG[r.categorie] || "#F5F5F7",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: isMobile ? 32 : 44,
          position: "relative",
        }}
      >
        {CEM[r.categorie] || "🍽️"}
        {!isMobile && (
          <div style={{ position: "absolute", top: 10, left: 10 }}>
            <StatusPill v={r.statut} />
          </div>
        )}
        {!isMobile && r.etoiles === 5 && (
          <div
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              fontSize: 10,
              color: C.orange,
              fontWeight: 700,
              background: "rgba(255,255,255,0.9)",
              borderRadius: 100,
              padding: "2px 7px",
            }}
          >
            ★ Favorite
          </div>
        )}
      </div>

      {/* Contenu */}
      <div
        style={{
          padding: isMobile ? "10px 12px" : "14px 16px 16px",
          flex: 1,
          minWidth: 0,
        }}
      >
        {isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
            <StatusPill v={r.statut} />
          </div>
        )}
        <p
          style={{
            fontFamily: F,
            margin: "0 0 3px",
            fontSize: isMobile ? 14 : 15,
            fontWeight: 600,
            color: C.t1,
            lineHeight: 1.2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: isMobile ? "nowrap" : "normal",
          }}
        >
          {r.nom}
        </p>
        {!isMobile && (
          <p
            style={{
              fontFamily: F,
              margin: "0 0 12px",
              fontSize: 13,
              color: C.t2,
              lineHeight: 1.5,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {r.description}
          </p>
        )}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: isMobile ? 0 : 10,
          }}
        >
          {r.etoiles > 0 ? (
            <Stars n={r.etoiles} />
          ) : (
            <span style={{ fontFamily: F, fontSize: 12, color: C.t3 }}>Non évalué</span>
          )}
          <span
            style={{
              fontFamily: F,
              fontSize: 11,
              color: C.t2,
              display: "flex",
              alignItems: "center",
              gap: 3,
            }}
          >
            <Clock size={11} />
            {r.prepMin + r.cuissonMin} min
          </span>
        </div>
        {!isMobile && (
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 10 }}>
            <Pill label={r.categorie} />
            {r.tags.slice(0, 2).map((t) => (
              <Pill key={t} label={t} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
