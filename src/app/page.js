'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'motion/react';
import { Mail, ExternalLink, Code2, Database, Layout, Wrench, ArrowUpRight, Sparkles, Move, Hospital, ShoppingBag, Coffee, CheckCircle, AlertCircle, Loader2, FileText, Menu, X, Globe, Eye } from 'lucide-react';

// PASTE YOUR WEB3FORMS ACCESS KEY HERE
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
    if (!cardRef.current) return;
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

  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle');

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
  const heroY = useTransform(smoothProgress, [0, 0.4], [0, -40]);

  const projects = [
    {
      id: "01",
      title: "ATTIRE",
      category: "Full-Stack",
      subtitle: "Full-Stack E-Commerce Platform",
      description: "Engineered a full-stack e-commerce web application featuring dual customer and admin modules, dynamic shopping carts, promotional coupon systems with validity rules, and real-time order tracking.",
      tech: ["Next.js", "React.js", "Node.js", "Express.js", "MongoDB", "Razorpay"],
      github: "#",
      live: "https://clothes-shop-beta-black.vercel.app/",
      icon: <ShoppingBag className="w-5 h-5 text-teal-600" />
    },
    {
      id: "02",
      title: "Artisan Café Portal",
      category: "Full-Stack",
      subtitle: "Restaurant Management System",
      description: "Developed a restaurant management platform featuring a digital QR menu, real-time Kitchen Display System (KDS) via Socket.io, Gemini AI-driven sales analytics, dietary filtering, and gamified loyalty rewards.",
      tech: ["React.js", "Node.js", "Socket.io", "Gemini AI", "Express.js", "MongoDB"],
      github: "#",
      live: "https://cafe-portal-cyan.vercel.app/",
      icon: <Coffee className="w-5 h-5 text-teal-600" />
    },
    {
      id: "03",
      title: "Hospital Mini ERP",
      category: "Healthcare / Enterprise",
      subtitle: "MERN Stack Hospital Management System",
      description: "Developed a MERN stack ERP with Admin and Patient portals for managing doctors, ward/bed assignments, appointments, and billing with JWT authentication, role-based access, and automated invoice PDF generation.",
      tech: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "REST API", "PDF Generation"],
      github: "#",
      live: "https://hospital-mini-erp-zeta.vercel.app/user/login",
      icon: <Hospital className="w-5 h-5 text-teal-600" />
    }
  ];

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

  return (
    <div ref={containerRef} className="bg-slate-50 text-slate-800 min-h-screen font-sans selection:bg-teal-500/20 selection:text-teal-900 relative overflow-x-hidden">
      
      {/* Liquid Mouse Glow Follower */}
      <motion.div
        style={{ x: smoothMouseX, y: smoothMouseY }}
        className="fixed top-0 left-0 w-52 h-52 bg-gradient-to-tr from-teal-300/30 via-emerald-200/20 to-cyan-300/30 rounded-full blur-3xl pointer-events-none z-30 hidden md:block"
      />

      {/* Ambient Gradient Glow Background */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1100px] h-[500px] bg-gradient-to-b from-teal-100/80 via-emerald-50/50 to-transparent blur-3xl pointer-events-none" 
      />

      {/* Floating Glass Navigation Header */}
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="fixed top-3 left-1/2 -translate-x-1/2 w-[92%] max-w-5xl bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl z-50 shadow-sm"
      >
        <div className="px-5 py-3 flex justify-between items-center">
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className="text-lg font-mono font-bold tracking-tight text-slate-900 cursor-pointer flex-shrink-0"
          >
            easwar<span className="text-teal-600">.dev</span>
          </motion.span>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6 text-xs uppercase tracking-widest text-slate-600 font-mono font-medium">
            <a href="#about" className="hover:text-teal-600 transition-colors">About</a>
            <a href="#offerings" className="hover:text-teal-600 transition-colors">Offerings</a>
            <a href="#work" className="hover:text-teal-600 transition-colors">Work</a>
            <a href="#techstack" className="hover:text-teal-600 transition-colors">Techstack</a>
            <a href="#contact" className="hover:text-teal-600 transition-colors">Contact</a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-slate-200/80 px-6 py-4 flex flex-col gap-3 text-xs uppercase tracking-widest text-slate-700 font-mono font-medium bg-white/95 rounded-b-2xl"
            >
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-teal-600 transition-colors">About</a>
              <a href="#offerings" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-teal-600 transition-colors">Offerings</a>
              <a href="#work" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-teal-600 transition-colors">Work</a>
              <a href="#techstack" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-teal-600 transition-colors">Techstack</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-teal-600 transition-colors">Contact</a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-20 space-y-20 sm:space-y-32">
        
        {/* Hero Section */}
        <section id="about" className="min-h-[55vh] sm:min-h-[60vh] flex flex-col justify-center space-y-6 relative pt-4">
          <motion.div style={{ y: heroY }} className="space-y-5 sm:space-y-6">
            <motion.div 
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-mono font-semibold text-teal-800 bg-teal-50 border border-teal-200 shadow-sm w-fit"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
              Available for Software Engineering Roles
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
              className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-tight"
            >
              Hi, I'm Easwar R <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600">
                Software Developer
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 15, delay: 0.1 }}
              className="text-slate-600 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed"
            >
              Crafting responsive web platforms, enterprise ERP systems, and real-time backend architectures built for performance and seamless user experiences.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 15, delay: 0.2 }}
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2"
            >
              <motion.a 
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                href="#work" 
                className="bg-teal-600 text-white font-semibold px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-teal-600/20 text-sm"
              >
                View Selected Work <ArrowUpRight className="w-4 h-4" />
              </motion.a>

              <motion.a 
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                href="/resume.pdf" 
                download="Easwar_R_Resume.pdf"
                className="bg-teal-50 text-teal-800 font-semibold px-6 py-3.5 rounded-xl border border-teal-200 shadow-sm flex items-center justify-center gap-2 text-sm hover:bg-teal-100 transition-colors"
              >
                <FileText className="w-4 h-4 text-teal-600" /> Download Resume
              </motion.a>

              <motion.a 
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                href="#contact" 
                className="bg-white text-slate-700 font-semibold px-6 py-3.5 rounded-xl border border-slate-300 shadow-sm flex items-center justify-center text-sm"
              >
                Let's Connect
              </motion.a>
            </motion.div>
          </motion.div>
        </section>

        {/* OFFERINGS Section */}
        <section id="offerings" className="space-y-6 sm:space-y-8 pt-8 border-t border-slate-200">
          <div className="space-y-1">
            <span className="text-xs font-mono font-semibold text-teal-600 uppercase tracking-widest">Capabilities</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900">What I Offer</h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-teal-300 transition-all space-y-3 cursor-default"
            >
              <div className="p-3 rounded-xl bg-teal-50 border border-teal-100 text-teal-600 w-fit">
                <Layout className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">Frontend Engineering</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Building fast, responsive web applications using Next.js and React.js paired with fluid motion for modern user interfaces.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-teal-300 transition-all space-y-3 cursor-default"
            >
              <div className="p-3 rounded-xl bg-teal-50 border border-teal-100 text-teal-600 w-fit">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">Backend & APIs</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Designing robust REST APIs, real-time WebSocket pipelines with Socket.io, and database management using Express.js and MongoDB.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-teal-300 transition-all space-y-3 cursor-default sm:col-span-2 md:col-span-1"
            >
              <div className="p-3 rounded-xl bg-teal-50 border border-teal-100 text-teal-600 w-fit">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">Enterprise Solutions</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Engineered MERN stack ERP applications with role-based access control, invoice PDF rendering, and administrative dashboards.
              </p>
            </motion.div>
          </div>
        </section>

        {/* WORK SECTION: Agency-Grade Project Mockup Showcase */}
        <section id="work" className="space-y-6 sm:space-y-8 pt-8 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono font-semibold text-teal-600 uppercase tracking-widest">Portfolio Showcase</span>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900">Latest Work</h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
                    selectedCategory === cat 
                      ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20' 
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-teal-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Modern Card Showcase Grid */}
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredProjects.map((proj) => (
                <motion.div
                  key={proj.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  <TiltCard className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-teal-300/80 transition-all flex flex-col justify-between h-full group">
                    
                    {/* Top Device Window Frame with Window Controls & URL bar */}
                    <div className="relative w-full aspect-[4/3] bg-slate-900 overflow-hidden flex flex-col">
                      
                      {/* Browser Header Bar */}
                      <div className="bg-slate-800/90 px-3.5 py-2 flex items-center justify-between border-b border-slate-700/80 z-10 flex-shrink-0">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                        </div>
                        <div className="bg-slate-950/80 px-2.5 py-0.5 rounded-md border border-slate-700/60 text-[9px] font-mono text-slate-400 flex items-center gap-1 max-w-[180px] truncate">
                          <Globe className="w-2.5 h-2.5 text-teal-400 flex-shrink-0" />
                          <span className="truncate">{proj.title.toLowerCase()}.dev</span>
                        </div>
                        <span className="w-3" />
                      </div>

                      {/* Live Viewport Area with Scale & Hover Blur Overlay */}
                      <div className="relative w-full flex-1 bg-white overflow-hidden">
                        <iframe 
                          src={proj.live} 
                          title={`${proj.title} Live Preview`}
                          className="w-full h-full border-none pointer-events-auto transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        
                        {/* Hover Overlay Button */}
                        <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                          <span className="px-4 py-2 rounded-full bg-white/90 text-slate-900 text-xs font-mono font-semibold shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                            <Eye className="w-3.5 h-3.5 text-teal-600" /> Interactive Preview
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Metadata & View Link */}
                    <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 space-y-4">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-teal-50 border border-teal-100">
                              {proj.icon}
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-teal-600 transition-colors">{proj.title}</h3>
                          </div>
                          
                          <motion.a 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href={proj.live} 
                            target="_blank" 
                            rel="noreferrer"
                            className="px-3 py-1.5 rounded-full bg-teal-600 hover:bg-teal-700 text-white text-[11px] font-mono font-medium shadow-sm shadow-teal-600/20 transition-all flex items-center gap-1 flex-shrink-0"
                          >
                            View <ArrowUpRight className="w-3.5 h-3.5" />
                          </motion.a>
                        </div>
                        <p className="text-xs font-mono font-semibold text-teal-600 pt-0.5">{proj.subtitle}</p>
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

        {/* DRAGGABLE TECH STACK SECTION */}
        <section id="techstack" className="space-y-6 pt-8 border-t border-slate-200 text-center">
          <div className="max-w-xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/60 text-slate-700 text-[11px] font-mono font-semibold">
              <Move className="w-3.5 h-3.5 text-teal-600" /> Interactive Physics Box — Try dragging badges!
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Tech Stack</h2>
          </div>

          <div 
            ref={dragAreaRef}
            className="p-6 sm:p-12 bg-white rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden min-h-[200px] sm:min-h-[220px] flex flex-wrap justify-center items-center gap-2.5 sm:gap-3"
          >
            {techPills.map((pill, idx) => (
              <motion.div
                key={idx}
                drag
                dragConstraints={dragAreaRef}
                dragElastic={0.2}
                dragTransition={{ bounceStiffness: 300, bounceDamping: 10 }}
                whileHover={{ scale: 1.15, zIndex: 10 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl border text-xs sm:text-sm font-mono font-semibold shadow-sm cursor-grab active:cursor-grabbing select-none ${pill.color}`}
              >
                {pill.label}
              </motion.div>
            ))}
          </div>
        </section>

        {/* CONTACT FORM */}
        <section id="contact" className="space-y-8 pt-8 border-t border-slate-200">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 180, damping: 20 }}
            className="max-w-2xl mx-auto bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6"
          >
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Let's Connect!</h2>
              <p className="text-slate-600 text-xs sm:text-sm">
                Open to Software Engineering opportunities, full-stack projects, and technical roles.
              </p>
            </div>

            {formStatus === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 rounded-2xl bg-teal-50 border border-teal-200 text-center space-y-2"
              >
                <CheckCircle className="w-10 h-10 text-teal-600 mx-auto" />
                <h3 className="text-lg font-bold text-teal-900">Message Delivered!</h3>
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
              <form className="space-y-4 pt-2" onSubmit={handleFormSubmit}>
                {formStatus === 'error' && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    Failed to send message. Please ensure your access key is set or email pondyeashwar@gmail.com directly.
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name" 
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  />
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your Email" 
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  />
                </div>
                <textarea 
                  name="message"
                  required
                  rows="4" 
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell me about your project or opportunity..." 
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                />
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={formStatus === 'submitting'}
                  type="submit" 
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3.5 rounded-xl shadow-md shadow-teal-600/20 flex items-center justify-center gap-2 disabled:opacity-70 transition-all text-xs sm:text-sm"
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

            {/* Mobile-Responsive Contact Links Stack */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 pt-4 text-xs font-mono text-slate-600 border-t border-slate-100">
              <a href="mailto:pondyeashwar@gmail.com" className="flex items-center gap-2 hover:text-teal-600 transition-colors">
                <Mail className="w-4 h-4 text-teal-600 flex-shrink-0" /> pondyeashwar@gmail.com
              </a>
              <div className="flex items-center gap-6">
                <a href="https://linkedin.com/in/easwar-r" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-teal-600 transition-colors">
                  <LinkedinIcon className="w-4 h-4 text-teal-600 flex-shrink-0" /> LinkedIn
                </a>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-teal-600 transition-colors">
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