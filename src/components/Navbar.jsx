import React, { useState, useEffect } from 'react';
import { Scale, FileDown, Menu, X, ArrowUpRight, ShieldCheck, Mail, Send } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const navLinks = [
    { label: 'Overview', href: '#overview' },
    { label: 'Judicial Profile', href: '#about' },
    { label: 'Jurisprudence', href: '#jurisprudence' },
    { label: 'Judicial Record', href: '#experience' },
    { label: 'Credentials', href: '#certificates' },
  ];

  return (
    <>
      {/* Scroll Progress Bar at very top */}
      <div className="fixed top-0 left-0 w-full h-[3px] z-[60] bg-court-dark/80">
        <div
          className="h-full bg-gradient-to-r from-court-gold via-court-goldLight to-court-royal transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-court-darkest/90 backdrop-blur-md border-b border-court-gold/15 shadow-2xl py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Seal */}
          <a
            href="#overview"
            className="flex items-center gap-3 group focus:outline-none focus:ring-1 focus:ring-court-gold rounded-lg px-1 py-0.5"
          >
            <div className="w-10 h-10 rounded-full bg-court-navy/80 border border-court-gold/40 flex items-center justify-center text-court-gold group-hover:border-court-gold group-hover:scale-105 transition-all shadow-md">
              <Scale className="w-5 h-5 text-court-gold transition-transform group-hover:rotate-6" />
            </div>
            <div>
              <div className="font-crest text-base sm:text-lg font-bold tracking-wider text-slate-100 group-hover:text-court-goldLight transition-colors">
                MEKLIT TASEW
              </div>
              <div className="text-[10px] tracking-widest uppercase font-mono text-court-gold/90 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Federal Supreme Court
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-[13px] font-medium tracking-wide">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-slate-300 hover:text-court-gold transition-colors relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-court-gold group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </nav>

          {/* CTA Group */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="/cv/Meklit_Tasew_CV.pdf"
              download="Meklit_Tasew_CV.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-court-border/70 hover:border-court-gold/50 bg-court-card/40 text-slate-300 hover:text-court-gold text-xs font-mono transition-all"
              title="Download Meklit Tasew Official CV (PDF)"
            >
              <FileDown className="w-3.5 h-3.5 text-court-gold" />
              <span>CV (PDF)</span>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-court-gold to-court-goldDark text-court-darkest font-semibold text-xs tracking-wider uppercase hover:brightness-110 transition-all shadow-[0_0_15px_rgba(200,164,93,0.25)]"
            >
              <span>Chambers &amp; Contact</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <a
              href="/cv/Meklit_Tasew_CV.pdf"
              download="Meklit_Tasew_CV.pdf"
              className="p-2 rounded-md border border-court-border bg-court-card text-court-gold text-xs"
              aria-label="Download CV"
            >
              <FileDown className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md border border-court-border text-slate-300 hover:text-court-gold focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-court-gold" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-court-darkest/98 border-b border-court-gold/20 px-6 py-6 space-y-4 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-slate-200 hover:text-court-gold py-2 text-sm font-medium border-b border-court-border/40 flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <span className="text-court-gold text-xs">→</span>
                </a>
              ))}
            </div>

            <div className="pt-4 flex flex-col gap-3">
              <a
                href="public/cv/Meklit_Tasew_CV.pdf"
                download="Meklit_Tasew_CV.pdf"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-court-gold/40 text-court-gold text-sm font-medium bg-court-navy/50"
              >
                <FileDown className="w-4 h-4" />
                <span>Download Official CV (PDF)</span>
              </a>

              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-court-gold text-court-darkest text-sm font-bold tracking-wider uppercase"
              >
                <span>Direct Contact & Chambers</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-2 text-center text-xs text-court-muted font-mono">
              Federal Supreme Court of Ethiopia • Addis Ababa
            </div>
          </div>
        )}
      </header>
    </>
  );
}
