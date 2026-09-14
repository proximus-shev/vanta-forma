"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { PortfolioProject } from "@/data/projects";
import styles from "./ProjectIndex.module.css";

type ProjectCategory =
  | "All"
  | "Residential"
  | "Hospitality"
  | "Interior"
  | "Religious"
  | "Renovation";
type ProjectView = "grid" | "list";

const categories: ProjectCategory[] = [
  "All",
  "Residential",
  "Hospitality",
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

function ArrowIcon() {
  return (
    <svg viewBox="0 0 28 12" aria-hidden="true">
      <path d="M1 6h24M20 1l5 5-5 5" />
    </svg>
  );
}

function matchesCategory(project: PortfolioProject, category: ProjectCategory) {
  if (category === "All") return true;

  const projectType = project.type.toLowerCase();

  if (category === "Renovation") return projectType.includes("renovation");
  if (category === "Religious") return projectType.includes("religious");

  return projectType === category.toLowerCase();
}

export default function ProjectCollection({
  projects,
}: {
  projects: PortfolioProject[];
}) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");
  const [projectView, setProjectView] = useState<ProjectView>("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const filterControlRef = useRef<HTMLDivElement>(null);
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const filterPanelRef = useRef<HTMLDivElement>(null);

  const visibleProjects = useMemo(
    () => projects.filter((project) => matchesCategory(project, activeCategory)),
    [activeCategory, projects],
  );

  const categoriesWithCounts = useMemo(
    () =>
      categories.map((category) => ({
        category,
        count: projects.filter((project) => matchesCategory(project, category)).length,
      })),
    [projects],
  );

  useEffect(() => {
    if (!filtersOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    filterPanelRef.current
      ?.querySelector<HTMLButtonElement>("button[aria-pressed='true']")
      ?.focus();

    const closeOnOutsidePress = (event: PointerEvent) => {
      if (!filterControlRef.current?.contains(event.target as Node)) {
        setFiltersOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setFiltersOpen(false);
        window.requestAnimationFrame(() =>
          filterButtonRef.current?.focus({ preventScroll: true }),
        );
        return;
      }

      if (event.key !== "Tab") return;

      const controls = filterPanelRef.current?.querySelectorAll<HTMLButtonElement>(
        "button:not(:disabled)",
      );
      if (!controls?.length) return;

      const firstControl = controls[0];
      const lastControl = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === firstControl) {
        event.preventDefault();
        lastControl.focus();
      } else if (!event.shiftKey && document.activeElement === lastControl) {
        event.preventDefault();
        firstControl.focus();
      }
    };

    document.addEventListener("pointerdown", closeOnOutsidePress);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("pointerdown", closeOnOutsidePress);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [filtersOpen]);

  const selectCategory = (
    category: ProjectCategory,
    restoreFilterFocus = false,
  ) => {
    setActiveCategory(category);
    setFiltersOpen(false);
    if (restoreFilterFocus) {
      window.requestAnimationFrame(() =>
        filterButtonRef.current?.focus({ preventScroll: true }),
      );
    }
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
          A collection of spaces balancing form, function and feeling, each
          designed with purpose and crafted to endure.
        </p>

        <div className={styles.filterControl} ref={filterControlRef}>
          <button
            ref={filterButtonRef}
            className={styles.filterJump}
            type="button"
            onClick={() => setFiltersOpen((isOpen) => !isOpen)}
            aria-expanded={filtersOpen}
            aria-controls="project-filter-panel"
          >
            <span>
              {activeCategory === "All"
                ? "Filter projects"
                : `Filter: ${activeCategory}`}
            </span>
            <FilterIcon />
          </button>

          {filtersOpen ? (
            <>
              <button
                className={styles.filterBackdrop}
                type="button"
                onClick={() => {
                  setFiltersOpen(false);
                  window.requestAnimationFrame(() =>
                    filterButtonRef.current?.focus({ preventScroll: true }),
                  );
                }}
                aria-label="Close project filters"
                tabIndex={-1}
              />
              <div
                ref={filterPanelRef}
                className={styles.filterPanel}
                id="project-filter-panel"
                role="dialog"
                aria-modal="true"
                aria-label="Filter projects by category"
              >
                <div className={styles.filterPanelHeader}>
                  <span>Choose a category</span>
                  <strong>{String(projects.length).padStart(2, "0")} projects</strong>
                </div>
                <div className={styles.filterOptions}>
                  {categoriesWithCounts.map(({ category, count }) => (
                    <button
                      className={
                        activeCategory === category
                          ? styles.activeFilterOption
                          : undefined
                      }
                      key={category}
                      type="button"
                      onClick={() => selectCategory(category, true)}
                      aria-pressed={activeCategory === category}
                    >
                      <span>{category}</span>
                      <small>{String(count).padStart(2, "0")}</small>
                    </button>
                  ))}
                </div>
                {activeCategory !== "All" ? (
                  <button
                    className={styles.clearFilter}
                    type="button"
                    onClick={() => selectCategory("All", true)}
                  >
                    Clear filter
                  </button>
                ) : null}
              </div>
            </>
          ) : null}
        </div>
      </section>

      <section className={styles.collection} aria-label="Portfolio projects">
        <div className={styles.controls} id="project-filters">
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
                onClick={() => selectCategory(category)}
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
