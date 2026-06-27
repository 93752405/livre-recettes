import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import App   from "./App.jsx";
import Login from "./components/Login.jsx";
import { AUTH_KEY } from "./constants.js";

function Root() {
  const [authed, setAuthed] = useState(() => localStorage.getItem(AUTH_KEY) === "1");
  if (!authed) return <Login onAuth={() => setAuthed(true)} />;
  return <App />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
