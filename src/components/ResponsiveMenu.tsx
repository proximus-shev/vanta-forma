"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type MenuItem = {
  label: string;
  href: string;
};

type ResponsiveMenuProps = {
  items: MenuItem[];
  className: string;
  activeLabel?: string;
  activeClassName?: string;
  navigationLabel: string;
};

export default function ResponsiveMenu({
  items,
  className,
  activeLabel,
  activeClassName,
  navigationLabel,
}: ResponsiveMenuProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const closeMenu = (restoreFocus = false) => {
    if (detailsRef.current) detailsRef.current.open = false;
    setOpen(false);
    if (restoreFocus) summaryRef.current?.focus({ preventScroll: true });
  };

  useEffect(() => {
    if (!open) return;

    const closeOnOutsidePress = (event: PointerEvent) => {
      if (!detailsRef.current?.contains(event.target as Node)) closeMenu();
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu(true);
      }
    };

    document.addEventListener("pointerdown", closeOnOutsidePress);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePress);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <details
      ref={detailsRef}
      className={className}
      onToggle={(event) => setOpen(event.currentTarget.open)}
    >
      <summary
        ref={summaryRef}
        aria-label={`${open ? "Close" : "Open"} ${navigationLabel}`}
        aria-expanded={open}
      >
        <span aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </summary>
      <nav aria-label={navigationLabel}>
        {items.map((item) => (
          <Link
            href={item.href}
            key={item.label}
            className={
              item.label === activeLabel ? activeClassName : undefined
            }
            aria-current={item.label === activeLabel ? "page" : undefined}
            onClick={() => closeMenu()}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </details>
  );
}
