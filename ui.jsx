import { useState } from "react";
import { F, C, STATUS } from "../constants.js";

// ─── StatusPill ────────────────────────────────────────────────────────────────
export function StatusPill({ v }) {
  const s = STATUS[v] || STATUS["À essayer"];
  return (
    <span
      style={{
        fontFamily: F,
        background: s.bg,
        color: s.tx,
        borderRadius: 100,
        padding: "3px 10px",
        fontSize: 11,
        fontWeight: 600,
      }}
    >
      {v}
    </span>
  );
}

// ─── Pill ──────────────────────────────────────────────────────────────────────
export function Pill({ label }) {
  return (
    <span
      style={{
        fontFamily: F,
        background: C.pill,
        color: C.t2,
        borderRadius: 100,
        padding: "3px 10px",
        fontSize: 12,
        fontWeight: 500,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

// ─── Stars ─────────────────────────────────────────────────────────────────────
export function Stars({ n, onSet }) {
  const [h, setH] = useState(0);
  const a = h || n;
  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          onClick={() => onSet?.(i)}
          onMouseEnter={() => onSet && setH(i)}
          onMouseLeave={() => onSet && setH(0)}
          style={{
            fontSize: 17,
            cursor: onSet ? "pointer" : "default",
            color: a >= i ? C.orange : C.border,
            userSelect: "none",
            lineHeight: 1,
          }}
        >
          {a >= i ? "★" : "☆"}
        </span>
      ))}
    </span>
  );
}

// ─── StatCell ──────────────────────────────────────────────────────────────────
export function StatCell({ label, value }) {
  return (
    <div style={{ textAlign: "center", flex: 1 }}>
      <p
        style={{
          fontFamily: F,
          margin: "0 0 2px",
          fontSize: 10,
          color: C.t2,
          textTransform: "uppercase",
          letterSpacing: "0.07em",
          fontWeight: 600,
        }}
      >
        {label}
      </p>
      <p style={{ fontFamily: F, margin: 0, fontSize: 18, fontWeight: 600, color: C.t1 }}>
        {value}
      </p>
    </div>
  );
}
