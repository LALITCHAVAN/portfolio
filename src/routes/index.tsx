import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { AnimatedBackground, Loader } from "@/components/portfolio/effects";
import { Navbar, Hero, About, Experience, Projects, Skills, Contact, Footer } from "@/components/portfolio/sections";

const TITLE = "Lalit Chavan — Full Stack Software Developer";
const DESC = "Portfolio of Lalit Chavan, a Full Stack Software Developer building scalable, interactive web apps with React, Node.js and MongoDB.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [loaded, setLoaded] = useState(false);
  const done = useCallback(() => setLoaded(true), []);
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {!loaded && <Loader onDone={done} />}
      <AnimatedBackground />
      <Navbar />
      <main>
        <Hero start={loaded} />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
