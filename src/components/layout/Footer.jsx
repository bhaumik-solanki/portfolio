import { Github, Linkedin, Twitter, Instagram, Mail } from 'lucide-react';
import { useProfile } from '../../hooks/useContent.js';

export function Footer() {
  const { data: profile } = useProfile();
  const socials = profile?.socials ?? {};

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        padding: '3rem 0 2rem',
        marginTop: '4rem',
        position: 'relative', zIndex: 2,
      }}
    >
      <div
        className="container-page"
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', textAlign: 'center' }}
      >
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 500 }}>
          Bhaumik<span style={{ color: 'var(--accent)' }}>.</span>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          {socials.github    && <SocialLink href={socials.github}                  icon={Github}    />}
          {socials.linkedin  && <SocialLink href={socials.linkedin}                icon={Linkedin}  />}
          {socials.twitter   && <SocialLink href={socials.twitter}                 icon={Twitter}   />}
          {socials.instagram && <SocialLink href={socials.instagram}               icon={Instagram} />}
          {profile?.email    && <SocialLink href={`mailto:${profile.email}`}       icon={Mail}      />}
        </div>

        <div style={{ fontSize: '0.8rem', color: 'var(--fg-subtle)' }}>
          <span>© {new Date().getFullYear()} {profile?.name ?? 'Bhaumik Solanki'}. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon: Icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{
        width: 40, height: 40,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: 999,
        border: '1px solid var(--border-strong)',
        color: 'var(--fg-muted)',
        transition: 'color 0.15s ease, border-color 0.15s ease, transform 0.15s ease',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--fg-muted)'; e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      <Icon size={16} strokeWidth={1.75} />
    </a>
  );
}
