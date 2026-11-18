"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { Apple, ArrowLeft, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Github, Globe, Play, X } from "lucide-react";
import type { PortfolioProject } from "@/data/projects";
import type { AppScreen } from "@/data/screens";
import { Device, screenRatio } from "@/components/device";

const filters = [
  { id: "all", label: "All work" },
  { id: "client", label: "Client & enterprise" },
  { id: "own", label: "Independent" },
] as const;
type Filter = (typeof filters)[number]["id"];

const kindOf = (p: PortfolioProject): Exclude<Filter, "all"> => (p.company ? "client" : "own");
const pad = (n: number) => String(n).padStart(2, "0");
const deviceScreens = (p: PortfolioProject) => (p.screens ?? []).filter((s) => s.device === "phone" || s.device === "store");

function linksOf(p: PortfolioProject) {
  return [
    { url: p.appStoreUrl, label: "App Store", Icon: Apple },
    { url: p.googlePlayUrl, label: "Google Play", Icon: Play },
    { url: p.liveDemoUrl, label: "Live site", Icon: Globe },
    { url: p.githubUrl, label: "Source", Icon: Github },
  ].filter((l): l is { url: string; label: string; Icon: typeof Apple } => !!l.url && /^https?:\/\//.test(l.url));
}

function DeviceStack({ screens, eager }: { screens: AppScreen[]; eager: boolean }) {
  const [front, left, right] = screens;
  return (
    <span className="stack" aria-hidden="true">
      {left && <span className="stack-item stack-left"><Device screen={left} sizes="200px" decorative /></span>}
      {right && <span className="stack-item stack-right"><Device screen={right} sizes="200px" decorative /></span>}
      <span className="stack-item stack-front"><Device screen={front} sizes="240px" eager={eager} decorative /></span>
    </span>
  );
}

function ScreenRail({ project }: { project: PortfolioProject }) {
  const rail = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  const list = project.screens ?? [];
  const hasLong = list.some((s) => s.device === "phone" && s.height / s.width > 2.35);

  function update() {
    const el = rail.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
  }
  useEffect(update, []);
  const move = (dir: number) => rail.current?.scrollBy({ left: dir * rail.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <section className="rail-wrap" aria-label={`${project.title} screens`}>
      <div className="rail-top">
        <p><span>{pad(list.length)}</span> {list.length === 1 ? "screen" : "screens"}{hasLong && <em className="rail-tip"> · long screens scroll inside the phone</em>}</p>
        <div className="rail-nav">
          <button type="button" onClick={() => move(-1)} disabled={edge.start} aria-label="Scroll screens back"><ChevronLeft size={18} /></button>
          <button type="button" onClick={() => move(1)} disabled={edge.end} aria-label="Scroll screens forward"><ChevronRight size={18} /></button>
        </div>
      </div>
      <div className="rail" ref={rail} onScroll={update}>
        {list.map((s, i) => (
          <figure key={s.src} className={`rail-item rail-${s.device}`} style={{ "--ar": 1 / screenRatio(s) } as React.CSSProperties}>
            <Device screen={s} interactive sizes={s.device === "board" ? "(max-width: 900px) 90vw, 760px" : "300px"} eager={i < 4} />
            <figcaption><span>{pad(i + 1)}</span>{s.label}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function ProjectGallery({ projects }: { projects: PortfolioProject[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const sheet = useRef<HTMLDivElement>(null);

  const visible = useMemo(() => (filter === "all" ? projects : projects.filter((p) => kindOf(p) === filter)), [filter, projects]);
  const counts = useMemo(() => ({ all: projects.length, client: projects.filter((p) => kindOf(p) === "client").length, own: projects.filter((p) => kindOf(p) === "own").length }), [projects]);
  const current = openId ? visible.findIndex((p) => p.id === openId) : -1;
  const project = current >= 0 ? visible[current] : null;

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (project && !d.open) { d.showModal(); document.documentElement.classList.add("scroll-lock"); }
    if (!project && d.open) d.close();
    sheet.current?.scrollTo({ top: 0 });
  }, [project]);

  function step(dir: number) {
    if (current < 0) return;
    setOpenId(visible[(current + dir + visible.length) % visible.length].id);
  }

  return (
    <>
      <div className="filters" role="group" aria-label="Filter projects">
        {filters.map((f) => (
          <button key={f.id} type="button" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
            {f.label}<span>{counts[f.id]}</span>
          </button>
        ))}
      </div>

      <ol className="work-grid">
        {visible.map((p, i) => {
          const devices = deviceScreens(p);
          return (
            <li key={p.id} className={`work-card ${i % 4 === 0 || i % 4 === 3 ? "is-wide" : "is-narrow"}`}>
              <button type="button" className="work-hit" onClick={() => setOpenId(p.id)} aria-haspopup="dialog">
                <span className={`work-media${devices.length >= 3 ? " has-stack" : ""}`}>
                  {devices.length >= 3
                    ? <DeviceStack screens={devices} eager={i < 2} />
                    : p.coverImage
                      ? <Image src={p.coverImage} alt="" width={p.coverImageWidth ?? 1600} height={p.coverImageHeight ?? 900} sizes="(max-width: 900px) 92vw, 60vw" loading={i < 2 ? "eager" : "lazy"} />
                      : <span className="work-placeholder">{p.title}</span>}
                  {!!p.screens?.length && <span className="work-count">{p.screens.length} screens</span>}
                </span>
                <span className="work-meta">
                  <span className="work-index">{pad(projects.indexOf(p) + 1)}</span>
                  <span className="work-text">
                    <span className="work-title">{p.title}</span>
                    <span className="work-sub">{p.company ?? "Independent"} · {p.category}</span>
                  </span>
                  <span className="work-arrow" aria-hidden="true"><ArrowUpRight size={18} /></span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <dialog
        ref={dialog}
        className="project-dialog"
        aria-label={project?.title ?? "Project details"}
        onClose={() => { setOpenId(null); document.documentElement.classList.remove("scroll-lock"); }}
        onClick={(e) => { if (e.target === e.currentTarget) dialog.current?.close(); }}
        onKeyDown={(e) => {
          if ((e.target as HTMLElement).closest?.(".rail")) return;
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
      >
        {project && (
          <div className="sheet" ref={sheet}>
            <div className="sheet-bar">
              <span className="sheet-count">{pad(current + 1)} / {pad(visible.length)} · {project.title}</span>
              <div className="sheet-nav">
                <button type="button" onClick={() => step(-1)} aria-label="Previous project"><ArrowLeft size={18} /></button>
                <button type="button" onClick={() => step(1)} aria-label="Next project"><ArrowRight size={18} /></button>
                <button type="button" onClick={() => dialog.current?.close()} aria-label="Close" autoFocus><X size={18} /></button>
              </div>
            </div>

            <header className="sheet-head">
              <div>
                <p className="sheet-kicker">{project.company ?? "Independent"} · {project.category}</p>
                <h3>{project.title}</h3>
              </div>
              <div className="sheet-head-side">
                <p className="sheet-desc">{project.description}</p>
                {!!linksOf(project).length && (
                  <div className="sheet-links">
                    {linksOf(project).map(({ url, label, Icon }) => (
                      <a key={label} href={url} target="_blank" rel="noreferrer">
                        <Icon size={16} aria-hidden="true" />{label}<ArrowUpRight size={14} aria-hidden="true" />
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </header>

            {!!project.screens?.length && <ScreenRail key={project.id} project={project} />}

            <div className="sheet-details">
              {!!project.contributions?.length && (
                <div className="sheet-block">
                  <h4>What&rsquo;s inside</h4>
                  <ul>{project.contributions.map((c) => <li key={c}>{c}</li>)}</ul>
                </div>
              )}
              <div className="sheet-block">
                {!!project.technologies.length && <>
                  <h4>Built with</h4>
                  <p className="tech-line">{project.technologies.map((t) => <span key={t}>{t}</span>)}</p>
                </>}
                {project.scopeNote && <p className="sheet-note">{project.scopeNote}</p>}
              </div>
            </div>

            {project.coverImage && (
              <figure className="sheet-cover">
                <figcaption>Overview</figcaption>
                <Image src={project.coverImage} alt={`${project.title} — overview of app screens`} width={project.coverImageWidth ?? 1600} height={project.coverImageHeight ?? 900} sizes="(max-width: 900px) 100vw, 1180px" />
              </figure>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
