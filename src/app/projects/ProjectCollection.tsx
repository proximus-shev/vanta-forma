"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import type { PortfolioProject } from "@/data/projects";
import styles from "./ProjectIndex.module.css";

type ProjectCategory = "All" | "Residential" | "Interior" | "Religious" | "Renovation";
type ProjectView = "grid" | "list";

const categories: ProjectCategory[] = [
  "All",
  "Residential",
  "Interior",
  "Religious",
  "Renovation",
];

function FilterIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h10M18 7h2M4 17h2M10 17h10" />
      <circle cx="16" cy="7" r="2" />
      <circle cx="8" cy="17" r="2" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <rect x="2" y="2" width="6" height="6" />
      <rect x="12" y="2" width="6" height="6" />
      <rect x="2" y="12" width="6" height="6" />
      <rect x="12" y="12" width="6" height="6" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M6 4h12M6 10h12M6 16h12" />
      <circle cx="2.5" cy="4" r=".7" />
      <circle cx="2.5" cy="10" r=".7" />
      <circle cx="2.5" cy="16" r=".7" />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M5 3.5h10v13l-5-3-5 3z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 28 12" aria-hidden="true">
      <path d="M1 6h24M20 1l5 5-5 5" />
    </svg>
  );
}

function matchesCategory(project: PortfolioProject, category: ProjectCategory) {
  if (category === "All") return true;

  return project.type.toLowerCase().includes(category.toLowerCase());
}

export default function ProjectCollection({
  projects,
}: {
  projects: PortfolioProject[];
}) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");
  const [projectView, setProjectView] = useState<ProjectView>("grid");
  const filterBarRef = useRef<HTMLDivElement>(null);

  const visibleProjects = useMemo(
    () => projects.filter((project) => matchesCategory(project, activeCategory)),
    [activeCategory, projects],
  );

  const moveToFilters = () => {
    filterBarRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    filterBarRef.current?.querySelector<HTMLButtonElement>("button")?.focus({
      preventScroll: true,
    });
  };

  return (
    <>
      <section className={styles.intro} aria-labelledby="projects-title">
        <span className={styles.orbits} aria-hidden="true" />
        <div className={styles.introTitle}>
          <p>Selected architecture / 01–{String(projects.length).padStart(2, "0")}</p>
          <h1 id="projects-title">
            <span>Shaped with</span>
            <strong>intention.</strong>
          </h1>
        </div>

        <p className={styles.introCopy}>
          A collection of spaces balancing form, function and feeling—each
          designed with purpose and crafted to endure.
        </p>

        <button className={styles.filterJump} type="button" onClick={moveToFilters}>
          <span>Filter projects</span>
          <FilterIcon />
        </button>
      </section>

      <section className={styles.collection} aria-label="Portfolio projects">
        <div className={styles.controls} id="project-filters" ref={filterBarRef}>
          <div
            className={styles.categories}
            role="toolbar"
            aria-label="Filter projects by category"
          >
            {categories.map((category) => (
              <button
                className={activeCategory === category ? styles.activeCategory : undefined}
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </div>

          <div
            className={styles.viewControls}
            role="group"
            aria-label="Choose project layout"
          >
            <span>View as</span>
            <button
              className={projectView === "grid" ? styles.activeView : undefined}
              type="button"
              onClick={() => setProjectView("grid")}
              aria-label="Grid view"
              aria-pressed={projectView === "grid"}
            >
              <GridIcon />
            </button>
            <button
              className={projectView === "list" ? styles.activeView : undefined}
              type="button"
              onClick={() => setProjectView("list")}
              aria-label="List view"
              aria-pressed={projectView === "list"}
            >
              <ListIcon />
            </button>
          </div>
        </div>

        <p className={styles.srOnly} aria-live="polite">
          Showing {visibleProjects.length} {visibleProjects.length === 1 ? "project" : "projects"} in {activeCategory === "All" ? "all categories" : activeCategory.toLowerCase()}.
        </p>

        <div
          className={`${styles.projectGrid} ${
            projectView === "list" ? styles.listView : ""
          }`}
        >
          {visibleProjects.map((project) => (
            <article className={styles.card} key={project.slug}>
              <Link href={`/projects/${project.slug}`}>
                <span className={styles.cardImage}>
                  <Image
                    src={project.hero}
                    alt=""
                    fill
                    sizes="(max-width: 760px) 100vw, (max-width: 1180px) 50vw, 25vw"
                  />
                  <span className={styles.imageShade} />
                  <span className={styles.bookmark} aria-hidden="true">
                    <BookmarkIcon />
                  </span>
                </span>

                <span className={styles.cardContent}>
                  <span className={styles.cardNumberRow}>
                    <small>{project.number}</small>
                    <ArrowIcon />
                  </span>
                  <strong>{project.title}</strong>
                  <span className={styles.cardType}>{project.type}</span>
                  <span className={styles.cardDetails}>
                    <span>{project.location}</span>
                    <i aria-hidden="true" />
                    <span>{project.status}</span>
                  </span>
                  <span className={styles.cardSummary}>{project.summary}</span>
                </span>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
