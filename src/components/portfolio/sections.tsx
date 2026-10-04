import { useEffect, useLayoutEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { ArrowRight, ArrowUpRight, Mail, Phone, MapPin, GraduationCap, Menu, X, Loader2, Check, Briefcase, Download } from "lucide-react";
import { PROFILE, NAV, STACK, PROJECTS, LEARNING, WEB3FORMS_KEY, type Project } from "./data";
import { Magnetic, Tilt } from "./effects";

gsap.registerPlugin(ScrollTrigger);
const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const GithubIcon = ({ className = "h-4 w-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5Z" /></svg>
);
export const LinkedinIcon = ({ className = "h-4 w-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6h.1c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2ZM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2ZM7.1 20.5H3.5V9h3.6v11.5ZM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0Z" /></svg>
);

function SectionLabel({ n, label }: { n: string; label: string }) {
  return (
    <div className="reveal mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
      <span className="text-gradient">{n}</span><span className="h-px w-8 bg-border" />{label}
    </div>
  );
}

function useReveal(ref: React.RefObject<HTMLElement | null>) {
  useIso(() => {
    if (!ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) =>
        gsap.from(el, { y: 40, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } }),
      );
    }, ref);
    return () => ctx.revert();
  }, []);
}

const Btn = ({ href, children, variant = "primary", ...rest }: { href: string; children: ReactNode; variant?: "primary" | "ghost" } & React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a
    href={href}
    {...rest}
    className={
      variant === "primary"
        ? "group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-shadow hover:shadow-glow"
        : "group glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
    }
  >
    {children}
  </a>
);

/* ---------------- NAVBAR ---------------- */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      let cur = "home";
      for (const n of NAV) {
        const el = document.getElementById(n.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) cur = n.id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav className={`flex w-full max-w-5xl items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500 ${scrolled ? "glass shadow-glow" : "border border-transparent"}`}>
        <a href="#home" className="group flex items-center gap-2 font-display font-semibold">
          <img src="/favicon.svg?v=3" alt="" className="h-8 w-8 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-[-5deg]" />
          <span className="hidden sm:inline">Lalit Chavan</span>
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <li key={n.id} className="relative">
              <a href={`#${n.id}`} className={`relative z-10 block px-3.5 py-1.5 text-sm transition-colors ${active === n.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>{n.label}</a>
              {active === n.id && (
                <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-secondary" transition={{ type: "spring", stiffness: 380, damping: 30 }}>
                </motion.span>
              )}
            </li>
          ))}
        </ul>
        <div className="hidden md:block">
          <Magnetic><a href="#contact" className="inline-flex rounded-full bg-gradient-brand px-5 py-2 text-sm font-medium text-primary-foreground shadow-glow">Let's Talk</a></Magnetic>
        </div>
        <button aria-label="Toggle menu" onClick={() => setOpen(!open)} className="grid h-9 w-9 place-items-center rounded-full md:hidden">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -10, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.97 }} className="glass absolute inset-x-4 top-16 rounded-3xl bg-background/80 p-4 md:hidden">
            {NAV.map((n, i) => (
              <motion.a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }} className="flex items-center justify-between rounded-xl px-4 py-3 font-display text-lg hover:bg-secondary">
                {n.label}<span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
              </motion.a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="mt-2 block rounded-full bg-gradient-brand py-3 text-center font-medium text-primary-foreground">Let's Talk</a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ---------------- HERO ---------------- */
const BADGES = [
  { t: "React", c: "left-[2%] top-[8%]" },
  { t: "TypeScript", c: "right-[0%] top-[14%]" },
  { t: "Node.js", c: "left-[-4%] top-[55%]" },
  { t: "MongoDB", c: "right-[-2%] top-[62%]" },
  { t: "GSAP", c: "left-[18%] bottom-[2%]" },
  { t: "Docker", c: "right-[20%] bottom-[-2%]" },
];

export function Hero({ start }: { start: boolean }) {
  const ref = useRef<HTMLElement>(null);
  useIso(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.set(".h-anim", { opacity: 0 });
      if (!start) return;
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(".h-greet", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 })
        .fromTo(".h-name", { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1 }, "-=0.3")
        .fromTo(".h-fs", { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.9 }, "-=0.6")
        .fromTo(".h-sd", { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.9 }, "-=0.65")
        .fromTo(".h-desc", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.5")
        .fromTo(".h-btn", { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" }, "-=0.4")
        .fromTo(".h-card", { y: 60, opacity: 0, rotateX: 20 }, { y: 0, opacity: 1, rotateX: 0, duration: 1.2 }, "-=1")
        .fromTo(".h-badge", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, stagger: 0.08, ease: "back.out(2)" }, "-=0.7");
      gsap.utils.toArray<HTMLElement>(".h-badge").forEach((b, i) =>
        gsap.to(b, { y: i % 2 ? 14 : -14, duration: 2.5 + i * 0.3, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2 }),
      );
      gsap.to(".h-visual", { yPercent: 20, ease: "none", scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true } });
    }, ref);
    return () => ctx.revert();
  }, [start]);

  return (
    <section id="home" ref={ref} className="portfolio-hero relative mx-auto grid max-w-6xl items-center gap-10 px-6 pb-16 pt-32 lg:grid-cols-[1.15fr_1fr]">
      <div>
        <p className="h-anim h-greet mb-6 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-mint" /> Hello, I'm
        </p>
        <h1 className="font-display font-bold leading-[0.95] tracking-tight">
          <span className="block overflow-hidden pb-2"><span className="h-anim h-name block text-5xl sm:text-7xl">Lalit Chavan</span></span>
          <span className="block overflow-hidden"><span className="h-anim h-fs block text-4xl text-gradient sm:text-6xl">Full Stack</span></span>
          <span className="block overflow-hidden pb-1"><span className="h-anim h-sd block text-4xl text-muted-foreground sm:text-6xl">Software Developer</span></span>
        </h1>
        <p className="h-anim h-desc mt-8 max-w-lg text-lg leading-relaxed text-muted-foreground">
          I build scalable, modern and interactive web applications using React, Node.js, MongoDB and modern web technologies.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <div className="h-anim h-btn"><Magnetic><Btn href="#projects">View My Work <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Btn></Magnetic></div>
          <div className="h-anim h-btn"><Magnetic><Btn href="#contact" variant="ghost">Contact Me</Btn></Magnetic></div>
          <div className="h-anim h-btn flex gap-2 sm:ml-2">
            {[{ h: PROFILE.github, i: <GithubIcon />, l: "GitHub" }, { h: PROFILE.linkedin, i: <LinkedinIcon />, l: "LinkedIn" }, { h: `mailto:${PROFILE.email}`, i: <Mail className="h-4 w-4" />, l: "Email" }].map((s) => (
              <a key={s.l} href={s.h} target="_blank" rel="noreferrer" aria-label={s.l} className="glass grid h-11 w-11 place-items-center rounded-full text-muted-foreground transition-all hover:-translate-y-1 hover:text-foreground hover:shadow-glow">{s.i}</a>
            ))}
          </div>
        </div>
      </div>

      <div className="h-visual relative mx-auto aspect-square w-full max-w-md [perspective:1000px]">
        <Tilt className="h-anim h-card portrait-frame absolute inset-[5%] overflow-hidden rounded-lg border border-border">
          <img src="/myimg.jpeg" alt="Lalit Chavan" className="portrait-image h-full w-full object-cover" fetchPriority="high" />
          <div className="portrait-caption absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
            <div><p className="font-display text-xl font-semibold">Lalit Chavan</p><p className="mt-1 font-mono text-xs text-muted-foreground">Full Stack Developer</p></div>
            <ArrowUpRight className="h-6 w-6 text-foreground" />
          </div>
        </Tilt>
        {BADGES.map((b) => (
          <span key={b.t} className={`h-anim h-badge glass absolute ${b.c} rounded-full bg-background/40 px-4 py-2 font-mono text-xs text-foreground`}>{b.t}</span>
        ))}
      </div>
    </section>
  );
}

/* ---------------- ABOUT ---------------- */
export function About() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  useIso(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-card", {
        y: 50,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-content",
          start: "top 85%",
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      className="mx-auto max-w-6xl px-6 py-32"
    >
      <SectionLabel n="01" label="About" />

      <div className="about-content grid gap-16 lg:grid-cols-2">
        <div className="about-card">
          <h2 className="reveal font-display text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            Building experiences,
            <br />
            <span className="text-gradient">
              not just applications.
            </span>
          </h2>

          <p className="reveal mt-6 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            {PROFILE.location}
          </p>
        </div>

        <div className="about-card space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p className="reveal">
            I'm{" "}
            <span className="text-foreground">
              Lalit Chavan
            </span>
            , a Computer Science and Engineering (Data Science)
            student and Full Stack Software Developer.
          </p>

          <p className="reveal">
            I enjoy building complete web applications from
            frontend interfaces to backend APIs, databases and
            deployment.
          </p>

          <p className="reveal">
            I'm particularly interested in creating scalable,
            responsive and interactive products using modern
            JavaScript technologies.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- EXPERIENCE ---------------- */
export function Experience() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  useIso(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".tl-line", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".tl", start: "top 75%", end: "bottom 60%", scrub: true } });
      gsap.from(".tl-item", { x: -20, opacity: 0, stagger: 0.1, duration: 0.6, scrollTrigger: { trigger: ".tl", start: "top 70%" } });
    }, ref);
    return () => ctx.revert();
  }, []);
  const items = [
    "Contributed to 3 software projects using React.js, Node.js, Express.js, REST APIs and MongoDB.",
    "Developed responsive React.js features and integrated REST APIs with backend services.",
    "Debugged frontend, backend, API and database issues.",
    "Performed functional and regression testing.",
    "Used Git/GitHub for version control and collaboration.",
    "Deployed web applications to Vercel and validated production builds.",
  ];
  return (
    <section id="experience" ref={ref} className="mx-auto max-w-6xl px-6 py-32">
      <SectionLabel n="02" label="Experience" />
      <h2 className="reveal mb-16 font-display text-4xl font-bold tracking-tight sm:text-6xl">Experience</h2>
      <div className="tl relative pl-10 md:pl-0">
        <div className="absolute bottom-0 left-3 top-0 w-px bg-border md:left-[calc(30%)]" />
        <div className="tl-line absolute bottom-0 left-3 top-0 w-px origin-top bg-gradient-to-b from-violet via-blue to-cyan shadow-glow md:left-[calc(30%)]" />
        <div className="grid gap-8 md:grid-cols-[30%_1fr]">
          <div className="relative md:pr-12 md:text-right">
            <span className="absolute -left-[34px] top-1.5 grid h-5 w-5 place-items-center rounded-full bg-background ring-2 ring-violet md:left-auto md:-right-2.5"><span className="h-2 w-2 animate-pulse rounded-full bg-gradient-brand" /></span>
            <p className="font-mono text-xs uppercase tracking-widest text-mint">Aug 2026 — Present</p>
            <p className="mt-2 text-sm text-muted-foreground">Remote</p>
          </div>
          <div className="glass glow-border rounded-3xl p-8 md:ml-12">
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-brand text-primary-foreground"><Briefcase className="h-5 w-5" /></span>
              <div>
                <h3 className="font-display text-2xl font-semibold">ZwiebelAI</h3>
                <p className="text-muted-foreground">Software Development Intern</p>
              </div>
            </div>
            <ul className="mt-6 space-y-3">
              {items.map((t) => (
                <li key={t} className="tl-item flex gap-3 text-muted-foreground"><span className="mt-2.5 h-1 w-3 shrink-0 rounded-full bg-gradient-brand" />{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- PROJECTS ---------------- */
function ProjectCard({ p, i }: { p: Project; i: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 200, damping: 26 }}
      data-cursor="card"
       className={`project-card group glass glow-border relative overflow-hidden rounded-lg transition-transform duration-500 hover:-translate-y-2 ${i === 0 ? "lg:col-span-2" : ""}`}
    >
      <div className={`grid h-full ${i === 0 ? "lg:grid-cols-[1.2fr_1fr]" : ""}`}>
        <div className="relative m-3 overflow-hidden rounded-2xl border border-border bg-background">
          <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
            <span className="h-2 w-2 rounded-full bg-muted-foreground/40" /><span className="h-2 w-2 rounded-full bg-muted-foreground/40" /><span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
            <span className="ml-3 truncate rounded-md bg-secondary px-3 py-0.5 font-mono text-[10px] text-muted-foreground">{p.live ? p.live.replace("https://", "") : `github.com/LALITCHAVAN`}</span>
          </div>
          <div className="relative aspect-[2.1/1] overflow-hidden">
            <img src={p.image} alt={`${p.name} website screenshot`} loading="lazy" className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.025]" />
          </div>
        </div>
        <div className="flex flex-col p-6 pt-3">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{String(i + 1).padStart(2, "0")} — {p.tagline}</p>
          <h3 className="mt-2 font-display text-2xl font-semibold">{p.name}</h3>
          <p className="mt-3 leading-relaxed text-muted-foreground">{p.description}</p>
          {i === 0 && (
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
              {p.features.map((f) => <li key={f} className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-mint" />{f}</li>)}
            </ul>
          )}
          <div className="mt-5 flex flex-wrap gap-1.5">
            {p.tech.map((t) => <span key={t} className="rounded-full border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground transition-colors group-hover:border-violet/40">{t}</span>)}
          </div>
          <div className="mt-auto flex gap-3 pt-6">
            {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="group/b inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background">Live Demo <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/b:-translate-y-0.5 group-hover/b:translate-x-0.5" /></a>}
            <a href={p.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm transition-colors hover:bg-secondary"><GithubIcon className="h-3.5 w-3.5" /> GitHub</a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const filters = ["All", "Frontend", "Full Stack", "Backend"] as const;
  const [f, setF] = useState<(typeof filters)[number]>("All");
  const list = PROJECTS.filter((p) => f === "All" || p.category === f || (f === "Backend" && p.category === "Full Stack"));
  return (
    <section id="projects" ref={ref} className="mx-auto max-w-6xl px-6 py-32">
      <SectionLabel n="03" label="Projects" />
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <h2 className="reveal font-display text-4xl font-bold tracking-tight sm:text-6xl">Selected <span className="text-gradient">Projects</span></h2>
        <div className="reveal glass flex rounded-full p-1">
          {filters.map((x) => (
            <button key={x} onClick={() => setF(x)} className="relative rounded-full px-4 py-1.5 text-sm">
              {f === x && <motion.span layoutId="filter" className="absolute inset-0 rounded-full bg-foreground" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
              <span className={`relative ${f === x ? "text-background" : "text-muted-foreground"}`}>{x}</span>
            </button>
          ))}
        </div>
      </div>
      <LayoutGroup>
        <motion.div layout className="grid gap-6 lg:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {list.map((p) => <ProjectCard key={p.name} p={p} i={PROJECTS.indexOf(p)} />)}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </section>
  );
}

/* ---------------- SKILLS ---------------- */
export function Skills() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  useIso(() => {
    const ctx = gsap.context(() => {
      gsap.from(".sk-card", { y: 60, opacity: 0, stagger: 0.08, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".sk-grid", start: "top 80%" } });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <section id="skills" ref={ref} className="mx-auto max-w-6xl px-6 py-32">
      <SectionLabel n="04" label="Skills" />
      <h2 className="reveal mb-14 font-display text-4xl font-bold tracking-tight sm:text-6xl">Tools I <span className="text-gradient">Build With</span></h2>
      <div className="skills-marquee mb-12 overflow-hidden border-y border-border py-5">
        <div className="flex w-max animate-marquee gap-12" aria-label="Technology stack">
          {[0, 1].map((copy) => <div key={copy} aria-hidden={copy === 1 ? true : undefined} className="flex shrink-0 gap-12">{["React", "TypeScript", "Node.js", "MongoDB", "GSAP", "Docker"].map((skill) => <span key={skill} className="flex items-center gap-12 font-display text-2xl text-muted-foreground">{skill}<span className="text-mint">✦</span></span>)}</div>)}
        </div>
      </div>
      <div className="sk-grid grid gap-5 sm:grid-cols-2 lg:grid-cols-3 [perspective:1200px]">
        {STACK.map((c, i) => (
          <Tilt key={c.title} className="sk-card group glass glow-border relative overflow-hidden rounded-3xl p-6">
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "radial-gradient(300px circle at var(--mx) var(--my), color-mix(in oklab, var(--violet) 18%, transparent), transparent 70%)" }} />
            <div className="relative flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold">{c.title}</h3>
              <span className="font-mono text-xs text-muted-foreground transition-colors group-hover:text-cyan">/0{i + 1}</span>
            </div>
            <div className="relative mt-5 flex flex-wrap gap-2">
              {c.items.map((t) => (
                <span key={t} className="rounded-lg border border-border bg-background/40 px-3 py-1.5 text-sm text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-violet/50 hover:text-foreground">{t}</span>
              ))}
            </div>
          </Tilt>
        ))}
      </div>

      <div className="mt-24 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <div className="reveal glass glow-border rounded-3xl p-8">
          <div className="flex items-center gap-3">
            <motion.span animate={{ y: [0, -6, 0], rotate: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-brand text-primary-foreground"><GraduationCap className="h-6 w-6" /></motion.span>
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Education · 2023 — Present</span>
          </div>
          <h3 className="mt-6 font-display text-2xl font-semibold leading-snug">Dr. Babasaheb Ambedkar Technological University</h3>
          <p className="mt-2 text-muted-foreground">B.Tech in Computer Science and Engineering (Data Science)</p>
          <p className="mt-6 inline-flex rounded-full border border-border px-3 py-1 font-mono text-sm">CGPA: <span className="ml-1 text-mint">7.16 / 10</span></p>
        </div>
        <div className="reveal glass rounded-3xl p-8">
          <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-mint" />Currently Exploring</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {LEARNING.map((l, i) => (
              <motion.span key={l} initial={{ opacity: 0, scale: 0.8, y: 10 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, type: "spring" }} whileHover={{ y: -3 }} className="rounded-full border border-border bg-background/40 px-4 py-2 text-sm transition-colors hover:border-cyan/50">{l}</motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CONTACT ---------------- */
type Status = "idle" | "loading" | "success" | "error";
export function Contact() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const [status, setStatus] = useState<Status>("idle");
  const [msg, setMsg] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim(), email = String(fd.get("email") || "").trim(), message = String(fd.get("message") || "").trim();
    const errs: Record<string, string> = {};
    if (!name) errs["name"] = "Please enter your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs["email"] = "Please enter a valid email";
    if (message.length < 10) errs["message"] = "Message should be at least 10 characters";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    if (!WEB3FORMS_KEY) { setStatus("error"); setMsg("The contact form isn't configured yet. Please email me directly."); return; }
    setStatus("loading");
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ access_key: WEB3FORMS_KEY, name, email, message, subject: `Portfolio message from ${name}` }) });
      const json = await res.json();
      if (json.success) { setStatus("success"); setMsg("Thanks! Your message has been sent."); (e.target as HTMLFormElement).reset(); }
      else throw new Error(json.message);
    } catch (err) {
      setStatus("error"); setMsg(err instanceof Error && err.message ? err.message : "Something went wrong. Please try again.");
    }
  };

  const field = "w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-violet focus:shadow-glow";
  return (
    <section id="contact" ref={ref} className="mx-auto max-w-6xl px-6 py-32">
      <SectionLabel n="05" label="Contact" />
      <div className="glass relative overflow-hidden rounded-[2rem] p-8 md:p-14">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-violet opacity-25 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-cyan opacity-15 blur-[120px]" />
        <div className="relative grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="reveal font-display text-4xl font-bold leading-tight tracking-tight sm:text-6xl">Let's build something <span className="text-gradient">great together.</span></h2>
            <p className="reveal mt-6 max-w-md text-lg text-muted-foreground">I'm open to software development opportunities, internships and interesting projects.</p>
            <div className="reveal mt-8 flex flex-wrap gap-3">
              <Magnetic><Btn href={`mailto:${PROFILE.email}`}><Mail className="h-4 w-4" /> Email Me</Btn></Magnetic>
              <Magnetic><Btn href={PROFILE.github} variant="ghost" target="_blank" rel="noreferrer"><GithubIcon /> GitHub</Btn></Magnetic>
              <Magnetic><Btn href={PROFILE.linkedin} variant="ghost" target="_blank" rel="noreferrer"><LinkedinIcon /> LinkedIn</Btn></Magnetic>
              <Magnetic><Btn href="/lalitnewresume.pdf" variant="ghost" download="Lalit-Chavan-Resume.pdf"><Download className="h-4 w-4" /> Resume</Btn></Magnetic>
            </div>
            <div className="reveal mt-10 space-y-3 font-mono text-sm">
              <a href={`mailto:${PROFILE.email}`} className="flex items-center gap-3 text-muted-foreground hover:text-foreground"><Mail className="h-4 w-4 text-violet" />{PROFILE.email}</a>
              <a href="tel:+918767483136" className="flex items-center gap-3 text-muted-foreground hover:text-foreground"><Phone className="h-4 w-4 text-cyan" />{PROFILE.phone}</a>
            </div>
          </div>
          <form onSubmit={submit} noValidate className="reveal space-y-4">
            {(["name", "email"] as const).map((n) => (
              <div key={n}>
                <label htmlFor={n} className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-muted-foreground">{n}</label>
                <input id={n} name={n} type={n === "email" ? "email" : "text"} maxLength={120} placeholder={n === "name" ? "Your name" : "you@example.com"} className={field} />
                {errors[n] && <p className="mt-1 text-xs text-destructive">{errors[n]}</p>}
              </div>
            ))}
            <div>
              <label htmlFor="message" className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-muted-foreground">Message</label>
              <textarea id="message" name="message" rows={5} maxLength={2000} placeholder="Tell me about your project..." className={`${field} resize-none`} />
              {errors["message"] && <p className="mt-1 text-xs text-destructive">{errors["message"]}</p>}
            </div>
            <button disabled={status === "loading"} className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-brand py-3.5 font-medium text-primary-foreground shadow-glow transition-opacity disabled:opacity-60">
              {status === "loading" ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</> : <>Send Message <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></>}
            </button>
            <AnimatePresence>
              {(status === "success" || status === "error") && (
                <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`text-sm ${status === "success" ? "text-mint" : "text-destructive"}`}>{msg}</motion.p>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-6 pb-10">
      <div className="relative mb-10 h-px overflow-hidden bg-border"><div className="animate-beam absolute inset-y-0 w-1/3 bg-gradient-brand" /></div>
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <p className="font-display text-lg font-semibold">Lalit Chavan</p>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Full Stack Software Developer</p>
        </div>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <a href={PROFILE.github} target="_blank" rel="noreferrer" className="hover:text-foreground">GitHub</a>
          <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="hover:text-foreground">LinkedIn</a>
          <a href={`mailto:${PROFILE.email}`} className="hover:text-foreground">Email</a>
        </div>
        <p className="font-mono text-xs text-muted-foreground">© 2026 Lalit Chavan</p>
      </div>
    </footer>
  );
}
