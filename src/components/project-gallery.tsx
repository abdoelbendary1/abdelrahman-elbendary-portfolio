"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { Apple, ArrowLeft, ArrowRight, ArrowUpRight, Github, Globe, Play, X } from "lucide-react";
import type { PortfolioProject } from "@/data/projects";

const filters = [
  { id: "all", label: "All work" },
  { id: "client", label: "Client & enterprise" },
  { id: "own", label: "Independent" },
] as const;
type Filter = (typeof filters)[number]["id"];

const kindOf = (p: PortfolioProject): Exclude<Filter, "all"> => (p.company ? "client" : "own");
const pad = (n: number) => String(n).padStart(2, "0");

function linksOf(p: PortfolioProject) {
  return [
    { url: p.appStoreUrl, label: "App Store", Icon: Apple },
    { url: p.googlePlayUrl, label: "Google Play", Icon: Play },
    { url: p.liveDemoUrl, label: "Live site", Icon: Globe },
    { url: p.githubUrl, label: "Source", Icon: Github },
  ].filter((l): l is { url: string; label: string; Icon: typeof Apple } => !!l.url && /^https?:\/\//.test(l.url));
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
        {visible.map((p, i) => (
          <li key={p.id} className={`work-card ${i % 4 === 0 || i % 4 === 3 ? "is-wide" : "is-narrow"}`}>
            <button type="button" className="work-hit" onClick={() => setOpenId(p.id)} aria-haspopup="dialog">
              <span className="work-media">
                {p.coverImage
                  ? <Image src={p.coverImage} alt="" width={p.coverImageWidth ?? 1600} height={p.coverImageHeight ?? 900} sizes="(max-width: 900px) 92vw, 60vw" loading={i < 2 ? "eager" : "lazy"} />
                  : <span className="work-placeholder">{p.title}</span>}
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
        ))}
      </ol>

      <dialog
        ref={dialog}
        className="project-dialog"
        aria-label={project?.title ?? "Project details"}
        onClose={() => { setOpenId(null); document.documentElement.classList.remove("scroll-lock"); }}
        onClick={(e) => { if (e.target === e.currentTarget) dialog.current?.close(); }}
        onKeyDown={(e) => { if (e.key === "ArrowRight") step(1); if (e.key === "ArrowLeft") step(-1); }}
      >
        {project && (
          <div className="sheet" ref={sheet}>
            <div className="sheet-bar">
              <span className="sheet-count">{pad(current + 1)} / {pad(visible.length)}</span>
              <div className="sheet-nav">
                <button type="button" onClick={() => step(-1)} aria-label="Previous project"><ArrowLeft size={18} /></button>
                <button type="button" onClick={() => step(1)} aria-label="Next project"><ArrowRight size={18} /></button>
                <button type="button" onClick={() => dialog.current?.close()} aria-label="Close" autoFocus><X size={18} /></button>
              </div>
            </div>
            <div className="sheet-body">
              {project.coverImage && (
                <div className="sheet-media">
                  <Image src={project.coverImage} alt={`${project.title} — app screens`} width={project.coverImageWidth ?? 1600} height={project.coverImageHeight ?? 900} sizes="(max-width: 900px) 100vw, 62vw" />
                </div>
              )}
              <div className="sheet-info">
                <p className="sheet-kicker">{project.company ?? "Independent"} · {project.category}</p>
                <h3>{project.title}</h3>
                <p className="sheet-desc">{project.description}</p>
                {!!project.contributions?.length && (
                  <div className="sheet-block">
                    <h4>What&rsquo;s inside</h4>
                    <ul>{project.contributions.map((c) => <li key={c}>{c}</li>)}</ul>
                  </div>
                )}
                {!!project.technologies.length && (
                  <div className="sheet-block">
                    <h4>Built with</h4>
                    <p className="tech-line">{project.technologies.map((t) => <span key={t}>{t}</span>)}</p>
                  </div>
                )}
                {project.scopeNote && <p className="sheet-note">{project.scopeNote}</p>}
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
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
