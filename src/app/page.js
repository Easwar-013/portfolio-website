'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'motion/react';
import { Mail, ExternalLink, Code2, Database, Layout, Wrench, ArrowUpRight, Sparkles, Move, Hospital, ShoppingBag, Coffee, CheckCircle, AlertCircle, Loader2, FileText, Menu, X, Globe, Eye, Award, Cpu, Smartphone, ChevronLeft, ChevronRight, Check, Copy } from 'lucide-react';

const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

const GithubIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

const LinkedinIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

function TiltCard({ children, className }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e) => {
    if (!cardRef.current || window.innerWidth < 768) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const containerRef = useRef(null);
  const dragAreaRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Active section spy for navbar
  const [activeSection, setActiveSection] = useState("about");

  // Certificate Slideshow & Modal State
  const [certIndex, setCertIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [lightboxCert, setLightboxCert] = useState(null);

  // Copy Email State
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle');

  // ScrollSpy Listener
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "offerings", "work", "certificates", "techstack", "contact"];
      const scrollPosition = window.scrollY + 220;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth Scroll navigation helper for mobile & desktop
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    setTimeout(() => {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  // Prevent background scroll and listen for ESC key
  useEffect(() => {
    if (lightboxCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxCert(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [lightboxCert]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("pondyeashwar@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormStatus('submitting');

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New Portfolio Message from ${formData.name}`,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch (err) {
      setFormStatus('error');
    }
  };

  // Mouse Follower
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const smoothMouseX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - 100);
      mouseY.set(e.clientY - 100);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Smooth Scroll Parallax
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });
  const heroY = useTransform(smoothProgress, [0, 0.4], [0, -30]);

  const navLinks = [
    { id: "about", label: "About" },
    { id: "offerings", label: "Offerings" },
    { id: "work", label: "Work" },
    { id: "certificates", label: "Certifications" },
    { id: "techstack", label: "Techstack" },
    { id: "contact", label: "Contact" },
  ];

  const projects = [
    {
      id: "01",
      title: "ATTIRE",
      category: "Full-Stack",
      subtitle: "Full-Stack E-Commerce Platform",
      description: "Engineered a full-stack e-commerce web application featuring dual customer and admin modules, dynamic shopping carts, promotional coupon systems with validity rules, and real-time order tracking.",
      tech: ["Next.js", "React.js", "Node.js", "Express.js", "MongoDB", "Razorpay"],
      live: "https://clothes-shop-beta-black.vercel.app/",
      icon: <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" />
    },
    {
      id: "02",
      title: "Artisan Café Portal",
      category: "Full-Stack",
      subtitle: "Restaurant Management System",
      description: "Developed a restaurant management platform featuring a digital QR menu, real-time Kitchen Display System (KDS) via Socket.io, Gemini AI-driven sales analytics, dietary filtering, and gamified loyalty rewards.",
      tech: ["React.js", "Node.js", "Socket.io", "Gemini AI", "Express.js", "MongoDB"],
      live: "https://cafe-portal-cyan.vercel.app/",
      icon: <Coffee className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" />
    },
    {
      id: "03",
      title: "Hospital Mini ERP",
      category: "Healthcare / Enterprise",
      subtitle: "MERN Stack Hospital Management System",
      description: "Developed a MERN stack ERP with Admin and Patient portals for managing doctors, ward/bed assignments, appointments, and billing with JWT authentication, role-based access, and automated invoice PDF generation.",
      tech: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "REST API", "PDF Generation"],
      live: "https://hospital-mini-erp-zeta.vercel.app/user/login",
      icon: <Hospital className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" />
    }
  ];

  const certificates = [
    {
      title: "Introduction to Generative AI",
      issuer: "Simplilearn & Google Cloud",
      date: "June 2025",
      badge: "AI & GenAI",
      icon: <Cpu className="w-5 h-5 text-teal-600" />,
      img: "/certificates/generative-ai.jpg"
    },
    {
      title: "Prompt Engineering",
      issuer: "Infosys Springboard",
      date: "May 2025",
      badge: "AI Engineering",
      icon: <Sparkles className="w-5 h-5 text-teal-600" />,
      img: "/certificates/prompt-engineering.jpg"
    },
    {
      title: "Mobile App Development",
      issuer: "Datanerdz.AI & MSME",
      date: "October 2024",
      badge: "Mobile Dev",
      icon: <Smartphone className="w-5 h-5 text-teal-600" />,
      img: "/certificates/mobile-app.jpg"
    },
    {
      title: "HTML5 - The Language",
      issuer: "Infosys Springboard",
      date: "March 2025",
      badge: "Web Tech",
      icon: <Layout className="w-5 h-5 text-teal-600" />,
      img: "/certificates/html.jpg"
    },
    {
      title: "CSS3",
      issuer: "Infosys Springboard",
      date: "March 2025",
      badge: "Web Styling",
      icon: <Code2 className="w-5 h-5 text-teal-600" />,
      img: "/certificates/css.jpg"
    },
    {
      title: "JavaScript",
      issuer: "Infosys Springboard",
      date: "April 2025",
      badge: "Core JS",
      icon: <Code2 className="w-5 h-5 text-teal-600" />,
      img: "/certificates/javascript.jpg"
    },
    {
      title: "Basics of Python",
      issuer: "Infosys Springboard",
      date: "May 2024",
      badge: "Python",
      icon: <Wrench className="w-5 h-5 text-teal-600" />,
      img: "/certificates/python.jpg"
    },
    {
      title: "Database Management System Part - 1",
      issuer: "Infosys Springboard",
      date: "May 2024",
      badge: "DBMS & SQL",
      icon: <Database className="w-5 h-5 text-teal-600" />,
      img: "/certificates/dbms.jpg"
    }
  ];

  // Auto-play slideshow timer for certificates
  useEffect(() => {
    const timer = setInterval(() => {
      nextCert();
    }, 4500);
    return () => clearInterval(timer);
  }, [certIndex, certificates.length]);

  const nextCert = () => {
    setDirection(1);
    setCertIndex((prev) => (prev + 1) % certificates.length);
  };

  const prevCert = () => {
    setDirection(-1);
    setCertIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
  };

  const slideVariants = {
    initial: (direction) => ({
      x: direction > 0 ? 60 : -60,
      opacity: 0,
      scale: 0.98
    }),
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    exit: (direction) => ({
      x: direction < 0 ? 60 : -60,
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.4, ease: "easeIn" }
    })
  };

  const categories = ["All", "Full-Stack", "Healthcare / Enterprise"];

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  const techPills = [
    { label: "React.js", color: "bg-teal-100 text-teal-800 border-teal-300" },
    { label: "Next.js", color: "bg-slate-900 text-white border-slate-900" },
    { label: "Node.js", color: "bg-emerald-100 text-emerald-800 border-emerald-300" },
    { label: "Python", color: "bg-blue-100 text-blue-800 border-blue-300" },
    { label: "MongoDB", color: "bg-green-100 text-green-800 border-green-300" },
    { label: "SQL", color: "bg-purple-100 text-purple-800 border-purple-300" },
    { label: "TypeScript", color: "bg-sky-100 text-sky-800 border-sky-300" },
    { label: "Express.js", color: "bg-slate-200 text-slate-800 border-slate-300" },
    { label: "Tailwind CSS", color: "bg-cyan-100 text-cyan-800 border-cyan-300" },
    { label: "Socket.io", color: "bg-indigo-100 text-indigo-800 border-indigo-300" }
  ];

  const currentCert = certificates[certIndex] || certificates[0];

  return (
    <div ref={containerRef} className="bg-slate-50 text-slate-800 min-h-screen font-sans selection:bg-teal-500/20 selection:text-teal-900 relative overflow-x-hidden">
      
      {/* Liquid Mouse Glow Follower (Hidden on mobile for performance) */}
      <motion.div
        style={{ x: smoothMouseX, y: smoothMouseY }}
        className="fixed top-0 left-0 w-52 h-52 bg-gradient-to-tr from-teal-300/30 via-emerald-200/20 to-cyan-300/30 rounded-full blur-3xl pointer-events-none z-30 hidden md:block"
      />

      {/* Ambient Gradient Glow Background */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1100px] h-[350px] sm:h-[500px] bg-gradient-to-b from-teal-100/80 via-emerald-50/50 to-transparent blur-3xl pointer-events-none" 
      />

      {/* Floating Glass Navigation Header */}
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="fixed top-2.5 sm:top-3 left-1/2 -translate-x-1/2 w-[94%] max-w-5xl bg-white/85 backdrop-blur-md border border-slate-200/90 rounded-2xl z-50 shadow-sm"
      >
        <div className="px-4 sm:px-5 py-2.5 flex justify-between items-center">
          <motion.a 
            href="#about"
            onClick={(e) => handleNavClick(e, "about")}
            whileHover={{ scale: 1.05 }}
            className="text-base sm:text-lg font-mono font-bold tracking-tight text-slate-900 cursor-pointer flex-shrink-0"
          >
            easwar<span className="text-teal-600">.dev</span>
          </motion.a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1.5 p-1 bg-slate-100/70 backdrop-blur-sm rounded-xl border border-slate-200/60">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`relative px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-300 ${
                    isActive ? 'text-teal-900 font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-0 bg-gradient-to-r from-teal-100 via-teal-50 to-emerald-100 rounded-lg border border-teal-300/80 shadow-sm shadow-teal-500/20 -z-10"
                    />
                  )}
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-xl text-slate-700 hover:bg-slate-100 active:scale-95 transition-all"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-teal-600" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-slate-200/80 px-4 py-3 flex flex-col gap-1 text-xs uppercase tracking-widest text-slate-700 font-mono font-medium bg-white/95 rounded-b-2xl shadow-lg"
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className={`py-2.5 px-3 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                      isActive 
                        ? 'bg-teal-50 text-teal-900 font-bold border border-teal-200 shadow-sm' 
                        : 'hover:text-teal-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-teal-600" />}
                  </a>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 sm:pt-36 pb-16 sm:pb-20 space-y-16 sm:space-y-32">
        
        {/* Hero Section */}
        <section id="about" className="scroll-mt-28 min-h-[50vh] sm:min-h-[60vh] flex flex-col justify-center space-y-5 sm:space-y-6 relative pt-4">
          <motion.div style={{ y: heroY }} className="space-y-4 sm:space-y-6">
            <motion.div 
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono font-semibold text-teal-800 bg-teal-50 border border-teal-200 shadow-sm w-fit"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
              Available for Web Development Roles
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
              className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.15]"
            >
              Hi, I'm Easwar R <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600">
                Web Developer
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 15, delay: 0.1 }}
              className="text-slate-600 text-sm sm:text-base md:text-xl max-w-2xl leading-relaxed"
            >
              Crafting responsive web platforms, enterprise ERP systems, and real-time backend architectures built for performance and seamless user experiences.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 15, delay: 0.2 }}
              className="flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-4 pt-1"
            >
              <motion.a 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                href="#work" 
                onClick={(e) => handleNavClick(e, "work")}
                className="bg-teal-600 active:bg-teal-700 text-white font-semibold px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-teal-600/20 text-xs sm:text-sm"
              >
                View Selected Work <ArrowUpRight className="w-4 h-4" />
              </motion.a>

              {/* View Resume Online Button */}
              <motion.a 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                href="/resume.pdf" 
                target="_blank"
                rel="noreferrer"
                className="bg-teal-50 text-teal-800 font-semibold px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl border border-teal-200 shadow-sm flex items-center justify-center gap-2 text-xs sm:text-sm hover:bg-teal-100 transition-colors"
              >
                <FileText className="w-4 h-4 text-teal-600" /> View Resume
              </motion.a>

              <motion.a 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                href="#contact" 
                onClick={(e) => handleNavClick(e, "contact")}
                className="bg-white text-slate-700 font-semibold px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl border border-slate-300 shadow-sm flex items-center justify-center text-xs sm:text-sm"
              >
                Let's Connect
              </motion.a>
            </motion.div>
          </motion.div>
        </section>

        {/* OFFERINGS Section */}
        <section id="offerings" className="scroll-mt-24 space-y-5 sm:space-y-8 pt-6 sm:pt-8 border-t border-slate-200">
          <div className="space-y-1">
            <span className="text-[11px] sm:text-xs font-mono font-semibold text-teal-600 uppercase tracking-widest">Capabilities</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900">What I Offer</h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="p-5 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-teal-300 transition-all space-y-2.5 sm:space-y-3 cursor-default"
            >
              <div className="p-2.5 sm:p-3 rounded-xl bg-teal-50 border border-teal-100 text-teal-600 w-fit">
                <Layout className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-base sm:text-xl font-bold text-slate-900">Frontend Engineering</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Building fast, responsive web applications using Next.js and React.js paired with fluid motion for modern user interfaces.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.05 }}
              className="p-5 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-teal-300 transition-all space-y-2.5 sm:space-y-3 cursor-default"
            >
              <div className="p-2.5 sm:p-3 rounded-xl bg-teal-50 border border-teal-100 text-teal-600 w-fit">
                <Database className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-base sm:text-xl font-bold text-slate-900">Backend & APIs</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Designing robust REST APIs, real-time WebSocket pipelines with Socket.io, and database management using Express.js and MongoDB.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
              className="p-5 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-teal-300 transition-all space-y-2.5 sm:space-y-3 cursor-default sm:col-span-2 md:col-span-1"
            >
              <div className="p-2.5 sm:p-3 rounded-xl bg-teal-50 border border-teal-100 text-teal-600 w-fit">
                <Wrench className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-base sm:text-xl font-bold text-slate-900">Enterprise Solutions</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Engineered MERN stack ERP applications with role-based access control, invoice PDF rendering, and administrative dashboards.
              </p>
            </motion.div>
          </div>
        </section>

        {/* WORK SECTION */}
        <section id="work" className="scroll-mt-24 space-y-5 sm:space-y-8 pt-6 sm:pt-8 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div className="space-y-1">
              <span className="text-[11px] sm:text-xs font-mono font-semibold text-teal-600 uppercase tracking-widest">Portfolio Showcase</span>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900">Latest Work</h2>
            </div>

            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-mono font-medium transition-all ${
                    selectedCategory === cat 
                      ? 'bg-teal-600 text-white shadow-sm shadow-teal-600/20' 
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-teal-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 3-Column Card Grid */}
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <AnimatePresence>
              {filteredProjects.map((proj) => (
                <motion.div
                  key={proj.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                >
                  <TiltCard className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-teal-300/80 transition-all flex flex-col justify-between h-full group">
                    
                    {/* Top Device Window Frame */}
                    <div className="relative w-full aspect-[4/3] bg-slate-900 overflow-hidden flex flex-col">
                      
                      {/* Browser Header Bar */}
                      <div className="bg-slate-800/90 px-3 py-1.5 sm:py-2 flex items-center justify-between border-b border-slate-700/80 z-10 flex-shrink-0">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-red-500/80 inline-block" />
                          <span className="w-2 h-2 rounded-full bg-yellow-500/80 inline-block" />
                          <span className="w-2 h-2 rounded-full bg-green-500/80 inline-block" />
                        </div>
                        <div className="bg-slate-950/80 px-2 py-0.5 rounded-md border border-slate-700/60 text-[9px] font-mono text-slate-400 flex items-center gap-1 max-w-[160px] truncate">
                          <Globe className="w-2.5 h-2.5 text-teal-400 flex-shrink-0" />
                          <span className="truncate">{proj.title.toLowerCase()}.dev</span>
                        </div>
                        <span className="w-3" />
                      </div>

                      {/* Live Viewport Area */}
                      <div className="relative w-full flex-1 bg-white overflow-hidden">
                        <iframe 
                          src={proj.live} 
                          title={`${proj.title} Live Preview`}
                          className="w-full h-full border-none pointer-events-auto transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        
                        {/* Interactive Preview Overlay */}
                        <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                          <span className="px-4 py-2 rounded-full bg-white/95 text-slate-900 text-xs font-mono font-semibold shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 border border-slate-200">
                            <Eye className="w-3.5 h-3.5 text-teal-600" /> Interactive Preview
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Metadata & View Link */}
                    <div className="p-4 sm:p-6 flex flex-col justify-between flex-1 space-y-3 sm:space-y-4">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-teal-50 border border-teal-100">
                              {proj.icon}
                            </div>
                            <h3 className="text-base sm:text-xl font-bold text-slate-900 group-hover:text-teal-600 transition-colors">{proj.title}</h3>
                          </div>
                          
                          <motion.a 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href={proj.live} 
                            target="_blank" 
                            rel="noreferrer"
                            className="px-3.5 py-1.5 rounded-full bg-teal-600 hover:bg-teal-700 text-white text-[11px] font-mono font-medium shadow-sm shadow-teal-600/20 transition-all flex items-center gap-1 flex-shrink-0"
                          >
                            View <ArrowUpRight className="w-3.5 h-3.5" />
                          </motion.a>
                        </div>
                        <p className="text-[11px] sm:text-xs font-mono font-semibold text-teal-600 pt-0.5">{proj.subtitle}</p>
                      </div>

                      <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                        {proj.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                        {proj.tech.map((t, tIdx) => (
                          <span key={tIdx} className="px-2.5 py-0.5 bg-teal-50/80 text-teal-800 border border-teal-200/60 text-[10px] font-mono rounded-md">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                  </TiltCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* CERTIFICATIONS SECTION: Slideshow with Touch-Swipe Gestures */}
        <section id="certificates" className="scroll-mt-24 space-y-5 sm:space-y-8 pt-6 sm:pt-8 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div className="space-y-1">
              <span className="text-[11px] sm:text-xs font-mono font-semibold text-teal-600 uppercase tracking-widest">Verified Credentials</span>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900">Certifications</h2>
            </div>

            {/* Manual Controls */}
            <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
              <span className="text-xs font-mono text-slate-500">
                {certIndex + 1} / {certificates.length}
              </span>
              <div className="flex gap-1.5">
                <button 
                  onClick={prevCert}
                  className="p-2 sm:p-2.5 rounded-xl bg-white border border-slate-200 hover:border-teal-500 text-slate-700 shadow-sm transition-all active:scale-95"
                  aria-label="Previous certificate"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={nextCert}
                  className="p-2 sm:p-2.5 rounded-xl bg-white border border-slate-200 hover:border-teal-500 text-slate-700 shadow-sm transition-all active:scale-95"
                  aria-label="Next certificate"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Swipeable Slideshow Container */}
          <div className="relative max-w-4xl mx-auto min-h-[340px] sm:min-h-[320px] flex items-center justify-center overflow-hidden">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={certIndex}
                custom={direction}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = Math.abs(offset.x) * velocity.x;
                  if (swipe < -100 || offset.x < -60) {
                    nextCert();
                  } else if (swipe > 100 || offset.x > 60) {
                    prevCert();
                  }
                }}
                className="w-full cursor-grab active:cursor-grabbing"
              >
                <TiltCard className="p-4 sm:p-8 bg-white rounded-3xl border border-slate-200/90 shadow-md sm:shadow-lg hover:border-teal-300 transition-all flex flex-col md:flex-row justify-between items-stretch gap-4 sm:gap-6 relative overflow-hidden group">
                  
                  {/* Left Side: Certificate Text Details */}
                  <div className="space-y-3 sm:space-y-4 max-w-md flex flex-col justify-between z-10">
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-center gap-2 sm:gap-2.5">
                        <div className="p-2 sm:p-2.5 rounded-2xl bg-teal-50 border border-teal-100 text-teal-600">
                          {currentCert?.icon}
                        </div>
                        <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-slate-100 text-slate-700 text-[10px] sm:text-xs font-mono font-semibold border border-slate-200">
                          {currentCert?.badge}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-lg sm:text-2xl font-black text-slate-900 group-hover:text-teal-600 transition-colors leading-tight">
                          {currentCert?.title}
                        </h3>
                        <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1.5 flex items-center gap-1.5 sm:gap-2">
                          <Award className="w-4 h-4 text-teal-600 flex-shrink-0" />
                          {currentCert?.issuer}
                        </p>
                      </div>
                    </div>

                    <div className="text-[11px] sm:text-xs font-mono text-slate-400">
                      Issued: {currentCert?.date}
                    </div>
                  </div>

                  {/* Right Side: Clickable Certificate Image Frame */}
                  <div 
                    onClick={() => setLightboxCert(currentCert)}
                    className="w-full md:w-[380px] aspect-[1.41/1] bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden shadow-inner relative group-hover:border-teal-300 transition-colors flex items-center justify-center cursor-pointer"
                  >
                    <img 
                      src={currentCert.img} 
                      alt={`${currentCert.title} Certificate Preview`}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-3.5 py-2 rounded-full bg-white/95 text-slate-900 text-xs font-mono font-semibold shadow-md flex items-center gap-1.5 border border-slate-200 hover:bg-teal-600 hover:text-white transition-colors">
                        <FileText className="w-3.5 h-3.5 text-teal-600 group-hover:text-white" /> View Full Certificate
                      </span>
                    </div>
                  </div>

                </TiltCard>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Indicator Navigation Dots */}
          <div className="flex justify-center items-center gap-2 pt-1">
            {certificates.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > certIndex ? 1 : -1);
                  setCertIndex(idx);
                }}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                  certIndex === idx ? 'bg-teal-600 w-6 sm:w-8' : 'bg-slate-300 w-1.5 sm:w-2 hover:bg-teal-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </section>

        {/* WHITE FROSTED GLASS LIGHTBOX MODAL */}
        <AnimatePresence>
          {lightboxCert && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxCert(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-2xl z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-8 cursor-zoom-out"
            >
              <motion.div 
                initial={{ scale: 0.92, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.92, opacity: 0, y: 15 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full flex flex-col items-center gap-3 cursor-default"
              >
                {/* Frosted Glass Header Pill */}
                <div className="w-full flex justify-between items-center px-4 py-2.5 rounded-2xl bg-white/85 backdrop-blur-xl border border-white/60 shadow-xl text-slate-800">
                  <div className="flex items-center gap-2.5 truncate">
                    <span className="px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-[10px] font-mono font-semibold">
                      {lightboxCert.badge}
                    </span>
                    <span className="text-sm font-bold truncate text-slate-900">{lightboxCert.title}</span>
                    <span className="text-xs text-slate-500 hidden sm:inline">• {lightboxCert.issuer}</span>
                  </div>

                  {/* Close Button */}
                  <motion.button 
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setLightboxCert(null)}
                    className="p-1.5 rounded-full bg-slate-100/80 hover:bg-teal-600 hover:text-white text-slate-600 transition-colors shadow-sm flex items-center justify-center flex-shrink-0 ml-2"
                    aria-label="Close certificate preview"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Clean Certificate Image Viewport */}
                <div className="relative w-full rounded-2xl overflow-hidden bg-transparent shadow-2xl flex items-center justify-center">
                  <img 
                    src={lightboxCert.img} 
                    alt={`${lightboxCert.title} Certificate`} 
                    className="w-auto max-h-[80vh] object-contain rounded-2xl shadow-2xl" 
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* DRAGGABLE TECH STACK SECTION */}
        <section id="techstack" className="scroll-mt-24 space-y-5 sm:space-y-6 pt-6 sm:pt-8 border-t border-slate-200 text-center">
          <div className="max-w-xl mx-auto space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/60 text-slate-700 text-[10px] sm:text-[11px] font-mono font-semibold">
              <Move className="w-3.5 h-3.5 text-teal-600" /> Interactive Physics Box — Try dragging badges!
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Tech Stack</h2>
          </div>

          <div 
            ref={dragAreaRef}
            className="p-4 sm:p-12 bg-white rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden min-h-[180px] sm:min-h-[220px] flex flex-wrap justify-center items-center gap-2 sm:gap-3"
          >
            {techPills.map((pill, idx) => (
              <motion.div
                key={idx}
                drag
                dragConstraints={dragAreaRef}
                dragElastic={0.2}
                dragTransition={{ bounceStiffness: 300, bounceDamping: 10 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl border text-xs sm:text-sm font-mono font-semibold shadow-sm cursor-grab active:cursor-grabbing select-none ${pill.color}`}
              >
                {pill.label}
              </motion.div>
            ))}
          </div>
        </section>

        {/* CONTACT FORM */}
        <section id="contact" className="scroll-mt-24 space-y-6 sm:space-y-8 pt-6 sm:pt-8 border-t border-slate-200">
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 180, damping: 20 }}
            className="max-w-2xl mx-auto bg-white p-5 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-5 sm:space-y-6"
          >
            <div className="text-center space-y-1.5">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Let's Connect!</h2>
              <p className="text-slate-600 text-xs sm:text-sm">
                Open to Web Development opportunities, full-stack projects, and technical roles.
              </p>
            </div>

            {formStatus === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-5 sm:p-6 rounded-2xl bg-teal-50 border border-teal-200 text-center space-y-2"
              >
                <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-teal-600 mx-auto" />
                <h3 className="text-base sm:text-lg font-bold text-teal-900">Message Delivered!</h3>
                <p className="text-teal-700 text-xs font-mono">
                  Thanks for reaching out. I'll reply to your email directly as soon as possible.
                </p>
                <button
                  onClick={() => setFormStatus('idle')}
                  className="mt-2 text-xs font-mono text-teal-600 underline font-semibold"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form className="space-y-3 sm:space-y-4" onSubmit={handleFormSubmit}>
                {formStatus === 'error' && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    Failed to send message. Please ensure your access key is set or email pondyeashwar@gmail.com directly.
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name" 
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  />
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your Email" 
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  />
                </div>
                <textarea 
                  name="message"
                  required
                  rows="4" 
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell me about your project or opportunity..." 
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                />
                <motion.button 
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={formStatus === 'submitting'}
                  type="submit" 
                  className="w-full bg-teal-600 active:bg-teal-700 text-white font-semibold py-3 sm:py-3.5 rounded-xl shadow-md shadow-teal-600/20 flex items-center justify-center gap-2 disabled:opacity-70 transition-all text-xs sm:text-sm"
                >
                  {formStatus === 'submitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>
              </form>
            )}

            {/* Mobile-Responsive Contact Links Stack with Styled Glassmorphism Copy Badge */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 pt-4 text-xs font-mono text-slate-600 border-t border-slate-100">
              <div className="flex items-center gap-2 relative">
                <a href="mailto:pondyeashwar@gmail.com" className="flex items-center gap-2 hover:text-teal-600 transition-colors">
                  <Mail className="w-4 h-4 text-teal-600 flex-shrink-0" /> pondyeashwar@gmail.com
                </a>
                <div className="relative">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-1 rounded-md hover:bg-teal-50 text-slate-500 hover:text-teal-600 transition-colors flex items-center justify-center"
                    title="Copy email address"
                    aria-label="Copy email address"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>

                  {/* Styled Glassmorphism Notification Tooltip */}
                  <AnimatePresence>
                    {copiedEmail && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.85 }}
                        animate={{ opacity: 1, y: -2, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.85 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-md border border-teal-200 text-teal-900 shadow-md shadow-teal-600/10 flex items-center gap-1.5 z-40 whitespace-nowrap pointer-events-none"
                      >
                        <Check className="w-3 h-3 text-teal-600" />
                        <span className="text-[11px] font-mono font-bold tracking-tight">Copied!</span>
                        {/* Downward Caret Arrow */}
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45 border-r border-b border-teal-200" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <a href="https://linkedin.com/in/easwar-r" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-teal-600 transition-colors">
                  <LinkedinIcon className="w-4 h-4 text-teal-600 flex-shrink-0" /> LinkedIn
                </a>
                <a href="https://github.com/Easwar-013" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-teal-600 transition-colors">
                  <GithubIcon className="w-4 h-4 text-teal-600 flex-shrink-0" /> GitHub
                </a>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="text-center pt-8 text-[11px] sm:text-xs font-mono text-slate-400">
          © {new Date().getFullYear()} Easwar R. All rights reserved.
        </footer>

      </main>

    </div>
  );
}