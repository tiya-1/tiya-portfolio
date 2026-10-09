import Background from './components/Background';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Spotlight from './components/Spotlight';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import Pipeline from './components/Pipeline';
import Achievements from './components/Achievements';
import AIAssistant from './components/AIAssistant';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Palette from './components/Palette';

export default function App() {
  return (
    <>
      <a className="sk" href="#about">Skip to content</a>
      <Background />
      <Cursor />
      <Navbar />
      <Palette />
      <main>
        <Hero />
        <About />
        <Spotlight />
        <Experience />
        <Projects />
        <TechStack />
        <Pipeline />
        <Achievements />
        <AIAssistant />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
