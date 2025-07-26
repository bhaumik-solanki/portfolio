from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class PersonalInfo(BaseModel):
    name: str
    title: str
    email: str
    phone: str
    location: str
    linkedin: str
    github: str
    portfolio: str
    bio: str

class Project(BaseModel):
    id: Optional[int] = None
    title: str
    description: str
    image: str
    technologies: List[str]
    githubLink: str
    liveLink: Optional[str] = None
    category: str
    featured: Optional[bool] = False
    createdAt: Optional[datetime] = Field(default_factory=datetime.utcnow)

class Experience(BaseModel):
    id: Optional[int] = None
    position: str
    company: str
    location: str
    duration: str
    description: str
    technologies: List[str]
    order: Optional[int] = 0

class Education(BaseModel):
    id: Optional[int] = None
    degree: str
    institution: str
    location: str
    duration: str
    cgpa: Optional[str] = None
    percentage: Optional[str] = None
    description: str
    order: Optional[int] = 0

class Skills(BaseModel):
    programming: List[str]
    frontend: List[str]
    backend: List[str]
    databases: List[str]
    tools: List[str]
    frameworks: List[str]

class Achievement(BaseModel):
    id: Optional[int] = None
    title: str
    organization: str
    date: str
    description: str
    order: Optional[int] = 0

class Certification(BaseModel):
    id: Optional[int] = None
    name: str
    issuer: str
    date: str
    credentialId: str
    link: str
    order: Optional[int] = 0

class Portfolio(BaseModel):
    personal: PersonalInfo
    projects: List[Project]
    experience: List[Experience]
    education: List[Education]
    skills: Skills
    achievements: List[Achievement]
    certifications: List[Certification]
    createdAt: Optional[datetime] = Field(default_factory=datetime.utcnow)
    updatedAt: Optional[datetime] = Field(default_factory=datetime.utcnow)

class ContactMessage(BaseModel):
    name: str
    email: str
    subject: str
    message: str
    isRead: Optional[bool] = False
    createdAt: Optional[datetime] = Field(default_factory=datetime.utcnow)

class ContactMessageResponse(BaseModel):
    id: str
    name: str
    email: str
    subject: str
    message: str
    isRead: bool
    createdAt: datetime

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Portfolio API is running"}

# Portfolio endpoints
@api_router.get("/portfolio")
async def get_portfolio():
    portfolio = await db.portfolio.find_one({})
    if not portfolio:
        raise HTTPException(status_code=404, detail="Portfolio not found")
    
    # Convert MongoDB _id to string and remove it from response
    portfolio.pop('_id', None)
    return portfolio

@api_router.post("/portfolio/init")
async def init_portfolio():
    # Check if portfolio already exists
    existing = await db.portfolio.find_one({})
    if existing:
        return {"message": "Portfolio already initialized"}
    
    # Mock data for initialization
    mock_data = {
        "personal": {
            "name": "Alex Johnson",
            "title": "Final Year BTech CSE Student",
            "email": "alex.johnson@email.com",
            "phone": "+91 9876543210",
            "location": "Mumbai, India",
            "linkedin": "https://linkedin.com/in/alexjohnson",
            "github": "https://github.com/alexjohnson",
            "portfolio": "https://alexjohnson.dev",
            "bio": "Passionate computer science student with expertise in full-stack development, machine learning, and system design. Building innovative solutions with modern technologies."
        },
        "projects": [
            {
                "id": 1,
                "title": "E-Commerce Platform",
                "description": "Full-stack e-commerce application with React, Node.js, and MongoDB. Features include user authentication, payment integration, and admin dashboard.",
                "image": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
                "technologies": ["React", "Node.js", "MongoDB", "Express", "Stripe"],
                "githubLink": "https://github.com/alexjohnson/ecommerce-platform",
                "liveLink": "https://ecommerce-demo.alexjohnson.dev",
                "category": "Full Stack",
                "featured": True
            },
            {
                "id": 2,
                "title": "AI Chat Application",
                "description": "Real-time chat application with AI integration using OpenAI API. Built with React, Socket.io, and Express.js.",
                "image": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
                "technologies": ["React", "Socket.io", "OpenAI API", "Express", "MongoDB"],
                "githubLink": "https://github.com/alexjohnson/ai-chat-app",
                "liveLink": "https://ai-chat.alexjohnson.dev",
                "category": "AI/ML",
                "featured": True
            },
            {
                "id": 3,
                "title": "Task Management System",
                "description": "Collaborative task management tool with real-time updates, drag-and-drop functionality, and team collaboration features.",
                "image": "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
                "technologies": ["React", "Node.js", "Socket.io", "PostgreSQL", "Redis"],
                "githubLink": "https://github.com/alexjohnson/task-manager",
                "liveLink": "https://tasks.alexjohnson.dev",
                "category": "Full Stack"
            }
        ],
        "experience": [
            {
                "id": 1,
                "position": "Software Development Intern",
                "company": "TechCorp Solutions",
                "location": "Mumbai, India",
                "duration": "Jun 2024 - Aug 2024",
                "description": "Developed and maintained web applications using React and Node.js. Collaborated with senior developers on client projects and improved application performance by 30%.",
                "technologies": ["React", "Node.js", "MongoDB", "AWS"],
                "order": 1
            },
            {
                "id": 2,
                "position": "Frontend Developer Intern",
                "company": "StartupXYZ",
                "location": "Remote",
                "duration": "Dec 2023 - Feb 2024",
                "description": "Built responsive user interfaces and implemented modern design systems. Worked closely with design team to create pixel-perfect implementations.",
                "technologies": ["React", "TypeScript", "Tailwind CSS", "Figma"],
                "order": 2
            }
        ],
        "education": [
            {
                "id": 1,
                "degree": "Bachelor of Technology in Computer Science",
                "institution": "Mumbai Institute of Technology",
                "location": "Mumbai, India",
                "duration": "2021 - 2025",
                "cgpa": "8.7/10",
                "description": "Relevant Coursework: Data Structures, Algorithms, Database Systems, Software Engineering, Machine Learning, Computer Networks, Operating Systems",
                "order": 1
            }
        ],
        "skills": {
            "programming": ["JavaScript", "Python", "Java", "C++", "TypeScript", "Go"],
            "frontend": ["React", "Vue.js", "Angular", "HTML5", "CSS3", "Tailwind CSS"],
            "backend": ["Node.js", "Express.js", "Django", "Flask", "FastAPI"],
            "databases": ["MongoDB", "PostgreSQL", "MySQL", "Redis"],
            "tools": ["Git", "Docker", "AWS", "Firebase", "Vercel"],
            "frameworks": ["React Native", "TensorFlow", "Socket.io"]
        },
        "achievements": [
            {
                "id": 1,
                "title": "Winner - National Level Hackathon",
                "organization": "TechFest 2024",
                "date": "March 2024",
                "description": "First place in 48-hour hackathon with innovative IoT solution for smart agriculture",
                "order": 1
            },
            {
                "id": 2,
                "title": "Google Code-in Finalist",
                "organization": "Google",
                "date": "January 2024",
                "description": "Selected among top 100 participants worldwide for contributions to open-source projects",
                "order": 2
            }
        ],
        "certifications": [
            {
                "id": 1,
                "name": "AWS Certified Developer - Associate",
                "issuer": "Amazon Web Services",
                "date": "September 2024",
                "credentialId": "AWS-CDA-001234",
                "link": "https://aws.amazon.com/certification/verify",
                "order": 1
            },
            {
                "id": 2,
                "name": "Google Cloud Professional Developer",
                "issuer": "Google Cloud",
                "date": "July 2024",
                "credentialId": "GCP-PD-567890",
                "link": "https://cloud.google.com/certification/verify",
                "order": 2
            }
        ],
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    }
    
    await db.portfolio.insert_one(mock_data)
    return {"message": "Portfolio initialized successfully"}

# Contact endpoints
@api_router.post("/contact")
async def submit_contact(contact: ContactMessage):
    contact_dict = contact.dict()
    result = await db.contact.insert_one(contact_dict)
    return {"message": "Message sent successfully", "id": str(result.inserted_id)}

@api_router.get("/contact", response_model=List[ContactMessageResponse])
async def get_contact_messages():
    messages = await db.contact.find({}).sort("createdAt", -1).to_list(1000)
    return [
        ContactMessageResponse(
            id=str(msg["_id"]),
            name=msg["name"],
            email=msg["email"],
            subject=msg["subject"],
            message=msg["message"],
            isRead=msg.get("isRead", False),
            createdAt=msg["createdAt"]
        )
        for msg in messages
    ]

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
