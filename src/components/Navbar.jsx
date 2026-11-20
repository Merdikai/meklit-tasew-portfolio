import React, { useState, useEffect } from 'react';
import { 
  Scale, 
  FileDown, 
  Menu, 
  X, 
  ArrowUpRight, 
  ShieldCheck, 
  BookOpen, 
  Briefcase, 
  Award, 
  Sparkles, 
  UserCheck, 
  Mail, 
  Send, 
  Linkedin, 
  MapPin, 
  ExternalLink 
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress(totalScroll > 0 ? (currentScroll / totalScroll) * 100 : 0);
      setScrolled(currentScroll > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when sidebar drawer is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSidebarOpen]);

  // Primary navigation links - Single word, single line, no wrapping
  const navLinks = [
    { label: 'Overview', href: '#overview', icon: Scale },
    { label: 'Profile', href: '#about', icon: ShieldCheck },
    { label: 'Jurisprudence', href: '#jurisprudence', icon: BookOpen },
    { label: 'Record', href: '#experience', icon: Briefcase },
    { label: 'Credentials', href: '#certificates', icon: Award },
    { label: 'Competencies', href: '#skills', icon: Sparkles },
    { label: 'References', href: '#references', icon: UserCheck },
  ];

  // Full drawer links list including direct Contact
  const drawerLinks = [
    ...navLinks,
    { label: 'Contact', href: '#contact', icon: Mail },
  ];

  return (
    <>
      {/* Scroll Progress Bar at very top */}
      <div className="fixed top-0 left-0 w-full h-[3px] z-[60] bg-court-dark/80">
        <div
          className="h-full bg-gradient-to-r from-court-gold via-court-goldLight to-court-goldDark transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-court-darkest/95 backdrop-blur-md border-b border-court-gold/15 shadow-2xl py-3'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Seal */}
          <a
            href="#overview"
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus:ring-1 focus:ring-court-gold rounded-lg px-1 py-0.5"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-court-navy/80 border border-court-gold/40 flex items-center justify-center text-court-gold group-hover:border-court-gold group-hover:scale-105 transition-all shadow-md">
              <Scale className="w-4 h-4 sm:w-5 sm:h-5 text-court-gold transition-transform group-hover:rotate-6" />
            </div>
            <div>
              <div className="font-crest text-sm sm:text-base md:text-lg font-bold tracking-wider text-slate-100 group-hover:text-court-goldLight transition-colors">
                MEKLIT TASEW
              </div>
              <div className="text-[9px] sm:text-[10px] tracking-widest uppercase font-mono text-court-gold/90 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Federal Supreme Court</span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links (Single-word, clean, and perfectly spaced) */}
          <nav className="hidden xl:flex items-center gap-5 lg:gap-6 text-xs font-medium tracking-wider">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-slate-300 hover:text-court-gold transition-colors relative py-1 group uppercase font-mono whitespace-nowrap"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-court-gold group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick CV Download (Desktop / Tablet) */}
            <a
              href="/cv/Meklit_Tasew_CV.pdf"
              download="Meklit_Tasew_CV.pdf"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-court-border/70 hover:border-court-gold/50 bg-court-card/40 text-slate-300 hover:text-court-gold text-xs font-mono transition-all whitespace-nowrap"
              title="Download Official Curriculum Vitae"
            >
              <FileDown className="w-3.5 h-3.5 text-court-gold" />
              <span>CV</span>
            </a>

            {/* Direct Contact Button (Desktop) */}
            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-court-gold to-court-goldDark text-court-darkest font-semibold text-xs tracking-wider uppercase hover:brightness-110 transition-all shadow-[0_0_15px_rgba(200,164,93,0.25)] whitespace-nowrap"
            >
              <span>Contact</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Hamburger Sidebar Trigger Button (Mobile & Desktop) */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg border border-court-gold/40 hover:border-court-gold bg-court-navy/60 hover:bg-court-navy text-court-goldLight hover:text-court-gold transition-all group focus:outline-none focus:ring-1 focus:ring-court-gold"
              aria-label="Open Directory Menu"
              title="Open Judicial Directory Menu"
            >
              <Menu className="w-5 h-5 text-court-gold group-hover:scale-105 transition-transform" />
              <span className="text-xs font-mono tracking-wider hidden lg:inline">Menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Slide-over Sidebar Drawer & Backdrop */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
            onClick={() => setIsSidebarOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Pane */}
          <aside className="relative w-full max-w-sm sm:max-w-md h-full bg-court-darkest border-l border-court-gold/30 shadow-[-10px_0_40px_rgba(0,0,0,0.85)] flex flex-col justify-between p-6 sm:p-8 z-10 overflow-y-auto animate-in slide-in-from-right duration-300">
            
            {/* Top Bar inside Drawer */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-court-border/60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-court-navy border border-court-gold/40 flex items-center justify-center text-court-gold">
                    <Scale className="w-5 h-5 text-court-gold" />
                  </div>
                  <div>
                    <div className="font-crest text-base font-bold text-slate-100">
                      JUDICIAL DIRECTORY
                    </div>
                    <div className="text-[10px] font-mono tracking-widest uppercase text-court-gold">
                      Hon. Assistant Judge Meklit Tasew
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 rounded-lg border border-court-border/80 hover:border-court-gold/60 text-slate-400 hover:text-court-gold bg-court-card/40 hover:bg-court-card transition-all"
                  aria-label="Close Navigation Drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Complete Section Navigation List */}
              <nav className="py-6 flex flex-col space-y-1">
                {drawerLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsSidebarOpen(false)}
                      className="group flex items-center justify-between px-4 py-3 rounded-xl border border-transparent hover:border-court-gold/30 hover:bg-court-navy/40 transition-all text-slate-300 hover:text-court-goldLight"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-8 h-8 rounded-lg bg-court-card/80 border border-court-border/60 flex items-center justify-center text-court-gold group-hover:border-court-gold/50 group-hover:scale-105 transition-all">
                          <Icon className="w-4 h-4 text-court-gold" />
                        </div>
                        <span className="font-crest text-sm font-medium tracking-wide">
                          {link.label}
                        </span>
                      </div>
                      <span className="text-court-gold/60 group-hover:text-court-gold text-xs font-mono transition-colors">
                        →
                      </span>
                    </a>
                  );
                })}
              </nav>

              {/* Curriculum Vitae Download Button */}
              <div className="pt-2">
                <a
                  href="/cv/Meklit_Tasew_CV.pdf"
                  download="Meklit_Tasew_CV.pdf"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-court-gold/40 hover:border-court-gold bg-court-navy/50 hover:bg-court-navy text-court-goldLight font-crest text-xs tracking-wider uppercase transition-all shadow"
                >
                  <FileDown className="w-4 h-4 text-court-gold" />
                  <span>Download CV</span>
                </a>
              </div>
            </div>

            {/* Unified Court-Themed Footer Channels (No mismatched colors) */}
            <div className="pt-8 border-t border-court-border/60 mt-6 space-y-4">
              <div className="text-[11px] font-mono tracking-wider uppercase text-court-gold/80">
                Official Judicial Channels
              </div>

              <div className="grid grid-cols-2 gap-2.5 text-xs font-mono">
                {/* LinkedIn */}
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-lg border border-court-border/70 hover:border-court-gold/60 bg-court-card/60 hover:bg-court-card text-slate-300 hover:text-court-goldLight transition-all group"
                >
                  <Linkedin className="w-4 h-4 text-court-gold group-hover:scale-110 transition-transform" />
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
                </a>

                {/* Telegram */}
                <a
                  href={personalInfo.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-lg border border-court-border/70 hover:border-court-gold/60 bg-court-card/60 hover:bg-court-card text-slate-300 hover:text-court-goldLight transition-all group"
                >
                  <Send className="w-4 h-4 text-court-gold group-hover:scale-110 transition-transform" />
                  <span>Telegram</span>
                  <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
                </a>

                {/* Email */}
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="col-span-2 flex items-center gap-2 p-2.5 rounded-lg border border-court-border/70 hover:border-court-gold/60 bg-court-card/60 hover:bg-court-card text-slate-300 hover:text-court-goldLight transition-all group"
                >
                  <Mail className="w-4 h-4 text-court-gold group-hover:scale-110 transition-transform" />
                  <span className="truncate">{personalInfo.email}</span>
                </a>

                {/* Location */}
                <div className="col-span-2 flex items-center gap-2 p-2.5 rounded-lg border border-court-border/40 bg-court-darkest/40 text-slate-400 text-xs">
                  <MapPin className="w-4 h-4 text-court-gold/80" />
                  <span>Addis Ababa, Ethiopia</span>
                </div>
              </div>

              <div className="text-[10px] text-center text-court-muted font-mono pt-2">
                Federal Supreme Court of Ethiopia • All Rights Reserved
              </div>
            </div>

          </aside>
        </div>
      )}
    </>
  );
}
