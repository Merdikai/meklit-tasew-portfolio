import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Scale, 
  Building2, 
  ShieldAlert, 
  CheckCircle2, 
  Bookmark,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { education } from '../data/portfolioData';

export default function JurisprudenceSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="jurisprudence" className="py-24 relative bg-court-darkest overflow-hidden">
      
      {/* Background Watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-20 opacity-[0.03] pointer-events-none text-court-gold">
        <BookOpen className="w-[600px] h-[600px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-court-gold/30 bg-court-card text-court-gold text-xs font-mono tracking-widest uppercase shadow">
            <GraduationCap className="w-4 h-4" />
            <span>Academic Scholarship • Business &amp; Human Rights</span>
          </div>
          <h2 className="font-crest text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100">
            Jurisprudence &amp; <span className="text-gold-gradient font-serif italic">Dual LL.M. Specializations</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
            Rigorous legal scholarship investigating pressing corporate governance questions and foundational constitutional liberties under the Ethiopian legal order.
          </p>
        </div>

        {/* Tab Selectors */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {education.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 flex items-center gap-2.5 border ${
                activeTab === idx
                  ? 'bg-gradient-to-r from-court-gold to-court-goldDark text-court-darkest border-court-gold shadow-[0_0_20px_rgba(200,164,93,0.35)] scale-[1.02]'
                  : 'bg-court-card/60 text-slate-300 border-court-border/70 hover:border-court-gold/40 hover:text-court-goldLight'
              }`}
            >
              {idx === 0 && <Building2 className="w-4 h-4" />}
              {idx === 1 && <ShieldAlert className="w-4 h-4" />}
              {idx === 2 && <Scale className="w-4 h-4" />}
              <span>{item.degree.split('(')[0].trim()}</span>
              {item.status.includes('Ongoing') && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono uppercase ${
                  activeTab === idx ? 'bg-court-darkest/25 text-court-darkest font-bold' : 'bg-court-gold/20 text-court-gold'
                }`}>
                  Thesis
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Active Tab Content Card */}
        <div className="bg-court-card/90 border-2 border-court-gold/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-md">
          {activeTab === 0 && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-court-border/60">
                <div>
                  <div className="text-xs font-mono text-court-gold uppercase tracking-wider mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-court-gold animate-pulse"></span>
                    Addis Ababa University (AAU) • Ongoing Final Year
                  </div>
                  <h3 className="font-crest text-2xl sm:text-3xl font-bold text-slate-100">
                    Master of Laws (LL.M.) in Business &amp; Property Law
                  </h3>
                </div>
                <div className="px-3.5 py-1.5 rounded-full bg-court-navy border border-court-gold/40 text-court-goldLight text-xs font-mono">
                  Commercial Code 2021 Reforms
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-5">
                  <div className="p-6 rounded-2xl bg-court-darkest/80 border border-court-gold/20 space-y-3">
                    <div className="text-[11px] font-mono uppercase text-court-gold flex items-center gap-1.5">
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>Thesis Focus &amp; Doctrinal Inquiry</span>
                    </div>
                    <h4 className="font-serif text-xl sm:text-2xl text-court-goldLight font-semibold italic">
                      "{education[0].thesis.topic}"
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed font-light">
                      {education[0].thesis.summary}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="font-crest text-xs tracking-wider uppercase text-slate-200">
                      Key Doctrinal &amp; Statutory Analysis Areas
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {education[0].thesis.keyAreas.map((area, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 rounded-xl bg-court-navy/60 border border-court-border text-xs text-slate-200 font-medium flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-court-gold" />
                          <span>{area}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 p-6 rounded-2xl bg-court-navy/40 border border-court-border space-y-4">
                  <div className="text-xs font-crest text-court-gold uppercase tracking-wider font-bold">
                    Judicial Applicability
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Provides rigorous adjudicative criteria for handling corporate deadlocks, valuation of shares, protection of pre-emptive rights during capital increases, and statutory actions against oppressive majority shareholders.
                  </p>
                  <div className="pt-3 border-t border-court-border/50 text-[11px] text-court-muted font-mono space-y-1.5">
                    <div><strong className="text-slate-200">Statute:</strong> Commercial Code of Ethiopia (2021)</div>
                    <div><strong className="text-slate-200">Faculty:</strong> AAU School of Law</div>
                    <div><strong className="text-slate-200">Stage:</strong> Final Year Thesis Defense</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 1 && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-court-border/60">
                <div>
                  <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                    Debre Markos University (DMU) • Ongoing Final Year
                  </div>
                  <h3 className="font-crest text-2xl sm:text-3xl font-bold text-slate-100">
                    Master of Laws (LL.M.) in International Human Rights Law
                  </h3>
                </div>
                <div className="px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono">
                  Constitutional &amp; Treaty Jurisprudence
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-5">
                  <div className="p-6 rounded-2xl bg-court-darkest/80 border border-cyan-500/20 space-y-3">
                    <div className="text-[11px] font-mono uppercase text-cyan-400 flex items-center gap-1.5">
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>Thesis Title &amp; Constitutional Inquiry</span>
                    </div>
                    <h4 className="font-serif text-xl sm:text-2xl text-cyan-200 font-semibold italic">
                      "{education[1].thesis.topic}"
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed font-light">
                      {education[1].thesis.summary}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="font-crest text-xs tracking-wider uppercase text-slate-200">
                      Constitutional Doctrines Examined
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {education[1].thesis.keyAreas.map((area, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 rounded-xl bg-court-navy/60 border border-court-border text-xs text-slate-200 font-medium flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{area}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 p-6 rounded-2xl bg-court-navy/40 border border-court-border space-y-4">
                  <div className="text-xs font-crest text-cyan-300 uppercase tracking-wider font-bold">
                    Judicial Applicability
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Establishes judicial tests to prevent ambiguous 'morality' clauses from being weaponized to suppress fundamental human rights, reconciling domestic constitutional jurisprudence with international human rights treaties.
                  </p>
                  <div className="pt-3 border-t border-court-border/50 text-[11px] text-court-muted font-mono space-y-1.5">
                    <div><strong className="text-slate-200">Statute:</strong> FDRE Constitution (Art. 93)</div>
                    <div><strong className="text-slate-200">Treaties:</strong> ICCPR, ACHPR</div>
                    <div><strong className="text-slate-200">Stage:</strong> Final Year Thesis Defense</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 2 && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-court-border/60">
                <div>
                  <div className="text-xs font-mono text-court-gold uppercase tracking-wider mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-court-gold"></span>
                    Bahir Dar University School of Law • 2015 – 2021 G.C.
                  </div>
                  <h3 className="font-crest text-2xl sm:text-3xl font-bold text-slate-100">
                    Bachelor of Laws (LL.B.) Degree
                  </h3>
                </div>
                <div className="px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-semibold">
                  Graduated with Distinction
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-court-darkest/70 border border-court-border text-center space-y-2">
                  <div className="text-xs text-court-muted font-mono uppercase">Cumulative GPA</div>
                  <div className="font-crest text-4xl font-bold text-court-gold">3.38</div>
                  <div className="text-xs text-slate-300">High Academic Distinction</div>
                </div>

                <div className="p-6 rounded-2xl bg-court-darkest/70 border border-court-border text-center space-y-2">
                  <div className="text-xs text-court-muted font-mono uppercase">National Exit Exam</div>
                  <div className="font-crest text-4xl font-bold text-court-goldLight">61%</div>
                  <div className="text-xs text-slate-300">Nationwide Standardized Law Bar</div>
                </div>

                <div className="p-6 rounded-2xl bg-court-darkest/70 border border-court-border text-center space-y-2">
                  <div className="text-xs text-court-muted font-mono uppercase">Leadership &amp; Advocacy</div>
                  <div className="font-crest text-4xl font-bold text-slate-100">Moot &amp; Bar</div>
                  <div className="text-xs text-slate-300">Law Students' Union Assembly</div>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
