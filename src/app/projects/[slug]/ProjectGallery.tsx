"use client";

import Image from "next/image";
import {
  type KeyboardEvent,
  type MouseEvent,
  type TouchEvent,
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
  projectLocation: string;
  projectNumber: string;
  projectStatus: string;
  projectTitle: string;
  projectType: string;
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
  projectLocation,
  projectNumber,
  projectStatus,
  projectTitle,
  projectType,
  standardCards = false,
}: ProjectGalleryProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const scrollFrameRef = useRef<number | null>(null);
  const programmaticImageRef = useRef<number | null>(null);
  const programmaticScrollEndRef = useRef<number | null>(null);
  const viewerTouchStartRef = useRef<{ x: number; y: number } | null>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const lightboxCloseRef = useRef<HTMLButtonElement>(null);
  const lightboxTriggerRef = useRef<HTMLElement | null>(null);
  const restoringImageRef = useRef<number | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxDirection, setLightboxDirection] = useState<
    "next" | "previous" | null
  >(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const galleryStorageKey = `vanta-forma:gallery:${projectTitle}`;

  const showImage = useCallback((index: number) => {
    const nextIndex = (index + images.length) % images.length;
    const rail = railRef.current;
    const target = rail?.children.item(nextIndex) as HTMLElement | null;

    programmaticImageRef.current = nextIndex;
    setActiveImage(nextIndex);
    if (!rail || !target) {
      programmaticImageRef.current = null;
      return;
    }

    if (programmaticScrollEndRef.current !== null) {
      window.clearTimeout(programmaticScrollEndRef.current);
    }

    const railRect = rail.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    rail.scrollTo({
      left: rail.scrollLeft + targetRect.left - railRect.left,
      behavior: "smooth",
    });

    programmaticScrollEndRef.current = window.setTimeout(() => {
      programmaticImageRef.current = null;
      programmaticScrollEndRef.current = null;
    }, 650);
  }, [images.length]);

  const handleRailScroll = () => {
    if (scrollFrameRef.current !== null) {
      window.cancelAnimationFrame(scrollFrameRef.current);
    }

    scrollFrameRef.current = window.requestAnimationFrame(() => {
      const rail = railRef.current;
      if (!rail) return;

      if (programmaticImageRef.current !== null) {
        setActiveImage(programmaticImageRef.current);

        if (programmaticScrollEndRef.current !== null) {
          window.clearTimeout(programmaticScrollEndRef.current);
        }
        programmaticScrollEndRef.current = window.setTimeout(() => {
          programmaticImageRef.current = null;
          programmaticScrollEndRef.current = null;
        }, 180);
        scrollFrameRef.current = null;
        return;
      }

      const useCenteredCard = window.matchMedia("(max-width: 760px)").matches;
      if (!useCenteredCard) {
        scrollFrameRef.current = null;
        return;
      }

      const railRect = rail.getBoundingClientRect();
      const railTarget = railRect.left + railRect.width / 2;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      Array.from(rail.children).forEach((child, index) => {
        const childRect = child.getBoundingClientRect();
        const childTarget = childRect.left + childRect.width / 2;
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
    if (scrollFrameRef.current !== null) {
      window.cancelAnimationFrame(scrollFrameRef.current);
      scrollFrameRef.current = null;
    }
    setActiveImage(index);
    setLightboxDirection(null);
    lightboxTriggerRef.current = trigger;
    setLightboxOpen(true);
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    window.requestAnimationFrame(() => {
      const activeTrigger = railRef.current?.children
        .item(activeImage)
        ?.querySelector<HTMLButtonElement>("button");

      (activeTrigger ?? lightboxTriggerRef.current)?.focus({ preventScroll: true });
      showImage(activeImage);
    });
  }, [activeImage, showImage]);

  const stepLightbox = useCallback((direction: number) => {
    setLightboxDirection(direction > 0 ? "next" : "previous");
    setActiveImage(
      (current) => (current + direction + images.length) % images.length,
    );
  }, [images.length]);

  const selectLightboxImage = (index: number) => {
    if (index === activeImage) return;
    setLightboxDirection(index > activeImage ? "next" : "previous");
    setActiveImage(index);
  };

  useEffect(
    () => () => {
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
      if (programmaticScrollEndRef.current !== null) {
        window.clearTimeout(programmaticScrollEndRef.current);
      }
    },
    [],
  );

  useEffect(() => {
    const savedImage = Number.parseInt(
      window.sessionStorage.getItem(galleryStorageKey) ?? "",
      10,
    );

    if (
      Number.isNaN(savedImage) ||
      savedImage < 0 ||
      savedImage >= images.length
    ) {
      restoringImageRef.current = null;
      return;
    }

    restoringImageRef.current = savedImage;

    window.requestAnimationFrame(() => {
      setActiveImage(savedImage);
      const rail = railRef.current;
      const target = rail?.children.item(savedImage) as HTMLElement | null;
      if (!rail || !target) return;

      const railRect = rail.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      rail.scrollTo({
        left: rail.scrollLeft + targetRect.left - railRect.left,
        behavior: "auto",
      });
    });
  }, [galleryStorageKey, images.length]);

  useEffect(() => {
    if (
      restoringImageRef.current !== null &&
      restoringImageRef.current !== activeImage
    ) {
      return;
    }

    restoringImageRef.current = null;
    window.sessionStorage.setItem(galleryStorageKey, String(activeImage));
  }, [activeImage, galleryStorageKey]);

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
  }, [closeLightbox, lightboxOpen, stepLightbox]);

  const closeOnBackdrop = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) closeLightbox();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (lightboxOpen) return;

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showImage(activeImage - 1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showImage(activeImage + 1);
    }
  };

  const handleViewerTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    if (!touch) return;
    viewerTouchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleViewerTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = viewerTouchStartRef.current;
    const touch = event.changedTouches[0];
    viewerTouchStartRef.current = null;
    if (!start || !touch) return;

    const horizontalDistance = touch.clientX - start.x;
    const verticalDistance = touch.clientY - start.y;
    if (
      Math.abs(horizontalDistance) < 45 ||
      Math.abs(horizontalDistance) <= Math.abs(verticalDistance)
    ) {
      return;
    }

    stepLightbox(horizontalDistance < 0 ? 1 : -1);
  };

  const previousImage = (activeImage - 1 + images.length) % images.length;
  const nextImage = (activeImage + 1) % images.length;

  return (
    <section
      id="gallery"
      className={`${styles.gallery} ${standardCards ? styles.galleryStandardCards : ""}`}
      aria-labelledby="gallery-title"
      onKeyDown={handleKeyDown}
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
                } ${index === activeImage ? styles.galleryImageActive : ""}`}
                onClick={(event) => openLightbox(index, event.currentTarget)}
                onFocus={() => setActiveImage(index)}
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
            <div className={`${styles.lightboxImage} ${
              images[activeImage].fit === "contain" ? styles.lightboxImageContain : ""
            }`}
              onTouchStart={handleViewerTouchStart}
              onTouchEnd={handleViewerTouchEnd}
              onTouchCancel={() => {
                viewerTouchStartRef.current = null;
              }}
            >
              <Image
                key={images[activeImage].src}
                src={images[activeImage].src}
                alt={images[activeImage].alt}
                fill
                sizes="100vw"
                quality={90}
                className={
                  lightboxDirection === "next"
                    ? styles.lightboxSlideNext
                    : lightboxDirection === "previous"
                      ? styles.lightboxSlidePrevious
                      : undefined
                }
              />
              <Image
                src="/images/brand/vanta-forma-logo.webp"
                alt="Vanta Forma"
                width={1400}
                height={396}
                className={styles.lightboxMobileBrand}
              />

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

              <div className={styles.lightboxSideControls}>
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

            <div className={styles.lightboxFilmstrip}>
              <button type="button" onClick={() => stepLightbox(-1)} aria-label="Previous image">
                <strong>{String(previousImage + 1).padStart(2, "0")}</strong>
                <span>Previous</span>
              </button>

              <div className={styles.lightboxThumbnails} aria-label="Select an image">
                {images.map((image, index) => (
                  <button
                    type="button"
                    key={image.src}
                    className={index === activeImage ? styles.lightboxThumbnailActive : undefined}
                    onClick={() => selectLightboxImage(index)}
                    aria-label={`View image ${index + 1} of ${images.length}`}
                    aria-current={index === activeImage ? "true" : undefined}
                  >
                    <Image src={image.src} alt="" fill sizes="150px" aria-hidden="true" />
                  </button>
                ))}
              </div>

              <button type="button" onClick={() => stepLightbox(1)} aria-label="Next image">
                <span>Next</span>
                <strong>{String(nextImage + 1).padStart(2, "0")}</strong>
              </button>
            </div>

            <div className={styles.lightboxMeta}>
              <dl>
                <div><dt>Project</dt><dd>{projectNumber} — {projectTitle}</dd></div>
                <div><dt>Location</dt><dd>{projectLocation}</dd></div>
                <div><dt>Type</dt><dd>{projectType}</dd></div>
                <div><dt>Status</dt><dd>{projectStatus}</dd></div>
              </dl>
              <p>Architecture shaped with intention.</p>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
