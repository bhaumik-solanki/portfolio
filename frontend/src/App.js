import React from "react";
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
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="grid-background"></div>
        <Header />
        <main>
          <Hero />
          <About />
          <Projects />
          <Experience />
          <Education />
          <Skills />
          <Achievements />
          <Contact />
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;