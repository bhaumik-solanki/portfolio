import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    ArrowDown,
    FileText,
    Mail,
    Github,
    Linkedin,
    Twitter,
    Instagram,
} from "lucide-react";
import { useProfile } from "../../hooks/useContent.js";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
    const { data: profile } = useProfile();
    const taglines = profile?.taglines?.length
        ? profile.taglines
        : ["Full-Stack Developer"];
    const [index, setIndex] = useState(0);
    const headingRef = useRef(null);
    const imageWrapRef = useRef(null); // plain div ref, not on motion.div
    const rafCtxRef = useRef(null); // holds gsap ctx created inside rAF

    useEffect(() => {
        if (taglines.length < 2) return;
        const id = setInterval(
            () => setIndex((i) => (i + 1) % taglines.length),
            2400,
        );
        return () => clearInterval(id);
    }, [taglines.length]);

    useEffect(() => {
        if (!headingRef.current) return;

        // Wait one frame so React has fully painted the layout and
        // ScrollTrigger can measure the #home section's real position.
        const raf = requestAnimationFrame(() => {
            const ctx = gsap.context(() => {
                // Heading drifts up as you scroll out of the hero
                gsap.to(headingRef.current, {
                    y: -80,
                    ease: "none",
                    scrollTrigger: {
                        trigger: "#home", // use the whole section as trigger
                        start: "top top",
                        end: "bottom top",
                        scrub: 0.6,
                    },
                });

                // Image drifts down (opposite direction = depth illusion)
                if (imageWrapRef.current) {
                    gsap.to(imageWrapRef.current, {
                        y: 60,
                        ease: "none",
                        scrollTrigger: {
                            trigger: "#home",
                            start: "top top",
                            end: "bottom top",
                            scrub: 0.6,
                        },
                    });
                }

                // Force ScrollTrigger to re-measure all positions now that
                // the DOM is fully laid out (fixes stale measurements in React).
                ScrollTrigger.refresh();
            });

            // Store ctx on the raf ref so cleanup can reach it
            rafCtxRef.current = ctx;
        });

        return () => {
            cancelAnimationFrame(raf);
            rafCtxRef.current?.revert();
        };
    }, []);

    const name = profile?.name ?? "Bhaumik Solanki";
    const [firstName, ...rest] = name.split(" ");
    const lastName = rest.join(" ");

    return (
        <section
            id="home"
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                position: "relative",
                paddingTop: "clamp(80px, 14vh, 100px)",
                paddingBottom: 60,
            }}
        >
            <div
                className="container-page"
                style={{ width: "100%", position: "relative", zIndex: 2 }}
            >
                <div className="hero-grid">
                    {/* ── Text ─────────────────────────────────────────────────────── */}
                    <div ref={headingRef}>
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="section-eyebrow"
                            style={{ marginBottom: "1.25rem" }}
                        >
                            <span
                                style={{
                                    display: "inline-block",
                                    width: 24,
                                    height: 1,
                                    background: "var(--accent)",
                                    marginRight: 10,
                                    verticalAlign: "middle",
                                }}
                            />
                            {profile?.location || "Delhi, India"} · Available
                            for work
                        </motion.div>

                        <motion.h1
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: {},
                                visible: {
                                    transition: {
                                        staggerChildren: 0.05,
                                        delayChildren: 0.1,
                                    },
                                },
                            }}
                            style={{
                                fontFamily: "var(--font-display)",
                                fontWeight: 500,
                                fontSize: "clamp(2.4rem, 7vw, 5.5rem)",
                                lineHeight: 0.95,
                                letterSpacing: "-0.03em",
                                margin: 0,
                            }}
                        >
                            <SplitLine text={firstName} />
                            <br />
                            <SplitLine text={lastName} italic />
                        </motion.h1>

                        {/* Tagline cycle */}
                        <div
                            style={{
                                marginTop: "1.5rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.75rem",
                                fontSize: "clamp(0.85rem, 2vw, 1.2rem)",
                                color: "var(--fg-muted)",
                                fontFamily: "var(--font-mono)",
                                flexWrap: "wrap",
                            }}
                        >
                            <span style={{ color: "var(--accent)" }}>$</span>
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={taglines[index]}
                                    initial={{
                                        opacity: 0,
                                        y: 12,
                                        filter: "blur(4px)",
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        filter: "blur(0px)",
                                    }}
                                    exit={{
                                        opacity: 0,
                                        y: -12,
                                        filter: "blur(4px)",
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    style={{ display: "inline-block" }}
                                >
                                    {taglines[index]}
                                </motion.span>
                            </AnimatePresence>
                            <motion.span
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                                style={{ color: "var(--accent)" }}
                            >
                                _
                            </motion.span>
                        </div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            style={{
                                marginTop: "1.75rem",
                                maxWidth: "52ch",
                                fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
                                color: "var(--fg-muted)",
                                lineHeight: 1.65,
                            }}
                        >
                            {profile?.shortBio ||
                                "CSE graduate from NSUT, Delhi. I build things where solid engineering and good product thinking go hand in hand."}
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            style={{
                                marginTop: "2rem",
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "0.75rem",
                            }}
                        >
                            {profile?.resumeUrl && (
                                <a
                                    href={profile.resumeUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn btn-primary"
                                >
                                    <FileText size={16} /> Resume
                                </a>
                            )}
                            <a href="#contact" className="btn btn-ghost">
                                <Mail size={16} /> Get in touch
                            </a>
                        </motion.div>

                        {/* Socials */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.85 }}
                            style={{
                                marginTop: "2.25rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "1.25rem",
                                flexWrap: "wrap",
                            }}
                        >
                            <span
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "0.7rem",
                                    letterSpacing: "0.15em",
                                    color: "var(--fg-subtle)",
                                }}
                            >
                                FIND ME ON
                            </span>
                            {profile?.socials?.github && (
                                <HeroSocial
                                    href={profile.socials.github}
                                    icon={Github}
                                />
                            )}
                            {profile?.socials?.linkedin && (
                                <HeroSocial
                                    href={profile.socials.linkedin}
                                    icon={Linkedin}
                                />
                            )}
                            {profile?.socials?.twitter && (
                                <HeroSocial
                                    href={profile.socials.twitter}
                                    icon={Twitter}
                                />
                            )}
                            {profile?.socials?.instagram && (
                                <HeroSocial
                                    href={profile.socials.instagram}
                                    icon={Instagram}
                                />
                            )}
                        </motion.div>
                    </div>

                    {/* ── Image ────────────────────────────────────────────────────── */}
                    {/* Plain div wrapper so GSAP can get the real DOM node */}
                    <div ref={imageWrapRef} className="hero-image">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.8,
                                delay: 0.2,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            <div className="hero-image-frame">
                                <img
                                    src={profile?.avatarUrl || "/myPic.webp"}
                                    alt={name}
                                    loading="eager"
                                />
                                <div
                                    className="hero-image-glow"
                                    aria-hidden="true"
                                />
                            </div>

                            {profile?.stats?.length > 0 && (
                                <div className="hero-stats">
                                    {profile.stats.slice(0, 3).map((s) => (
                                        <div
                                            key={s.label}
                                            className="hero-stat"
                                        >
                                            <div className="hero-stat-value">
                                                {s.value}
                                            </div>
                                            <div className="hero-stat-label">
                                                {s.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <motion.a
                    href="#about"
                    aria-label="Scroll to next section"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                    className="hero-scroll-hint"
                >
                    <span>SCROLL</span>
                    <motion.span
                        animate={{ y: [0, 6, 0] }}
                        transition={{ duration: 1.6, repeat: Infinity }}
                    >
                        <ArrowDown size={14} />
                    </motion.span>
                </motion.a>
            </div>

            <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        /* Tablet: narrow the gap a bit */
        @media (max-width: 1024px) {
          .hero-grid { gap: 2.5rem; }
        }

        /* Mobile: stack vertically, image on top */
        @media (max-width: 860px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .hero-image {
            // order: -1;
            max-width: 300px;
            margin-inline: auto;
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .hero-image { max-width: 260px; }
        }

        .hero-image-frame {
          position: relative;
          aspect-ratio: 3 / 4;
          max-width: 320px;
          margin-inline: auto;
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid var(--border-strong);
          box-shadow: var(--shadow-card);
        }

        .hero-image-frame img {
          width: 100%; height: 100%;
          object-fit: cover;
          filter: contrast(1.02) saturate(1.05);
        }

        .hero-image-glow {
          position: absolute; inset: -20%;
          background: radial-gradient(50% 50% at 80% 10%, color-mix(in srgb, var(--accent) 30%, transparent), transparent 70%);
          pointer-events: none;
        }

        .hero-stats {
          margin-top: 1.25rem;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.5rem;
        }

        .hero-stat {
          padding: 0.85rem 0.5rem;
          border: 1px solid var(--border);
          border-radius: 12px;
          background: var(--bg-card);
          text-align: center;
        }

        @media (max-width: 400px) {
          .hero-stat { padding: 0.6rem 0.3rem; }
        }

        .hero-stat-value {
          font-family: var(--font-display);
          font-size: clamp(1.1rem, 4vw, 1.5rem);
          font-weight: 500;
          color: var(--accent);
          line-height: 1;
        }

        .hero-stat-label {
          margin-top: 4px;
          font-size: clamp(0.55rem, 1.5vw, 0.65rem);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--fg-subtle);
        }

        /* Scroll hint: hide on very short viewports */
        .hero-scroll-hint {
          position: absolute;
          left: 50%; bottom: 0;
          transform: translateX(-50%);
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          color: var(--fg-subtle);
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.15em;
        }

        /* Hide on narrow screens where it overlaps stacked content */
        @media (max-width: 860px) {
          .hero-scroll-hint { display: none; }
        }
        /* Hide on short viewports (landscape mobile, small windows) */
        @media (max-height: 750px) {
          .hero-scroll-hint { display: none; }
        }
      `}</style>
        </section>
    );
}

/**
 * SplitLine — slides text up on mount.
 * paddingRight: '0.15em' gives the italic 'i' in "Solanki" breathing room
 * before overflow:hidden clips.
 */
function SplitLine({ text, italic }) {
    return (
        <span
            style={{
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "top",
                paddingRight: "0.15em",
            }}
        >
            <motion.span
                variants={{ hidden: { y: "110%" }, visible: { y: 0 } }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    display: "inline-block",
                    fontStyle: italic ? "italic" : "normal",
                    color: italic ? "var(--accent)" : "var(--fg)",
                }}
            >
                {text}
            </motion.span>
        </span>
    );
}

function HeroSocial({ href, icon: Icon }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            style={{
                color: "var(--fg-muted)",
                transition: "color 0.15s ease, transform 0.15s ease",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--accent)";
                e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--fg-muted)";
                e.currentTarget.style.transform = "translateY(0)";
            }}
        >
            <Icon size={18} strokeWidth={1.75} />
        </a>
    );
}
