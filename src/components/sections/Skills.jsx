/**
 * Skills — grouped by category, each skill shown as a chip with an icon and
 * name. No proficiency dots.
 *
 * Card stagger: 40ms each via whileInView, not load-time AOS, so they animate
 * the moment they enter the viewport.
 */
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader.jsx';
import { useSkills } from '../../hooks/useContent.js';

const CATEGORY_LABELS = {
  languages: 'Languages',
  frontend:  'Frontend',
  backend:   'Backend',
  database:  'Databases',
  aiml:      'AI / ML',
  tools:     'Tools & Platforms',
  other:     'Other',
};

export function Skills() {
  const { data: skills = [], isLoading } = useSkills();

  const grouped = skills.reduce((acc, s) => {
    (acc[s.category] ||= []).push(s);
    return acc;
  }, {});

  const orderedCats = ['languages', 'frontend', 'backend', 'database', 'aiml', 'tools', 'other'].filter(
    (c) => grouped[c]?.length,
  );

  return (
    <section id="skills" className="section" style={{ position: 'relative', zIndex: 2 }}>
      <div className="container-page">
        <SectionHeader
          eyebrow="02 — What I work with"
          title="The"
          emphasis="toolkit"
          subtitle="Technologies I reach for first."
        />

        {isLoading && <div style={{ color: 'var(--fg-subtle)' }}>Loading…</div>}

        <div className="skills-grid">
          {orderedCats.map((cat, ci) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: ci * 0.04, ease: [0.22, 1, 0.36, 1] }}
              className="card"
              style={{ padding: '1.5rem' }}
            >
              <div
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  marginBottom: '1rem',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    fontWeight: 500,
                    margin: 0,
                  }}
                >
                  {CATEGORY_LABELS[cat]}
                </h3>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--fg-subtle)' }}>
                  {String(grouped[cat].length).padStart(2, '0')}
                </span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {grouped[cat].map((s, i) => (
                  <motion.div
                    key={s._id}
                    initial={{ opacity: 0, scale: 0.92 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.025 }}
                  >
                    <SkillChip skill={s} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <style>{`
          .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
            gap: 1rem;
          }
        `}</style>
      </div>
    </section>
  );
}

function SkillChip({ skill }) {
  const Icon = Icons[skill.icon] ?? Icons.Code;

  return (
    <div
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
        padding: '0.45rem 0.7rem',
        borderRadius: 10,
        border: '1px solid var(--border-strong)',
        background: 'color-mix(in srgb, var(--bg-elevated) 60%, transparent)',
        fontSize: '0.85rem',
      }}
    >
      <Icon size={14} strokeWidth={1.75} style={{ color: 'var(--accent)' }} />
      <span>{skill.name}</span>
    </div>
  );
}
