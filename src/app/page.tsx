import { existsSync } from "node:fs";
import path from "node:path";
import { FocusableImage } from "@/components/focusable-image";
import { ArrowDown, ArrowDownRight, ArrowUpRight, Download, Github, Linkedin, MapPin, Mail, Phone, GraduationCap, Code2, Layers3, Smartphone, Check, Braces } from "lucide-react";
import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { skills } from "@/data/skills";
import { education } from "@/data/education";
import { projects } from "@/data/projects";
import { Navigation } from "@/components/navigation";
import { ProjectCard } from "@/components/project-card";

function SectionHeading({ number, label, title, description }: { number: string; label: string; title: string; description?: string }) {
  return <div className="section-heading"><div><div className="eyebrow"><span>{number}</span> {label}</div><h2>{title}</h2></div>{description && <p>{description}</p>}</div>;
}

export default function Home() {
  const resumeAvailable = profile.resumeUrl?.startsWith("/") && existsSync(path.join(process.cwd(), "public", profile.resumeUrl));
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Navigation />
    <main id="main">
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-content">
          <div className="hero-kicker"><span className="blue-dot" />{profile.title}</div>
          <p className="hero-intro">Hi, I’m {profile.name}.</p>
          <h1 id="hero-title">Thoughtful code.<br />Dependable <span>apps.</span></h1>
          <p className="hero-description">{profile.introduction}</p>
          <div className="hero-buttons"><a className="button primary" href="#projects">View projects <ArrowDownRight size={18} /></a>{resumeAvailable ? <a className="button secondary" href={profile.resumeUrl!} download>Download CV <Download size={16} /></a> : <button className="button secondary" disabled title="The original CV PDF has not been supplied">Download CV <Download size={16} /><span className="sr-only"> — PDF not yet available</span></button>}</div>
          <div className="hero-social"><span><MapPin size={14} />{profile.location}</span><span className="social-divider" /><a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub profile"><Github size={18} /></a><a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><Linkedin size={18} /></a></div>
        </div>
        <div className="hero-visual" aria-label="Engineering focus: Flutter, clean architecture, iOS and Android">
          <div className="visual-top"><span className="visual-label">ENGINEERED WITH INTENTION</span><Braces size={20} /></div>
          <FocusableImage className="hero-portrait" src={profile.portrait} alt={`${profile.name} portrait`} width={1792} height={2400} sizes="180px" preload />
          <div className="visual-caption"><span>{profile.name}</span><span>Mobile software engineer</span></div>
          <div className="visual-stack"><span><Code2 size={16} /> Flutter & Dart</span><span><Layers3 size={16} /> Clean Architecture</span><span><Smartphone size={16} /> iOS & Android</span></div>
          <div className="visual-bottom"><span>CAIRO, EG</span><span>BUILDING FOR THE EVERYDAY <ArrowUpRight size={14} /></span></div>
        </div>
      </section>

      <div className="credentials-strip"><div className="container credentials-inner"><span><strong>2+</strong> years in production</span><span><strong>30+</strong> modules rearchitected</span><span><Check size={18} /><strong>iOS & Android</strong> releases</span><a href="#about">A little more about me <ArrowDown size={15} /></a></div></div>

      <section id="about" className="section container">
        <SectionHeading number="01" label="ABOUT ME" title="Built on solid foundations." />
        <div className="about-layout"><div className="about-copy"><h3>{profile.title}</h3><p>{profile.summary}</p><div className="about-note"><span className="blue-dot" /><span>Clean architecture. Reliable systems. Thoughtful experiences.</span></div></div><div className="education"><h3><GraduationCap size={19} /> Education & certifications</h3>{education.map((item) => <div className="education-item" key={item.title}><h4>{item.title}</h4><p>{item.institution}<span>{item.date}</span></p></div>)}</div></div>
      </section>

      <section id="experience" className="section section-tinted"><div className="container">
        <SectionHeading number="02" label="EXPERIENCE" title="Real systems. Real responsibility." description="From enterprise workflows to mobile commerce, a hands-on journey in shipping dependable software." />
        <div className="experience-list">{experience.map((job, i) => <article className="experience-item" key={job.company}><div className="experience-meta"><span className="job-number">{String(i + 1).padStart(2, "0")}</span><p>{job.period}</p><span>{job.location}</span></div><div className="experience-content"><div className="job-heading"><div><h3>{job.company}</h3><p>{job.role}</p></div>{i === 0 && <span className="current-badge"><span className="blue-dot" />Current</span>}</div><ul>{job.achievements.map((achievement) => <li key={achievement}>{achievement}</li>)}</ul></div></article>)}</div>
      </div></section>

      <section id="skills" className="section container"><SectionHeading number="03" label="TOOLKIT" title="The right tools. A strong foundation." description="A practical toolkit for the complete application lifecycle, from architecture and testing to release." /><div className="skills-grid">{skills.map((group, i) => <article className="skill-group" key={group.category}><span className="skill-number">/{String(i + 1).padStart(2, "0")}</span><h3>{group.category}</h3><div className="chips">{group.items.map((skill) => <span key={skill}>{skill}</span>)}</div></article>)}</div></section>

      <section id="projects" className="section section-tinted"><div className="container"><SectionHeading number="04" label="SELECTED WORK" title="Ideas turned into experiences." description="Independent products and professional projects. A closer look at the problems I work on and how I approach them." /><div className="projects-topline"><span><span className="blue-dot" /> {projects.length} projects · Mobile, web & enterprise</span><span>Featured projects first <ArrowDown size={14} /></span></div><div className="projects-grid">{projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}</div></div></section>

      <section id="contact" className="section container contact-section"><div className="contact-layout"><div><div className="eyebrow"><span>05</span> GET IN TOUCH</div><h2>Let’s build<br />something <span>good.</span></h2><p>Have a mobile project in mind or a role that could be a fit? I’d love to hear from you.</p><a className="button primary" href={`mailto:${profile.email}`}>Send email <ArrowUpRight size={18} /></a></div><div className="contact-links"><a href={`mailto:${profile.email}`}><span className="contact-icon"><Mail size={20} /></span><span><small>EMAIL</small>{profile.email}</span><ArrowUpRight size={18} /></a><a href={profile.linkedin} target="_blank" rel="noreferrer"><span className="contact-icon"><Linkedin size={20} /></span><span><small>LINKEDIN</small>Let’s connect</span><ArrowUpRight size={18} /></a><a href={profile.github} target="_blank" rel="noreferrer"><span className="contact-icon"><Github size={20} /></span><span><small>GITHUB</small>@abdoelbendary1</span><ArrowUpRight size={18} /></a><a href={`tel:${profile.phoneHref}`}><span className="contact-icon"><Phone size={20} /></span><span><small>PHONE · CAIRO, EGYPT</small>{profile.phone}</span><ArrowUpRight size={18} /></a></div></div></section>
    </main>
    <footer className="container footer"><a className="wordmark" href="#" aria-label="Back to top">ae<span>.</span></a><p>© {new Date().getFullYear()} Abdelrahman Elbendary</p><a href="#">Back to top <ArrowUpRight size={14} /></a></footer>
  </>;
}
