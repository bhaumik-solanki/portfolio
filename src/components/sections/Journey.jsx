/**
 * Journey — Education + Experience.
 * Fully responsive: 3-column grid (date | rail | content) on tablet+,
 * collapses to 2-column (rail | content, date above) below 640px.
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Briefcase } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader.jsx';
import { useExperience } from '../../hooks/useContent.js';

export function Journey() {
  const { data: items = [], isLoading } = useExperience();
  const [tab, setTab] = useState('education');
  const filtered = items.filter((i) => i.kind === tab);

  return (
    <section id="journey" className="section" style={{ position: 'relative', zIndex: 2 }}>
      <div className="container-page">
        <SectionHeader
          eyebrow="03 — Where I've been"
          title="My"
          emphasis="journey."
          subtitle="Education and professional experience."
        />

        {/* Tabs */}
        <div
          style={{
            display: 'inline-flex',
            padding: 4,
            borderRadius: 999,
            border: '1px solid var(--border)',
            background: 'var(--bg-card)',
            marginBottom: '2.5rem',
          }}
        >
          <TabButton active={tab === 'education'} onClick={() => setTab('education')} icon={GraduationCap}>
            Education
          </TabButton>
          <TabButton active={tab === 'work'} onClick={() => setTab('work')} icon={Briefcase}>
            Experience
          </TabButton>
        </div>

        {isLoading && <div style={{ color: 'var(--fg-subtle)' }}>Loading…</div>}

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
          >
            {filtered.map((item, i) => (
              <JourneyRow key={item._id} item={item} index={i} isLast={i === filtered.length - 1} />
            ))}
            {!filtered.length && !isLoading && (
              <div style={{ color: 'var(--fg-subtle)' }}>No entries yet.</div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function TabButton({ active, onClick, icon: Icon, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
        padding: '0.55rem 1rem',
        borderRadius: 999, border: 'none',
        background: active ? 'var(--accent)' : 'transparent',
        color: active ? 'var(--color-ink-950)' : 'var(--fg-muted)',
        fontSize: '0.85rem', fontWeight: 500,
        cursor: 'pointer',
        transition: 'background 0.2s ease, color 0.2s ease',
      }}
    >
      <Icon size={14} strokeWidth={2} />{children}
    </button>
  );
}

function JourneyRow({ item, index, isLast }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="journey-row"
    >
      {/* Date col — hidden on mobile, shown via .journey-date-mobile instead */}
      <div className="journey-date">
        {item.startDate}{item.endDate ? ` — ${item.endDate}` : ' — Present'}
      </div>

      <div className="journey-rail">
        <div className="journey-dot" />
        {!isLast && <div className="journey-line" />}
      </div>

      <div className="journey-content">
        {/* Date shown inline on mobile */}
        <div className="journey-date-mobile">
          {item.startDate}{item.endDate ? ` — ${item.endDate}` : ' — Present'}
        </div>

        <h3 style={{
          margin: 0,
          fontFamily: 'var(--font-display)',
          fontWeight: 500,
          fontSize: 'clamp(1.1rem, 3vw, 1.35rem)',
          letterSpacing: '-0.01em',
        }}>
          {item.title}
        </h3>

        <div style={{ marginTop: 4, color: 'var(--accent)', fontSize: '0.95rem' }}>
          {item.organization}
        </div>

        {item.location && (
          <div style={{ marginTop: 2, fontSize: '0.8rem', color: 'var(--fg-subtle)' }}>
            {item.location}
          </div>
        )}

        {item.description && (
          <p style={{ marginTop: '0.85rem', color: 'var(--fg-muted)', lineHeight: 1.6 }}>
            {item.description}
          </p>
        )}

        {item.highlights?.length > 0 && (
          <ul style={{ marginTop: '0.85rem', paddingLeft: '1rem', color: 'var(--fg-muted)', lineHeight: 1.7 }}>
            {item.highlights.map((h, idx) => <li key={idx}>{h}</li>)}
          </ul>
        )}

        {item.grade && (
          <div style={{ marginTop: '0.85rem' }}>
            <span className="chip">{item.grade}</span>
          </div>
        )}
      </div>

      <style>{`
        /* ── Desktop / tablet ≥ 640px ── */
        .journey-row {
          display: grid;
          grid-template-columns: 140px 28px 1fr;
          column-gap: 1.25rem;
          padding-block: 1.5rem;
        }
        .journey-date {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          letter-spacing: 0.05em;
          color: var(--fg-subtle);
          padding-top: 6px;
          line-height: 1.4;
        }
        .journey-date-mobile { display: none; }

        .journey-rail {
          position: relative;
          display: flex;
          justify-content: center;
        }
        .journey-dot {
          position: absolute;
          top: 8px;
          width: 10px; height: 10px;
          border-radius: 999px;
          background: var(--accent);
          box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 18%, transparent);
          flex-shrink: 0;
        }
        .journey-line {
          position: absolute;
          top: 22px; bottom: -24px;
          width: 1px;
          background: var(--border);
        }
        .journey-content { padding-bottom: 1.25rem; }

        /* ── Mobile < 640px ── */
        @media (max-width: 640px) {
          .journey-row {
            grid-template-columns: 22px 1fr;
            column-gap: 1rem;
          }
          /* Hide the original date column */
          .journey-date { display: none; }

          /* Date shown above the title in content column */
          .journey-date-mobile {
            display: block;
            font-family: var(--font-mono);
            font-size: 0.7rem;
            letter-spacing: 0.05em;
            color: var(--fg-subtle);
            margin-bottom: 0.35rem;
          }

          .journey-rail { grid-column: 1; grid-row: 1; }
          .journey-dot  { top: 4px; }
          .journey-line { top: 18px; bottom: -16px; }
          .journey-content { grid-column: 2; grid-row: 1; }
        }
      `}</style>
    </motion.div>
  );
}
