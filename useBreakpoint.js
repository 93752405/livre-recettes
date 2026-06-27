import { useState, useEffect } from "react";

export function useBreakpoint() {
  const get = () =>
    window.innerWidth < 640
      ? "mobile"
      : window.innerWidth < 1024
      ? "tablet"
      : "desktop";

  const [bp, setBp] = useState(get);

  useEffect(() => {
    const h = () => setBp(get());
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  return bp;
}
