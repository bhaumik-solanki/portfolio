# Bhaumik Solanki — Portfolio

My personal portfolio site. Built with React and Vite, animated with Framer Motion and GSAP, and deployed on Netlify. The contact form runs through a Netlify serverless function using the Resend API.

## Tech Stack

- React 19 + Vite 8
- Tailwind CSS v4
- Framer Motion + GSAP (ScrollTrigger)
- Lucide React
- React Router v7
- Netlify Functions + Resend (contact form)

## Running Locally

Node.js 20 or higher is required.

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:5173`.

## Updating Content

Everything on the site (name, bio, projects, skills, timeline, achievements, links) lives in one file:

```
src/data/portfolio.js
```

Edit that and the whole site updates. No backend, no CMS.

## Environment Variables

The contact form needs a Resend API key. Create a `.env.local` file in the project root:

```
RESEND_API_KEY=your_key_here
```

Add the same variable in your Netlify dashboard under Site settings > Environment variables before deploying.

## Deployment

The repo is pre-configured for Netlify via `netlify.toml`. Connect it in the Netlify dashboard and it picks up the build command and publish directory automatically.

Live site: [bhaumiksolanki.netlify.app](https://bhaumiksolanki.netlify.app)
