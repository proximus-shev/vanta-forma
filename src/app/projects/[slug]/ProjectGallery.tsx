"use client";

import Image from "next/image";
import {
  type KeyboardEvent,
  type MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./ProjectDetail.module.css";

type GalleryImage = {
  src: string;
  alt: string;
  fit?: "cover" | "contain";
};

type ProjectGalleryProps = {
  images: GalleryImage[];
  projectTitle: string;
  standardCards?: boolean;
};

function GalleryArrow({ back = false }: { back?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 14" className={back ? styles.arrowBack : undefined}>
      <path d="M1 7h29M24 1l6 6-6 6" />
    </svg>
  );
}

export default function ProjectGallery({
  images,
  projectTitle,
  standardCards = false,
}: ProjectGalleryProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const scrollFrameRef = useRef<number | null>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const lightboxCloseRef = useRef<HTMLButtonElement>(null);
  const lightboxTriggerRef = useRef<HTMLElement | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const showImage = (index: number) => {
    const nextIndex = (index + images.length) % images.length;
    const rail = railRef.current;
    const target = rail?.children.item(nextIndex) as HTMLElement | null;

    setActiveImage(nextIndex);
    if (!rail || !target) return;

    const railRect = rail.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    rail.scrollTo({
      left: rail.scrollLeft + targetRect.left - railRect.left,
      behavior: "smooth",
    });
  };

  const handleRailScroll = () => {
    if (scrollFrameRef.current !== null) {
      window.cancelAnimationFrame(scrollFrameRef.current);
    }

    scrollFrameRef.current = window.requestAnimationFrame(() => {
      const rail = railRef.current;
      if (!rail) return;

      const railRect = rail.getBoundingClientRect();
      const useCenteredCard = window.matchMedia("(max-width: 760px)").matches;
      const railTarget = useCenteredCard
        ? railRect.left + railRect.width / 2
        : railRect.left;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      Array.from(rail.children).forEach((child, index) => {
        const childRect = child.getBoundingClientRect();
        const childTarget = useCenteredCard
          ? childRect.left + childRect.width / 2
          : childRect.left;
        const distance = Math.abs(childTarget - railTarget);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveImage((current) =>
        current === closestIndex ? current : closestIndex,
      );
      scrollFrameRef.current = null;
    });
  };

  const openLightbox = (index: number, trigger: HTMLElement) => {
    setActiveImage(index);
    lightboxTriggerRef.current = trigger;
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    window.requestAnimationFrame(() => lightboxTriggerRef.current?.focus());
  };

  const stepLightbox = useCallback((direction: number) => {
    setActiveImage(
      (current) => (current + direction + images.length) % images.length,
    );
  }, [images.length]);

  useEffect(
    () => () => {
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
    },
    [],
  );

  useEffect(() => {
    if (!lightboxOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lightboxCloseRef.current?.focus();

    const handleLightboxKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        stepLightbox(-1);
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        stepLightbox(1);
        return;
      }

      if (event.key !== "Tab") return;

      const controls = lightboxRef.current?.querySelectorAll<HTMLButtonElement>(
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

    document.addEventListener("keydown", handleLightboxKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleLightboxKeyDown);
    };
  }, [lightboxOpen, stepLightbox]);

  const closeOnBackdrop = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) closeLightbox();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showImage(activeImage - 1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showImage(activeImage + 1);
    }
  };

  return (
    <section
      id="gallery"
      className={`${styles.gallery} ${standardCards ? styles.galleryStandardCards : ""}`}
      aria-labelledby="gallery-title"
    >
      <div className={styles.galleryHeading}>
        <h2 id="gallery-title">
          <i /> Project gallery
          <span className={styles.galleryProjectTitle}>— {projectTitle}</span>
        </h2>
        <button
          type="button"
          className={styles.galleryViewAll}
          onClick={(event) => openLightbox(0, event.currentTarget)}
        >
          View all images <GalleryArrow />
        </button>
      </div>

      <div className={styles.galleryStage}>
        <button
          type="button"
          className={`${styles.galleryControl} ${styles.galleryPrevious}`}
          onClick={() => showImage(activeImage - 1)}
          disabled={images.length < 2}
          aria-label={`Show previous ${projectTitle} image`}
        >
          <GalleryArrow back />
        </button>

        <div
          id="gallery-track"
          ref={railRef}
          className={styles.galleryRail}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onScroll={handleRailScroll}
          aria-label={`${projectTitle} image gallery. Use left and right arrow keys to navigate.`}
        >
          {images.map((image, index) => (
            <figure
              id={`gallery-image-${index + 1}`}
              key={image.src}
              onMouseEnter={() => setActiveImage(index)}
            >
              <button
                type="button"
                className={`${styles.galleryImage} ${
                  image.fit === "contain" ? styles.galleryImageContain : ""
                }`}
                onClick={(event) => openLightbox(index, event.currentTarget)}
                aria-label={`Select image ${index + 1} of ${images.length}: ${image.alt}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 760px) 88vw, (max-width: 1100px) 48vw, 34vw"
                />
              </button>
              <figcaption>
                Image {String(index + 1).padStart(2, "0")}
              </figcaption>
            </figure>
          ))}
        </div>

        <button
          type="button"
          className={`${styles.galleryControl} ${styles.galleryNext}`}
          onClick={() => showImage(activeImage + 1)}
          disabled={images.length < 2}
          aria-label={`Show next ${projectTitle} image`}
        >
          <GalleryArrow />
        </button>
      </div>

      <div className={styles.galleryPagination} aria-live="polite">
        {images.map((image, index) => (
          <button
            type="button"
            key={image.src}
            className={index === activeImage ? styles.galleryDotActive : undefined}
            onClick={() => showImage(index)}
            aria-label={`Show image ${index + 1} of ${images.length}`}
            aria-current={index === activeImage ? "true" : undefined}
            aria-controls={`gallery-image-${index + 1}`}
          />
        ))}
        <span className={styles.srOnly}>
          Image {activeImage + 1} of {images.length}
        </span>
      </div>

      {lightboxOpen ? (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`${projectTitle} image viewer`}
          onMouseDown={closeOnBackdrop}
        >
          <div className={styles.lightboxFrame} ref={lightboxRef}>
            <button
              ref={lightboxCloseRef}
              type="button"
              className={styles.lightboxClose}
              onClick={closeLightbox}
              aria-label="Close image viewer"
            >
              <i />
              <i />
            </button>

            <div className={styles.lightboxImage}>
              <Image
                src={images[activeImage].src}
                alt={images[activeImage].alt}
                fill
                sizes="100vw"
                quality={90}
              />
            </div>

            <div className={styles.lightboxFooter}>
              <p>
                <span>{projectTitle}</span>
                <small>
                  Image {String(activeImage + 1).padStart(2, "0")} /{" "}
                  {String(images.length).padStart(2, "0")}
                </small>
              </p>
              <div>
                <button
                  type="button"
                  onClick={() => stepLightbox(-1)}
                  disabled={images.length < 2}
                  aria-label="Previous image"
                >
                  <GalleryArrow back />
                </button>
                <button
                  type="button"
                  onClick={() => stepLightbox(1)}
                  disabled={images.length < 2}
                  aria-label="Next image"
                >
                  <GalleryArrow />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
