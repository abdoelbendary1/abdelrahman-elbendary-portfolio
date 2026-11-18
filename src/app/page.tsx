import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Download, Github, Linkedin, Mail, Phone } from "lucide-react";
import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { skills } from "@/data/skills";
import { education } from "@/data/education";
import { projects } from "@/data/projects";
import { Navigation } from "@/components/navigation";
import { PhoneMock } from "@/components/phone-mock";
import { ProjectGallery } from "@/components/project-gallery";
import { CopyEmail } from "@/components/copy-email";
import { ResumeViewer } from "@/components/resume-viewer";

function SectionHead({ index, label, children, note }: { index: string; label: string; children: React.ReactNode; note?: string }) {
  return (
    <header className="sec-head">
      <p className="sec-label"><span>{index}</span>{label}</p>
      <h2>{children}</h2>
      {note && <p className="sec-note">{note}</p>}
    </header>
  );
}

const facts = [
  { value: "2+", label: "years shipping to production" },
  { value: "30+", label: "modules rearchitected to BLoC" },
  { value: "7", label: "production apps across 4 companies" },
  { value: "2", label: "stores — App Store & Google Play" },
];

export default function Home() {
  const resumeAvailable = profile.resumeUrl?.startsWith("/") && existsSync(path.join(process.cwd(), "public", profile.resumeUrl));
  const githubHandle = profile.github.replace(/\/$/, "").split("/").pop();

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Navigation />
    <main id="main">
      <section id="top" className="hero shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="hero-status"><span className="dot" aria-hidden="true" />Flutter engineer at {experience[0].company} · {profile.location}</p>
          <h1 id="hero-title">Mobile apps people <em>actually open</em> every day.</h1>
          <p className="hero-lede">{profile.introduction}</p>
          <div className="hero-actions">
            <a className="btn btn-solid" href="#work">See the work <ArrowDown size={17} aria-hidden="true" /></a>
            {resumeAvailable
              ? <a className="btn btn-line" href={profile.resumeUrl!} download={`${profile.resumeFileName}.pdf`}>Download CV <Download size={16} aria-hidden="true" /></a>
              : <a className="btn btn-line" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={16} aria-hidden="true" /></a>}
          </div>
          <ul className="hero-platforms" aria-label="Platforms and stack">
            <li>Flutter</li><li>Dart</li><li>iOS</li><li>Android</li><li>Clean Architecture</li>
          </ul>
        </div>
        <PhoneMock />
      </section>

      <section className="facts" aria-label="At a glance">
        <dl className="shell facts-row">
          {facts.map((f) => <div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>)}
        </dl>
      </section>

      <section id="work" className="section shell">
        <SectionHead index="01" label="Selected work" note="Open any project for its screens, scope and store links.">
          Shipped for companies, <em>built for myself.</em>
        </SectionHead>
        <ProjectGallery projects={projects} />
      </section>

      <section id="experience" className="section section-dark">
        <div className="shell">
          <SectionHead index="02" label="Experience" note="Release notes from every team I've shipped with — newest first.">
            Where I&rsquo;ve <em>shipped.</em>
          </SectionHead>
          <ol className="releases">
            {experience.map((job, i) => (
              <li key={job.company} className="release">
                <div className="release-meta">
                  <p className="release-period">{job.period}</p>
                  <p>{job.location}</p>
                  {i === 0 && <p className="release-current"><span className="dot" aria-hidden="true" />Current</p>}
                </div>
                <div className="release-body">
                  <h3>{job.company}</h3>
                  <p className="release-role">{job.role}</p>
                  <ul>{job.achievements.map((a) => <li key={a}>{a}</li>)}</ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="toolkit" className="section shell">
        <SectionHead index="03" label="Toolkit" note="What I reach for across the whole lifecycle — architecture, state, networking, security, release.">
          The stack behind <em>the screens.</em>
        </SectionHead>
        <div className="toolkit">
          {skills.map((group, i) => (
            <article key={group.category} className="tool-group">
              <h3><span>{String(i + 1).padStart(2, "0")}</span>{group.category}</h3>
              <ul>{group.items.map((s) => <li key={s}>{s}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="section about-section">
        <div className="shell about">
          <div className="about-photo">
            <Image src={profile.portrait} alt={`Portrait of ${profile.name}`} width={900} height={1205} sizes="(max-width: 900px) 60vw, 360px" />
          </div>
          <div className="about-copy">
            <p className="sec-label"><span>04</span>About</p>
            <h2>Architecture first, so the app <em>stays fast</em> when it grows.</h2>
            <p>{profile.summary}</p>
            <div className="edu">
              <h3>Education & certifications</h3>
              <ul>
                {education.map((e) => <li key={e.title}><span>{e.title}</span><span>{e.institution} · {e.date}</span></li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="resume" className="section resume-section">
        <div className="shell">
          <SectionHead index="05" label="Resume" note="Read it right here — or take it with you as a PDF or Word file.">
            The whole story, <em>one page.</em>
          </SectionHead>
          <ResumeViewer />
        </div>
      </section>

      <section id="contact" className="section shell contact">
        <p className="sec-label"><span>06</span>Contact</p>
        <h2>Have an app that needs to <em>ship?</em></h2>
        <p className="contact-lede">Hiring for a Flutter role, or planning a mobile product? Send a note and let&rsquo;s talk about it.</p>
        <div className="contact-mail">
          <a href={`mailto:${profile.email}`} className="mail-link">{profile.email}<ArrowUpRight size={28} aria-hidden="true" /></a>
          <CopyEmail email={profile.email} />
        </div>
        <ul className="contact-links">
          <li><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18} aria-hidden="true" /><span>LinkedIn</span><span className="cl-val">abdelrahman-elbendary</span><ArrowUpRight size={16} aria-hidden="true" /></a></li>
          <li><a href={profile.github} target="_blank" rel="noreferrer"><Github size={18} aria-hidden="true" /><span>GitHub</span><span className="cl-val">@{githubHandle}</span><ArrowUpRight size={16} aria-hidden="true" /></a></li>
          <li><a href={`tel:${profile.phoneHref}`}><Phone size={18} aria-hidden="true" /><span>Phone</span><span className="cl-val">{profile.phone}</span><ArrowUpRight size={16} aria-hidden="true" /></a></li>
          <li><a href={`mailto:${profile.email}`}><Mail size={18} aria-hidden="true" /><span>Email</span><span className="cl-val">Write directly</span><ArrowUpRight size={16} aria-hidden="true" /></a></li>
        </ul>
      </section>
    </main>
    <footer className="footer shell">
      <span>© {new Date().getFullYear()} {profile.name}</span>
      <span>Designed & built in Cairo</span>
      <a href="#top">Back to top ↑</a>
    </footer>
  </>;
}
