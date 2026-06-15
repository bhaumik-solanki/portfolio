import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader.jsx';
import { useAchievements } from '../../hooks/useContent.js';

export function Achievements() {
  const { data: items = [], isLoading } = useAchievements();

  return (
    <section id="achievements" className="section" style={{ position: 'relative', zIndex: 2 }}>
      <div className="container-page">
        <SectionHeader
          eyebrow="05 — Wins along the way"
          title="Achievements &"
          emphasis="certifications."
        />

        {isLoading && <div style={{ color: 'var(--fg-subtle)' }}>Loading…</div>}

        <div className="ach-grid">
          {items.map((a, i) => {
            const Icon = Icons[a.icon] ?? Icons.Trophy;
            return (
              <motion.div
                key={a._id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                className="card"
                style={{ padding: '1.5rem' }}
              >
                <div
                  style={{
                    width: 44, height: 44,
                    borderRadius: 12,
                    display: 'grid', placeItems: 'center',
                    background: 'color-mix(in srgb, var(--accent) 12%, transparent)',
                    color: 'var(--accent)',
                    marginBottom: '1rem',
                  }}
                >
                  <Icon size={20} strokeWidth={1.75} />
                </div>
                <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '1.1rem' }}>
                  {a.title}
                </h3>
                {a.description && (
                  <p style={{ marginTop: '0.4rem', color: 'var(--fg-muted)', fontSize: '0.9rem', lineHeight: 1.55 }}>
                    {a.description}
                  </p>
                )}
                {a.date && (
                  <div
                    style={{
                      marginTop: '0.85rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      letterSpacing: '0.08em',
                      color: 'var(--fg-subtle)',
                    }}
                  >
                    {a.date}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        <style>{`
          .ach-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            gap: 1rem;
          }
        `}</style>
      </div>
    </section>
  );
}
