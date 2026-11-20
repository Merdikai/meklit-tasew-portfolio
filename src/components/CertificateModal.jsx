import React, { useEffect } from 'react';
import { X, Award, ShieldCheck, Calendar, Building, CheckCircle2, Sparkles, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import RealisticCertificateCard from './RealisticCertificateCard';

export default function CertificateModal({ cert, onClose }) {
  useEffect(() => {
    // Subtle congratulatory gold confetti when modal opens
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#C8A45D', '#FFE494', '#991B1B', '#FFFFFF'],
    });

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!cert) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-court-darkest/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      
      {/* Modal Card */}
      <div 
        className="relative w-full max-w-3xl bg-court-card border-2 border-court-gold/60 rounded-3xl shadow-[0_25px_70px_-15px_rgba(200,164,93,0.45)] overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-court-border bg-court-darkest/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-court-gold/20 border border-court-gold/40 flex items-center justify-center">
              <Award className="w-4 h-4 text-court-gold" />
            </div>
            <div>
              <div className="font-crest text-xs font-bold text-slate-100 uppercase tracking-wider">
                Official Credential Record
              </div>
              <div className="text-[10px] text-court-gold font-mono">
                {cert.category} • {cert.year}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-court-border hover:border-court-gold text-slate-400 hover:text-court-gold transition-colors focus:outline-none"
            aria-label="Close Certificate Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Realistic High-Resolution Parchment Diploma */}
          <div className="w-full max-w-xl mx-auto h-[440px] shadow-2xl">
            <RealisticCertificateCard cert={cert} isActive={true} />
          </div>

          {/* Certificate Metadata Details */}
          <div className="space-y-4 pt-2">
            <div>
              <div className="text-xs font-mono text-court-gold uppercase tracking-wider">
                Credential Title
              </div>
              <h3 className="font-crest text-2xl font-bold text-slate-100 mt-0.5">
                {cert.title}
              </h3>
              <div className="font-serif text-lg text-court-goldLight font-medium">
                Issued by: {cert.issuer}
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed font-light">
              {cert.description}
            </p>

            <div className="p-4 rounded-xl bg-court-navy/40 border border-court-border space-y-2">
              <div className="text-xs font-crest text-court-gold font-bold uppercase tracking-wider">
                Adjudicative &amp; Professional Significance:
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {cert.significance}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 text-xs text-court-muted font-mono border-t border-court-border/40">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified in Official Judicial Registry</span>
              </div>
              <span className="text-slate-400">Record ID: {cert.id}</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
