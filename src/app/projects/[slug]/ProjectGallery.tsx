"use client";

import Image from "next/image";
import { type KeyboardEvent, useRef, useState } from "react";
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
  const [activeImage, setActiveImage] = useState(0);

  const showImage = (index: number) => {
    const nextIndex = (index + images.length) % images.length;
    const target = railRef.current?.children.item(nextIndex) as HTMLElement | null;

    setActiveImage(nextIndex);
    railRef.current?.scrollTo({
      left: target?.offsetLeft ?? 0,
      behavior: "smooth",
    });
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
        <h2 id="gallery-title"><i /> Project gallery</h2>
        <a href="#gallery-track">
          View all images <GalleryArrow />
        </a>
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
          aria-label={`${projectTitle} image gallery. Use left and right arrow keys to navigate.`}
        >
          {images.map((image, index) => (
            <figure key={image.src}>
              <div
                className={`${styles.galleryImage} ${
                  image.fit === "contain" ? styles.galleryImageContain : ""
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 760px) 88vw, (max-width: 1100px) 48vw, 34vw"
                />
              </div>
              <figcaption>
                <span>Image {String(index + 1).padStart(2, "0")}</span>
                <span>{projectTitle}</span>
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
          />
        ))}
        <span className={styles.srOnly}>
          Image {activeImage + 1} of {images.length}
        </span>
      </div>
    </section>
  );
}
