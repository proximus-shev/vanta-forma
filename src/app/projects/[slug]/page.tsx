import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";
import ProjectGallery from "./ProjectGallery";
import styles from "./ProjectDetail.module.css";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

const navigation = [
  ["Home", "/"],
  ["Work", "/projects"],
  ["About", "/#about"],
  ["Philosophy", "/#about"],
  ["Skills", "/#skills"],
  ["Contact", "/#contact"],
];

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return { title: "Project Not Found | Vanta Forma" };
  }

  return {
    title: `${project.title} | Vanta Forma`,
    description: project.summary,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      type: "article",
      title: `${project.title} | Vanta Forma`,
      description: project.summary,
      url: `/projects/${project.slug}`,
      images: [
        {
          url: project.hero,
          alt: `${project.title} architectural visualization`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Vanta Forma`,
      description: project.summary,
      images: [project.hero],
    },
  };
}

function Arrow({ back = false }: { back?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 14" className={back ? styles.arrowBack : undefined}>
      <path d="M1 7h29M24 1l6 6-6 6" />
    </svg>
  );
}

function InsightIcon({ name }: { name: "type" | "concept" | "inspiration" | "planning" }) {
  if (name === "type") {
    return (
      <svg aria-hidden="true" viewBox="0 0 40 40">
        <path d="m20 3 14 8v18l-14 8-14-8V11l14-8Zm0 0v17m14-9-14 9-14-9m14 9v17" />
      </svg>
    );
  }

  if (name === "concept") {
    return (
      <svg aria-hidden="true" viewBox="0 0 40 40">
        <rect x="4" y="7" width="21" height="21" />
        <rect x="15" y="12" width="21" height="21" />
      </svg>
    );
  }

  if (name === "inspiration") {
    return (
      <svg aria-hidden="true" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="7" />
        <path d="M20 2v7m0 22v7M2 20h7m22 0h7M7.3 7.3l5 5m15.4 15.4 5 5m0-25.4-5 5M12.3 27.7l-5 5" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 40 40">
      <path d="M7 32V12h12V5h14v27H7Zm12 0V19h14M11 17h4m-4 6h4m8-12h6m-6 5h6m-6 8h6" />
    </svg>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const projectIndex = projects.findIndex((item) => item.slug === project.slug);
  const previousProject = projects[(projectIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="Vanta Forma home">
          <Image
            src="/images/brand/vanta-forma-logo.webp"
            alt=""
            width={1400}
            height={396}
            className={`${styles.brandImage} ${styles.desktopBrandImage}`}
          />
          <Image
            src="/images/brand/vanta-forma-logo.webp"
            alt=""
            width={1400}
            height={396}
            className={`${styles.brandImage} ${styles.mobileBrandImage}`}
          />
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary navigation">
          {navigation.map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className={label === "Work" ? styles.activeNav : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>

        <details className={styles.menu}>
          <summary aria-label="Open project navigation">
            <span aria-hidden="true"><i /><i /><i /></span>
          </summary>
          <nav aria-label="Compact navigation">
            {navigation.map(([label, href]) => (
              <Link key={label} href={href}>{label}</Link>
            ))}
          </nav>
        </details>
      </header>

      <section className={styles.hero} aria-labelledby="project-title">
        <Image
          src={project.hero}
          alt={`${project.title} architectural visualization`}
          fill
          preload
          sizes="100vw"
          quality={90}
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} />

        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link href="/">Home</Link><span>/</span>
          <Link href="/projects">Work</Link><span>/</span>
          <span>{project.title}</span>
        </nav>

        <div className={styles.heroContent}>
          <p className={styles.kicker}>{project.type}</p>
          <h1 id="project-title">{project.title}</h1>
          <p className={styles.heroTagline}>{project.summary}</p>
          <p className={styles.heroIntro}>{project.typeDescription}</p>
          <a className={styles.outlineLink} href="#gallery">
            View gallery <Arrow />
          </a>
        </div>

        <dl className={styles.heroFacts}>
          <div><dt>Location</dt><dd>{project.location}</dd></div>
          <div><dt>Type</dt><dd>{project.type}</dd></div>
          <div><dt>Status</dt><dd>{project.status}</dd></div>
          <div><dt>Project</dt><dd>{project.title}</dd></div>
        </dl>

        <aside className={styles.projectRail} aria-label="Portfolio project navigation">
          {projects.map((item) => (
            <Link
              key={item.slug}
              href={`/projects/${item.slug}`}
              className={item.slug === project.slug ? styles.projectRailActive : undefined}
              aria-current={item.slug === project.slug ? "page" : undefined}
              aria-label={`Project ${item.number}: ${item.title}`}
            >
              <span>{item.number}</span><i />
            </Link>
          ))}
        </aside>

        <div className={styles.heroControls} aria-label="Project controls">
          <Link href={`/projects/${previousProject.slug}`} aria-label={`Previous project: ${previousProject.title}`}>
            <Arrow back />
          </Link>
          <Link className={styles.gridControl} href="/projects" aria-label="View all projects">
            {Array.from({ length: 9 }, (_, index) => <i key={index} />)}
          </Link>
          <Link href={`/projects/${nextProject.slug}`} aria-label={`Next project: ${nextProject.title}`}>
            <Arrow />
          </Link>
        </div>

        <div className={styles.mobileHeroFooter}>
          <span>
            <Image
              src="/images/brand/vanta-forma-monogram.webp"
              alt=""
              width={520}
              height={590}
              aria-hidden="true"
            />
            <small>Designing spaces.<br />Elevating life.</small>
          </span>
          <Link href="/projects">
            Explore more work <Arrow />
          </Link>
        </div>
      </section>

      <section id="overview" className={styles.overview} aria-labelledby="overview-title">
        <div className={styles.overviewCopy}>
          <h2 id="overview-title"><i /> Project overview</h2>
          {project.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>

        <div className={styles.insights}>
          <article>
            <InsightIcon name="type" />
            <h3>Type</h3>
            <strong>{project.type}</strong>
            <p>{project.typeDescription}</p>
          </article>
          <article>
            <InsightIcon name="concept" />
            <h3>Concept</h3>
            <p>{project.concept}</p>
          </article>
          <article>
            <InsightIcon name="inspiration" />
            <h3>Inspiration</h3>
            <p>{project.inspiration}</p>
          </article>
          <article>
            <InsightIcon name="planning" />
            <h3>Plans &amp; other</h3>
            <p>{project.planRationale}</p>
          </article>
        </div>
      </section>

      <ProjectGallery
        images={project.plates}
        projectTitle={project.title}
        standardCards={project.slug === "house-of-god"}
      />

      <section className={styles.details} aria-label="Project details and features">
        <div className={styles.detailTable}>
          <h2><i /> Project details</h2>
          <dl>
            <div><dt>Project type</dt><dd>{project.type}</dd></div>
            <div><dt>Location</dt><dd>{project.location}</dd></div>
            <div><dt>Status</dt><dd>{project.status}</dd></div>
            <div><dt>Project</dt><dd>{project.number} of {String(projects.length).padStart(2, "0")}</dd></div>
            <div><dt>Student architect</dt><dd>Eugene Sasu Appiah</dd></div>
            <div><dt>Studio</dt><dd>Vanta Forma</dd></div>
            {project.collaborator && <div><dt>Collaborator</dt><dd>{project.collaborator}</dd></div>}
          </dl>
        </div>

        <div className={styles.designStatement}>
          <div className={styles.statementLines} aria-hidden="true" />
          <span aria-hidden="true">“</span>
          <blockquote>{project.concept}</blockquote>
          <p>Vanta Forma <small>Design intention</small></p>
        </div>

        <div className={styles.features}>
          <h2><i /> Project features</h2>
          <ul>
            {project.program.map((item) => <li key={item}><span>✓</span>{item}</li>)}
          </ul>
        </div>
      </section>

      <Link className={styles.nextProject} href={`/projects/${nextProject.slug}`}>
        <Image
          src={nextProject.hero}
          alt=""
          fill
          sizes="100vw"
          quality={90}
          className={styles.nextImage}
        />
        <span className={styles.nextShade} />
        <span className={styles.nextContent}>
          <small>Next project / {nextProject.number}</small>
          <strong>{nextProject.title}</strong>
          <em>{nextProject.summary}</em>
          <b>Explore project <Arrow /></b>
        </span>
        <i className={styles.nextArrow}><Arrow /></i>
      </Link>

      <footer className={styles.footer}>
        <Link href="/projects"><Arrow back /> All projects</Link>
        <p>Vanta Forma / Architecture with intention</p>
        <a href="mailto:eugeneshevey@gmail.com">eugeneshevey@gmail.com</a>
      </footer>
    </main>
  );
}
