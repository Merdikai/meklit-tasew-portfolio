import React, { useState } from 'react';
import { 
  Users, 
  Scale, 
  Phone, 
  Landmark, 
  CheckCircle2, 
  Quote, 
  Building,
  ShieldCheck,
  Copy,
  Check,
  Sparkles,
  Award,
  UserCheck
} from 'lucide-react';
import { professionalReferences } from '../data/portfolioData';

export default function ReferencesSection() {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopyPhone = (phone, idx) => {
    navigator.clipboard.writeText(phone);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  // Avatar initials or judicial icons for verified references
  const avatarColors = [
    'from-amber-700 via-court-gold to-amber-300',
    'from-court-gold via-amber-200 to-court-goldLight',
    'from-blue-700 via-sky-500 to-cyan-300',
  ];

  return (
    <section id="references" className="py-24 relative bg-court-darkest overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-court-gold/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-court-gold/30 bg-court-card text-court-gold text-xs font-mono tracking-widest uppercase shadow">
            <Users className="w-4 h-4" />
            <span>Judicial Peers &amp; Professional References</span>
          </div>
          <h2 className="font-crest text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100">
            Endorsements &amp; <span className="text-gold-gradient font-serif italic">Bench References</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
            Distinguished judges and prosecutorial officers attesting to Assistant Judge Meklit Tasew's judicial ethics, draftsmanship, and dedication to justice.
          </p>
        </div>

        {/* References Cards Grid (Matching v2_frame_08 with circular gold-rimmed avatar medallions) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {professionalReferences.map((ref, idx) => {
            const isJudge = ref.title.includes('Judge');

            return (
              <div
                key={idx}
                className="p-8 rounded-[32px] bg-court-card/85 border border-court-border/80 hover:border-court-gold/60 transition-all duration-300 hover:-translate-y-2 shadow-2xl flex flex-col justify-between relative group backdrop-blur-md"
              >
                {/* Top: Circular Avatar Medallion with Gold Rim (as in v2_frame_08) */}
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="relative mb-3">
                    {/* Outer Gold Ring */}
                    <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-[#8C6D27] via-[#FFE494] to-[#C8A45D] shadow-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                      <div className="w-full h-full rounded-full bg-court-darkest flex items-center justify-center overflow-hidden border border-court-gold/40">
                        {isJudge ? (
                          <div className="w-full h-full bg-gradient-to-b from-court-navy to-court-darkest flex flex-col items-center justify-center text-court-gold">
                            <Scale className="w-8 h-8 stroke-[1.8]" />
                          </div>
                        ) : (
                          <div className="w-full h-full bg-gradient-to-b from-slate-900 to-court-darkest flex flex-col items-center justify-center text-cyan-300">
                            <Landmark className="w-8 h-8 stroke-[1.8]" />
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Small Verified Check badge */}
                    <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-500 border-2 border-court-darkest flex items-center justify-center text-white shadow">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </div>

                  <h3 className="font-crest text-lg font-bold text-slate-100 group-hover:text-court-gold transition-colors">
                    {ref.name}
                  </h3>
                  <div className="text-xs font-semibold text-court-goldLight mt-0.5">
                    {ref.title}
                  </div>
                  <div className="text-[11px] text-court-muted font-mono mt-0.5">
                    {ref.affiliation}
                  </div>
                </div>

                {/* Endorsement Quote */}
                <div className="my-2 relative">
                  <div className="text-court-gold/20 mb-2 flex justify-center">
                    <Quote className="w-6 h-6" />
                  </div>
                  <blockquote className="text-slate-200 text-xs sm:text-sm italic font-serif leading-relaxed text-center font-light px-2">
                    "{ref.endorsement}"
                  </blockquote>
                </div>

                {/* Footer Controls: Direct Call & Copy */}
                <div className="pt-6 border-t border-court-border/60 space-y-3 mt-4">
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${ref.phone}`}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-court-darkest/80 border border-court-border/70 hover:border-court-gold text-xs text-slate-200 hover:text-court-gold font-mono transition-colors flex-1 justify-between group/call"
                      title={`Call ${ref.name}`}
                    >
                      <span className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-court-gold group-hover/call:scale-110 transition-transform" />
                        <span>{ref.phone}</span>
                      </span>
                      <span className="text-[10px] uppercase font-bold text-court-gold bg-court-card px-1.5 py-0.5 rounded">
                        Call
                      </span>
                    </a>

                    <button
                      onClick={() => handleCopyPhone(ref.phone, idx)}
                      className="p-2 rounded-xl border border-court-border/70 hover:border-court-gold text-slate-400 hover:text-court-gold bg-court-darkest/80 transition-colors"
                      title="Copy phone number"
                      aria-label="Copy phone number"
                    >
                      {copiedIndex === idx ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <div className="text-[10px] text-court-muted font-mono flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{ref.relationship}</span>
                    </div>
                    <span className="text-court-gold/80 uppercase font-semibold">Verified Bench</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Judicial Integrity Attestation Banner */}
        <div className="p-6 rounded-3xl bg-court-card/60 border border-court-gold/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-300 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-court-navy/90 border border-court-gold/40 flex items-center justify-center text-court-gold shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="font-crest text-sm font-bold text-slate-100">
                Ethical Judicial Standing &amp; Conduct
              </div>
              <div className="text-[11px] text-court-muted">
                Unblemished adjudicative record adhering to the Code of Judicial Conduct and Ethiopian Constitution.
              </div>
            </div>
          </div>
          <div className="text-court-gold font-bold uppercase tracking-wider text-right shrink-0">
            Federal Judicial Administration Council Standard
          </div>
        </div>

      </div>
    </section>
  );
}
