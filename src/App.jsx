import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- DATOS DE PROYECTOS ---
const PROJECTS = [
  {
    id: 'sonicberry',
    title: 'Sonicberry',
    date: '2026',
    description: 'Zero-trust edge infrastructure project utilizing Docker, Cloudflare Zero-Trust Tunnels, Tailscale, and Python on a headless Arch Linux ARM architecture.',
    repo: 'https://github.com/ricardotm-dev/SONICBERRYBOT',
    tags: ['Python', 'Docker', 'Arch Linux', 'Tailscale'],
    gifPlaceholder: '/navibeat.mp4' 
  },
  {
    id: 'electric-call',
    title: 'Electric-Call Engine',
    date: '2025',
    description: 'AI-powered system maintenance optimization platform. Uses Scikit-learn Random Forest regression to predict optimal maintenance windows based on network load patterns (168-hour data points) and crew availability.',
    repo: 'https://github.com/ricardotm-dev/Hackathon--Los--Pythones',
    tags: ['Python', 'Flask', 'Scikit-Learn', 'Machine Learning'],
    gifPlaceholder: '/electrocall.mp4'
  },
  {
    id: 'resume-parser',
    title: 'AI Resume Parser',
    date: '2024',
    description: 'Resume parsing engine using Natural Language Processing, Pandas, and Scikit-learn to automate candidate screening.',
    repo: 'https://github.com/ricardotm-dev/AI-PARSER-2026-',
    tags: ['Python', 'NLP', 'Pandas', 'Scikit-Learn'],
    gifPlaceholder: '/parser.mp4' 
  }
];

const MENU_ITEMS = ['Home', 'Projects', 'About'];

// --- COMPONENTE ANIMADO CRT ---
const CRTScanLine = () => (
  <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden mix-blend-overlay">
    <motion.div
      animate={{ transform: ['translateY(-100%)', 'translateY(100vh)'] }}
      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      className="w-full h-12 bg-gradient-to-b from-transparent via-[#fffee2]/5 to-transparent"
    />
  </div>
);

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [time, setTime] = useState(new Date());

  // Reloj de la terminal
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleWheel = (e) => {
    if (selectedProject) return; 
    if (e.deltaY > 0) {
      setActiveIndex((prev) => (prev + 1) % MENU_ITEMS.length);
    } else {
      setActiveIndex((prev) => (prev - 1 + MENU_ITEMS.length) % MENU_ITEMS.length);
    }
  };

  return (
    <div 
      className="min-h-screen bg-[#324543] text-[#fffee2] font-mono selection:bg-[#fffee2] selection:text-[#324543] overflow-hidden"
      onWheel={handleWheel}
    >
      <CRTScanLine />
      
      {/* HEADER TIPO TERMINAL */}
      <header className="fixed top-0 w-full p-6 flex justify-between items-start z-40 text-sm opacity-70">
        <div>
          <p>Ricardo Torres Moreno</p>
        </div>
        <div className="text-right">
          <p>Sys.Time: {time.toLocaleTimeString([], { hour12: false })}</p>
          <p>Loc: El Paso, TX</p>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="relative h-screen flex items-center justify-center">
        
        {/* NAVEGACIÓN CILÍNDRICA 3D */}
        <div className="absolute left-12 lg:left-32 w-48 perspective-1000">
          <div className="relative h-64 transform-style-3d">
            {MENU_ITEMS.map((item, index) => {
              const offset = (index - activeIndex + MENU_ITEMS.length) % MENU_ITEMS.length;
              const isSelected = offset === 0;
              const yOffset = offset > MENU_ITEMS.length / 2 ? offset - MENU_ITEMS.length : offset;
              
              return (
                <motion.button
                  key={item}
                  onClick={() => setActiveIndex(index)}
                  animate={{
                    y: yOffset * 60,
                    scale: isSelected ? 1 : 0.8,
                    opacity: isSelected ? 1 : 0.3,
                    rotateX: yOffset * -15
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className={`absolute w-full text-left text-4xl lg:text-6xl tracking-tighter hover:opacity-100 transition-opacity ${
                    isSelected ? 'font-bold' : ''
                  }`}
                >
                  {isSelected && <span className="mr-4 text-sm animate-pulse">{'>'}</span>}
                  {item}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* PANELES DE CONTENIDO */}
        <div className="absolute right-12 lg:right-32 w-1/2 max-w-2xl h-[70vh]">
          <AnimatePresence mode="wait">
            
            {/* HOME */}
            {activeIndex === 0 && (
              <motion.div
                key="home"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full flex flex-col justify-center space-y-6"
              >
                <h1 className="text-2xl leading-relaxed">
                  Undergraduate Technician at GAIA Makerspace & Tech Support.<br/>
                  Technical Lead for the ColorStack Student Chapter at UTEP.
                </h1>
                <p className="opacity-70">
                  Specializing in backend logic, zero-trust infrastructure, and machine learning pipelines.
                </p>
                <div className="pt-8 opacity-50 animate-pulse text-sm">
                  [ Scroll or swipe to navigate ]
                </div>
              </motion.div>
            )}

            {/* PROJECTS LIST */}
            {activeIndex === 1 && !selectedProject && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full flex flex-col justify-center space-y-4"
              >
                {PROJECTS.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group border border-[#fffee2]/20 p-6 cursor-pointer hover:bg-[#fffee2]/5 transition-colors"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="flex justify-between items-baseline mb-2">
                      <h2 className="text-xl font-bold group-hover:pl-2 transition-all">
                        {project.title}
                      </h2>
                      <span className="text-sm opacity-50">{project.date}</span>
                    </div>
                    <div className="flex gap-3 text-xs opacity-60">
                      {project.tags.map(tag => <span key={tag}>[{tag}]</span>)}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* ABOUT */}
            {activeIndex === 2 && (
              <motion.div
                key="about"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full flex items-center gap-12"
              >
                {/* LIQUID BLOB ANIMADO */}
                <motion.div 
                  animate={{
                    borderRadius: [
                      "60% 40% 30% 70% / 60% 30% 70% 40%",
                      "30% 70% 70% 30% / 30% 30% 70% 70%",
                      "60% 40% 30% 70% / 60% 30% 70% 40%"
                    ]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="w-64 h-64 border border-[#fffee2]/30 overflow-hidden shrink-0 relative"
                >
                  <img 
                    src="/pfp.jpeg" 
                    alt="Ricardo Profile" 
                    className="w-full h-full object-cover grayscale opacity-90 mix-blend-screen contrast-125"
                  />
                  <div className="absolute inset-0 bg-[#324543]/20 mix-blend-overlay"></div>
                </motion.div>

                <div className="space-y-6 text-sm leading-relaxed opacity-80">
                  <p>
                    Computer Science undergraduate at The University of Texas at El Paso. Born and raised around the borderland dynamics of Ciudad Juárez.
                  </p>
                  <p>
                    I currently build and maintain zero-trust edge networks, host technical workshops covering Python and data manipulation, and configure Arch Linux systems in my downtime.
                  </p>
                  <div className="flex gap-6 pt-4 border-t border-[#fffee2]/20 flex-col sm:flex-row">
                    <a href="https://github.com/ricardotm-dev" target="_blank" rel="noreferrer" className="hover:opacity-100 hover:underline">GitHub</a>
                    <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="hover:opacity-100 hover:underline">LinkedIn</a>
                    <a href="mailto:ricard0t@outlook.com" className="hover:opacity-100 hover:underline">Email: ricard0t [at] outlook [dot] com</a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* MODAL EXPANDIBLE DEL PROYECTO */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#324543] p-12 lg:p-24 overflow-y-auto"
          >
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-12 right-12 text-2xl hover:scale-110 transition-transform"
            >
              [ X ]
            </button>

            <div className="max-w-4xl mx-auto pt-12">
              <div className="flex justify-between items-end mb-12 border-b border-[#fffee2]/20 pb-6">
                <h2 className="text-4xl lg:text-6xl font-bold tracking-tighter">
                  {selectedProject.title}
                </h2>
                <a 
                  href={selectedProject.repo} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-sm opacity-70 hover:opacity-100 hover:underline"
                >
                  [ View Source ]
                </a>
              </div>

              {/* VIDEO WEBM CON EFECTO CRT/TERMINAL */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="w-full h-auto bg-transparent border border-[#fffee2]/10 mb-8 aspect-video overflow-hidden relative"
              >
                <div className="absolute inset-0 pointer-events-none z-10 crt-scanline opacity-30"></div>
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-full object-cover opacity-80 mix-blend-screen grayscale contrast-125"
                >
                  <source src={selectedProject.gifPlaceholder} type="video/webm" />
                </video>
              </motion.div>

              <div className="grid grid-cols-3 gap-12">
                <div className="col-span-2 text-lg leading-relaxed opacity-80">
                  {selectedProject.description}
                </div>
                <div>
                  <h3 className="mb-4 opacity-50 text-sm">Stack</h3>
                  <ul className="space-y-2">
                    {selectedProject.tags.map(tag => (
                      <li key={tag}>- {tag}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}