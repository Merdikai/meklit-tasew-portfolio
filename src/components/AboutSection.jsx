import React, { useState } from 'react';
import {
  Scale,
  Shield,
  Gavel,
  Building,
  CheckCircle2,
  Languages,
  MapPin,
  Calendar,
  Award,
  ArrowRight,
  X,
  FileText
} from 'lucide-react';
import { personalInfo, judicialPhilosophy } from '../data/portfolioData';

export default function AboutSection() {
  const [selectedPillar, setSelectedPillar] = useState(null);

  const pillarDetails = [
    {
      title: "Statutory & Precedent Fidelity",
      statute: "Federal Supreme Court Cassation Division & Proclamation No. 1234/2021",
      icon: <Scale className="w-8 h-8 text-court-gold" />,
      summary: "Adhering strictly to Ethiopian substantive laws, civil/penal codes, and binding cassation bench interpretations, ensuring every rendered ruling withstands appellate scrutiny and advances legal certainty.",
      doctrine: [
        "Binding Nature of Federal Cassation Division decisions under Proclamation No. 1234/2021.",
        "Statutory interpretation hierarchy prioritizing constitutional provisions and codified texts.",
        "Precision in distinguishing obiter dicta from ratio decidendi in appellate records."
      ]
    },
    {
      title: "Constitutional & Human Rights Protection",
      statute: "FDRE Constitution (Articles 13–44, 93) & International Treaties",
      icon: <Shield className="w-8 h-8 text-court-gold" />,
      summary: "Balancing state interest with fundamental constitutional guarantees, ensuring limitation clauses (such as public morality and public order) are scrutinized under strict necessity and proportionality standards.",
      doctrine: [
        "Rigorous judicial review of state restrictions on civil liberties.",
        "Application of international human rights instruments (ICCPR, ACHPR) ratified under Art. 9(4).",
        "Protection of vulnerable litigants, indigent parties, and due process in criminal trials."
      ]
    },
    {
      title: "Fair & Independent Docket Stewardship",
      statute: "Civil Procedure Code of Ethiopia & Judicial Conduct Guidelines",
      icon: <Gavel className="w-8 h-8 text-court-gold" />,
      summary: "Independent trial docket management ensuring prompt case turnaround, impartiality, transparent evidence weighing, and eliminating procedural delays.",
      doctrine: [
        "Neutral evaluation of oral testimony, documentary proofs, and cross-examination credibility.",
        "Timely interlocutory rulings preventing procedural gridlocks in trial proceedings.",
        "Fostering litigant confidence through transparent and reasoned written judicial opinions."
      ]
    },
    {
      title: "Corporate & Commercial Clarity",
      statute: "Commercial Code of Ethiopia (2021 Proclamation No. 1243/2021)",
      icon: <Building className="w-8 h-8 text-court-gold" />,
      summary: "Applying advanced corporate governance doctrines to resolve intra-corporate conflicts, minority shareholder oppression, pre-emptive subscription disputes, and commercial contract claims.",
      doctrine: [
        "Enforcement of statutory pre-emptive rights during share capital augmentations.",
        "Remedies against abusive majority shareholder resolutions in Share Companies.",
        "Corporate deadlock mediation and expedited judicial dispute resolution."
      ]
    }
  ];

  return (
    <section id="about" className="py-24 relative bg-court-dark/70 border-t border-b border-court-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-court-gold/30 bg-court-card text-court-gold text-xs font-mono tracking-widest uppercase shadow">
            <Scale className="w-3.5 h-3.5" />
            <span>Adjudicative Profiles &amp; Four Pillars of Judicial Philosophy</span>
          </div>
          <h2 className="font-crest text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100">
            Adjudicative Poise &amp; <span className="text-gold-gradient font-serif italic">Judicial Ethics</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
            From the frontlines of regional primary trial benches to the appellate and cassation divisions of the Federal Supreme Court.
          </p>
        </div>

        {/* Narrative & Dual Photos Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">

          {/* Left Column: Dignified Portrait in Executive Suit */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[390px] rounded-[32px] p-2.5 bg-court-card/70 border border-court-gold/30 shadow-[0_25px_60px_-10px_rgba(0,0,0,0.85),0_0_25px_rgba(200,164,93,0.15)] backdrop-blur-md group">

              <div className="relative rounded-2xl overflow-hidden bg-court-darkest">
                <picture>
                  <source srcSet="/images/standing-suit-portrait.webp" type="image/webp" />
                  <img
                    src="/images/standing-suit-portrait.jpg"
                    alt="Assistant Judge Meklit Tasew Tabor in Executive Office Suit"
                    className="w-full h-auto aspect-[3/4] object-cover object-top group-hover:scale-105 transition-transform duration-700 filter contrast-[1.03]"
                  />
                </picture>

                {/* Bottom Inset Caption */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-court-darkest via-court-darkest/85 to-transparent">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-crest text-xs font-bold text-slate-100 tracking-wider">
                        MEKLIT TASEW TABOR
                      </div>
                      <div className="text-[11px] text-court-goldLight">
                        Assistant Judge • Federal Supreme Court
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-court-gold/20 border border-court-gold/40 flex items-center justify-center">
                      <Scale className="w-4 h-4 text-court-gold" />
                    </div>
                  </div>
                </div>

                {/* Verified Badge */}
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-court-darkest/90 border border-court-gold/30 text-[10px] font-mono text-court-goldLight flex items-center gap-1.5 shadow">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Active Federal Bench</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Core Adjudicative Experience */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-serif text-2xl sm:text-3xl text-court-goldLight leading-snug">
              "Dedicated judicial officer and legal scholar with over five years of progressive adjudicative practice across Ethiopia's federal and regional courts."
            </h3>

            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              <p>
                <strong className="text-slate-100 font-medium">Assistant Judge Meklit Tasew Tabor</strong> exercises judicial and legal duties at the <strong className="text-slate-100 font-medium">Federal Supreme Court of Ethiopia</strong> in Addis Ababa. She conducts exhaustive statutory audits, examines complex trial transcripts and lower court judgments, and authors advisory opinions on complex civil, criminal, and commercial appeals.
              </p>

              <p>
                Prior to the apex court, she was appointed as an <strong className="text-slate-100 font-medium">Assistant Judge at the Federal First Instance Court</strong>, where her high-speed docket turnaround and judicial draftsmanship were honored with the <strong className="text-court-gold font-medium">Certificate of High Performance (2017 E.C.)</strong>.
              </p>

              <p>
                Her judicial foundation was forged on the trial bench of <strong className="text-slate-100 font-medium">Debay Tilat Gin Woreda Court</strong> (Amhara Region), where she independently presided over plenary benches, evaluating witness credibility and rendering final binding decisions.
              </p>
            </div>

            {/* Quick Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
              <div className="p-3 rounded-xl bg-court-card/60 border border-court-border">
                <div className="text-court-muted text-[10px] uppercase">Jurisdiction</div>
                <div className="text-slate-200 font-semibold mt-0.5">Federal Supreme Court</div>
              </div>
              <div className="p-3 rounded-xl bg-court-card/60 border border-court-border">
                <div className="text-court-muted text-[10px] uppercase">Experience</div>
                <div className="text-court-gold font-semibold mt-0.5">5+ Years Adjudication</div>
              </div>
              <div className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-court-card/60 border border-court-border">
                <div className="text-court-muted text-[10px] uppercase">Academic Pursuit</div>
                <div className="text-cyan-300 font-semibold mt-0.5">Dual LL.M. Candidate</div>
              </div>
            </div>

          </div>

        </div>

        {/* The Four Pillars of Judicial Philosophy */}
        <div className="pt-6">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="font-crest text-2xl font-bold text-slate-100">
              The Four Pillars of <span className="text-gold-gradient font-serif italic">Judicial Philosophy</span>
            </h3>
            <p className="text-xs text-court-muted font-mono mt-1">Foundational Principles Governing Statutory Interpretation &amp; Case Management</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillarDetails.map((pillar, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-court-card/80 border border-court-border hover:border-court-gold/60 transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col justify-between group"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-court-navy/80 border border-court-gold/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-md">
                    {pillar.icon}
                  </div>
                  <h4 className="font-crest text-base font-bold text-slate-100 mb-2 group-hover:text-court-gold transition-colors">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-light mb-4">
                    {pillar.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-court-border/50 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-court-gold uppercase">
                    Principle 0{idx + 1}
                  </span>
                  <button
                    onClick={() => setSelectedPillar(pillar)}
                    className="inline-flex items-center gap-1 text-xs text-court-goldLight hover:text-white font-mono transition-colors group-hover:translate-x-1 duration-200"
                  >
                    <span>View More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pillar Doctrine Modal */}
        {selectedPillar && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-court-darkest/85 backdrop-blur-md animate-in fade-in">
            <div className="relative w-full max-w-lg bg-court-card border-2 border-court-gold/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-court-border pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-court-gold/20 flex items-center justify-center text-court-gold">
                    {selectedPillar.icon}
                  </div>
                  <div>
                    <h3 className="font-crest text-lg font-bold text-slate-100">
                      {selectedPillar.title}
                    </h3>
                    <div className="text-[11px] font-mono text-court-gold">
                      Judicial Jurisprudence Pillar
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPillar(null)}
                  className="p-1.5 rounded-lg border border-court-border hover:border-court-gold text-slate-400 hover:text-court-gold"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-court-darkest/70 border border-court-border text-xs font-mono text-court-goldLight">
                  <span className="text-court-muted">Statutory Anchor:</span> {selectedPillar.statute}
                </div>

                <p className="text-sm text-slate-300 font-light leading-relaxed">
                  {selectedPillar.summary}
                </p>

                <div className="space-y-2">
                  <div className="text-xs font-crest uppercase tracking-wider text-court-gold">
                    Adjudicative Applications:
                  </div>
                  <ul className="space-y-2">
                    {selectedPillar.doctrine.map((item, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2 text-xs text-slate-300 font-light">
                        <CheckCircle2 className="w-4 h-4 text-court-gold shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSelectedPillar(null)}
                  className="px-4 py-2 rounded-xl bg-court-gold text-court-darkest font-semibold text-xs uppercase"
                >
                  Close Pillar Dossier
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
