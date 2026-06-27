import { useState, useEffect } from "react";
import {
  Search, Plus, Heart, FlaskConical, Star,
  LayoutGrid, Tag, X, SlidersHorizontal, Check,
} from "lucide-react";

import { F, C, CBG, CEM, CATS, PROTS, SAISONS, STATUTS, STORAGE_KEY } from "./constants.js";
import { useBreakpoint } from "./hooks/useBreakpoint.js";
import { RECIPES_DEFAULT } from "./data/defaultRecipes.js";
import { StatusPill, Pill } from "./components/ui.jsx";
import Grid    from "./components/Grid.jsx";
import Detail  from "./components/Detail.jsx";
import AddForm from "./components/AddForm.jsx";

// ─── helpers ──────────────────────────────────────────────────────────────────
const loadFromStorage = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

const saveToStorage = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
};

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const bp       = useBreakpoint();
  const isMobile = bp === "mobile";

  const [recipes,   setRecipes]   = useState([]);
  const [view,      setView]      = useState("accueil");
  const [selected,  setSelected]  = useState(null);
  const [search,    setSearch]    = useState("");
  const [fCat,      setFCat]      = useState("");
  const [fSaison,   setFSaison]   = useState("");
  const [sort,      setSort]      = useState("default");
  const [showAdd,   setShowAdd]   = useState(false);
  const [showSort,  setShowSort]  = useState(false);
  const [loaded,    setLoaded]    = useState(false);

  // ── Initialisation depuis localStorage ──────────────────────────────────────
  useEffect(() => {
    const saved = loadFromStorage();
    if (saved) {
      setRecipes(saved);
    } else {
      setRecipes(RECIPES_DEFAULT);
      saveToStorage(RECIPES_DEFAULT);
    }
    setLoaded(true);
  }, []);

  // ── Persistance ─────────────────────────────────────────────────────────────
  const persist = (rs) => {
    setRecipes(rs);
    saveToStorage(rs);
  };

  const update = (u) => {
    persist(recipes.map((r) => (r.id === u.id ? u : r)));
    setSelected(u);
  };
  const add  = (r) => { persist([...recipes, r]); setShowAdd(false); };
  const open = (r) => { setSelected(r); setView("detail"); };
  const goTo = (v) => { setView(v); setSelected(null); };

  // ── Tri & filtres ────────────────────────────────────────────────────────────
  const sortFn = (a, b) => {
    if (sort === "alpha") return a.nom.localeCompare(b.nom);
    if (sort === "note")  return b.etoiles - a.etoiles;
    if (sort === "temps") return (a.prepMin + a.cuissonMin) - (b.prepMin + b.cuissonMin);
    return 0;
  };

  const applyFilters = (list) =>
    list
      .filter((r) => {
        const q = search.toLowerCase();
        return (
          (!q ||
            r.nom.toLowerCase().includes(q) ||
            r.proteine.includes(q) ||
            r.tags.some((t) => t.includes(q)) ||
            r.ingredients?.some((i) => i.toLowerCase().includes(q))) &&
          (!fCat    || r.categorie === fCat) &&
          (!fSaison || r.saison    === fSaison)
        );
      })
      .sort(sortFn);

  const favoris  = applyFilters(recipes.filter((r) => r.statut === "Favorite"));
  const aEssayer = applyFilters(recipes.filter((r) => r.statut === "À essayer"));
  const absolues = applyFilters(recipes.filter((r) => r.etoiles === 5));
  const filtered = applyFilters(recipes);
  const allTags  = [...new Set(recipes.flatMap((r) => r.tags))];

  // ── Navigation ──────────────────────────────────────────────────────────────
  const MOBILE_NAV = [
    { id: "accueil",    icon: <LayoutGrid size={22} />,   label: "Accueil" },
    { id: "favoris",    icon: <Heart size={22} />,        label: "Favoris" },
    { id: "a-essayer",  icon: <FlaskConical size={22} />, label: "À essayer" },
    { id: "categories", icon: <LayoutGrid size={22} />,   label: "Catégories" },
    { id: "tags",       icon: <Tag size={22} />,          label: "Tags" },
  ];
  const DESK_NAV = [
    { id: "accueil",    icon: <LayoutGrid size={14} />,   label: "Accueil" },
    { id: "favoris",    icon: <Heart size={14} />,        label: `Favoris (${recipes.filter((r) => r.statut === "Favorite").length})` },
    { id: "a-essayer",  icon: <FlaskConical size={14} />, label: `À essayer (${recipes.filter((r) => r.statut === "À essayer").length})` },
    { id: "absolues",   icon: <Star size={14} />,         label: `Absolues (${recipes.filter((r) => r.etoiles === 5).length})` },
    { id: "categories", icon: <LayoutGrid size={14} />,   label: "Catégories" },
    { id: "tags",       icon: <Tag size={14} />,          label: "Tags" },
  ];

  const H2 = (txt) => (
    <h2 style={{ fontFamily: F, fontSize: 22, fontWeight: 700, color: C.t1, margin: "0 0 1.25rem" }}>
      {txt}
    </h2>
  );

  // ── Loading ──────────────────────────────────────────────────────────────────
  if (!loaded)
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: C.bg }}>
        <p style={{ fontFamily: F, fontSize: 16, color: C.t2 }}>Chargement…</p>
      </div>
    );

  // ── Contenu principal ────────────────────────────────────────────────────────
  const mainContent = () => {
    if (view === "detail" && selected)
      return <Detail r={selected} onBack={() => goTo("accueil")} onUpdate={update} bp={bp} />;

    // Barre de tri
    const SortBar = () => (
      <div style={{ position: "relative", display: "inline-block" }}>
        <button
          onClick={() => setShowSort((s) => !s)}
          style={{
            fontFamily: F, display: "flex", alignItems: "center", gap: 6,
            background: C.card, border: `1px solid ${C.border}`, borderRadius: 100,
            padding: "7px 14px", fontSize: 12, fontWeight: 500, cursor: "pointer",
            color: C.t2, boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
          }}
        >
          <SlidersHorizontal size={13} />
          {sort === "default" ? "Trier" : sort === "alpha" ? "A → Z" : sort === "note" ? "Meilleure note" : "Plus rapide"}
        </button>
        {showSort && (
          <div
            style={{
              position: "absolute", top: "calc(100% + 6px)", right: 0,
              background: C.card, border: `1px solid ${C.border}`, borderRadius: 14,
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)", overflow: "hidden",
              zIndex: 50, minWidth: 160,
            }}
          >
            {[["default","Par défaut"],["alpha","A → Z"],["note","Meilleure note"],["temps","Plus rapide"]].map(([k, l]) => (
              <button
                key={k}
                onClick={() => { setSort(k); setShowSort(false); }}
                style={{
                  fontFamily: F, display: "flex", alignItems: "center",
                  justifyContent: "space-between", width: "100%", padding: "11px 16px",
                  border: "none", background: "none", textAlign: "left", fontSize: 13,
                  cursor: "pointer", color: sort === k ? C.blue : C.t1,
                  fontWeight: sort === k ? 600 : 400,
                }}
              >
                {l}{sort === k && <Check size={14} />}
              </button>
            ))}
          </div>
        )}
      </div>
    );

    // ── Accueil ──────────────────────────────────────────────────────────────
    if (view === "accueil")
      return (
        <div>
          {/* Recherche */}
          <div style={{ position: "relative", marginBottom: "0.75rem" }}>
            <Search size={15} color={C.t3} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
            <input
              type="search"
              placeholder="Plat, ingrédient, tag…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                fontFamily: F, width: "100%", boxSizing: "border-box",
                border: `1px solid ${C.border}`, borderRadius: 12,
                padding: "10px 36px 10px 36px", fontSize: 14, color: C.t1,
                background: C.card, outline: "none",
              }}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: C.t3, padding: 2 }}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Filtre catégories */}
          <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4, marginBottom: "0.75rem" }}>
            {["", ...CATS].map((c, i) => (
              <button
                key={i}
                onClick={() => setFCat(c)}
                style={{
                  fontFamily: F, flexShrink: 0, padding: "5px 13px",
                  border: fCat === c ? "none" : `1px solid ${C.border}`,
                  borderRadius: 100,
                  background: fCat === c ? C.blue : C.card,
                  color: fCat === c ? "#fff" : C.t2,
                  fontSize: 12, fontWeight: 500, cursor: "pointer",
                  boxShadow: fCat !== c ? "0 1px 4px rgba(0,0,0,0.05)" : "none",
                }}
              >
                {c || "Tout"}
              </button>
            ))}
          </div>

          {/* Filtre saisons */}
          <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4, marginBottom: "1rem" }}>
            {["", ...SAISONS].map((s, i) => (
              <button
                key={i}
                onClick={() => setFSaison(s)}
                style={{
                  fontFamily: F, flexShrink: 0, padding: "4px 12px",
                  border: fSaison === s ? "none" : `1px solid ${C.border}`,
                  borderRadius: 100,
                  background: fSaison === s ? C.t1 : C.card,
                  color: fSaison === s ? "#fff" : C.t2,
                  fontSize: 12, fontWeight: 400, cursor: "pointer",
                }}
              >
                {s || "Toutes saisons"}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <p style={{ fontFamily: F, fontSize: 12, color: C.t3, margin: 0 }}>
              {filtered.length} recette{filtered.length !== 1 ? "s" : ""}
            </p>
            <SortBar />
          </div>

          <Grid list={filtered} onOpen={open} bp={bp} empty="Aucun résultat. Essayez d'autres termes." />
        </div>
      );

    if (view === "favoris")
      return <div>{H2("Favoris")}<Grid list={favoris} onOpen={open} bp={bp} empty="Aucune recette Favorite pour l'instant." /></div>;

    if (view === "a-essayer")
      return <div>{H2("À essayer")}<Grid list={aEssayer} onOpen={open} bp={bp} empty="Aucune recette à essayer." /></div>;

    if (view === "absolues")
      return <div>{H2("Favorites absolues ★★★★★")}<Grid list={absolues} onOpen={open} bp={bp} empty="Aucune recette avec 5 étoiles pour l'instant." /></div>;

    // ── Catégories ────────────────────────────────────────────────────────────
    if (view === "categories")
      return (
        <div>
          {H2("Catégories")}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(3,1fr)" : "repeat(auto-fill,minmax(130px,1fr))", gap: 10 }}>
            {CATS.map((cat) => {
              const cnt = recipes.filter((r) => r.categorie === cat).length;
              return (
                <div
                  key={cat}
                  onClick={() => { setFCat(cat); goTo("accueil"); }}
                  style={{ background: C.card, borderRadius: 16, padding: isMobile ? "0.9rem 0.5rem" : "1.25rem 1rem", cursor: "pointer", textAlign: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.06)", transition: "transform 0.15s, box-shadow 0.15s" }}
                  onMouseEnter={(e) => { if (!isMobile) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.10)"; }}}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.06)"; }}
                >
                  <div style={{ fontSize: isMobile ? 26 : 30, marginBottom: 6 }}>{CEM[cat] || "🍽️"}</div>
                  <p style={{ fontFamily: F, margin: "0 0 2px", fontSize: isMobile ? 11 : 13, fontWeight: 600, color: C.t1, textTransform: "capitalize" }}>{cat}</p>
                  <p style={{ fontFamily: F, margin: 0, fontSize: 10, color: C.t3 }}>{cnt}</p>
                </div>
              );
            })}
          </div>
        </div>
      );

    // ── Tags ──────────────────────────────────────────────────────────────────
    if (view === "tags")
      return (
        <div>
          {H2("Tags")}
          {[
            { title: "Protéines", items: PROTS.filter((p) => recipes.some((r) => r.proteine === p)), style: { bg: C.blueBg, tx: C.blue }, onClick: (p) => { setSearch(p); goTo("accueil"); }, count: (p) => recipes.filter((r) => r.proteine === p).length },
            { title: "Saisons",   items: SAISONS.filter((s) => recipes.some((r) => r.saison === s)),   style: { bg: "#FFF4E0", tx: "#BF6B0A" }, onClick: (s) => { setFSaison(s); goTo("accueil"); }, count: (s) => recipes.filter((r) => r.saison === s).length },
            { title: "Tags secondaires", items: allTags, style: { bg: C.pill, tx: C.t2 }, onClick: (t) => { setSearch(t); goTo("accueil"); }, count: () => null },
          ].map((sec) => (
            <div key={sec.title} style={{ marginBottom: "1.5rem" }}>
              <p style={{ fontFamily: F, fontSize: 11, fontWeight: 600, color: C.t2, textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 10px" }}>
                {sec.title}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {sec.items.map((item) => {
                  const cnt = sec.count(item);
                  return (
                    <button
                      key={item}
                      onClick={() => sec.onClick(item)}
                      style={{
                        fontFamily: F, background: sec.style.bg, color: sec.style.tx,
                        border: "none", borderRadius: 100, padding: "7px 15px",
                        fontSize: 13, fontWeight: 500, cursor: "pointer",
                      }}
                    >
                      {item}{cnt ? ` · ${cnt}` : ""}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      );
  };

  // ── Rendu ────────────────────────────────────────────────────────────────────
  return (
    <div
      style={{ minHeight: "100vh", background: C.bg, fontFamily: F }}
      onClick={() => showSort && setShowSort(false)}
    >
      {/* ── Top bar ── */}
      <div
        style={{
          background: "rgba(255,255,255,0.82)",
          backdropFilter: "blur(16px)",
          borderBottom: `1px solid ${C.border}`,
          padding: `0 ${isMobile ? "1rem" : "1.5rem"}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: 52, position: "sticky", top: 0, zIndex: 100,
        }}
      >
        <button
          onClick={() => goTo("accueil")}
          style={{ background: "none", border: "none", cursor: "pointer", fontFamily: F, fontSize: isMobile ? 15 : 17, fontWeight: 700, color: C.t1, padding: 0 }}
        >
          {isMobile ? "📖 Recettes" : "📖 Mon livre de recettes"}
        </button>
        {!isMobile && (
          <button
            onClick={() => setShowAdd(true)}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              background: C.blue, color: "#fff", border: "none",
              padding: "6px 16px", borderRadius: 100,
              fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: F,
            }}
          >
            <Plus size={14} /> Ajouter
          </button>
        )}
      </div>

      {/* ── Nav desktop ── */}
      {!isMobile && (
        <nav
          style={{
            background: "rgba(255,255,255,0.82)",
            backdropFilter: "blur(16px)",
            borderBottom: `1px solid ${C.border}`,
            padding: "0 1.5rem",
            display: "flex", overflowX: "auto", gap: 0,
          }}
        >
          {DESK_NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => goTo(n.id)}
              style={{
                fontFamily: F, display: "flex", alignItems: "center", gap: 5,
                background: "none", border: "none", padding: "11px 12px",
                fontSize: 12, cursor: "pointer", whiteSpace: "nowrap",
                fontWeight: 500,
                color: view === n.id ? C.blue : C.t2,
                borderBottom: view === n.id ? `2px solid ${C.blue}` : "2px solid transparent",
                transition: "color 0.1s",
              }}
            >
              {n.icon} {n.label}
            </button>
          ))}
        </nav>
      )}

      {/* ── Contenu ── */}
      <main
        style={{
          padding: `1.25rem ${isMobile ? "1rem" : "1.5rem"}`,
          maxWidth: 1080,
          margin: "0 auto",
          paddingBottom: isMobile ? "90px" : "1.5rem",
        }}
      >
        {mainContent()}
      </main>

      {/* ── Nav mobile ── */}
      {isMobile && (
        <>
          <nav
            style={{
              position: "fixed", bottom: 0, left: 0, right: 0,
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(16px)",
              borderTop: `1px solid ${C.border}`,
              display: "flex", zIndex: 100,
              paddingBottom: "env(safe-area-inset-bottom, 0px)",
            }}
          >
            {MOBILE_NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => goTo(n.id)}
                style={{
                  fontFamily: F, flex: 1, display: "flex", flexDirection: "column",
                  alignItems: "center", gap: 3, background: "none", border: "none",
                  padding: "10px 4px 8px", cursor: "pointer",
                  color: view === n.id ? C.blue : C.t3,
                  transition: "color 0.1s",
                }}
              >
                {n.icon}
                <span style={{ fontSize: 10, fontWeight: 500 }}>{n.label}</span>
              </button>
            ))}
          </nav>
          <button
            onClick={() => setShowAdd(true)}
            style={{
              position: "fixed", right: 16, bottom: 78,
              width: 52, height: 52, borderRadius: "50%",
              background: C.blue, color: "#fff", border: "none",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 16px rgba(0,113,227,0.40)", zIndex: 101,
            }}
          >
            <Plus size={22} />
          </button>
        </>
      )}

      {showAdd && <AddForm onClose={() => setShowAdd(false)} onSave={add} />}
    </div>
  );
}
