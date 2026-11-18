"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Download, FileText, Lock, Share, X } from "lucide-react";
import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { skills, softSkills } from "@/data/skills";
import { education } from "@/data/education";
import { projects } from "@/data/projects";

const sections = [
  { id: "cv-summary", label: "Summary" },
  { id: "cv-skills", label: "Technical skills" },
  { id: "cv-experience", label: "Experience" },
  { id: "cv-projects", label: "Technical projects" },
  { id: "cv-education", label: "Education" },
];

/** Phrases that get the highlighter sweep when they scroll into view. */
const highlights = ["2+ years", "7 enterprise", "4 companies", "30+ modules", "30+ business modules", "100%", "2 apps in 2 months", "60 FPS", "4 production apps", "500-1,000 active business users", "3 core modules", "2 stores"];

function Marked({ text }: { text: string }) {
  const pattern = new RegExp(`(${highlights.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).sort((a, b) => b.length - a.length).join("|")})`, "g");
  return <>{text.split(pattern).map((part, i) => (highlights.includes(part) ? <mark key={i}>{part}</mark> : <Fragment key={i}>{part}</Fragment>))}</>;
}

const dash = (s: string) => s.replace(/\s*–\s*/g, " - ");

export function ResumeViewer() {
  const root = useRef<HTMLDivElement>(null);
  const paper = useRef<HTMLElement>(null);
  const [armed, setArmed] = useState(false);
  const [live, setLive] = useState(false);
  const [active, setActive] = useState(sections[0].id);
  const [progress, setProgress] = useState(0);
  const [sectionProgress, setSectionProgress] = useState<Record<string, number>>({});

  // Reveal choreography: arm (hide) blocks, then reveal each as it enters the viewport.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setLive(true); return; }
    setArmed(true);
    const blocks = el.querySelectorAll<HTMLElement>("[data-reveal]");
    const reveal = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add("is-in"); reveal.unobserve(e.target); }
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    const start = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      setLive(true);
      start.disconnect();
      // let the "page load" bar finish before blocks start writing in
      setTimeout(() => blocks.forEach((b) => reveal.observe(b)), 650);
    }, { rootMargin: "0px 0px -30% 0px", threshold: 0 }); // fire on position, not % visible: the resume is taller than a phone screen
    start.observe(el);
    return () => { start.disconnect(); reveal.disconnect(); };
  }, []);

  // Reading progress + active section.
  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const p = paper.current;
      if (!p) return;
      const vh = window.innerHeight;
      const r = p.getBoundingClientRect();
      setProgress(Math.min(1, Math.max(0, (vh * 0.6 - r.top) / r.height)));
      const next: Record<string, number> = {};
      let current = sections[0].id;
      for (const s of sections) {
        const node = document.getElementById(s.id);
        if (!node) continue;
        const b = node.getBoundingClientRect();
        next[s.id] = Math.min(1, Math.max(0, (vh * 0.6 - b.top) / b.height));
        if (b.top < vh * 0.6) current = s.id;
      }
      setSectionProgress(next);
      setActive(current);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(measure); };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, []);

  const pos = projects.find((p) => p.id === "cafe-pos");
  const delay = (i: number) => ({ "--d": `${Math.min(i, 8) * 70}ms` }) as React.CSSProperties;

  return (
    <div ref={root} className={`viewer${armed ? " is-armed" : ""}${live ? " is-live" : ""}`}>
      <aside className="viewer-side">
        <div className="viewer-file">
          <span className="viewer-file-icon"><FileText size={20} aria-hidden="true" /></span>
          <span><strong>Resume</strong><small>2 pages · PDF & Word</small></span>
        </div>
        <nav className="viewer-toc" aria-label="Resume sections">
          {sections.map((s, i) => (
            <a key={s.id} href={`#${s.id}`} aria-current={active === s.id ? "true" : undefined}>
              <span className="toc-num">0{i + 1}</span>
              <span className="toc-label">{s.label}</span>
              <span className="toc-bar" aria-hidden="true"><i style={{ transform: `scaleX(${sectionProgress[s.id] ?? 0})` }} /></span>
            </a>
          ))}
        </nav>
        <div className="viewer-actions">
          <a className="btn btn-solid" href={profile.resumeUrl ?? "/resume.pdf"} download={`${profile.resumeFileName}.pdf`}>Download PDF <Download size={16} aria-hidden="true" /></a>
          <a className="btn btn-line" href={profile.resumeDocxUrl} download={`${profile.resumeFileName}.docx`}>Word (.docx) <Download size={16} aria-hidden="true" /></a>
          <a className="viewer-open" href={profile.resumeUrl ?? "/resume.pdf"} target="_blank" rel="noreferrer">Open the original PDF <ArrowUpRight size={14} aria-hidden="true" /></a>
        </div>
      </aside>

      <div className="webview">
        <div className="webview-bar" aria-hidden="true">
          <X size={18} />
          <span className="webview-title">
            <strong>{profile.name} — Resume</strong>
            <small><Lock size={10} /> abdelrahman-elbendary / resume.pdf</small>
          </span>
          <Share size={17} />
          <span className="webview-load" />
          <span className="webview-progress" style={{ transform: `scaleX(${progress})` }} />
        </div>

        <article className="paper" ref={paper} aria-label={`${profile.name} resume`}>
          <header className="cv-head" data-reveal>
            <h3>{profile.name}</h3>
            <p className="cv-title">{profile.title}</p>
            <p>{profile.location} <i>|</i> <a href={`tel:${profile.phoneHref}`}>{profile.phone}</a> <i>|</i> <a href={`mailto:${profile.email}`}>{profile.email}</a></p>
            <p className="cv-links">
              <a href={profile.linkedin} target="_blank" rel="noreferrer">linkedin.com/in/abdelrahman-elbendary</a> <i>|</i>{" "}
              <a href={profile.github} target="_blank" rel="noreferrer">github.com/abdoelbendary1</a> <i>|</i>{" "}
              <a href="https://abdelrahman-elbendary.vercel.app">Portfolio: abdelrahman-elbendary.vercel.app</a>
            </p>
          </header>

          <section id="cv-summary" className="cv-sec">
            <h4 data-reveal>Professional summary</h4>
            <p data-reveal style={delay(1)}><Marked text={profile.summary} /></p>
          </section>

          <section id="cv-skills" className="cv-sec">
            <h4 data-reveal>Technical skills</h4>
            <ul className="cv-list">
              {[...skills, { category: "Soft Skills", items: softSkills }].map((g, i) => (
                <li key={g.category} data-reveal style={delay(i + 1)}><b>{g.category}:</b> {g.items.join(", ")}</li>
              ))}
            </ul>
          </section>

          <section id="cv-experience" className="cv-sec">
            <h4 data-reveal>Professional experience</h4>
            {experience.map((job) => (
              <div className="cv-job" key={job.company}>
                <p className="cv-row" data-reveal><span><b>{job.role}</b> <i>|</i> {job.company} <i>|</i> {job.location}</span><b className="cv-date">{dash(job.period)}</b></p>
                <ul className="cv-list">
                  {job.achievements.map((a, i) => <li key={a} data-reveal style={delay(i + 1)}><Marked text={a} /></li>)}
                </ul>
              </div>
            ))}
          </section>

          {pos && (
            <section id="cv-projects" className="cv-sec">
              <h4 data-reveal>Technical projects</h4>
              <p className="cv-row" data-reveal><b>{pos.title}</b><b className="cv-date">Independent Project</b></p>
              <p className="cv-stack" data-reveal style={delay(1)}><b>Tech Stack:</b> {pos.technologies.join(", ")}</p>
              <ul className="cv-list">
                {pos.contributions?.map((c, i) => <li key={c} data-reveal style={delay(i + 2)}>{c}</li>)}
              </ul>
            </section>
          )}

          <section id="cv-education" className="cv-sec">
            <h4 data-reveal>Education & certifications</h4>
            <ul className="cv-list">
              {education.map((e, i) => {
                const date = /^\w+$/.test(e.date) ? "" : e.date.replace(/^Graduated /, "Graduated: ");
                return <li key={e.title} data-reveal style={delay(i + 1)}><b>{e.title}</b> - {e.institution}{date && <> <i>|</i> {dash(date)}</>}</li>;
              })}
            </ul>
          </section>

          <p className="cv-end" data-reveal>— End of resume —</p>
        </article>
      </div>
    </div>
  );
}
