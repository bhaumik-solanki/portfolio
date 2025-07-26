// Mock data for the portfolio website
export const mockData = {
  personal: {
    name: "Alex Johnson",
    title: "Final Year BTech CSE Student",
    email: "alex.johnson@email.com",
    phone: "+91 9876543210",
    location: "Mumbai, India",
    linkedin: "https://linkedin.com/in/alexjohnson",
    github: "https://github.com/alexjohnson",
    portfolio: "https://alexjohnson.dev",
    bio: "Passionate computer science student with expertise in full-stack development, machine learning, and system design. Building innovative solutions with modern technologies."
  },
  
  projects: [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce application with React, Node.js, and MongoDB. Features include user authentication, payment integration, and admin dashboard.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
      githubLink: "https://github.com/alexjohnson/ecommerce-platform",
      liveLink: "https://ecommerce-demo.alexjohnson.dev",
      category: "Full Stack"
    },
    {
      id: 2,
      title: "AI Chat Application",
      description: "Real-time chat application with AI integration using OpenAI API. Built with React, Socket.io, and Express.js.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
      technologies: ["React", "Socket.io", "OpenAI API", "Express", "MongoDB"],
      githubLink: "https://github.com/alexjohnson/ai-chat-app",
      liveLink: "https://ai-chat.alexjohnson.dev",
      category: "AI/ML"
    },
    {
      id: 3,
      title: "Task Management System",
      description: "Collaborative task management tool with real-time updates, drag-and-drop functionality, and team collaboration features.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
      technologies: ["React", "Node.js", "Socket.io", "PostgreSQL", "Redis"],
      githubLink: "https://github.com/alexjohnson/task-manager",
      liveLink: "https://tasks.alexjohnson.dev",
      category: "Full Stack"
    },
    {
      id: 4,
      title: "Machine Learning Model",
      description: "Predictive analytics model for stock price prediction using Python, TensorFlow, and various data preprocessing techniques.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      technologies: ["Python", "TensorFlow", "Pandas", "NumPy", "Scikit-learn"],
      githubLink: "https://github.com/alexjohnson/ml-stock-predictor",
      liveLink: null,
      category: "AI/ML"
    },
    {
      id: 5,
      title: "Mobile Weather App",
      description: "Cross-platform mobile application for weather forecasting with location-based services and offline capabilities.",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop",
      technologies: ["React Native", "Redux", "Weather API", "AsyncStorage"],
      githubLink: "https://github.com/alexjohnson/weather-app",
      liveLink: null,
      category: "Mobile"
    },
    {
      id: 6,
      title: "Blockchain Voting System",
      description: "Secure voting system built on blockchain technology ensuring transparency and immutability of votes.",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop",
      technologies: ["Solidity", "Web3.js", "React", "Ethereum", "MetaMask"],
      githubLink: "https://github.com/alexjohnson/blockchain-voting",
      liveLink: "https://voting.alexjohnson.dev",
      category: "Blockchain"
    }
  ],
  
  experience: [
    {
      id: 1,
      position: "Software Development Intern",
      company: "TechCorp Solutions",
      location: "Mumbai, India",
      duration: "Jun 2024 - Aug 2024",
      description: "Developed and maintained web applications using React and Node.js. Collaborated with senior developers on client projects and improved application performance by 30%.",
      technologies: ["React", "Node.js", "MongoDB", "AWS"]
    },
    {
      id: 2,
      position: "Frontend Developer Intern",
      company: "StartupXYZ",
      location: "Remote",
      duration: "Dec 2023 - Feb 2024",
      description: "Built responsive user interfaces and implemented modern design systems. Worked closely with design team to create pixel-perfect implementations.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Figma"]
    },
    {
      id: 3,
      position: "Teaching Assistant",
      company: "University Computer Science Department",
      location: "Mumbai, India",
      duration: "Aug 2023 - Dec 2023",
      description: "Assisted professors in teaching data structures and algorithms. Conducted lab sessions and helped students with programming assignments.",
      technologies: ["Java", "Python", "C++", "Algorithm Design"]
    }
  ],
  
  education: [
    {
      id: 1,
      degree: "Bachelor of Technology in Computer Science",
      institution: "Mumbai Institute of Technology",
      location: "Mumbai, India",
      duration: "2021 - 2025",
      cgpa: "8.7/10",
      description: "Relevant Coursework: Data Structures, Algorithms, Database Systems, Software Engineering, Machine Learning, Computer Networks, Operating Systems"
    },
    {
      id: 2,
      degree: "Higher Secondary Certificate (HSC)",
      institution: "St. Xavier's College",
      location: "Mumbai, India",
      duration: "2019 - 2021",
      percentage: "92%",
      description: "Science Stream with Mathematics, Physics, Chemistry, and Computer Science"
    }
  ],
  
  skills: {
    programming: ["JavaScript", "Python", "Java", "C++", "TypeScript", "Go"],
    frontend: ["React", "Vue.js", "Angular", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap"],
    backend: ["Node.js", "Express.js", "Django", "Flask", "FastAPI", "Spring Boot"],
    databases: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "SQLite"],
    tools: ["Git", "Docker", "AWS", "Firebase", "Heroku", "Vercel", "Figma"],
    frameworks: ["React Native", "Electron", "TensorFlow", "PyTorch", "Socket.io"]
  },
  
  achievements: [
    {
      id: 1,
      title: "Winner - National Level Hackathon",
      organization: "TechFest 2024",
      date: "March 2024",
      description: "First place in 48-hour hackathon with innovative IoT solution for smart agriculture"
    },
    {
      id: 2,
      title: "Google Code-in Finalist",
      organization: "Google",
      date: "January 2024",
      description: "Selected among top 100 participants worldwide for contributions to open-source projects"
    },
    {
      id: 3,
      title: "Dean's List",
      organization: "Mumbai Institute of Technology",
      date: "Academic Year 2023-24",
      description: "Awarded for maintaining excellent academic performance with CGPA above 8.5"
    }
  ],
  
  certifications: [
    {
      id: 1,
      name: "AWS Certified Developer - Associate",
      issuer: "Amazon Web Services",
      date: "September 2024",
      credentialId: "AWS-CDA-001234",
      link: "https://aws.amazon.com/certification/verify"
    },
    {
      id: 2,
      name: "Google Cloud Professional Developer",
      issuer: "Google Cloud",
      date: "July 2024",
      credentialId: "GCP-PD-567890",
      link: "https://cloud.google.com/certification/verify"
    },
    {
      id: 3,
      name: "MongoDB Certified Developer",
      issuer: "MongoDB Inc.",
      date: "May 2024",
      credentialId: "MDB-CD-112233",
      link: "https://university.mongodb.com/verify"
    },
    {
      id: 4,
      name: "Machine Learning Specialization",
      issuer: "Stanford University (Coursera)",
      date: "March 2024",
      credentialId: "COURSERA-ML-445566",
      link: "https://coursera.org/verify"
    }
  ]
};