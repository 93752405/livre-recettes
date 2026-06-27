import { useState } from "react";
import { X } from "lucide-react";
import { F, C, CATS, PROTS, SAISONS, STATUTS } from "../constants.js";

export default function AddForm({ onClose, onSave }) {
  const [f, setF] = useState({
    nom: "", description: "", categorie: "souper", proteine: "poulet",
    saison: "toutes saisons", prepMin: 15, cuissonMin: 30, portions: 4,
    statut: "À essayer", etoiles: 0, tags: "", ingredients: "", etapes: "",
    notes: "", source: "",
  });

  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));

  const save = () => {
    if (!f.nom.trim()) return;
    onSave({
      ...f,
      id: Date.now(),
      prepMin: +f.prepMin,
      cuissonMin: +f.cuissonMin,
      portions: +f.portions,
      tags:        f.tags.split(",").map((t) => t.trim()).filter(Boolean),
      ingredients: f.ingredients.split("\n").map((t) => t.trim()).filter(Boolean),
      etapes:      f.etapes.split("\n").map((t) => t.trim()).filter(Boolean),
    });
  };

  const lbl = {
    fontFamily: F, fontSize: 11, fontWeight: 600, color: C.t2,
    textTransform: "uppercase", letterSpacing: "0.06em",
    display: "block", marginBottom: 5,
  };
  const inp = {
    fontFamily: F, width: "100%", boxSizing: "border-box",
    border: `1px solid ${C.border}`, borderRadius: 10,
    padding: "9px 12px", fontSize: 14, color: C.t1,
    background: C.card, outline: "none",
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.35)",
        backdropFilter: "blur(4px)",
        display: "flex", alignItems: "flex-end", justifyContent: "center",
        zIndex: 200,
      }}
    >
      <div
        style={{
          background: C.card,
          borderRadius: "20px 20px 0 0",
          width: "100%",
          maxWidth: 600,
          maxHeight: "92vh",
          overflowY: "auto",
          padding: "1.5rem",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.16)",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
          <h2 style={{ fontFamily: F, fontSize: 20, fontWeight: 700, margin: 0, color: C.t1 }}>
            Nouvelle recette
          </h2>
          <button
            onClick={onClose}
            style={{
              background: C.pill, border: "none", borderRadius: "50%",
              width: 30, height: 30,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <X size={16} color={C.t2} />
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
          <div>
            <label style={lbl}>Nom *</label>
            <input style={inp} value={f.nom} onChange={(e) => set("nom", e.target.value)} placeholder="ex : Poulet rôti au citron" />
          </div>
          <div>
            <label style={lbl}>Description</label>
            <input style={inp} value={f.description} onChange={(e) => set("description", e.target.value)} placeholder="Une description appétissante..." />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div>
              <label style={lbl}>Catégorie</label>
              <select style={inp} value={f.categorie} onChange={(e) => set("categorie", e.target.value)}>
                {CATS.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={lbl}>Protéine</label>
              <select style={inp} value={f.proteine} onChange={(e) => set("proteine", e.target.value)}>
                {PROTS.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            <div>
              <label style={lbl}>Prép. (min)</label>
              <input type="number" style={inp} value={f.prepMin} onChange={(e) => set("prepMin", e.target.value)} />
            </div>
            <div>
              <label style={lbl}>Cuisson (min)</label>
              <input type="number" style={inp} value={f.cuissonMin} onChange={(e) => set("cuissonMin", e.target.value)} />
            </div>
            <div>
              <label style={lbl}>Portions</label>
              <input type="number" style={inp} value={f.portions} onChange={(e) => set("portions", e.target.value)} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div>
              <label style={lbl}>Saison</label>
              <select style={inp} value={f.saison} onChange={(e) => set("saison", e.target.value)}>
                {SAISONS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={lbl}>Statut</label>
              <select style={inp} value={f.statut} onChange={(e) => set("statut", e.target.value)}>
                {STATUTS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label style={lbl}>Tags (séparés par des virgules)</label>
            <input style={inp} value={f.tags} onChange={(e) => set("tags", e.target.value)} placeholder="citron, santé, rapide..." />
          </div>
          <div>
            <label style={lbl}>Ingrédients (1 par ligne)</label>
            <textarea
              style={{ ...inp, minHeight: 90, resize: "vertical" }}
              value={f.ingredients}
              onChange={(e) => set("ingredients", e.target.value)}
              placeholder={"300g de poulet\n2 citrons\n..."}
            />
          </div>
          <div>
            <label style={lbl}>Étapes (1 par ligne)</label>
            <textarea
              style={{ ...inp, minHeight: 100, resize: "vertical" }}
              value={f.etapes}
              onChange={(e) => set("etapes", e.target.value)}
              placeholder={"Préchauffer le four.\nMélanger...\n..."}
            />
          </div>
          <div>
            <label style={lbl}>Notes</label>
            <textarea style={{ ...inp, minHeight: 60, resize: "vertical" }} value={f.notes} onChange={(e) => set("notes", e.target.value)} />
          </div>
          <div>
            <label style={lbl}>Source</label>
            <input style={inp} value={f.source} onChange={(e) => set("source", e.target.value)} placeholder="Instagram, site web, recette de famille..." />
          </div>

          <div style={{ display: "flex", gap: 10, paddingTop: "0.5rem" }}>
            <button
              onClick={onClose}
              style={{ fontFamily: F, flex: 1, padding: "12px", border: `1px solid ${C.border}`, borderRadius: 100, background: "none", color: C.t2, cursor: "pointer", fontSize: 14, fontWeight: 500 }}
            >
              Annuler
            </button>
            <button
              onClick={save}
              style={{ fontFamily: F, flex: 2, padding: "12px", border: "none", borderRadius: 100, background: C.blue, color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 600 }}
            >
              Ajouter la recette
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
