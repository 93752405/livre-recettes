import { useState } from "react";
import { F, C, AUTH_KEY, PASSWORD } from "../constants.js";

export default function Login({ onAuth }) {
  const [input, setInput]   = useState("");
  const [error, setError]   = useState(false);
  const [shake, setShake]   = useState(false);

  const attempt = () => {
    if (input === PASSWORD) {
      localStorage.setItem(AUTH_KEY, "1");
      onAuth();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setInput("");
    }
  };

  const onKey = (e) => {
    if (e.key === "Enter") attempt();
    if (error) setError(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: C.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        fontFamily: F,
      }}
    >
      <div
        style={{
          background: C.card,
          borderRadius: 24,
          padding: "2.5rem 2rem",
          width: "100%",
          maxWidth: 360,
          boxShadow: "0 8px 40px rgba(0,0,0,0.10)",
          textAlign: "center",
          animation: shake ? "shake 0.4s ease" : "none",
        }}
      >
        <div style={{ fontSize: 52, marginBottom: "1rem" }}>📖</div>
        <h1
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: C.t1,
            margin: "0 0 0.35rem",
          }}
        >
          Mon livre de recettes
        </h1>
        <p style={{ fontSize: 14, color: C.t2, margin: "0 0 2rem" }}>
          Entrez le mot de passe pour accéder au livre.
        </p>

        <input
          type="password"
          placeholder="Mot de passe"
          value={input}
          onChange={(e) => { setInput(e.target.value); setError(false); }}
          onKeyDown={onKey}
          autoFocus
          style={{
            width: "100%",
            boxSizing: "border-box",
            border: `1.5px solid ${error ? "#CC2C27" : C.border}`,
            borderRadius: 12,
            padding: "11px 14px",
            fontSize: 15,
            fontFamily: F,
            color: C.t1,
            background: error ? "#FFF5F5" : C.bg,
            outline: "none",
            marginBottom: "0.6rem",
            transition: "border-color 0.2s, background 0.2s",
          }}
        />

        {error && (
          <p
            style={{
              fontSize: 13,
              color: "#CC2C27",
              margin: "0 0 0.75rem",
              fontWeight: 500,
            }}
          >
            Mot de passe incorrect. Réessaie !
          </p>
        )}

        <button
          onClick={attempt}
          style={{
            width: "100%",
            padding: "13px",
            border: "none",
            borderRadius: 12,
            background: C.blue,
            color: "#fff",
            fontSize: 15,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: F,
            marginTop: error ? 0 : "0.5rem",
          }}
        >
          Entrer
        </button>
      </div>

      <style>{`
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%      { transform: translateX(-8px); }
          40%      { transform: translateX(8px); }
          60%      { transform: translateX(-5px); }
          80%      { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
}
