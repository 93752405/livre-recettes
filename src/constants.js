// ─── Typographie ───────────────────────────────────────────────────────────────
export const F =
  "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif";

// ─── Palette ───────────────────────────────────────────────────────────────────
export const C = {
  bg: "#F5F5F7",
  card: "#FFFFFF",
  t1: "#1D1D1F",
  t2: "#6E6E73",
  t3: "#AEAEB2",
  blue: "#0071E3",
  blueBg: "#EBF3FE",
  orange: "#FF9500",
  green: "#1A8C45",
  border: "#E5E5EA",
  pill: "#F2F2F7",
};

// ─── Statuts ───────────────────────────────────────────────────────────────────
export const STATUS = {
  "À essayer": { bg: "#F2F2F7", tx: "#636366" },
  Testée:      { bg: "#FFF4E0", tx: "#BF6B0A" },
  Approuvée:   { bg: "#EDFAF3", tx: "#1A8C45" },
  Favorite:    { bg: "#FFEEED", tx: "#CC2C27" },
};

// ─── Listes de valeurs ─────────────────────────────────────────────────────────
export const CATS    = ["déjeuner","entrée","soupe","salade","souper","collation","dessert","accompagnement","boisson"];
export const PROTS   = ["poulet","boeuf","porc","poisson","fruits de mer","végétarien","végétalien","oeufs","tofu"];
export const SAISONS = ["printemps","été","automne","hiver","toutes saisons"];
export const STATUTS = ["À essayer","Testée","Approuvée","Favorite"];

// ─── Emoji & couleurs par catégorie ────────────────────────────────────────────
export const CEM = {
  déjeuner:"🍳", entrée:"🥙", soupe:"🍜", salade:"🥗",
  souper:"🍽️", collation:"🍎", dessert:"🍰", accompagnement:"🥦", boisson:"🍵",
};
export const CBG = {
  déjeuner:"#FEF8EC", entrée:"#F3EEFB", soupe:"#EBF5F0", salade:"#EDFAEB",
  souper:"#EBF0F8", collation:"#FEF0E8", dessert:"#FEF6E6", accompagnement:"#EBF5EE", boisson:"#EBF5F5",
};

// ─── Clé localStorage ──────────────────────────────────────────────────────────
export const STORAGE_KEY = "mlr-v2";

// ─── Mot de passe ──────────────────────────────────────────────────────────────
// 🔒 Mot de passe hardcodé — solution familiale simple, pas de vraie auth.
// Modifie cette valeur avant de déployer.
export const PASSWORD = "recettes2024";
export const AUTH_KEY = "mlr-auth";
