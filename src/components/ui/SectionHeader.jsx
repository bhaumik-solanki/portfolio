import { motion } from 'framer-motion';

export function SectionHeader({ eyebrow, title, emphasis, subtitle, align = 'left' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        marginBottom: '3rem',
        textAlign: align,
        maxWidth: align === 'center' ? '720px' : 'none',
        marginInline: align === 'center' ? 'auto' : undefined,
      }}
    >
      {eyebrow && <div className="section-eyebrow">{eyebrow}</div>}
      <h2 className="section-title">
        {title} {emphasis && <em>{emphasis}</em>}
      </h2>
      {subtitle && (
        <p style={{ marginTop: '1rem', color: 'var(--fg-muted)', fontSize: '1.05rem', maxWidth: '60ch' }}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
