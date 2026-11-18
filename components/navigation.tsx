"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Brand } from "./brand";
import { navigation } from "@/lib/site";
export function Navigation() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const button = useRef<HTMLButtonElement>(null);
  const mobile = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    mobile.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const media = window.matchMedia("(min-width: 901px)");
    const resize = () => {
      if (media.matches) setOpen(false);
    };
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    media.addEventListener("change", resize);
    resize();
    document.addEventListener("keydown", close);
    return () => {
      media.removeEventListener("change", resize);
      document.removeEventListener("keydown", close);
    };
  }, [open]);
  const links = [
    ...navigation,
    { label: "Get in touch", href: "/contact/", section: "contact" },
  ];
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={path === n.href ? "page" : undefined}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <Link className="nav-cta" href="/contact/">
          Get in touch <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
        <button
          ref={button}
          className="menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      {open && (
        <nav
          ref={mobile}
          id="mobile-navigation"
          className="mobile-nav container"
          aria-label="Mobile navigation"
        >
          {links.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => {
                setOpen(false);
                button.current?.focus();
              }}
            >
              {n.label}
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
