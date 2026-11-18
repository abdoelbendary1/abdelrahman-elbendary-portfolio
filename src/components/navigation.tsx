"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const items = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "toolkit", label: "Toolkit" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, { rootMargin: "-30% 0px -60% 0px" });
    items.forEach(({ id }) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const wide = window.matchMedia("(min-width: 901px)");
    const onWide = () => { if (wide.matches) setOpen(false); };
    window.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => { window.removeEventListener("keydown", onKey); wide.removeEventListener("change", onWide); document.documentElement.classList.remove("menu-open"); };
  }, [open]);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
      <div className="shell nav-row">
        <a className="mark" href="#top" onClick={() => setOpen(false)} aria-label="Abdelrahman Elbendary, back to top">
          <span className="mark-glyph" aria-hidden="true">ae</span>
          <span className="mark-name">Abdelrahman Elbendary</span>
        </a>
        <nav id="main-nav" aria-label="Main">
          {items.map(({ id, label }, i) => (
            <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined} onClick={() => setOpen(false)}>
              <span className="nav-num" aria-hidden="true">0{i + 1}</span>{label}
            </a>
          ))}
        </nav>
        <a className="nav-cta" href="#contact">Get in touch <ArrowUpRight size={15} aria-hidden="true" /></a>
        <button className="menu-btn" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="main-nav">
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className="menu-lines" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
