import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle.jsx';

const NAV_LINKS = [
  { href: '#home',     label: 'Home'     },
  { href: '#about',    label: 'About'    },
  { href: '#skills',   label: 'Skills'   },
  { href: '#journey',  label: 'Journey'  },
  { href: '#projects', label: 'Projects' },
  { href: '#contact',  label: 'Contact'  },
];

// Breakpoint at which the hamburger switches to desktop nav (matches CSS container-page)
const MOBILE_BREAKPOINT = 768;

export function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [open,      setOpen]      = useState(false);
  const [active,    setActive]    = useState('home');
  const [isMobile,  setIsMobile]  = useState(window.innerWidth < MOBILE_BREAKPOINT);

  // Close mobile menu automatically when resizing to desktop
  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(mobile);
      if (!mobile) setOpen(false);
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 32);

      const sections = NAV_LINKS.map((l) => l.href.slice(1));
      const offset = window.scrollY + 120;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= offset && el.offsetTop + el.offsetHeight > offset) {
          setActive(id);
          break;
        }
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        inset: '0 0 auto 0',
        zIndex: 50,
        background: scrolled
          ? 'color-mix(in srgb, var(--bg) 88%, transparent)'
          : 'color-mix(in srgb, var(--bg) 60%, transparent)',
        backdropFilter: 'blur(16px) saturate(140%)',
        WebkitBackdropFilter: 'blur(16px) saturate(140%)',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'background 0.2s ease, border-color 0.2s ease',
      }}
    >
      <div
        className="container-page"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}
      >
        <a href="#home" style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 500, letterSpacing: '-0.01em' }}>
          Bhaumik<span style={{ color: 'var(--accent)' }}>.</span>
        </a>

        {/* Desktop nav — only rendered on non-mobile */}
        {!isMobile && (
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                style={{
                  position: 'relative',
                  padding: '0.5rem 0.85rem',
                  fontSize: '0.875rem',
                  color: active === l.href.slice(1) ? 'var(--accent)' : 'var(--fg-muted)',
                  transition: 'color 0.15s ease',
                }}
              >
                {l.label}
                {active === l.href.slice(1) && (
                  <motion.span
                    layoutId="nav-underline"
                    style={{
                      position: 'absolute',
                      left: '0.85rem', right: '0.85rem',
                      bottom: 6, height: 1.5,
                      background: 'var(--accent)',
                      borderRadius: 999,
                    }}
                  />
                )}
              </a>
            ))}
          </nav>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ThemeToggle />

          {/* Hamburger — only rendered on mobile */}
          {isMobile && (
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 38, height: 38, borderRadius: 999,
                border: '1px solid var(--border-strong)',
                background: 'transparent', color: 'var(--fg)',
                cursor: 'pointer',
              }}
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {isMobile && open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            style={{
              background: 'color-mix(in srgb, var(--bg) 96%, transparent)',
              borderBottom: '1px solid var(--border)',
            }}
          >
            <div className="container-page" style={{ paddingBlock: '1rem', display: 'grid', gap: '0.5rem' }}>
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  style={{
                    padding: '0.65rem 0.5rem',
                    fontSize: '0.95rem',
                    color: active === l.href.slice(1) ? 'var(--accent)' : 'var(--fg)',
                  }}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
