import React from 'react';
import { Scale, ArrowUp, Linkedin, Send, Mail, Phone, Heart } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-court-darkest border-t border-court-border/70 py-16 relative overflow-hidden">
      
      {/* Subtle background glow */}
      <div className="absolute left-1/2 -top-24 -translate-x-1/2 w-96 h-96 rounded-full bg-court-gold/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-court-border/40">
          
          {/* Brand & Crest Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-court-navy/80 border border-court-gold/40 flex items-center justify-center text-court-gold shadow-md">
                <Scale className="w-5 h-5 text-court-gold" />
              </div>
              <div>
                <div className="font-crest text-lg font-bold tracking-wider text-slate-100">
                  MEKLIT TASEW TABOR
                </div>
                <div className="text-[11px] font-mono text-court-gold tracking-widest uppercase">
                  Federal Supreme Court of Ethiopia
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400 font-light leading-relaxed max-w-sm">
              Dedicated judicial officer and legal scholar specializing in cassation review, trial adjudication, corporate governance under the Commercial Code, and constitutional human rights jurisprudence.
            </p>

            <div className="font-serif italic text-sm text-court-goldLight/80">
              "Fiat Justitia Ruat Caelum" — Let Justice Be Done Though the Heavens Fall.
            </div>
          </div>

          {/* Quick Jump Links */}
          <div className="md:col-span-4 space-y-3">
            <div className="font-crest text-xs font-bold text-slate-200 uppercase tracking-wider">
              Navigation Dossier
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-400">
              <a href="#overview" className="hover:text-court-gold transition-colors">Overview</a>
              <a href="#about" className="hover:text-court-gold transition-colors">Adjudicative Profile</a>
              <a href="#jurisprudence" className="hover:text-court-gold transition-colors">Jurisprudence (LL.M.)</a>
              <a href="#experience" className="hover:text-court-gold transition-colors">Judicial Record</a>
              <a href="#certificates" className="hover:text-court-gold transition-colors">Honors &amp; Certs</a>
              <a href="#skills" className="hover:text-court-gold transition-colors">Competencies</a>
              <a href="#references" className="hover:text-court-gold transition-colors">Bench References</a>
              <a href="#contact" className="hover:text-court-gold transition-colors">Chambers &amp; Contact</a>
            </div>
          </div>

          {/* Social & Contact Column */}
          <div className="md:col-span-3 space-y-4">
            <div className="font-crest text-xs font-bold text-slate-200 uppercase tracking-wider">
              Direct Channels
            </div>

            <div className="flex flex-col space-y-2 text-xs font-mono text-slate-300">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#0A66C2] transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
                <span>LinkedIn</span>
              </a>

              <a
                href={personalInfo.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#229ED9] transition-colors"
              >
                <Send className="w-3.5 h-3.5 text-[#229ED9]" />
                <span>Telegram (@meklit11)</span>
              </a>

              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 hover:text-court-gold transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-court-gold" />
                <span>{personalInfo.email}</span>
              </a>

              <a
                href={`tel:${personalInfo.phone}`}
                className="flex items-center gap-2 hover:text-court-gold transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-court-gold" />
                <span>{personalInfo.phone}</span>
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-court-border hover:border-court-gold text-[11px] font-mono text-court-muted hover:text-court-gold transition-all"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Ascend to Chambers Top</span>
            </button>
          </div>

        </div>

        {/* Bottom Colophon */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-court-muted font-mono gap-4">
          <div>
            © 2026 Meklit Tasew Tabor. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Supreme Court of Ethiopia • Addis Ababa</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
