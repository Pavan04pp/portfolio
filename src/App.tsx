import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedText from './components/AnimatedText';
import ProjectCard from './components/ProjectCard';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

const projects = [
  {
    title: 'Project 1',
    description: 'A brief description of project 1',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    image: '/project1.jpg',
    link: '#'
  },
  {
    title: 'Project 2',
    description: 'A brief description of project 2',
    technologies: ['Node.js', 'Express', 'MongoDB'],
    image: '/project2.jpg',
    link: '#'
  },
  {
    title: 'Project 3',
    description: 'A brief description of project 3',
    technologies: ['Python', 'Django', 'PostgreSQL'],
    image: '/project3.jpg',
    link: '#'
  }
];

const App: React.FC = () => {
  const aboutRef = useRef(null);
  const isAboutInView = useInView(aboutRef, { once: true });

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <motion.div
          ref={aboutRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <About />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Experience />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Education />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Skills />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <section id="projects" className="mb-16">
            <h2 className="text-4xl font-bold mb-8">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  technologies={project.technologies}
                  image={project.image}
                  link={project.link}
                />
              ))}
            </div>
          </section>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <Contact />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <Footer />
        </motion.div>
      </main>
    </div>
  );
};

export default App; 