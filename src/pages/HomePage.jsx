import { Navbar } from '../components/layout/Navbar.jsx';
import { Footer } from '../components/layout/Footer.jsx';
import { BackToTop } from '../components/layout/BackToTop.jsx';
import { Hero } from '../components/sections/Hero.jsx';
import { About } from '../components/sections/About.jsx';
import { Skills } from '../components/sections/Skills.jsx';
import { Journey } from '../components/sections/Journey.jsx';
import { Projects } from '../components/sections/Projects.jsx';
import { Achievements } from '../components/sections/Achievements.jsx';
import { Contact } from '../components/sections/Contact.jsx';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Journey />
        <Projects />
        <Achievements />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
