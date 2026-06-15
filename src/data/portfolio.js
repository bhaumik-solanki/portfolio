/**
 * portfolio.js — single source of truth for all portfolio content.
 * Edit this file to update anything on the site. No backend needed.
 */

export const portfolioData = {
    // ─── Profile ────────────────────────────────────────────────────────────────
    profile: {
        name: "Bhaumik Solanki",
        bio: "CSE graduate from NSUT, Delhi. I build full-stack web apps and Python tools, focusing on projects where solid engineering and good product thinking go hand in hand. My recent work spans NLP, RAG systems, and React-based frontends.",
        shortBio:
            "CSE graduate from NSUT, Delhi. I build things where solid engineering and good product thinking go hand in hand.",
        location: "Rohini, Delhi",
        email: "bhaumiksolanki04@gmail.com",
        phone: "+91 7011747574",
        resumeUrl:
            "https://drive.google.com/file/d/1ZqspOvqztHT3sr32SEX8aGRsvJGaBb7L/view",
        avatarUrl: "/myPic.webp",
        taglines: [
            "Full-Stack Developer",
            "AI / ML Enthusiast",
            "Open to Opportunities",
        ],
        socials: {
            github: "https://github.com/bhaumik-solanki/",
            linkedin: "https://linkedin.com/in/bhaumik-solanki/",
            instagram: "https://instagram.com/bhaumik.solanki_",
        },
        stats: [
            { value: "3+", label: "Years Coding" },
            { value: "4", label: "Projects Built" },
            { value: "20+", label: "Technologies" },
        ],
    },

    // ─── Skills ─────────────────────────────────────────────────────────────────
    // category: languages | frontend | backend | database | aiml | tools
    // icon: valid lucide-react icon name (PascalCase)
    skills: [
        // Languages
        { _id: "s1", name: "Python", category: "languages", icon: "Terminal" },
        { _id: "s2", name: "C++", category: "languages", icon: "Code2" },
        {
            _id: "s3",
            name: "JavaScript",
            category: "languages",
            icon: "Braces",
        },
        { _id: "s4", name: "SQL", category: "languages", icon: "Database" },

        // Frontend
        { _id: "s5", name: "HTML", category: "frontend", icon: "FileCode" },
        { _id: "s6", name: "CSS", category: "frontend", icon: "Palette" },
        { _id: "s7", name: "Tailwind CSS", category: "frontend", icon: "Wind" },
        { _id: "s8", name: "React.js", category: "frontend", icon: "Atom" },
        { _id: "s9", name: "Vite", category: "frontend", icon: "Zap" },

        // Backend
        { _id: "s10", name: "Node.js", category: "backend", icon: "Server" },
        { _id: "s11", name: "Express.js", category: "backend", icon: "Globe" },
        { _id: "s12", name: "FastAPI", category: "backend", icon: "Rocket" },
        {
            _id: "s13",
            name: "Flask",
            category: "backend",
            icon: "FlaskConical",
        },

        // Databases
        { _id: "s14", name: "MySQL", category: "database", icon: "HardDrive" },
        { _id: "s15", name: "MongoDB", category: "database", icon: "Layers" },

        // AI / ML
        { _id: "s16", name: "NumPy", category: "aiml", icon: "Hash" },
        { _id: "s17", name: "pandas", category: "aiml", icon: "BarChart2" },
        { _id: "s18", name: "Matplotlib", category: "aiml", icon: "LineChart" },
        { _id: "s19", name: "scikit-learn", category: "aiml", icon: "Brain" },
        { _id: "s20", name: "TensorFlow", category: "aiml", icon: "Cpu" },
        { _id: "s21", name: "PyTorch", category: "aiml", icon: "Flame" },

        // Tools & Platforms
        { _id: "s22", name: "Git", category: "tools", icon: "GitBranch" },
        { _id: "s23", name: "GitHub", category: "tools", icon: "Github" },
        { _id: "s24", name: "Docker", category: "tools", icon: "Package" },
        { _id: "s25", name: "Jupyter", category: "tools", icon: "BookOpen" },
        { _id: "s26", name: "Linux", category: "tools", icon: "Monitor" },
        { _id: "s27", name: "VS Code", category: "tools", icon: "Code" },
        { _id: "s28", name: "Netlify", category: "tools", icon: "Cloud" },
        { _id: "s29", name: "Vercel", category: "tools", icon: "Triangle" },
    ],

    // ─── Journey ────────────────────────────────────────────────────────────────
    // kind: 'education' | 'work'
    experience: [
        // Education
        {
            _id: "edu1",
            kind: "education",
            title: "B.Tech in Computer Science and Engineering",
            organization: "Netaji Subhas University of Technology (NSUT)",
            location: "Delhi, India",
            startDate: "2022",
            endDate: "2026",
            description:
                "Specialisation in Big Data Analytics. Coursework covered Data Structures and Algorithms, DBMS, Data Science, Artificial Intelligence, and Machine Learning.",
            highlights: [],
            grade: "CGPA: 7.07 / 10.00",
        },
        {
            _id: "edu2",
            kind: "education",
            title: "Senior Secondary Education",
            organization: "Mount Abu Public School",
            location: "Delhi, India",
            startDate: "2020",
            endDate: "2022",
            description:
                "CBSE Class XI-XII, Non-Medical stream (PCM) with Computer Science.",
            highlights: [],
            grade: "Class XII: 92.40%",
        },
        {
            _id: "edu3",
            kind: "education",
            title: "Secondary Education",
            organization: "Mount Abu Public School",
            location: "Delhi, India",
            startDate: "2010",
            endDate: "2020",
            description: "Completed Class I to X under CBSE.",
            highlights: [],
            grade: "Class X: 92.00%",
        },

        // Work / Positions of Responsibility
        {
            _id: "w1",
            kind: "work",
            title: "Resource and Documentation Head",
            organization: "Algorithm East, NSUT",
            location: "Delhi, India",
            startDate: "Oct 2024",
            endDate: "Oct 2025",
            description:
                "Handled resources and documentation for the college coding society. Prepared DSA sheets and competitive programming materials for members, and maintained documentation for workshops and internal events.",
            highlights: [],
            grade: "",
        },
    ],

    // ─── Projects ────────────────────────────────────────────────────────────────
    // categories: array of 'web' | 'python' | 'ml'
    projects: [
        {
            _id: "p1",
            title: "DeepPsyche",
            summary:
                "A mental health classification system trained on 95K+ Reddit samples across 7 categories. Uses a 4-model weighted ensemble (MentalBERT, RoBERTa, DistilBERT, Gating Fusion) reaching 80.7% macro F1, with SHAP and LIME explainability. Deployed with a Flask backend and a React frontend.",
            techStack: [
                "Python",
                "Flask",
                "Node.js",
                "React.js",
                "Docker",
                "MongoDB",
            ],
            categories: ["web", "python", "ml"],
            featured: true,
            links: {
                github: "https://github.com/bhaumik-solanki/deep-psyche",
                demo: "",
            },
            coverImage: "",
        },
        {
            _id: "p2",
            title: "NeuroBuddy",
            summary:
                "An ADHD-focused AI companion built around RAG and FAISS for personalised, context-aware responses. Includes a sentiment analysis system with automatic intervention triggering and an NLP task planner that converts user goals into Pomodoro-based tasks.",
            techStack: [
                "Python",
                "FastAPI",
                "RAG",
                "FAISS",
                "Node.js",
                "React.js",
                "MongoDB",
            ],
            categories: ["web", "python", "ml"],
            featured: true,
            links: {
                github: "https://github.com/bhaumik-solanki/neurobuddy",
                demo: "",
            },
            coverImage: "",
        },
        {
            _id: "p3",
            title: "Portfolio Website",
            summary:
                "This site. Built with React, Vite, and Tailwind CSS, with a GSAP parallax hero, rotating taglines, and Framer Motion animations throughout. Includes a filterable projects grid, a journey timeline, and an achievements section. Contact form runs on Netlify Functions with the Resend API.",
            techStack: [
                "React.js",
                "Vite",
                "Tailwind CSS",
                "Resend API",
                "Netlify",
            ],
            categories: ["web"],
            featured: false,
            links: {
                github: "https://github.com/bhaumik-solanki/personal-portfolio",
                demo: "https://bhaumiksolanki.netlify.app",
            },
            coverImage: "",
        },
        {
            _id: "p4",
            title: "ChronoFix",
            summary:
                "A Python CLI tool for fixing incorrect or missing date metadata on photos, RAW files, and videos. Reads from four sources (EXIF metadata, folder name, filename, and filesystem timestamps), auto-selects when all sources agree, and prompts when they conflict. Never re-encodes video; all streams are copied losslessly with FFmpeg.",
            techStack: ["Python", "ExifTool", "FFmpeg", "FFprobe"],
            categories: ["python"],
            featured: false,
            links: {
                github: "https://github.com/bhaumik-solanki/chronofix",
                demo: "",
            },
            coverImage: "",
        },
    ],

    // ─── Achievements & Certifications ──────────────────────────────────────────
    achievements: [
        {
            _id: "a1",
            title: "Elite + Silver — Data Analytics with Python",
            description:
                "Awarded Elite + Silver grade by NPTEL for completing the Data Analytics with Python course.",
            date: "2024",
            icon: "Award",
        },
        {
            _id: "a2",
            title: "Elite — Introduction to Large Language Models",
            description:
                "Awarded Elite grade by NPTEL for completing the Introduction to Large Language Models course.",
            date: "2024",
            icon: "Trophy",
        },
    ],
};
