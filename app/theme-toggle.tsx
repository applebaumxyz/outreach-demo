"use client";
import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
type Theme = "system" | "light" | "dark";
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");
  useEffect(() => {
    try {
      const saved = localStorage.getItem("outreach-demo-theme");
      if (saved === "light" || saved === "dark") setTheme(saved);
    } catch {}
  }, []);
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      document.documentElement.dataset.theme =
        theme === "system" ? (media.matches ? "dark" : "light") : theme;
    };
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [theme]);
  function choose(value: Theme) {
    setTheme(value);
    try {
      if (value === "system") localStorage.removeItem("outreach-demo-theme");
      else localStorage.setItem("outreach-demo-theme", value);
    } catch {}
  }
  return (
    <div className="theme-toggle" role="group" aria-label="Appearance">
      {(
        [
          { value: "light", label: "Light mode", Icon: Sun },
          { value: "dark", label: "Dark mode", Icon: Moon },
          { value: "system", label: "Follow system appearance", Icon: Monitor },
        ] as const
      ).map(({ value, label, Icon }) => (
        <button
          key={value}
          type="button"
          aria-label={label}
          title={label}
          aria-pressed={theme === value}
          onClick={() => choose(value)}
        >
          <Icon size={16} />
        </button>
      ))}
    </div>
  );
}
