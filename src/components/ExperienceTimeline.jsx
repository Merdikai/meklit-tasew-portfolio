import React, { useState } from 'react';
import { 
  Briefcase, 
  Scale, 
  Gavel, 
  Award, 
  MapPin, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Landmark,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { workExperience } from '../data/portfolioData';

export default function ExperienceTimeline() {
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [filter, setFilter] = useState('ALL');

  const filteredExperience = workExperience.filter((item) => {
    if (filter === 'APEX') return item.tier.includes('Apex') || item.tier.includes('Supreme');
    if (filter === 'BENCH') return item.role.includes('Judge');
    if (filter === 'HUMAN_RIGHTS') return item.tier.includes('Human Rights') || item.tier.includes('Pro Bono');
    return true;
  });

  const toggleExpand = (idx) => {
    setExpandedIndex(expandedIndex === idx ? -1 : idx);
  };

  return (
    <section id="experience" className="py-24 relative bg-court-dark/85 border-t border-b border-court-border/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-court-gold/30 bg-court-card text-court-gold text-xs font-mono tracking-widest uppercase shadow">
            <Landmark className="w-4 h-4" />
            <span>Official Judicial Service Record</span>
          </div>
          <h2 className="font-crest text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100">
            Judicial Career &amp; <span className="text-gold-gradient font-serif italic">Bench Progression</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
            Progressive adjudicative tenure across Ethiopia's federal and regional benches, advancing from primary trial courts to the apex Federal Supreme Court.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12">
          {[
            { id: 'ALL', label: 'Complete Judicial Record' },
            { id: 'APEX', label: 'Federal Supreme Court (Apex)' },
            { id: 'BENCH', label: 'Trial & Instance Benches' },
            { id: 'HUMAN_RIGHTS', label: 'Public Interest & Pro Bono' },
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => setFilter(pill.id)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                filter === pill.id
                  ? 'bg-court-gold text-court-darkest font-semibold shadow-md'
                  : 'bg-court-card/70 text-slate-300 hover:text-court-gold border border-court-border/60'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* Main Grid: Left Timeline Cards, Right 3D S-Curve & Standing Portrait */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Timeline Cards with Glowing Line */}
          <div className="lg:col-span-7 space-y-6 relative">
            <div className="absolute left-4 sm:left-6 top-3 bottom-3 w-[2px] bg-gradient-to-b from-court-gold via-court-gold/40 to-transparent"></div>

            {filteredExperience.map((item, idx) => {
              const isExpanded = expandedIndex === idx;
              const isApex = item.tier.includes('Apex') || item.role.includes('Supreme');
              const isHighPerformance = item.badge.includes('High Performance');

              return (
                <div key={idx} className="relative pl-12 sm:pl-16 group">
                  {/* Node Crest Icon */}
                  <div className={`absolute left-0 sm:left-2 top-2 w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
                    isApex
                      ? 'bg-court-gold border-court-goldLight text-court-darkest shadow-[0_0_20px_rgba(200,164,93,0.7)] scale-110'
                      : isHighPerformance
                      ? 'bg-court-card border-court-gold text-court-gold shadow-md'
                      : 'bg-court-navy border-court-border text-slate-300'
                  }`}>
                    {isApex ? (
                      <Scale className="w-4 h-4 stroke-[2.5]" />
                    ) : isHighPerformance ? (
                      <Award className="w-4 h-4" />
                    ) : (
                      <Gavel className="w-4 h-4" />
                    )}
                  </div>

                  {/* Card Container */}
                  <div
                    className={`rounded-3xl border transition-all duration-300 p-6 ${
                      isApex
                        ? 'bg-court-card/95 border-court-gold/50 shadow-2xl'
                        : 'bg-court-card/70 border-court-border hover:border-court-gold/40 hover:bg-court-card/90'
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className="font-mono text-xs text-court-gold uppercase font-semibold">
                            {item.period}
                          </span>
                          <span className="text-court-muted">•</span>
                          <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-court-gold" />
                            {item.location}
                          </span>
                        </div>

                        <h3 className="font-crest text-xl sm:text-2xl font-bold text-slate-100 flex items-center gap-2.5">
                          <span>{item.role}</span>
                          {item.badge && (
                            <span className={`text-[10px] font-sans font-semibold px-2.5 py-0.5 rounded-full border ${
                              isHighPerformance
                                ? 'bg-court-gold/20 text-court-gold border-court-gold/50'
                                : isApex
                                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                                : 'bg-court-navy text-slate-300 border-court-border'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </h3>

                        <div className="font-serif text-base sm:text-lg text-court-goldLight mt-0.5 font-medium">
                          {item.institution}
                        </div>
                      </div>

                      <button
                        onClick={() => toggleExpand(idx)}
                        className="p-1.5 rounded-xl border border-court-border/70 hover:border-court-gold text-slate-400 hover:text-court-gold transition-colors focus:outline-none"
                        aria-label={isExpanded ? 'Collapse case duties' : 'Expand case duties'}
                      >
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 mt-3 font-light leading-relaxed">
                      {item.description}
                    </p>

                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-court-border/50 space-y-3 animate-in fade-in duration-200">
                        <div className="text-xs font-crest text-court-gold uppercase tracking-wider font-semibold">
                          Core Adjudicative Duties &amp; Case Scopes:
                        </div>
                        <ul className="space-y-2">
                          {item.responsibilities.map((resp, rIdx) => (
                            <li key={rIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                              <CheckCircle2 className="w-4 h-4 text-court-gold shrink-0 mt-0.5" />
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>

                        {item.skillsApplied && (
                          <div className="pt-2 flex flex-wrap gap-1.5">
                            {item.skillsApplied.map((skill, sIdx) => (
                              <span
                                key={sIdx}
                                className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-court-darkest/70 border border-court-border/60 text-slate-200"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Federal Court Jurisdictional Hierarchy Overview */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            
            {/* Federal Bench Jurisdiction Hierarchy Card */}
            <div className="rounded-3xl bg-court-card/80 border border-court-gold/30 shadow-2xl p-6 backdrop-blur-md space-y-6">
              
              <div className="border-b border-court-border/60 pb-4">
                <div className="text-[11px] font-mono uppercase text-court-gold tracking-widest flex items-center gap-2">
                  <Landmark className="w-3.5 h-3.5" />
                  <span>Judicial Hierarchy of Ethiopia</span>
                </div>
                <h3 className="font-crest text-xl font-bold text-slate-100 mt-1">
                  Jurisdictional Bench Record
                </h3>
              </div>

              {/* Three-Tier Court Hierarchy */}
              <div className="space-y-4">
                
                {/* Apex Tier */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-court-gold/15 via-court-navy/80 to-court-card border border-court-gold/40 relative group">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase font-bold text-court-gold px-2 py-0.5 rounded bg-court-gold/20">
                      Tier 01 • Apex Review
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      Current Service
                    </span>
                  </div>
                  <div className="font-crest text-sm font-bold text-slate-100 mt-2">
                    Federal Supreme Court of Ethiopia
                  </div>
                  <div className="text-xs text-court-goldLight mt-0.5">
                    Assistant Judge • Cassation Review Division
                  </div>
                  <p className="text-[11px] text-slate-300 font-light mt-2 leading-relaxed">
                    Assisting bench deliberations on fundamental errors of law, precedent harmonization, and final appellate jurisprudence.
                  </p>
                </div>

                {/* Regional & Appellate Tier */}
                <div className="p-4 rounded-2xl bg-court-darkest/70 border border-court-border/70 hover:border-court-gold/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase font-medium text-slate-300 px-2 py-0.5 rounded bg-court-navy/60">
                      Tier 02 • Appellate
                    </span>
                    <span className="text-[10px] font-mono text-court-muted">
                      Regional &amp; Federal
                    </span>
                  </div>
                  <div className="font-crest text-sm font-bold text-slate-100 mt-2">
                    High Court Appellate Jurisdiction
                  </div>
                  <div className="text-xs text-court-goldLight mt-0.5">
                    Judicial Assistant &amp; Legal Officer
                  </div>
                  <p className="text-[11px] text-slate-300 font-light mt-2 leading-relaxed">
                    Legal research, factual and statutory analysis of lower court records, and drafting interlocutory and final rulings.
                  </p>
                </div>

                {/* Primary Trial Bench Tier */}
                <div className="p-4 rounded-2xl bg-court-darkest/70 border border-court-border/70 hover:border-court-gold/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase font-medium text-slate-300 px-2 py-0.5 rounded bg-court-navy/60">
                      Tier 03 • Trial Bench
                    </span>
                    <span className="text-[10px] font-mono text-court-muted">
                      Primary Docket
                    </span>
                  </div>
                  <div className="font-crest text-sm font-bold text-slate-100 mt-2">
                    Federal First Instance &amp; Woreda Courts
                  </div>
                  <div className="text-xs text-court-goldLight mt-0.5">
                    Assistant Judge &amp; Trial Clerk
                  </div>
                  <p className="text-[11px] text-slate-300 font-light mt-2 leading-relaxed">
                    Direct courtroom docket stewardship, witness depositions, evidentiary evaluations, and commercial contract claims.
                  </p>
                </div>

              </div>

              {/* Bench Service Metrics Strip */}
              <div className="pt-4 border-t border-court-border/60 grid grid-cols-2 gap-3 text-center">
                <div className="p-3 rounded-xl bg-court-darkest/80 border border-court-border/50">
                  <div className="font-crest text-lg font-bold text-court-gold">
                    5+ Years
                  </div>
                  <div className="text-[10px] text-court-muted font-mono mt-0.5 uppercase">
                    Adjudicative Service
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-court-darkest/80 border border-court-border/50">
                  <div className="font-crest text-lg font-bold text-court-gold">
                    2017 E.C.
                  </div>
                  <div className="text-[10px] text-court-muted font-mono mt-0.5 uppercase">
                    High Performance Award
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
