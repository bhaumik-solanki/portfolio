import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 10 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          style={{
            position: 'fixed', right: 24, bottom: 24, zIndex: 40,
            width: 48, height: 48, borderRadius: 999,
            background: 'var(--accent)',
            color: 'var(--color-ink-950)',
            border: 'none',
            display: 'grid', placeItems: 'center',
            boxShadow: '0 12px 30px rgba(0,0,0,0.25)',
          }}
        >
          <ArrowUp size={18} strokeWidth={2.25} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
