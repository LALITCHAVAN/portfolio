import { useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";

export function AnimatedBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="ambient-orb ambient-orb-violet" />
      <div className="ambient-orb ambient-orb-cyan" />
      <div className="ambient-orb ambient-orb-blue" />
      <svg className="spider-web" viewBox="0 0 500 500" fill="none">
        <g className="web-lines" stroke="currentColor" strokeWidth="1">
          <path d="M500 0 82 42M500 0 38 115M500 0 0 215M500 0 20 335M500 0 105 455M500 0 245 500M500 0 390 455M500 0 500 340" />
          <path d="M442 6Q458 40 455 73Q420 79 393 72M365 14Q389 65 384 112Q334 122 295 108M275 23Q309 87 304 152Q237 169 183 147M178 32Q222 108 217 199Q135 221 73 187M86 42Q137 126 130 248Q42 275 3 239M435 77Q393 112 384 112M383 114Q323 161 304 152M302 154Q226 218 217 199M215 201Q127 278 130 248M128 250Q49 328 20 335M384 114Q401 186 374 227Q294 223 246 199M304 154Q331 226 297 292Q209 275 164 262M217 201Q243 278 210 360Q126 330 86 311M130 250Q156 326 129 404Q72 367 45 351M374 229Q395 292 365 352Q296 330 260 307M297 294Q321 352 288 410Q226 384 210 362M210 362Q222 418 193 474M365 354Q385 408 357 464M260 309Q273 379 244 447M435 77Q489 147 500 205M374 229Q448 270 500 268M365 354Q424 372 500 340" />
        </g>
      </svg>
      <div className="spider-runner">
        <span className="spider-silk" />
        <svg viewBox="0 0 48 48" fill="none">
          <g stroke="#4DA3FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m20 19-8-8-7 1M18 23 8 20 3 25M18 27l-9 5-2 8M20 30l-4 9 2 6M28 19l8-8 7 1M30 23l10-3 5 5M30 27l9 5 2 8M28 30l4 9-2 6" />
          </g>
          <g stroke="#111827" strokeWidth="1.5">
            <ellipse cx="24" cy="24" rx="6.5" ry="10" fill="#E53B4E" />
            <circle cx="24" cy="14" r="5" fill="#D92F43" />
          </g>
          <path d="m21 12 2 3-2 2m8-5-2 3 2 2" stroke="#EAF4FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M24 4V1" stroke="#B9D8FF" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <div className="background-beam left-[20%]" />
      <div className="background-beam left-[55%]" />
      <div className="background-beam left-[85%]" />
      <div className="grid-bg absolute inset-0 opacity-30" />
      <ParticleField />
      <div className="noise absolute inset-0" />
    </div>
  );
}

function ParticleField() {
  const [dots, setDots] = useState<{ x: number; y: number; s: number; d: number }[]>([]);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setDots(Array.from({ length: 40 }, () => ({ x: Math.random() * 100, y: Math.random() * 100, s: Math.random() * 2 + 1, d: Math.random() * 6 + 4 })));
  }, []);
  useEffect(() => {
    if (!dots.length) return;
    const t = gsap.to(".particle", { y: "-=40", opacity: "random(0.1,0.7)", duration: "random(4,9)", repeat: -1, yoyo: true, ease: "sine.inOut", stagger: { each: 0.1, from: "random" } });
    return () => { t.kill(); };
  }, [dots]);
  return (
    <>
      {dots.map((d, i) => (
        <span key={i} className="particle absolute rounded-full bg-foreground opacity-30" style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.s, height: d.s }} />
      ))}
    </>
  );
}

export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1,0.4)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1,0.4)" });
    const move = (e: MouseEvent) => {
      const b = el.getBoundingClientRect();
      xTo((e.clientX - b.left - b.width / 2) * strength);
      yTo((e.clientY - b.top - b.height / 2) * strength);
    };
    const leave = () => { xTo(0); yTo(0); };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => { el.removeEventListener("mousemove", move); el.removeEventListener("mouseleave", leave); };
  }, [strength]);
  return <div ref={ref} className="inline-block">{children}</div>;
}

export function Tilt({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const b = el.getBoundingClientRect();
    const px = (e.clientX - b.left) / b.width - 0.5, py = (e.clientY - b.top) / b.height - 0.5;
    gsap.to(ref.current, { rotateY: px * 10, rotateX: -py * 10, duration: 0.4, transformPerspective: 800 });
    el.style.setProperty("--mx", `${(px + 0.5) * 100}%`);
    el.style.setProperty("--my", `${(py + 0.5) * 100}%`);
  };
  const onLeave = () => gsap.to(ref.current, { rotateY: 0, rotateX: 0, duration: 0.6 });
  return <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={className}>{children}</div>;
}

export function Loader({ onDone }: { onDone: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { onDone(); return; }
    const tl = gsap.timeline({ onComplete: onDone });
    tl.from(".ld-char", { yPercent: 110, stagger: 0.06, duration: 0.5, ease: "power3.out" })
      .to(".ld-bar", { scaleX: 1, duration: 0.6, ease: "power2.inOut" }, "<0.1")
      .to(".ld-char", { yPercent: -110, stagger: 0.04, duration: 0.4, ease: "power3.in" }, "+=0.15")
      .to(ref.current, { yPercent: -100, duration: 0.7, ease: "power4.inOut" }, "-=0.1");
    return () => { tl.kill(); };
  }, [onDone]);
  return (
    <div ref={ref} className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-6 bg-background">
      <div className="flex overflow-hidden font-display text-6xl font-bold tracking-tight md:text-8xl">
        {"LALIT".split("").map((c, i) => <span key={i} className="ld-char inline-block text-gradient">{c}</span>)}
      </div>
      <div className="h-px w-40 overflow-hidden bg-border"><div className="ld-bar h-full origin-left scale-x-0 bg-gradient-brand" /></div>
    </div>
  );
}
