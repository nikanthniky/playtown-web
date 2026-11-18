"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Brand } from "./brand";
import { navigation } from "@/lib/site";
import { Button } from "./ui/button";
export function SiteShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const path = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const mobileRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 24);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, []);
  useEffect(() => {
    if (path !== "/") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-15% 0px -55% 0px" },
    );
    navigation.forEach((n) => {
      const el = document.getElementById(n.section);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [path]);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = mobileRef.current?.querySelector<HTMLAnchorElement>("a");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab") {
        const items = [
          toggleRef.current,
          ...Array.from(
            mobileRef.current?.querySelectorAll<HTMLAnchorElement>("a") || [],
          ),
        ].filter(
          (el): el is HTMLButtonElement | HTMLAnchorElement => el !== null,
        );
        const index = items.indexOf(
          document.activeElement as HTMLAnchorElement,
        );
        if (e.shiftKey && index === 0) {
          e.preventDefault();
          items.at(-1)?.focus();
        } else if (!e.shiftKey && index === items.length - 1) {
          e.preventDefault();
          items[0]?.focus();
        }
      }
    };
    const media = window.matchMedia("(min-width: 961px)");
    const resize = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", resize);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      media.removeEventListener("change", resize);
    };
  }, [open]);
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div
          className="nav-wrap"
          onClick={(event) => {
            if ((event.target as HTMLElement).closest("a")) setOpen(false);
          }}
        >
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map((n) => (
              <Link
                key={n.section}
                href={n.href}
                aria-current={
                  path === "/" && active === n.section ? "location" : undefined
                }
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <Button asChild size="sm" className="nav-cta">
            <Link href="/#partners">
              Let’s build together <ArrowUpRight size={15} />
            </Link>
          </Button>
          <button
            ref={toggleRef}
            className="menu-toggle"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close navigation" : "Open navigation"}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        <AnimatePresence>
          {open && (
            <motion.nav
              ref={mobileRef}
              id="mobile-nav"
              className="mobile-nav"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "calc(100dvh - 76px)" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mobile-nav-inner">
                <span className="eyebrow">A SHARED LOVE OF SPORT</span>
                {navigation.map((n, i) => (
                  <motion.div
                    key={n.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.045 }}
                  >
                    <Link
                      href={n.href}
                      onClick={() => {
                        setOpen(false);
                        toggleRef.current?.focus();
                      }}
                    >
                      <span className="mobile-nav-index">0{i + 1}</span>
                      {n.label}
                      <ArrowUpRight size={22} />
                    </Link>
                  </motion.div>
                ))}
                <p>
                  Many sports. One community.
                  <br />
                  Where Every Sport Belongs.
                </p>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
      {children}
    </MotionConfig>
  );
}
