import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Star } from "lucide-react";
import { SectionHeader } from "../ui/SectionHeader.jsx";
import { useProjects, useProfile } from "../../hooks/useContent.js";

const FILTERS = ["all", "web", "python", "ml"];

export function Projects() {
    const { data: projects = [], isLoading } = useProjects();
    const { data: profile } = useProfile();
    const [filter, setFilter] = useState("all");

    const filtered = useMemo(() => {
        if (filter === "all") return projects;
        return projects.filter((p) => p.categories?.includes(filter));
    }, [projects, filter]);

    return (
        <section
            id="projects"
            className="section"
            style={{ position: "relative", zIndex: 2 }}
        >
            <div className="container-page">
                <SectionHeader
                    eyebrow="04 — Things I've built"
                    title="Featured"
                    emphasis="projects."
                />

                {/* Filter chips */}
                <div
                    style={{
                        display: "flex",
                        gap: "0.5rem",
                        flexWrap: "wrap",
                        marginBottom: "2rem",
                    }}
                >
                    {FILTERS.map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            style={{
                                padding: "0.45rem 0.9rem",
                                borderRadius: 999,
                                border: "1px solid var(--border-strong)",
                                background:
                                    filter === f
                                        ? "var(--accent)"
                                        : "transparent",
                                color:
                                    filter === f
                                        ? "var(--color-ink-950)"
                                        : "var(--fg-muted)",
                                fontSize: "0.8rem",
                                fontWeight: 500,
                                cursor: "pointer",
                                transition:
                                    "background 0.2s ease, color 0.2s ease, border-color 0.2s ease",
                            }}
                        >
                            {f === "all"
                                ? "All"
                                : f === "ml"
                                  ? "Machine Learning"
                                  : f === "web"
                                    ? "Web"
                                    : "Python"}
                        </button>
                    ))}
                </div>

                {isLoading && (
                    <div style={{ color: "var(--fg-subtle)" }}>Loading…</div>
                )}

                <div className="projects-grid">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((p, i) => (
                            <motion.article
                                key={p._id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{
                                    duration: 0.4,
                                    delay: i * 0.04,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="card project-card"
                            >
                                <div className="project-thumb">
                                    {p.coverImage ? (
                                        <img
                                            src={p.coverImage}
                                            alt={p.title}
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div
                                            className="project-thumb-fallback"
                                            aria-hidden="true"
                                        >
                                            {p.title.charAt(0)}
                                        </div>
                                    )}
                                    {p.featured && (
                                        <span className="featured-badge">
                                            <Star size={11} strokeWidth={2.5} />{" "}
                                            Featured
                                        </span>
                                    )}
                                </div>

                                <div
                                    style={{
                                        padding: "1.25rem 1.25rem 1.4rem",
                                    }}
                                >
                                    <h3
                                        style={{
                                            margin: 0,
                                            fontFamily: "var(--font-display)",
                                            fontWeight: 500,
                                            fontSize: "1.25rem",
                                            letterSpacing: "-0.01em",
                                        }}
                                    >
                                        {p.title}
                                    </h3>
                                    <p
                                        style={{
                                            marginTop: "0.5rem",
                                            color: "var(--fg-muted)",
                                            fontSize: "0.9rem",
                                            lineHeight: 1.55,
                                        }}
                                    >
                                        {p.summary}
                                    </p>

                                    {p.techStack?.length > 0 && (
                                        <div
                                            style={{
                                                marginTop: "0.85rem",
                                                display: "flex",
                                                gap: "0.4rem",
                                                flexWrap: "wrap",
                                            }}
                                        >
                                            {p.techStack.map((t) => (
                                                <span
                                                    key={t}
                                                    style={{
                                                        fontFamily:
                                                            "var(--font-mono)",
                                                        fontSize: "0.7rem",
                                                        padding:
                                                            "0.2rem 0.5rem",
                                                        borderRadius: 6,
                                                        border: "1px solid var(--border)",
                                                        color: "var(--fg-muted)",
                                                    }}
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <div
                                        style={{
                                            marginTop: "1.1rem",
                                            display: "flex",
                                            gap: "0.75rem",
                                        }}
                                    >
                                        {p.links?.github && (
                                            <a
                                                href={p.links.github}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="project-link"
                                            >
                                                <Github size={14} /> Code
                                            </a>
                                        )}
                                        {p.links?.demo && (
                                            <a
                                                href={p.links.demo}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="project-link"
                                            >
                                                <ExternalLink size={14} /> Demo
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </AnimatePresence>
                </div>

                {profile?.socials?.github && (
                    <div style={{ marginTop: "2.5rem", textAlign: "center" }}>
                        <a
                            href={profile.socials.github}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-ghost"
                        >
                            <Github size={16} /> More on GitHub
                        </a>
                    </div>
                )}

                <style>{`
          .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
            gap: 1.25rem;
          }
          .project-card {
            overflow: hidden;
            display: flex; flex-direction: column;
          }
          .project-thumb {
            position: relative;
            aspect-ratio: 16 / 10;
            background: linear-gradient(135deg, color-mix(in srgb, var(--accent) 12%, var(--bg-elevated)), var(--bg-elevated));
            overflow: hidden;
          }
          .project-thumb img { width: 100%; height: 100%; object-fit: cover; }
          .project-thumb-fallback {
            display: grid; place-items: center;
            width: 100%; height: 100%;
            font-family: var(--font-display);
            font-size: 5rem;
            font-weight: 500;
            color: color-mix(in srgb, var(--accent) 35%, transparent);
            opacity: 0.5;
          }
          .featured-badge {
            position: absolute; top: 10px; left: 10px;
            display: inline-flex; align-items: center; gap: 4px;
            padding: 0.25rem 0.55rem;
            border-radius: 999px;
            background: var(--accent);
            color: var(--color-ink-950);
            font-size: 0.65rem;
            font-weight: 600;
            letter-spacing: 0.04em;
          }
          .project-link {
            display: inline-flex; align-items: center; gap: 5px;
            font-size: 0.85rem;
            color: var(--fg-muted);
            transition: color 0.15s ease;
          }
          .project-link:hover { color: var(--accent); }
        `}</style>
            </div>
        </section>
    );
}
