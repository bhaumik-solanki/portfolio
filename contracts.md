# API Contracts & Backend Integration Plan

## Overview
This document outlines the API contracts and integration plan for the BTech CSE Portfolio website backend.

## Current Mock Data Structure
The frontend currently uses mock data from `/app/frontend/src/mock.js` with the following structure:
- Personal information (name, email, phone, social links)
- Projects (with images, descriptions, technologies, links)
- Experience (work history)
- Education (academic background)
- Skills (categorized technical skills)
- Achievements (awards and recognition)
- Certifications (professional certificates)

## Backend Requirements

### 1. Database Models (MongoDB)

#### Portfolio Model
```javascript
{
  _id: ObjectId,
  personal: {
    name: String,
    title: String,
    email: String,
    phone: String,
    location: String,
    linkedin: String,
    github: String,
    portfolio: String,
    bio: String
  },
  projects: [{
    title: String,
    description: String,
    image: String,
    technologies: [String],
    githubLink: String,
    liveLink: String,
    category: String,
    featured: Boolean,
    createdAt: Date
  }],
  experience: [{
    position: String,
    company: String,
    location: String,
    duration: String,
    description: String,
    technologies: [String],
    order: Number
  }],
  education: [{
    degree: String,
    institution: String,
    location: String,
    duration: String,
    cgpa: String,
    percentage: String,
    description: String,
    order: Number
  }],
  skills: {
    programming: [String],
    frontend: [String],
    backend: [String],
    databases: [String],
    tools: [String],
    frameworks: [String]
  },
  achievements: [{
    title: String,
    organization: String,
    date: String,
    description: String,
    order: Number
  }],
  certifications: [{
    name: String,
    issuer: String,
    date: String,
    credentialId: String,
    link: String,
    order: Number
  }],
  createdAt: Date,
  updatedAt: Date
}
```

#### Contact Model
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  subject: String,
  message: String,
  isRead: Boolean,
  createdAt: Date
}
```

### 2. API Endpoints

#### Portfolio Endpoints
- `GET /api/portfolio` - Get portfolio data
- `PUT /api/portfolio` - Update portfolio data (admin only)
- `POST /api/portfolio/init` - Initialize portfolio with mock data

#### Contact Endpoints
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contact messages (admin only)
- `PUT /api/contact/:id/read` - Mark message as read (admin only)

### 3. Frontend Integration Changes

#### Remove Mock Data Usage
- Remove import of mock.js from all components
- Replace mock data with API calls using axios

#### API Service Layer
Create `/app/frontend/src/services/api.js`:
```javascript
import axios from 'axios';

const API_BASE = process.env.REACT_APP_BACKEND_URL + '/api';

export const portfolioAPI = {
  getPortfolio: () => axios.get(`${API_BASE}/portfolio`),
  initPortfolio: () => axios.post(`${API_BASE}/portfolio/init`)
};

export const contactAPI = {
  sendMessage: (data) => axios.post(`${API_BASE}/contact`, data)
};
```

#### Component Updates
- **App.js**: Add portfolio data fetching on mount
- **All components**: Use portfolio data from props/context instead of mock
- **Contact.js**: Integrate with real contact API endpoint

### 4. Data Flow
1. Frontend loads → API call to GET /api/portfolio
2. If no data exists → API call to POST /api/portfolio/init (initialize with mock data)
3. Contact form submission → API call to POST /api/contact
4. All data rendered from backend instead of mock.js

### 5. Error Handling
- Loading states for API calls
- Error messages for failed requests
- Fallback data handling
- Toast notifications for contact form submissions

### 6. Implementation Steps
1. Create MongoDB models
2. Implement API endpoints
3. Add data initialization endpoint
4. Create API service layer in frontend
5. Update components to use real API data
6. Remove mock.js dependencies
7. Test full integration

## Notes
- Initially seed database with mock data for seamless transition
- Contact form will be fully functional after backend integration
- All existing UI and functionality will remain the same
- Backend will serve as data source instead of mock.js