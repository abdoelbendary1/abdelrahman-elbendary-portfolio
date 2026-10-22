import { FocusableImage } from "@/components/focusable-image";
import { Apple, Play, ArrowUpRight, Github, Globe, Smartphone, Images, Layers3, ShieldCheck, Radio, KeyRound, Utensils, Building2, Coffee, Flame } from "lucide-react";
import type { PortfolioProject } from "@/data/projects";

const projectIcons = { streakup: Flame, aqar: Building2, "cafe-pos": Coffee, "enterprise-hcm": Layers3, "hospital-ticketing": Radio, "biometric-2fa": ShieldCheck, "tidal-activator": KeyRound, "go-bite": Utensils };

export function ProjectCard({ project, index }: { project: PortfolioProject; index: number }) {
  const Icon = projectIcons[project.id as keyof typeof projectIcons] ?? Smartphone;
  const links = [
    { url: project.githubUrl, label: "GitHub", Icon: Github },
    { url: project.googlePlayUrl, label: "Google Play", Icon: Play },
    { url: project.appStoreUrl, label: "App Store", Icon: Apple },
    { url: project.liveDemoUrl, label: "Live website", Icon: Globe },
  ].filter((link) => link.url && /^https?:\/\//.test(link.url));
  return (
    <article className={`project-card ${project.featured ? "featured" : ""}`} id={`project-${project.id}`}>
      {project.coverImage ? (
        <div className="project-cover"><FocusableImage src={project.coverImage} alt={`${project.title} application screenshot`} width={project.coverImageWidth ?? 640} height={project.coverImageHeight ?? 400} sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1216px) calc((100vw - 91px) / 2), 545px" /></div>
      ) : (
        <div className={`project-art art-${project.id}`}>
          <span className="art-number">PROJECT / {String(index + 1).padStart(2, "0")}</span>
          <Icon className="art-icon" strokeWidth={1.1} aria-hidden="true" />
          <span className="art-label">{project.category}</span>
          <span className="preview-label">Application preview not provided</span>
        </div>
      )}
      <div className="project-body">
        <div className="project-category"><span>{project.company ?? project.category}</span>{project.featured && <span className="featured-tag">Featured</span>}</div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="chips">{project.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div>
        {(project.contributions?.length || project.screenshots?.length) ? (
          <details className="project-details">
            <summary>Explore project <span aria-hidden="true">+</span></summary>
            {project.scopeNote && <p className="scope-note">{project.scopeNote}</p>}
            {project.contributions && <ul>{project.contributions.map((item) => <li key={item}>{item}</li>)}</ul>}
            {!!project.screenshots?.length && <div className="screenshot-gallery" aria-label={`${project.title} screenshots`}>
              {project.screenshots.map((src, i) => <div className="screenshot-gallery-item" key={src}><FocusableImage src={src} width={640} height={1000} sizes="(max-width: 760px) 80vw, 320px" alt={`${project.title} screenshot ${i + 1}`} /><span><Images size={14} /> Tap image to enlarge</span></div>)}
            </div>}
          </details>
        ) : null}
        {!!links.length && <div className="project-links" aria-label={`Explore ${project.title}`}>{links.map(({ url, label, Icon: LinkIcon }) => <a key={label} href={url} target="_blank" rel="noreferrer" aria-label={`${project.title}: ${label} (opens in a new tab)`}><LinkIcon size={15} aria-hidden="true" />{label}<ArrowUpRight size={14} aria-hidden="true" /></a>)}</div>}
      </div>
    </article>
  );
}
