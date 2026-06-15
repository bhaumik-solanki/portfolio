import { useState } from "react";
import { motion } from "framer-motion";
import {
    Mail,
    MapPin,
    Phone,
    Send,
    CheckCircle2,
    AlertCircle,
} from "lucide-react";
import { SectionHeader } from "../ui/SectionHeader.jsx";
import { useProfile, useSendMessage } from "../../hooks/useContent.js";

export function Contact() {
    const { data: profile } = useProfile();
    const { mutateAsync, isPending } = useSendMessage();
    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [status, setStatus] = useState(null); // { kind: 'success' | 'error', message }

    function update(k) {
        return (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
    }

    async function onSubmit(e) {
        e.preventDefault();
        setStatus(null);
        try {
            await mutateAsync(form);
            setStatus({
                kind: "success",
                message: "Message sent. I’ll reply soon.",
            });
            setForm({ name: "", email: "", subject: "", message: "" });
        } catch (err) {
            setStatus({
                kind: "error",
                message: err?.message || "Something went wrong.",
            });
        }
    }

    return (
        <section
            id="contact"
            className="section"
            style={{ position: "relative", zIndex: 2 }}
        >
            <div className="container-page">
                <SectionHeader
                    eyebrow="06 — Say hello"
                    title="Get in"
                    emphasis="touch."
                    subtitle="Open to collaborations and full-time roles."
                />

                <div className="contact-grid">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.5 }}
                        style={{
                            display: "grid",
                            gap: "1rem",
                            alignContent: "start",
                        }}
                    >
                        {profile?.email && (
                            <ContactRow
                                icon={Mail}
                                label="Email"
                                value={profile.email}
                                href={`mailto:${profile.email}`}
                            />
                        )}
                        {profile?.phone && (
                            <ContactRow
                                icon={Phone}
                                label="Phone"
                                value={profile.phone}
                            />
                        )}
                        {profile?.location && (
                            <ContactRow
                                icon={MapPin}
                                label="Location"
                                value={profile.location}
                            />
                        )}
                    </motion.div>

                    <motion.form
                        onSubmit={onSubmit}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.5 }}
                        className="card"
                        style={{
                            padding: "1.5rem",
                            display: "grid",
                            gap: "0.85rem",
                        }}
                    >
                        <input
                            className="input"
                            placeholder="Your name"
                            value={form.name}
                            onChange={update("name")}
                            required
                        />
                        <input
                            className="input"
                            type="email"
                            placeholder="Your email"
                            value={form.email}
                            onChange={update("email")}
                            required
                        />
                        <input
                            className="input"
                            placeholder="Subject"
                            value={form.subject}
                            onChange={update("subject")}
                            required
                        />
                        <textarea
                            className="input"
                            placeholder="Your message"
                            rows={5}
                            value={form.message}
                            onChange={update("message")}
                            required
                            style={{ resize: "vertical", minHeight: 120 }}
                        />

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isPending}
                            style={{ justifySelf: "start" }}
                        >
                            {isPending ? (
                                "Sending…"
                            ) : (
                                <>
                                    <Send size={15} /> Send message
                                </>
                            )}
                        </button>

                        {status && (
                            <div
                                role="status"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8,
                                    marginTop: 4,
                                    padding: "0.75rem 1rem",
                                    borderRadius: 10,
                                    background:
                                        status.kind === "success"
                                            ? "color-mix(in srgb, #16a34a 14%, transparent)"
                                            : "color-mix(in srgb, #dc2626 14%, transparent)",
                                    color:
                                        status.kind === "success"
                                            ? "#22c55e"
                                            : "#f87171",
                                    fontSize: "0.9rem",
                                }}
                            >
                                {status.kind === "success" ? (
                                    <CheckCircle2 size={16} />
                                ) : (
                                    <AlertCircle size={16} />
                                )}
                                {status.message}
                            </div>
                        )}
                    </motion.form>
                </div>

                <style>{`
          .contact-grid {
            display: grid;
            grid-template-columns: 1fr 1.4fr;
            gap: 2.5rem;
          }
          @media (max-width: 800px) {
            .contact-grid { grid-template-columns: 1fr; gap: 1.5rem; }
          }
        `}</style>
            </div>
        </section>
    );
}

function ContactRow({ icon: Icon, label, value, href }) {
    const content = (
        <>
            <div
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    display: "grid",
                    placeItems: "center",
                    background:
                        "color-mix(in srgb, var(--accent) 12%, transparent)",
                    color: "var(--accent)",
                }}
            >
                <Icon size={16} strokeWidth={1.75} />
            </div>
            <div>
                <div
                    style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.7rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "var(--fg-subtle)",
                    }}
                >
                    {label}
                </div>
                <div style={{ marginTop: 2 }}>{value}</div>
            </div>
        </>
    );

    const style = {
        display: "flex",
        alignItems: "center",
        gap: "0.85rem",
        padding: "0.5rem 0",
    };
    return href ? (
        <a href={href} style={style}>
            {content}
        </a>
    ) : (
        <div style={style}>{content}</div>
    );
}
