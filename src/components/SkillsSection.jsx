import React, { useState } from 'react';
import { 
  FileText, 
  BookOpen, 
  Gavel, 
  Scale, 
  Languages, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  Database,
  Search,
  Laptop,
  Layers,
  Award,
  ChevronRight
} from 'lucide-react';
import { coreCompetencies, personalInfo } from '../data/portfolioData';

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const iconMap = {
    FileText: <FileText className="w-5 h-5 text-court-gold" />,
    BookOpen: <BookOpen className="w-5 h-5 text-court-gold" />,
    Gavel: <Gavel className="w-5 h-5 text-court-gold" />,
  };

  const categories = [
    { id: 'ALL', label: 'All Adjudicative Disciplines' },
    { id: 'DRAFTING', label: 'Adjudication & Drafting' },
    { id: 'RESEARCH', label: 'Doctrinal & Cassation Analysis' },
    { id: 'COURTROOM', label: 'Courtroom Stewardship' },
    { id: 'LANG_TECH', label: 'Languages & Digital Tools' },
  ];

  const filteredCompetencies = coreCompetencies.filter((cat) => {
    if (activeCategory === 'DRAFTING') return cat.category.includes('Drafting');
    if (activeCategory === 'RESEARCH') return cat.category.includes('Doctrinal');
    if (activeCategory === 'COURTROOM') return cat.category.includes('Trial') || cat.category.includes('Courtroom');
    return true;
  });

  return (
    <section id="skills" className="py-24 relative bg-court-dark/80 border-t border-b border-court-border/40 overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-court-gold/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-court-gold/30 bg-court-card text-court-gold text-xs font-mono tracking-widest uppercase shadow">
            <Scale className="w-4 h-4" />
            <span>Adjudicative Competencies &amp; Methodologies</span>
          </div>
          <h2 className="font-crest text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100">
            Judicial Craft &amp; <span className="text-gold-gradient font-serif italic">Legal Acumen</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
            Specialized capability across appellate cassation audits, trial docket oversight, statutory research, and bilingual judicial drafting.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                activeCategory === tab.id
                  ? 'bg-gradient-to-r from-court-gold to-court-goldLight text-court-darkest font-bold shadow-[0_0_20px_rgba(200,164,93,0.35)] scale-105'
                  : 'bg-court-card/70 text-slate-300 hover:text-court-gold border border-court-border/60 hover:border-court-gold/40'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Core Competencies Grid (shown when not solely LANG_TECH) */}
        {activeCategory !== 'LANG_TECH' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredCompetencies.map((cat, idx) => (
              <div
                key={idx}
                className="rounded-3xl p-7 bg-court-card/85 border border-court-border hover:border-court-gold/50 transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col justify-between group backdrop-blur-md"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-court-border/50">
                    <div className="w-12 h-12 rounded-2xl bg-court-navy/90 border border-court-gold/30 flex items-center justify-center group-hover:scale-105 transition-transform shadow-md">
                      {iconMap[cat.icon]}
                    </div>
                    <div>
                      <h3 className="font-crest text-base font-bold text-slate-100 group-hover:text-court-gold transition-colors">
                        {cat.category}
                      </h3>
                      <div className="text-[10px] text-court-goldLight font-mono uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>Core Judicial Benchmark</span>
                      </div>
                    </div>
                  </div>

                  {/* Skills List with Glowing Progress Bars */}
                  <div className="space-y-6">
                    {cat.skills.map((skill, sIdx) => {
                      const isHovered = hoveredSkill === `${idx}-${sIdx}`;
                      return (
                        <div 
                          key={sIdx} 
                          className="space-y-2 cursor-pointer"
                          onMouseEnter={() => setHoveredSkill(`${idx}-${sIdx}`)}
                          onMouseLeave={() => setHoveredSkill(null)}
                        >
                          <div className="flex justify-between items-center text-xs">
                            <span className={`font-medium transition-colors ${
                              isHovered ? 'text-court-gold' : 'text-slate-200'
                            }`}>
                              {skill.name}
                            </span>
                            <span className="font-mono text-court-gold font-bold">{skill.level}%</span>
                          </div>

                          {/* Glowing Animated Progress Bar */}
                          <div className="w-full h-2 rounded-full bg-court-darkest/90 p-0.5 border border-court-border/40 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-court-gold via-amber-300 to-court-goldLight rounded-full transition-all duration-700 shadow-[0_0_10px_rgba(200,164,93,0.5)]"
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>

                          <p className="text-[11px] text-slate-400 font-light leading-snug">
                            {skill.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-court-border/40 flex items-center justify-between text-[10px] font-mono text-court-muted">
                  <span>Standard: Federal Cassation</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    Verified Acumen
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bilingual Fluency & LawTech Tools Section */}
        {(activeCategory === 'ALL' || activeCategory === 'LANG_TECH') && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Bilingual Fluency Card (5 Cols) */}
            <div className="lg:col-span-5 p-8 rounded-3xl bg-court-card/85 border border-court-gold/30 shadow-xl backdrop-blur-md flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-court-border/50">
                  <div className="w-12 h-12 rounded-2xl bg-court-gold/15 border border-court-gold/40 flex items-center justify-center text-court-gold">
                    <Languages className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-crest text-lg font-bold text-slate-100">
                      Judicial Bilingual Fluency
                    </h4>
                    <div className="text-[10px] text-court-gold font-mono uppercase tracking-wider">
                      Courtroom &amp; Academic Mastery
                    </div>
                  </div>
                </div>

                <div className="space-y-5">
                  {/* Amharic (Official Court Language) */}
                  <div className="p-4 rounded-2xl bg-court-darkest/75 border border-court-border/70 hover:border-court-gold/40 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-crest text-sm font-bold text-slate-100">Amharic</span>
                          <span className="text-xs font-serif text-court-gold font-medium">(አማርኛ)</span>
                          <span className="px-2 py-0.5 rounded-full bg-court-gold/15 text-[10px] font-mono text-court-gold font-semibold">
                            Native
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-1">
                          Official working language of the Federal Supreme Court of Ethiopia. Full capability in composing complex judgments, decree records, and bench oral argumentation.
                        </div>
                      </div>
                      <span className="font-mono text-court-gold font-bold text-sm">100%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-court-dark overflow-hidden mt-3">
                      <div className="h-full bg-gradient-to-r from-court-gold to-amber-300 rounded-full w-full" />
                    </div>
                  </div>

                  {/* English (International & Academic) */}
                  <div className="p-4 rounded-2xl bg-court-darkest/75 border border-court-border/70 hover:border-court-gold/40 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-crest text-sm font-bold text-slate-100">English</span>
                          <span className="px-2 py-0.5 rounded-full bg-court-navy text-[10px] font-mono text-cyan-300 font-semibold border border-cyan-500/30">
                            Fluent / C2
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-1">
                          International treaties, comparative jurisprudence, LL.M. dissertation research, and English-language commercial and human rights arbitration materials.
                        </div>
                      </div>
                      <span className="font-mono text-court-goldLight font-bold text-sm">95%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-court-dark overflow-hidden mt-3">
                      <div className="h-full bg-gradient-to-r from-court-gold to-cyan-400 rounded-full w-[95%]" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-court-border/40 text-[11px] text-court-muted font-mono flex items-center justify-between">
                <span>Ethiopian Bar Standard</span>
                <span className="text-slate-300">Dual Written &amp; Oral Pleading</span>
              </div>
            </div>

            {/* Legal Tech & Docket Tools (7 Cols) */}
            <div className="lg:col-span-7 p-8 rounded-3xl bg-court-card/85 border border-court-border shadow-xl backdrop-blur-md flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-court-border/50">
                  <div className="w-12 h-12 rounded-2xl bg-court-navy/90 border border-court-gold/30 flex items-center justify-center text-court-goldLight">
                    <Database className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-crest text-lg font-bold text-slate-100">
                      Legal Tech, Docket Suites &amp; Digital Case Systems
                    </h4>
                    <div className="text-[10px] text-court-muted font-mono uppercase tracking-wider">
                      Court Administration &amp; Modern Information Tools
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  <div className="p-4 rounded-2xl bg-court-darkest/70 border border-court-border/70 hover:border-court-gold/40 transition-all group">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-court-navy flex items-center justify-center text-court-gold group-hover:scale-105 transition-transform">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="font-crest text-xs font-bold text-slate-200">
                        Judicial Templates &amp; Decrees
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-light">
                      Advanced Microsoft Word formatting for structured court rulings, interlocutory decrees, and formal cassation summaries.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-court-darkest/70 border border-court-border/70 hover:border-court-gold/40 transition-all group">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-court-navy flex items-center justify-center text-court-gold group-hover:scale-105 transition-transform">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div className="font-crest text-xs font-bold text-slate-200">
                        Docket Auditing (Excel)
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-light">
                      Statistical audit tracking, case clearance metrics, and hearing schedule management across high-volume court registries.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-court-darkest/70 border border-court-border/70 hover:border-court-gold/40 transition-all group">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-court-navy flex items-center justify-center text-court-gold group-hover:scale-105 transition-transform">
                        <Search className="w-4 h-4" />
                      </div>
                      <div className="font-crest text-xs font-bold text-slate-200">
                        Cassation Precedent Archives
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-light">
                      Instant retrieval and citation cross-referencing across 25+ volumes of binding Federal Supreme Court Cassation Decisions.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-court-darkest/70 border border-court-border/70 hover:border-court-gold/40 transition-all group">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-court-navy flex items-center justify-center text-court-gold group-hover:scale-105 transition-transform">
                        <Laptop className="w-4 h-4" />
                      </div>
                      <div className="font-crest text-xs font-bold text-slate-200">
                        Electronic Court Systems (ECMS)
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-light">
                      Familiarity with digital e-filing, electronic case tracking, and secure digital evidence preservation in federal registries.
                    </p>
                  </div>

                </div>
              </div>

              {/* Bench Efficiency Metric Callout */}
              <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-court-darkest to-court-card border border-court-gold/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-court-gold/15 flex items-center justify-center text-court-gold">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-crest text-xs font-bold text-slate-100">
                      2017 E.C. Performance Benchmark
                    </div>
                    <div className="text-[10px] text-court-gold font-mono">
                      Fast-Track Turnaround &amp; Exemplary File Quality Recognition
                    </div>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-court-gold bg-court-darkest px-3 py-1.5 rounded-lg border border-court-gold/40">
                  98% Accuracy
                </span>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
