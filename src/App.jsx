import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiExternalLink, FiCode, FiDatabase, FiLayout, FiServer, FiCpu, FiAward, FiMessageSquare, FiCheckCircle, FiDownload, FiTrendingUp, FiBriefcase, FiLayers } from 'react-icons/fi';
import Background3D from './components/Background3D';
import CursorGlow from './components/CursorGlow';
import profileImg from './assets/profile.png';
import intellitestImg from './assets/intellitest_hub.png';
import cryptoImg from './assets/crypto_chatbot.png';
import './index.css';

// Highly Optimized Reusable 3D Parallax Tilt Card Component
function TiltCard({ children, className, style }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Maps mouse coordinates relative to card size into subtle 3D rotational values (-12deg to 12deg)
  const rotateX = useTransform(y, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-12, 12]);

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;
    
    x.set(mouseX / width);
    y.set(mouseY / height);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        rotateX, 
        rotateY, 
        transformStyle: "preserve-3d", 
        perspective: 1000,
        ...style 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function App() {
  const [isEntered, setIsEntered] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [skillCategory, setSkillCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    formData.append("access_key", "31b27e08-bcf2-44e2-9bac-0aeee9429c5b");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setFormSubmitted(true);
        e.target.reset();
      } else {
        alert("Something went wrong! Please check your Access Key.");
      }
    } catch (error) {
      alert("Error sending message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const skillsData = [
    { icon: <FiLayout />, title: "Frontend", skills: "Angular, React JS, RxJS, HTML5, CSS3, Webpack", category: "Frontend" },
    { icon: <FiServer />, title: "Backend", skills: "Node.js, Express.js, Spring Boot, Microservices, REST API", category: "Backend" },
    { icon: <FiDatabase />, title: "Database", skills: "PostgreSQL, MySQL, MongoDB, Sequelize ORM", category: "Database" },
    { icon: <FiCode />, title: "Languages", skills: "JavaScript (ES6+), TypeScript, Java, Python, SQL, C++", category: "Frontend" },
    { icon: <FiCpu />, title: "DevOps & Cloud", skills: "Docker, Kubernetes, AWS, CI/CD, Git, Linux, Bash Scripting", category: "DevOps" },
    { icon: <FiExternalLink />, title: "Testing & Tools", skills: "Jest, Jasmine, Bruno, Postman, Swagger, OAuth 2.0, JWT", category: "Backend" },
  ];

  const filteredSkills = skillCategory === 'All' 
    ? skillsData 
    : skillsData.filter(skill => skill.category === skillCategory);

  return (
    <>
      {/* Interactive Cursor Aura */}
      <CursorGlow />

      {/* 3D Canvas Background */}
      <div id="canvas-container">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <Suspense fallback={null}>
            <Background3D />
          </Suspense>
        </Canvas>
      </div>

      <AnimatePresence mode="wait">
        {!isEntered ? (
          <motion.div 
            key="splash"
            className="splash-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <div className="splash-content">
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="splash-greeting text-gradient"
              >
                VT_PORTAL //
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="splash-subtitle"
              >
                Connection secure. Click below to launch the developer mainframe.
              </motion.p>
              <motion.button 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEntered(true)}
                className="btn btn-primary btn-lg splash-btn"
              >
                Launch Experience
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Floating Futuristic Navbar */}
            <nav className="navbar glass-panel">
              <div className="nav-logo text-gradient">VT</div>
              <div className="nav-links">
                <a href="#about">About</a>
                <a href="#experience">Experience</a>
                <a href="#skills">Skills</a>
                <a href="#certifications">Certifications</a>
                <a href="#projects">Projects</a>
                <a href="#contact">Contact</a>
              </div>
            </nav>

            <div className="container content-wrapper">
              {/* Hero Section */}
              <motion.div 
                className="hero-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="hero-content">
                  <motion.div variants={itemVariants} className="badge-wrapper">
                    <span className="badge">Available for Hire</span>
                  </motion.div>
                  
                  <motion.h1 variants={itemVariants} className="hero-title">
                    Hi, I'm <span className="text-gradient">Vedant Tiwari</span>
                  </motion.h1>
                  
                  <motion.h2 variants={itemVariants} className="hero-subtitle">
                    Full Stack Developer <span className="text-accent">(MEAN Stack)</span> crafting scalable microservices & dynamic interfaces.
                  </motion.h2>

                  <motion.div variants={itemVariants} className="hero-actions">
                    <a href="mailto:askvedant18@gmail.com" className="btn btn-primary">
                      <FiMail className="icon-sm" /> Get in Touch
                    </a>
                    <a href="/resume.pdf" download="Vedant_Tiwari_Resume.pdf" className="btn btn-outline hover-border-secondary">
                      <FiDownload className="icon-sm" /> Download Resume
                    </a>
                    <a href="https://github.com/askvedant18" target="_blank" rel="noreferrer" className="btn btn-outline">
                      <FiGithub className="icon-sm" /> GitHub
                    </a>
                    <a href="https://linkedin.com/in/vedanttiwari" target="_blank" rel="noreferrer" className="btn btn-outline">
                      <FiLinkedin className="icon-sm" /> LinkedIn
                    </a>
                  </motion.div>
                </div>

                <motion.div 
                  variants={itemVariants}
                  className="hero-avatar-wrapper"
                >
                  <TiltCard className="avatar-tilt-wrapper">
                    <div className="avatar-glow"></div>
                    <div className="avatar-frame">
                      <img src={profileImg} alt="Vedant Tiwari" className="avatar-image" style={{ transform: "translateZ(40px)" }} />
                    </div>
                  </TiltCard>
                </motion.div>
              </motion.div>

              {/* High-Performance Stats Banner */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="glass-panel stats-banner"
              >
                <div className="stat-item">
                  <div className="stat-icon-wrapper"><FiBriefcase /></div>
                  <div>
                    <h3 className="stat-number text-gradient">8+ Months</h3>
                    <p className="stat-label">Full Stack (MEAN) Experience</p>
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon-wrapper"><FiLayers /></div>
                  <div>
                    <h3 className="stat-number text-gradient">5+ Internships</h3>
                    <p className="stat-label">DevOps, Data Science & Web</p>
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon-wrapper"><FiCode /></div>
                  <div>
                    <h3 className="stat-number text-gradient">10+ APIs</h3>
                    <p className="stat-label">Secure & Optimized REST</p>
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon-wrapper"><FiTrendingUp /></div>
                  <div>
                    <h3 className="stat-number text-gradient">80%+</h3>
                    <p className="stat-label">Jest Unit Test Coverage</p>
                  </div>
                </div>
              </motion.div>

              {/* About & Education Section */}
              <section className="section" id="about">
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="section-header"
                >
                  <h2 className="section-title">About Me & <span className="text-gradient">Education</span></h2>
                  <div className="section-divider"></div>
                </motion.div>

                <div className="grid-2">
                  <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="glass-panel card"
                  >
                    <h3 className="card-title mb-4">Who I Am</h3>
                    <p className="about-text">
                      I am a results-driven Full Stack Developer with 8+ months of hands-on experience delivering production-grade web applications using the MEAN Stack (Angular, Node.js, Express.js, MongoDB) and PostgreSQL.
                    </p>
                    <p className="about-text mt-4">
                      Backed by 5 internships spanning DevOps, data science, and cybersecurity, I excel at designing RESTful APIs, implementing JWT/OAuth 2.0 security, and deploying scalable microservices via Docker and Kubernetes.
                    </p>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="glass-panel card"
                  >
                    <h3 className="card-title mb-4">Education Timeline</h3>
                    <div className="edu-timeline">
                      <div className="edu-item">
                        <div className="edu-dot"></div>
                        <h4 className="edu-title">Bachelor of Engineering (ISE)</h4>
                        <p className="edu-inst">Visvesvaraya Technological University (VTU) | 2021 - 2025</p>
                        <p className="edu-score">Score: 75%</p>
                      </div>
                      <div className="edu-item mt-4">
                        <div className="edu-dot"></div>
                        <h4 className="edu-title">Class XII (CBSE)</h4>
                        <p className="edu-inst">Kendriya Vidyalaya Dhana, MP | Score: 83%</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </section>

              {/* Experience Section */}
              <section className="section" id="experience">
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="section-header"
                >
                  <h2 className="section-title">Work <span className="text-gradient">Experience</span></h2>
                  <div className="section-divider divider-secondary"></div>
                </motion.div>

                <div className="grid-2">
                  <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="glass-panel card hover-border-primary"
                  >
                    <div className="card-header">
                      <div>
                        <h3 className="card-title">Full Stack Developer</h3>
                        <p className="card-subtitle">Poorit Technology</p>
                      </div>
                      <span className="date-badge">Aug 2024 - Present</span>
                    </div>
                    <ul className="custom-list">
                      <li>Develop & maintain 3+ production-grade web apps using Angular & Node.js/Express.js with PostgreSQL.</li>
                      <li>Designed 10+ RESTful APIs; optimized PostgreSQL schemas reducing query execution by 25%.</li>
                      <li>Core contributor to Poorit IntelliTest Hub – handling module architecture and Jest unit testing (80%+ coverage).</li>
                    </ul>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="glass-panel card hover-border-secondary"
                  >
                    <div className="card-header">
                      <div>
                        <h3 className="card-title">DevOps Engineer Intern</h3>
                        <p className="card-subtitle-secondary">Rooman Technologies</p>
                      </div>
                      <span className="date-badge">Sep 2024 - Feb 2025</span>
                    </div>
                    <ul className="custom-list list-secondary">
                      <li>Built CI/CD pipelines using Docker and Kubernetes, reducing deployment time by 40%.</li>
                      <li>Deployed AI models to AWS and IBM Cloud using Linux and Bash automation scripts.</li>
                    </ul>
                  </motion.div>
                </div>
              </section>

              {/* Skills Section with Stateful Category Filter */}
              <section className="section" id="skills">
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="section-header"
                >
                  <h2 className="section-title">Technical <span className="text-gradient">Skills</span></h2>
                  <div className="section-divider divider-tertiary"></div>
                </motion.div>

                {/* Filter Tabs Banner */}
                <div className="skills-filter-container">
                  {['All', 'Frontend', 'Backend', 'Database', 'DevOps'].map((category) => (
                    <button 
                      key={category}
                      onClick={() => setSkillCategory(category)}
                      className={`filter-tab ${skillCategory === category ? 'active' : ''}`}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                <motion.div layout className="grid-3">
                  <AnimatePresence>
                    {filteredSkills.map((skill) => (
                      <TiltCard 
                        key={skill.title}
                        className="glass-panel skill-card"
                      >
                        <div className="skill-icon-wrapper" style={{ transform: "translateZ(30px)" }}>
                          {skill.icon}
                        </div>
                        <h3 className="skill-title" style={{ transform: "translateZ(40px)" }}>{skill.title}</h3>
                        <p className="skill-text" style={{ transform: "translateZ(20px)" }}>{skill.skills}</p>
                      </TiltCard>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </section>

              {/* Certifications Section */}
              <section className="section" id="certifications">
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="section-header"
                >
                  <h2 className="section-title">Professional <span className="text-gradient">Certifications</span></h2>
                  <div className="section-divider divider-secondary"></div>
                </motion.div>

                <div className="grid-3">
                  <CertCard title="AI-DevOps Engineer" provider="Rooman Technologies" />
                  <CertCard title="Cloud-Native Developer" provider="IBM & Kubernetes" />
                  <CertCard title="Data Science & Analysis" provider="Zidio Development" />
                  <CertCard title="AWS for Beginners" provider="Amazon Web Services" />
                  <CertCard title="Introduction to AI" provider="IBM / Coursera" />
                  <CertCard title="Java Full Stack Developer" provider="Tap Academy" />
                </div>
              </section>
              
              {/* Projects Section */}
              <section className="section" id="projects">
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="section-header"
                >
                  <h2 className="section-title">Featured <span className="text-gradient">Projects</span></h2>
                  <div className="section-divider divider-tertiary"></div>
                </motion.div>

                <div className="projects-container">
                  <ProjectCard 
                    title="Poorit IntelliTest Hub"
                    tech="Angular, Node.js, Express.js, PostgreSQL, Jest, Swagger"
                    description="A full-stack intelligent testing and assessment platform. Features include an Angular frontend consuming Node.js/Express.js REST APIs with JSON data interchange. Designed complex PostgreSQL schemas for test, user, and result data."
                    image={intellitestImg}
                    onViewDetails={() => setSelectedProject({
                      title: "Poorit IntelliTest Hub",
                      subtitle: "Intelligent Testing & Assessment System",
                      overview: "A high-security, robust assessment platform built to streamline exams, maintain test integrity, and provide instantaneous feedback and results computation.",
                      highlights: [
                        "Optimized 10+ RESTful APIs reducing database query execution times by 25%.",
                        "Built a modular assessment dashboard in Angular consuming secure Express.js routes.",
                        "Achieved 80%+ Jest unit testing coverage across core assessment modules.",
                        "Engineered secure PostgreSQL schemas supporting high concurrent exam sessions."
                      ],
                      tech: ["Angular", "Node.js", "Express.js", "PostgreSQL", "Jest", "Swagger"],
                      image: intellitestImg
                    })}
                  />
                  <ProjectCard 
                    title="Crypto Trading Platform with AI Chatbot"
                    tech="React JS, Spring Boot, MySQL, JWT, OAuth 2.0, Gemini API, Docker"
                    description="Architected a scalable full-stack cryptocurrency trading platform with real-time market data, AI Chatbot powered by Gemini API, and secure payment gateway integration. Implemented JWT/OAuth 2.0 authentication."
                    image={cryptoImg}
                    reverse={true}
                    onViewDetails={() => setSelectedProject({
                      title: "Crypto Trading Platform with AI Chatbot",
                      subtitle: "Cybernetic Investment Terminal & Assistant",
                      overview: "An enterprise-grade financial terminal providing real-time price feeds, candlestick charts, secure transaction ledgers, and an integrated generative AI virtual assistant.",
                      highlights: [
                        "Engineered dynamic, interactive candlestick charts using high-performance React canvases.",
                        "Built a secure backend using Spring Boot and MySQL with transactional integrity.",
                        "Integrated Google Gemini API to deliver smart, contextual investment advice.",
                        "Secured platform access with robust JWT and OAuth 2.0 social sign-in."
                      ],
                      tech: ["React JS", "Spring Boot", "MySQL", "JWT", "OAuth 2.0", "Gemini API", "Docker"],
                      image: cryptoImg
                    })}
                  />
                </div>
              </section>

              {/* Contact Section */}
              <section className="section" id="contact">
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="section-header"
                >
                  <h2 className="section-title">Get In <span className="text-gradient">Touch!</span></h2>
                  <div className="section-divider"></div>
                </motion.div>

                <div className="contact-wrapper">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="glass-panel contact-card"
                  >
                    <AnimatePresence mode="wait">
                      {!formSubmitted ? (
                        <motion.form 
                          key="contact-form"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          onSubmit={handleContactSubmit} 
                          className="contact-form"
                        >
                          <div className="form-group">
                            <label className="form-label">Name</label>
                            <input type="text" name="name" className="form-input" placeholder="Rahul Sharma" required />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Email</label>
                            <input type="email" name="email" className="form-input" placeholder="rahul@example.com" required />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Message</label>
                            <textarea name="message" className="form-input textarea" placeholder="Hey Vedant, loved your 3D portfolio! Let's collaborate." rows="4" required></textarea>
                          </div>
                          <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full">
                            <FiMessageSquare className="icon-sm" /> {isSubmitting ? "Sending..." : "Send Message"}
                          </button>
                        </motion.form>
                      ) : (
                        <motion.div 
                          key="success"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          className="success-wrapper"
                        >
                          <FiCheckCircle size={64} className="success-icon" />
                          <h3 className="success-title text-gradient">Message Sent!</h3>
                          <p className="success-text">Thanks for reaching out! I will reply to you as soon as possible.</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </section>

              {/* Footer */}
              <footer className="footer">
                <p>© {new Date().getFullYear()} Vedant Tiwari. All rights reserved.</p>
              </footer>
            </div>

            {/* Glassmorphic Project Details Modal Overlay */}
            <AnimatePresence>
              {selectedProject && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedProject(null)}
                  className="modal-overlay"
                >
                  <motion.div 
                    initial={{ y: 50, scale: 0.95, opacity: 0 }}
                    animate={{ y: 0, scale: 1, opacity: 1 }}
                    exit={{ y: 50, scale: 0.95, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 220 }}
                    onClick={(e) => e.stopPropagation()}
                    className="glass-panel modal-card"
                  >
                    <button className="modal-close" onClick={() => setSelectedProject(null)}>×</button>
                    <div className="modal-grid">
                      <div className="modal-image-wrapper">
                        <img src={selectedProject.image} alt={selectedProject.title} className="modal-image" />
                      </div>
                      <div className="modal-content">
                        <h3 className="modal-title text-gradient">{selectedProject.title}</h3>
                        <p className="modal-subtitle">{selectedProject.subtitle}</p>
                        <p className="modal-overview">{selectedProject.overview}</p>
                        
                        <div className="modal-section">
                          <h4 className="modal-section-title">Key Contributions & Highlights:</h4>
                          <ul className="modal-list">
                            {selectedProject.highlights.map((h, i) => (
                              <li key={i}>{h}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="modal-section">
                          <h4 className="modal-section-title">Technologies Used:</h4>
                          <div className="modal-badge-container">
                            {selectedProject.tech.map((t, i) => (
                              <span key={i} className="modal-badge">{t}</span>
                            ))}
                          </div>
                        </div>

                        <div className="modal-actions">
                          <a 
                            href="#contact" 
                            onClick={() => {
                              setSelectedProject(null);
                              setTimeout(() => {
                                const msgArea = document.querySelector('textarea[name="message"]');
                                if (msgArea) {
                                  msgArea.value = `Hey Vedant, I explored your "${selectedProject.title}" project and would love to request a live demo! Let's connect.`;
                                  msgArea.focus();
                                }
                              }, 100);
                            }} 
                            className="btn btn-primary"
                          >
                            Request Live Demo
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function CertCard({ title, provider }) {
  return (
    <TiltCard className="glass-panel skill-card cert-card">
      <div className="skill-icon-wrapper cert-icon-wrapper" style={{ transform: "translateZ(30px)" }}>
        <FiAward size={24} />
      </div>
      <h3 className="skill-title" style={{ transform: "translateZ(40px)" }}>{title}</h3>
      <p className="skill-text" style={{ transform: "translateZ(20px)" }}>{provider}</p>
    </TiltCard>
  );
}

function ProjectCard({ title, tech, description, image, onViewDetails, reverse = false }) {
  return (
    <TiltCard className={`glass-panel project-card ${reverse ? 'reverse' : ''}`}>
      <div className="project-image-wrapper" style={{ transform: "translateZ(30px)" }}>
        <div className="project-image-glow"></div>
        <div className="project-image">
          {image ? (
            <img src={image} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "0.75rem" }} />
          ) : (
            <FiCode size={64} color="rgba(255,255,255,0.2)" />
          )}
        </div>
      </div>
      <div className="project-content" style={{ transform: "translateZ(50px)" }}>
        <h3 className="project-title">{title}</h3>
        <p className="project-tech">{tech}</p>
        <p className="project-desc">{description}</p>
        <button onClick={onViewDetails} className="btn btn-outline" style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.02)" }}>
          View Project <FiExternalLink size={18} className="icon-sm-ml" />
        </button>
      </div>
    </TiltCard>
  );
}

export default App;
