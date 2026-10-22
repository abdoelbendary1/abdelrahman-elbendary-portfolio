"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const items = [{ id: "about", label: "About" }, { id: "experience", label: "Experience" }, { id: "skills", label: "Skills" }, { id: "projects", label: "Projects" }, { id: "contact", label: "Contact" }];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, { rootMargin: "-15% 0px -65% 0px", threshold: 0 });
    items.forEach(({ id }) => { const element = document.getElementById(id); if (element) observer.observe(element); });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  return <header className="site-header">
    <div className="nav-wrap">
      <a className="wordmark" href="#" aria-label="Abdelrahman Elbendary, back to top">ae<span>.</span></a>
      <button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="main-navigation" aria-label={open ? "Close navigation" : "Open navigation"}>{open ? <X size={22} /> : <Menu size={22} />}</button>
      <nav id="main-navigation" className={open ? "is-open" : ""} aria-label="Main navigation">
        {items.map(({ id, label }) => <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined} onClick={() => setOpen(false)}>{label}</a>)}
      </nav>
      <a className="nav-contact" href="#contact">Let’s talk <ArrowUpRight size={16} /></a>
    </div>
  </header>;
}
