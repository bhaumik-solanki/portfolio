import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";
import { portfolioAPI, apiUtils } from "./services/api";
import "./App.css";

function App() {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let response;
        try {
          // Try to get existing portfolio data
          response = await portfolioAPI.getPortfolio();
        } catch (err) {
          if (err.response && err.response.status === 404) {
            // Portfolio doesn't exist, initialize it
            console.log("Portfolio not found, initializing...");
            await portfolioAPI.initPortfolio();
            response = await portfolioAPI.getPortfolio();
          } else {
            throw err;
          }
        }
        
        setPortfolioData(response.data);
      } catch (err) {
        console.error("Error fetching portfolio:", err);
        const errorInfo = apiUtils.handleError(err);
        setError(errorInfo.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="container">
          <div className="card" style={{ textAlign: 'center', padding: '48px' }}>
            <h2 className="text-regular" style={{ marginBottom: '16px', color: 'var(--color-error)' }}>
              Error Loading Portfolio
            </h2>
            <p className="text-body" style={{ marginBottom: '24px', color: 'var(--text-secondary)' }}>
              {error}
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn-accent"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!portfolioData) {
    return (
      <div className="error-container">
        <div className="container">
          <div className="card" style={{ textAlign: 'center', padding: '48px' }}>
            <h2 className="text-regular" style={{ marginBottom: '16px' }}>
              No Portfolio Data Found
            </h2>
            <p className="text-body" style={{ marginBottom: '24px', color: 'var(--text-secondary)' }}>
              Unable to load portfolio information.
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn-accent"
            >
              Reload Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div className="grid-background"></div>
        <Header />
        <main>
          <Hero data={portfolioData.personal} />
          <About data={portfolioData.personal} />
          <Projects data={portfolioData.projects} />
          <Experience data={portfolioData.experience} />
          <Education data={portfolioData.education} />
          <Skills data={portfolioData.skills} />
          <Achievements 
            achievements={portfolioData.achievements} 
            certifications={portfolioData.certifications} 
          />
          <Contact data={portfolioData.personal} />
        </main>
        <Footer data={portfolioData.personal} />
      </BrowserRouter>
    </div>
  );
}

export default App;