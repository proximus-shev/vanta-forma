import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import ProjectCollection from "./ProjectCollection";
import styles from "./ProjectIndex.module.css";

export const metadata: Metadata = {
  title: "Projects | Vanta Forma",
  description:
    "Selected residential, religious and interior architecture by Vanta Forma.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    type: "website",
    title: "Projects | Vanta Forma",
    description:
      "Selected residential, religious and interior architecture by Vanta Forma.",
    url: "/projects",
    images: [
      {
        url: projects[0].hero,
        alt: `${projects[0].title} architectural visualization`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Vanta Forma",
    description:
      "Selected residential, religious and interior architecture by Vanta Forma.",
    images: [projects[0].hero],
  },
};

const navigation = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/projects", active: true },
  { label: "About", href: "/#about" },
  { label: "Philosophy", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
];

export default function ProjectsPage() {
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
          {navigation.map((item) => (
            <Link
              className={item.active ? styles.activeNav : undefined}
              href={item.href}
              key={item.label}
              aria-current={item.active ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <details className={styles.menu}>
          <summary aria-label="Open navigation menu">
            <span aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </summary>
          <nav aria-label="Menu navigation">
            {navigation.map((item) => (
              <Link href={item.href} key={item.label}>
                {item.label}
              </Link>
            ))}
          </nav>
        </details>
      </header>

      <ProjectCollection projects={projects} />

      <footer className={styles.footer}>
        <p>Have a project in mind?</p>
        <a href="mailto:eugeneshevey@gmail.com">eugeneshevey@gmail.com</a>
        <span>© 2026 Vanta Forma</span>
      </footer>
    </main>
  );
}
