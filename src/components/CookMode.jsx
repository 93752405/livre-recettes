import { useState } from "react";
import { X, ChevronLeft, ChevronRight, ChefHat } from "lucide-react";
import { F, C } from "../constants.js";

export default function CookMode({ r, onExit }) {
  const [step, setStep] = useState(0);
  const total = r.etapes.length;
  const done = step >= total;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: C.card,
        zIndex: 300,
        display: "flex",
        flexDirection: "column",
        fontFamily: F,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 20px",
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <button
          onClick={onExit}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: C.blue,
            fontSize: 14,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 5,
            fontFamily: F,
          }}
        >
          <X size={16} /> Quitter
        </button>
        <span style={{ fontSize: 13, fontWeight: 600, color: C.t2 }}>{r.nom}</span>
        {!done ? (
          <span style={{ fontSize: 13, fontWeight: 600, color: C.t2 }}>
            {step + 1} / {total}
          </span>
        ) : (
          <span style={{ fontSize: 13, color: C.green, fontWeight: 700 }}>✓ Terminé</span>
        )}
      </div>

      {/* Body */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 1.5rem",
          textAlign: "center",
        }}
      >
        {!done ? (
          <>
            <span
              style={{
                fontSize: 96,
                fontWeight: 100,
                color: C.border,
                lineHeight: 1,
                marginBottom: 16,
                userSelect: "none",
              }}
            >
              {step + 1}
            </span>
            <p
              style={{
                fontSize: 22,
                fontWeight: 400,
                color: C.t1,
                lineHeight: 1.5,
                maxWidth: 520,
                margin: "0 0 2rem",
              }}
            >
              {r.etapes[step]}
            </p>
            {/* Progress dots */}
            <div style={{ display: "flex", gap: 8, marginBottom: "2rem" }}>
              {r.etapes.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background:
                      i === step ? C.blue : i < step ? C.orange : C.border,
                    transition: "background 0.2s",
                  }}
                />
              ))}
            </div>
          </>
        ) : (
          <>
            <div style={{ fontSize: 72, marginBottom: 16 }}>🎉</div>
            <p style={{ fontSize: 24, fontWeight: 700, color: C.t1, marginBottom: 8 }}>
              C'est prêt !
            </p>
            <p style={{ fontSize: 16, color: C.t2, margin: 0 }}>{r.nom}</p>
          </>
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          gap: 10,
          padding: "16px 20px",
          borderTop: `1px solid ${C.border}`,
        }}
      >
        {!done && step > 0 && (
          <button
            onClick={() => setStep((s) => s - 1)}
            style={{
              fontFamily: F,
              flex: 1,
              padding: "14px",
              border: `1px solid ${C.border}`,
              borderRadius: 14,
              background: "none",
              color: C.t1,
              fontSize: 16,
              fontWeight: 500,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            <ChevronLeft size={18} /> Précédent
          </button>
        )}
        {!done && (
          <button
            onClick={() => setStep((s) => s + 1)}
            style={{
              fontFamily: F,
              flex: 2,
              padding: "14px",
              border: "none",
              borderRadius: 14,
              background: C.blue,
              color: "#fff",
              fontSize: 16,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            {step < total - 1 ? (
              <>
                <span>Étape suivante</span>
                <ChevronRight size={18} />
              </>
            ) : (
              <>
                <ChefHat size={18} />
                <span>Terminer</span>
              </>
            )}
          </button>
        )}
        {done && (
          <button
            onClick={onExit}
            style={{
              fontFamily: F,
              flex: 1,
              padding: "14px",
              border: "none",
              borderRadius: 14,
              background: C.t1,
              color: "#fff",
              fontSize: 16,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Retour à la recette
          </button>
        )}
      </div>
    </div>
  );
}
