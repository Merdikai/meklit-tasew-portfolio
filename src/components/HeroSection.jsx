import React, { useState } from 'react';
import { 
  Scale, 
  Award, 
  GraduationCap, 
  ArrowDown, 
  ExternalLink, 
  MapPin, 
  FileDown, 
  Send,
  Linkedin,
  Mail,
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import PhotorealisticGoldenPedestal from './PhotorealisticGoldenPedestal';

export default function HeroSection() {
  return (
    <section
      id="overview"
      className="relative min-h-screen pt-28 pb-16 flex flex-col justify-center overflow-x-clip bg-radial-gradient from-court-dark/85 via-court-darkest to-court-darkest"
    >
      {/* Background Radial Glow */}
      <div className="absolute right-1/4 top-1/3 -translate-y-1/2 w-[750px] h-[500px] bg-court-gold/10 blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* Top Split: Title & Golden Pedestal Centerpiece */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Judicial Titles & Dossier */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Jurisdiction Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-court-gold/40 bg-court-card/80 backdrop-blur-md shadow-lg">
              <span className="w-2 h-2 rounded-full bg-court-gold animate-ping"></span>
              <span className="font-crest text-[11px] font-bold tracking-widest text-court-gold uppercase">
                Federal Supreme Court of Ethiopia
              </span>
              <span className="text-court-muted text-xs">•</span>
              <span className="text-[11px] font-mono text-slate-300">Addis Ababa</span>
            </div>

            {/* Headline */}
            <div className="space-y-1">
              <div className="text-xs uppercase font-mono tracking-widest text-court-gold/80 flex items-center gap-2">
                <span>Judicial Portfolio</span>
                <span className="w-8 h-[1px] bg-court-gold/50"></span>
              </div>
              <h1 className="font-crest text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-100 leading-[1.05]">
                MEKLIT TASEW <br />
                <span className="text-gold-gradient font-serif italic font-normal">TABOR</span>
              </h1>
              <div className="pt-2 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm font-crest tracking-wider text-court-goldLight uppercase">
                <span>Assistant Judge &amp; Legal Scholar</span>
                <span className="text-court-muted">•</span>
                <span className="text-slate-300">Federal Supreme Court</span>
              </div>
            </div>

            {/* Quick Specialization Badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href="#jurisprudence"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-court-navy/60 border border-court-gold/30 hover:border-court-gold text-xs font-mono text-court-goldLight transition-all"
              >
                <GraduationCap className="w-3.5 h-3.5 text-court-gold" />
                <span>Master of Laws (AAU - Business &amp; Property)</span>
              </a>
              <a
                href="#jurisprudence"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-court-navy/60 border border-cyan-500/30 hover:border-cyan-400 text-xs font-mono text-cyan-300 transition-all"
              >
                <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                <span>Master of Laws (DMU - Human Rights)</span>
              </a>
            </div>

            {/* Editorial Bio */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light max-w-2xl">
              Dedicated judicial officer with over five years of progressive adjudicative and legal practice across Ethiopia's federal and regional benches. Specializing in statutory interpretation, appellate and cassation review, and dual LL.M. scholarship in <strong className="font-medium text-slate-100">Business &amp; Property Law</strong> and <strong className="font-medium text-slate-100">International Human Rights Law</strong>.
            </p>

            {/* Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#experience"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-court-gold via-court-goldLight to-court-goldDark text-court-darkest font-crest font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-[0_4px_25px_rgba(200,164,93,0.35)] hover:scale-[1.02] hover:brightness-110"
              >
                <span>View Judicial Record</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href="#jurisprudence"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-court-border hover:border-court-gold/60 bg-court-card/70 hover:bg-court-card text-slate-200 hover:text-court-gold text-xs sm:text-sm font-medium transition-all"
              >
                <GraduationCap className="w-4 h-4 text-court-gold" />
                <span>LL.M. Theses &amp; Scholarship</span>
              </a>

              <a
                href="/cv/Meklit_Tasew_CV.pdf"
                download="Meklit_Tasew_CV.pdf"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-court-border hover:border-court-gold/40 text-court-muted hover:text-slate-200 text-xs sm:text-sm font-mono transition-all"
                title="Download Official Curriculum Vitae (PDF)"
              >
                <FileDown className="w-4 h-4 text-court-gold" />
                <span>Curriculum Vitae</span>
              </a>
            </div>

            {/* Quick Contacts Bar */}
            <div className="pt-4 border-t border-court-border/50 flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-court-muted font-mono">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-slate-300 hover:text-court-gold transition-colors group"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#0A66C2] group-hover:scale-110 transition-transform" />
                <span>LinkedIn Profile</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>

              <a
                href={personalInfo.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-slate-300 hover:text-court-gold transition-colors group"
              >
                <Send className="w-3.5 h-3.5 text-[#229ED9] group-hover:scale-110 transition-transform" />
                <span>Telegram (@meklit11)</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>

              <a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex items-center gap-1.5 text-slate-300 hover:text-court-gold transition-colors group"
              >
                <Mail className="w-3.5 h-3.5 text-court-gold group-hover:scale-110 transition-transform" />
                <span>{personalInfo.email}</span>
              </a>

              <div className="inline-flex items-center gap-1.5 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-court-gold" />
                <span>Addis Ababa, Ethiopia</span>
              </div>
            </div>

          </div>

          {/* Right Column: Executive Office Portrait with Golden Scales Peeking on the Right */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            
            {/* Majestic Golden Pedestal Peeking Gracefully to the Right of the Portrait (Subdued, serene golden glow) */}
            <div className="absolute left-1/2 top-1/2 -translate-y-1/2 translate-x-[45px] sm:translate-x-[70px] lg:translate-x-[95px] xl:translate-x-[115px] w-[540px] sm:w-[620px] lg:w-[680px] pointer-events-none opacity-[0.80] select-none z-0 filter drop-shadow-[0_0_35px_rgba(200,164,93,0.22)]">
              <PhotorealisticGoldenPedestal isBackground={true} />
            </div>

            {/* Foreground Portrait Card (z-10) */}
            <div className="relative z-10 w-full max-w-[420px] sm:max-w-[440px] rounded-3xl bg-court-card/85 border border-court-gold/35 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_35px_rgba(200,164,93,0.2)] p-3 backdrop-blur-md">
              
              {/* Photo Frame */}
              <div className="relative rounded-2xl overflow-hidden bg-court-darkest aspect-[4/5] group">
                <picture>
                  <source srcSet="/images/executive-desk-hero.webp" type="image/webp" />
                  <img
                    src="/images/executive-desk-hero.jpg"
                    alt="Judge Meklit Tasew Tabor in Executive Office Chambers"
                    className="w-full h-full object-cover object-top filter contrast-[1.03] brightness-[0.98] group-hover:scale-105 transition-transform duration-700"
                  />
                </picture>

                {/* Subtle bottom vignette caption */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-court-darkest via-court-darkest/75 to-transparent">
                  <div className="font-crest text-sm font-bold text-slate-100">
                    MEKLIT TASEW TABOR
                  </div>
                  <div className="text-xs text-court-goldLight">
                    Assistant Judge • Federal Supreme Court Chambers
                  </div>
                </div>
              </div>

              {/* Anchored Official Honor Badge */}
              <div className="mt-3 flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-court-darkest/95 border border-court-gold/30 shadow-lg">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-court-gold/20 flex items-center justify-center text-court-gold">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-crest font-bold text-slate-100">
                      High Performance Honor 2017 E.C.
                    </div>
                    <div className="text-[10px] text-court-goldLight font-mono">
                      Federal Supreme Court Adjudication
                    </div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-court-gold/15 text-court-gold text-[10px] font-mono font-bold uppercase tracking-wider">
                  Honored
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* Stats Strip */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {personalInfo.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-court-card/70 border border-court-border hover:border-court-gold/40 transition-all duration-300 shadow-lg backdrop-blur-md group hover:-translate-y-1"
            >
              <div className="text-court-gold text-2xl sm:text-3xl font-crest font-bold group-hover:scale-105 transition-transform inline-block">
                {stat.value}
              </div>
              <div className="text-xs text-slate-200 font-semibold mt-1">
                {stat.label}
              </div>
              <div className="text-[10px] text-court-muted font-mono mt-0.5">
                {stat.suffix}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
