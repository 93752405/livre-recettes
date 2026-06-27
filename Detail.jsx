import { useState } from "react";
import { ArrowLeft, Link2, Check, ChefHat } from "lucide-react";
import { F, C, CBG, CEM, STATUTS } from "../constants.js";
import { StatusPill, Stars, Pill, StatCell } from "./ui.jsx";
import CookMode from "./CookMode.jsx";

export default function Detail({ r, onBack, onUpdate, bp }) {
  const [statut, setStatut]   = useState(r.statut);
  const [etoiles, setEtoiles] = useState(r.etoiles);
  const [cookMode, setCookMode] = useState(false);
  const changed  = statut !== r.statut || etoiles !== r.etoiles;
  const isMobile = bp === "mobile";

  if (cookMode) return <CookMode r={r} onExit={() => setCookMode(false)} />;

  return (
    <div style={{ fontFamily: F, paddingBottom: isMobile ? 80 : 0 }}>
      {/* Back */}
      <button
        onClick={onBack}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: C.blue,
          fontSize: 14,
          fontWeight: 500,
          padding: "0 0 1.25rem",
          fontFamily: F,
          display: "flex",
          alignItems: "center",
          gap: 5,
        }}
      >
        <ArrowLeft size={16} /> Retour
      </button>

      {/* Hero */}
      <div
        style={{
          height: isMobile ? 150 : 200,
          borderRadius: 20,
          background: CBG[r.categorie] || "#F5F5F7",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: isMobile ? 64 : 80,
          marginBottom: "1.25rem",
        }}
      >
        {CEM[r.categorie] || "🍽️"}
      </div>

      {/* Titre + statut */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 10,
          marginBottom: "0.4rem",
          flexWrap: "wrap",
        }}
      >
        <h1 style={{ fontFamily: F, fontSize: isMobile ? 22 : 26, fontWeight: 700, margin: 0, color: C.t1, lineHeight: 1.15 }}>
          {r.nom}
        </h1>
        <StatusPill v={r.statut} />
      </div>

      <p style={{ fontFamily: F, fontSize: 15, color: C.t2, lineHeight: 1.65, margin: "0 0 1.25rem" }}>
        {r.description}
      </p>

      {/* Stats row */}
      <div
        style={{
          display: "flex",
          gap: 0,
          padding: "1rem",
          background: C.card,
          borderRadius: 16,
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          marginBottom: "1rem",
        }}
      >
        <StatCell label="Prép."   value={`${r.prepMin} min`} />
        <div style={{ width: 1, background: C.border }} />
        <StatCell label="Cuisson" value={`${r.cuissonMin} min`} />
        <div style={{ width: 1, background: C.border }} />
        <StatCell label="Total"   value={`${r.prepMin + r.cuissonMin} min`} />
        <div style={{ width: 1, background: C.border }} />
        <StatCell label="Portions" value={r.portions} />
      </div>

      {/* Pills */}
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: "1.25rem" }}>
        <Pill label={r.categorie} />
        <Pill label={r.proteine} />
        <Pill label={r.saison} />
        {r.tags.map((t) => <Pill key={t} label={t} />)}
      </div>

      {/* Start cooking button */}
      <button
        onClick={() => setCookMode(true)}
        style={{
          fontFamily: F,
          width: "100%",
          padding: "14px",
          border: "none",
          borderRadius: 14,
          background: C.t1,
          color: "#fff",
          fontSize: 15,
          fontWeight: 600,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          marginBottom: "1.25rem",
        }}
      >
        <ChefHat size={18} /> Commencer la cuisson
      </button>

      {/* Statut & évaluation */}
      <div
        style={{
          background: C.card,
          borderRadius: 16,
          padding: "1rem 1.25rem",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          marginBottom: "1.25rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
          <div>
            <p style={{ fontFamily: F, fontSize: 11, fontWeight: 600, color: C.t2, textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 8px" }}>
              Statut
            </p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {STATUTS.map((sv) => (
                <button
                  key={sv}
                  onClick={() => setStatut(sv)}
                  style={{
                    fontFamily: F,
                    padding: "5px 13px",
                    border: statut === sv ? "none" : `1px solid ${C.border}`,
                    borderRadius: 100,
                    background: statut === sv ? C.blue : "none",
                    color: statut === sv ? "#fff" : C.t2,
                    fontSize: 12,
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  {sv}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontFamily: F, fontSize: 11, fontWeight: 600, color: C.t2, textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 8px" }}>
              Évaluation
            </p>
            <Stars n={etoiles} onSet={setEtoiles} />
          </div>
          {changed && (
            <button
              onClick={() => onUpdate({ ...r, statut, etoiles })}
              style={{
                fontFamily: F,
                marginLeft: "auto",
                background: C.blue,
                color: "#fff",
                border: "none",
                padding: "8px 20px",
                borderRadius: 100,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Check size={14} /> Sauvegarder
            </button>
          )}
        </div>
      </div>

      {/* Ingrédients */}
      <div
        style={{
          background: C.card,
          borderRadius: 16,
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          marginBottom: "1.25rem",
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "1rem 1.25rem", borderBottom: `1px solid ${C.border}` }}>
          <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 600, color: C.t1, margin: 0 }}>
            Ingrédients
          </h2>
        </div>
        {r.ingredients.map((ing, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "11px 1.25rem",
              borderBottom: i < r.ingredients.length - 1 ? `1px solid ${C.border}` : "none",
            }}
          >
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: C.blue, flexShrink: 0 }} />
            <span style={{ fontFamily: F, fontSize: 14, color: C.t1 }}>{ing}</span>
          </div>
        ))}
      </div>

      {/* Étapes */}
      <div style={{ marginBottom: "1.25rem" }}>
        <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 600, color: C.t1, margin: "0 0 0.75rem" }}>
          Préparation
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {r.etapes.map((e, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 0,
                alignItems: "stretch",
                background: C.card,
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
              }}
            >
              <div
                style={{
                  minWidth: 58,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRight: `1px solid ${C.border}`,
                  padding: "14px 0",
                }}
              >
                <span style={{ fontFamily: F, fontSize: 36, fontWeight: 100, color: C.t3, lineHeight: 1 }}>
                  {i + 1}
                </span>
              </div>
              <p style={{ fontFamily: F, margin: 0, fontSize: 14, lineHeight: 1.65, color: C.t1, padding: "14px 1rem" }}>
                {e}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Notes */}
      {r.notes && (
        <div
          style={{
            background: "#FFFBF0",
            borderRadius: 16,
            padding: "1rem 1.25rem",
            marginBottom: "1rem",
            borderLeft: `4px solid ${C.orange}`,
          }}
        >
          <p style={{ fontFamily: F, fontSize: 11, fontWeight: 600, color: C.orange, textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 6px" }}>
            Notes
          </p>
          <p style={{ fontFamily: F, fontSize: 14, color: C.t1, lineHeight: 1.65, margin: 0 }}>
            {r.notes}
          </p>
        </div>
      )}

      {/* Source */}
      {r.source && (
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Link2 size={12} color={C.t3} />
          <p style={{ fontFamily: F, fontSize: 12, color: C.t3, margin: 0 }}>
            Source : {r.source}
          </p>
        </div>
      )}
    </div>
  );
}
