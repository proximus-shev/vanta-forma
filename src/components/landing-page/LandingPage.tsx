"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects as portfolioProjects } from "@/data/projects";
import styles from "./LandingPage.module.css";

const projects = portfolioProjects.slice(0, 5);

const navItems = [
  ["Work", "#work"],
  ["About", "#about"],
  ["Skills", "#skills"],
  ["Approach", "#about"],
  ["Contact", "#contact"],
];

const skills = [
  {
    number: "01",
    title: "Concept development",
    description:
      "Analyzes and synthesizes briefs, context and project information into clear architectural concepts and purposeful design directions.",
  },
  {
    number: "02",
    title: "Revit modelling",
    description:
      "Develops accurate architectural models, coordinated design studies and dependable documentation in Revit.",
  },
  {
    number: "03",
    title: "Visualization & presentation",
    description:
      "Creates realistic Lumion and Twinmotion visuals, supported by clear, engaging Canva presentations that communicate the design intent.",
  },
  {
    number: "04",
    title: "Focused delivery",
    description:
      "Works efficiently under tight deadlines while protecting design quality, technical care and presentation standards.",
  },
];

function Arrow({ direction = "right" }: { direction?: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 28 12"
      className={direction === "left" ? styles.arrowLeft : undefined}
    >
      <path d="M1 6h25M21 1l5 5-5 5" />
    </svg>
  );
}

function GmailIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M3.5 6.5 12 13l8.5-6.5" />
      <path d="M4 6h16v12H4z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M7.2 3.5 10 7.8 7.8 10a15.4 15.4 0 0 0 6.2 6.2l2.2-2.2 4.3 2.8c.3.2.5.6.4 1-.4 2-1.7 3.2-3.7 3.2C10.1 21 3 13.9 3 6.8c0-2 1.2-3.3 3.2-3.7.4-.1.8.1 1 .4Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.5L3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 20.5 11.7Z" />
      <path d="M8.3 7.8c.3-.3.8-.4 1.1 0l1.2 1.8c.2.3.1.7-.1.9l-.8.8c.8 1.6 2 2.8 3.6 3.6l.8-.8c.3-.3.6-.3.9-.1l1.8 1.2c.4.3.4.8.1 1.1-.6.7-1.5 1-2.4.8-3.7-.8-6.8-3.9-7.6-7.6-.2-.9.1-1.8.8-2.4Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.7" r=".8" className={styles.iconDot} />
    </svg>
  );
}

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <a
      className={`${styles.brand} ${compact ? styles.brandCompact : ""}`}
      href="#top"
      aria-label="Vanta Forma home"
    >
      {compact ? (
        <Image
          src="/images/brand/vanta-forma-logo.webp"
          alt=""
          width={1400}
          height={396}
          className={styles.brandImage}
        />
      ) : (
        <>
          <Image
            src="/images/brand/vanta-forma-logo.webp"
            alt=""
            width={1400}
            height={396}
            className={`${styles.brandImage} ${styles.brandImageDesktop}`}
          />
          <Image
            src="/images/brand/vanta-forma-logo.webp"
            alt=""
            width={1400}
            height={396}
            className={`${styles.brandImage} ${styles.brandImageMobile}`}
          />
        </>
      )}
    </a>
  );
}

export default function LandingPage() {
  const [introPhase, setIntroPhase] = useState<"playing" | "leaving" | "done">(
    "playing",
  );
  const [activeProject, setActiveProject] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) {
      const finishImmediately = window.setTimeout(
        () => setIntroPhase("done"),
        0,
      );
      return () => window.clearTimeout(finishImmediately);
    }

    const leaveTimer = window.setTimeout(() => setIntroPhase("leaving"), 3150);
    const finishTimer = window.setTimeout(() => setIntroPhase("done"), 3850);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(finishTimer);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      menuOpen || introPhase !== "done" ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [introPhase, menuOpen]);

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8%" },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      }

      const hero = heroRef.current;
      if (!hero) return;

      const rect = hero.getBoundingClientRect();
      if (event.clientY < rect.top || event.clientY > rect.bottom) return;

      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      hero.style.setProperty("--pointer-x", `${x * 10}px`);
      hero.style.setProperty("--pointer-y", `${y * 7}px`);
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  const skipIntro = () => {
    setIntroPhase("leaving");
    window.setTimeout(() => setIntroPhase("done"), 650);
  };

  const moveProject = (direction: number) => {
    setActiveProject(
      (current) => (current + direction + projects.length) % projects.length,
    );
  };

  return (
    <main
      id="top"
      className={`${styles.page} ${introPhase === "done" ? styles.ready : ""}`}
    >
      {introPhase !== "done" && (
        <div
          className={`${styles.intro} ${introPhase === "leaving" ? styles.introLeaving : ""}`}
          role="status"
          aria-label="Vanta Forma introduction"
        >
          <div className={styles.introGrid} aria-hidden="true" />
          <div className={styles.introOrb} aria-hidden="true">
            <Image
              src="/images/brand/vanta-forma-monogram.webp"
              alt=""
              width={520}
              height={522}
              className={styles.introMonogram}
            />
            <i className={styles.ringOne} />
            <i className={styles.ringTwo} />
            <i className={styles.ringThree} />
          </div>
          <div className={styles.introWordmark} aria-hidden="true">
            <Image
              src="/images/brand/vanta-forma-wordmark.webp"
              alt=""
              width={900}
              height={101}
              className={styles.introWordmarkImage}
              preload
            />
          </div>
          <p className={styles.introTagline}>Where shadow shapes form</p>
          <div className={styles.introProgress} aria-hidden="true">
            <span />
          </div>
          <button
            type="button"
            className={styles.skipIntro}
            onClick={skipIntro}
          >
            Skip intro
          </button>
        </div>
      )}

      <div ref={cursorRef} className={styles.cursorHalo} aria-hidden="true" />

      <section
        ref={heroRef}
        className={styles.hero}
        aria-labelledby="hero-title"
      >
        <div className={styles.heroImage} aria-hidden="true" />
        <div className={styles.heroShade} aria-hidden="true" />
        <div className={styles.heroGrain} aria-hidden="true" />

        <header className={styles.header}>
          <BrandMark />
          <nav className={styles.desktopNav} aria-label="Primary navigation">
            {navItems.map(([label, href]) => (
              <a key={label} href={href}>
                {label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            className={styles.menuButton}
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className={styles.menuLabel}>Menu</span>
            <span className={styles.menuLines} aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </button>
        </header>

        <div className={styles.heroRail} aria-hidden="true">
          <span />
          <i />
          <p>
            <span>Architecture by</span>
            <span>Eugene Sasu Appiah</span>
          </p>
        </div>

        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>Architecture / Accra</p>
          <h1 id="hero-title" className={styles.heroTitle}>
            <span>Where shadow</span>
            <span>shapes form.</span>
          </h1>
          <p className={styles.heroTagline}>
            Architecture shaped by light, context and intention.
          </p>
          <a href="#work" className={styles.textLink}>
            Explore projects <Arrow />
          </a>
        </div>

        <div className={styles.heroStatement}>
          <span>We design spaces</span>
          <span>that inspire,</span>
          <span>endure and</span>
          <span>elevate human</span>
          <span>experience.</span>
        </div>

        <div className={styles.heroIndex} aria-label="Featured slide 1 of 5">
          <strong>01</strong>
          <span>
            <i />
          </span>
          <small>05</small>
        </div>

        <a href="#work" className={styles.scrollCue}>
          <span>Scroll to discover</span>
          <i>
            <b />
          </i>
        </a>
        <p className={styles.heroCounter}>
          01 <i /> 05
        </p>
      </section>

      <section id="work" className={styles.work} aria-labelledby="work-title">
        <div className={styles.workIntro} data-reveal>
          <p className={styles.sectionLabel}>Selected work</p>
          <h2 id="work-title">Spaces that speak silently.</h2>
          <p>
            Each project is a dialogue between context, material, light and the
            people who experience it.
          </p>
          <Link href="/projects" className={styles.textLink}>
            View all projects <Arrow />
          </Link>
        </div>

        <div id="projects" className={styles.projectRail} data-reveal>
          {projects.map((project, index) => (
            <article
              key={project.slug}
              className={`${styles.projectCard} ${index === activeProject ? styles.projectActive : ""}`}
              style={{ backgroundImage: `url(${project.hero})` }}
              onMouseEnter={() => setActiveProject(index)}
              onFocus={() => setActiveProject(index)}
            >
              <Link
                href={`/projects/${project.slug}`}
                className={styles.projectButton}
                aria-label={`View ${project.title}`}
              >
                <span className={styles.projectNumber}>{project.number}</span>
                <span className={styles.projectMeta}>
                  <small>{project.location}</small>
                  <strong>{project.title}</strong>
                  <em>{project.type}</em>
                  <i>
                    <Arrow />
                  </i>
                </span>
              </Link>
            </article>
          ))}
        </div>

        <div className={styles.projectControls} aria-label="Project controls">
          <span>{String(activeProject + 1).padStart(2, "0")} / 05</span>
          <button
            type="button"
            onClick={() => moveProject(-1)}
            aria-label="Previous project"
          >
            <Arrow direction="left" />
          </button>
          <button
            type="button"
            onClick={() => moveProject(1)}
            aria-label="Next project"
          >
            <Arrow />
          </button>
        </div>
      </section>

      <section
        id="about"
        className={styles.philosophy}
        aria-labelledby="philosophy-title"
      >
        <div className={styles.blueprintLines} aria-hidden="true" />
        <div className={styles.philosophyCopy} data-reveal>
          <p className={styles.sectionLabel}>Philosophy</p>
          <h2 id="philosophy-title">
            Good architecture
            <br />
            isn&apos;t about style.
            <br />
            It&apos;s about intention.
          </h2>
          <div className={styles.philosophyBody}>
            <p>
              Eugene Sasu Appiah is an architectural designer whose work
              reflects a growing understanding of space, function and context.
              His academic and creative projects bring together design thinking,
              technical development and a commitment to purposeful spaces.
            </p>
            <p>
              He believes architecture is more than bringing structures to life;
              it shapes how people experience and inhabit the world. His process
              combines thoughtful analysis, efficient delivery and
              uncompromising attention to quality.
            </p>
          </div>
          <div className={styles.expertise} aria-label="Areas of expertise">
            <span>Design thinking</span>
            <span>Revit</span>
            <span>Lumion</span>
            <span>Twinmotion</span>
            <span>Documentation</span>
          </div>
          <a
            href="#contact"
            className={`${styles.textLink} ${styles.darkLink}`}
          >
            Discover our approach <Arrow />
          </a>
        </div>

        <div
          className={styles.philosophyImage}
          data-reveal
          role="img"
          aria-label="Eugene Sasu Appiah presenting an architectural design process"
        />

        <div className={styles.signatureBlock} data-reveal>
          <Image
            src="/images/brand/eugene-sasu-appiah-signature.png"
            alt=""
            width={720}
            height={707}
            className={styles.signature}
            aria-hidden="true"
          />
          <div className={styles.signatureIdentity}>
            <strong>Eugene Sasu Appiah</strong>
            <span>Architect &amp; creative director</span>
          </div>
        </div>
      </section>

      <section
        id="skills"
        className={styles.skills}
        aria-labelledby="skills-title"
      >
        <div className={styles.skillsIntro} data-reveal>
          <p className={styles.sectionLabel}>Skills &amp; expertise / 01-04</p>
          <h2 id="skills-title">Ideas developed<br />with clarity &amp; care.</h2>
          <p>
            From the first brief to the final presentation, Eugene combines
            design thinking, technical precision and clear visual communication.
          </p>
        </div>
        <div className={styles.skillsGrid} data-reveal>
          {skills.map((skill) => (
            <article key={skill.number}>
              <span>{skill.number}</span>
              <h3>{skill.title}</h3>
              <p>{skill.description}</p>
            </article>
          ))}
        </div>
        <div className={styles.skillsToolkit} data-reveal>
          <span>Core toolkit</span>
          <p>Revit / Lumion / Twinmotion / Canva</p>
        </div>
      </section>

      <footer id="contact" className={styles.footer}>
        <div className={styles.footerBlueprint} aria-hidden="true" />

        <section className={styles.footerCta} aria-labelledby="footer-title">
          <h2 id="footer-title">
            Let&apos;s build
            <br />
            something <span>timeless.</span>
          </h2>

          <div className={styles.footerCtaMessage}>
            <p>
              Have a space in mind? Let&apos;s shape something clear, purposeful
              and enduring together.
            </p>
            <a
              href="mailto:eugeneshevey@gmail.com?subject=Vanta%20Forma%20Project%20Inquiry"
              className={styles.footerButton}
            >
              Start a conversation <Arrow />
            </a>
          </div>

          <div className={styles.footerDirect}>
            <small>Direct contact</small>
            <div className={styles.footerBacklinks} aria-label="Contact and social links">
              <a
                href="mailto:eugeneshevey@gmail.com"
                aria-label="Email Vanta Forma at eugeneshevey@gmail.com"
                title="Email: eugeneshevey@gmail.com"
              >
                <GmailIcon />
              </a>
              <a
                href="tel:+233592958353"
                aria-label="Call Vanta Forma at 059 295 8353"
                title="Call: 059 295 8353"
              >
                <PhoneIcon />
              </a>
              <a
                href="https://wa.me/233592958353"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message Vanta Forma on WhatsApp at 059 295 8353"
                title="WhatsApp: 059 295 8353"
              >
                <WhatsAppIcon />
              </a>
              <a
                href="https://www.instagram.com/dashevy_/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit dashevy_ on Instagram"
                title="Instagram: @dashevy_"
              >
                <InstagramIcon />
              </a>
            </div>
            <p>Accra, Ghana · Working globally</p>
          </div>
        </section>

        <div className={styles.footerMain}>
          <div className={styles.footerBrand}>
            <BrandMark compact />
            <p>
              Architecture shaped by light, context and intention—developed
              with clarity and care by Eugene Sasu Appiah.
            </p>
            <div className={styles.footerBrandMeta}>
              <span>Accra, Ghana</span>
            </div>
          </div>

          <nav className={styles.footerColumn} aria-label="Footer navigation">
            <h3>Explore</h3>
            <a href="#top">Home</a>
            <a href="#work">Selected work</a>
            <Link href="/projects">All projects</Link>
            <a href="#skills">Skills &amp; expertise</a>
          </nav>

          <nav className={styles.footerColumn} aria-label="Studio navigation">
            <h3>Studio</h3>
            <a href="#about">About Eugene</a>
            <a href="#about">Philosophy</a>
            <a href="#skills">Design capabilities</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className={`${styles.footerColumn} ${styles.footerPractice}`}>
            <h3>Practice</h3>
            <span>Residential</span>
            <span>Commercial</span>
            <span>Religious &amp; institutional</span>
            <span>Visualization</span>
          </div>
        </div>

        <div className={styles.footerBase}>
          <span>© 2026 Vanta Forma. All rights reserved.</span>
          <span className={styles.footerPrinciples}>
            Form <i /> Function <i /> Feeling
          </span>
          <a href="#top" className={styles.footerTop} aria-label="Back to top">
            Back to top <b>↑</b>
          </a>
        </div>
      </footer>

      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}
        aria-hidden={!menuOpen}
      >
        <div className={styles.mobileMenuTop}>
          <BrandMark />
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            Close <i />
            <i />
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          {navItems.map(([label, href], index) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)}>
              <span>0{index + 1}</span>
              {label}
              <Arrow />
            </a>
          ))}
        </nav>
        <p>Architecture shaped by clarity, restraint and purpose.</p>
      </div>
    </main>
  );
}
