import { motion } from "framer-motion";
import { SectionHeader } from "../ui/SectionHeader.jsx";
import { useProfile } from "../../hooks/useContent.js";

export function About() {
    const { data: profile } = useProfile();

    return (
        <section
            id="about"
            className="section"
            style={{ position: "relative", zIndex: 2 }}
        >
            <div className="container-page">
                <SectionHeader
                    eyebrow="01 — Who I am"
                    title="A short"
                    emphasis="story."
                />

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "3rem",
                        alignItems: "start",
                    }}
                    className="about-grid"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6 }}
                        style={{
                            fontSize: "1.05rem",
                            color: "var(--fg-muted)",
                            lineHeight: 1.7,
                        }}
                    >
                        <p>
                            {profile?.bio ||
                                "CSE graduate from NSUT, Delhi. I build full-stack web apps and Python tools, focusing on projects where solid engineering and good product thinking go hand in hand. My recent work spans NLP, RAG systems, and React-based frontends."}
                        </p>
                        <p style={{ marginTop: "1rem" }}>
                            I gravitate toward problems where the interface
                            matters as much as the algorithm. I like clean code,
                            fast pages, and ideas that ship.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <dl style={{ display: "grid", gap: "1rem" }}>
                            <Row
                                label="Currently"
                                value="B.Tech CSE Graduate @ NSUT, Delhi"
                            />
                            <Row
                                label="Focus"
                                value="Full-stack web, AI systems"
                            />
                            <Row
                                label="Location"
                                value={profile?.location || "Delhi, India"}
                            />
                            <Row
                                label="Status"
                                value="Open to full-time roles & collaborations"
                            />
                        </dl>
                    </motion.div>
                </div>

                <style>{`
          @media (max-width: 800px) {
            .about-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          }
          @media (max-width: 480px) {
            .about-grid dl { --row-label-w: 90px; }
          }
        `}</style>
            </div>
        </section>
    );
}

function Row({ label, value }) {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "var(--row-label-w, 120px) 1fr",
                gap: "1rem",
                padding: "0.85rem 0",
                borderBottom: "1px solid var(--border)",
                alignItems: "baseline",
            }}
        >
            <dt
                style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--fg-subtle)",
                }}
            >
                {label}
            </dt>
            <dd style={{ margin: 0, color: "var(--fg)" }}>{value}</dd>
        </div>
    );
}
