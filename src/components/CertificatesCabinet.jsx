import React, { useState } from 'react';
import {
  Award,
  ShieldCheck,
  FileCheck,
  Eye,
  Building,
  Sparkles
} from 'lucide-react';
import { certificatesAndHonors } from '../data/portfolioData';
import ThreeCertificatesCarousel from './ThreeCanvas/ThreeCertificatesCarousel';
import CertificateModal from './CertificateModal';

export default function CertificatesCabinet() {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section id="certificates" className="py-24 relative bg-court-darkest overflow-hidden">

      {/* Background radial glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-court-gold/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-court-gold/30 bg-court-card text-court-gold text-xs font-mono tracking-widest uppercase shadow">
            <Award className="w-4 h-4" />
            <span>Honors, Accreditations &amp; Licensures</span>
          </div>
          <h2 className="font-crest text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100">
            Judicial &amp; Academic <span className="text-gold-gradient font-serif italic">Certifications</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
            Distinguished credentials awarded by the Federal First Instance Court, Regional Justice Research Institutes, and academic institutions.
          </p>
        </div>

        {/* Notice Badge */}
        <div className="max-w-xl mx-auto mb-10 p-3.5 rounded-2xl bg-court-navy/40 border border-court-gold/25 flex items-center justify-between gap-4 text-xs font-mono text-slate-300 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <FileCheck className="w-4 h-4 text-court-gold shrink-0" />
            <span>Official Institutional Records Loaded. High-resolution certificate scans ready for viewer.</span>
          </div>
          <span className="text-[10px] uppercase font-bold text-court-gold bg-court-darkest/90 px-2.5 py-1 rounded-lg border border-court-gold/30 shrink-0">
            Verified
          </span>
        </div>

        {/* Full-Width Authentic Certificates Cabinet */}
        <div className="w-full">
          <ThreeCertificatesCarousel onSelectCert={(cert) => setSelectedCert(cert)} />
        </div>

        {/* Inspect Modal */}
        {selectedCert && (
          <CertificateModal
            cert={selectedCert}
            onClose={() => setSelectedCert(null)}
          />
        )}

      </div>
    </section>
  );
}
