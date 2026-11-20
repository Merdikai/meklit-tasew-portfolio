import React from 'react';
import { Scale, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function RealisticCertificateCard({ cert, isActive = false }) {
  const isHighPerformance = cert.id === 'cert-high-performance';

  return (
    <div className="relative w-full h-full rounded-2xl p-2.5 transition-all duration-300">
      
      {/* 3D Acrylic Glass Frame Bezel with Specular Sheen */}
      <div className={`relative w-full h-full rounded-2xl p-3 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-500 ${
        isActive
          ? 'bg-gradient-to-b from-white/20 via-white/5 to-white/10 border-2 border-court-gold/70 shadow-[0_20px_50px_-10px_rgba(200,164,93,0.5)]'
          : 'bg-white/5 border border-white/15 opacity-85'
      }`}>
        
        {/* Top Glass Specular Highlight Sheen */}
        <div className="absolute -top-10 -left-10 w-60 h-28 bg-gradient-to-br from-white/40 via-white/10 to-transparent rotate-12 pointer-events-none blur-[1px]" />
        
        {/* The Authentic Parchment Diploma */}
        <div className="relative w-full h-full rounded-xl bg-gradient-to-b from-[#FAF7EE] via-[#F4EEDC] to-[#EFE7D0] p-4 text-[#2C2416] flex flex-col justify-between shadow-inner select-none border border-[#D5C295]">
          
          {/* Ornate Double Antique Gold Filigree Border */}
          <div className="absolute inset-1.5 border border-[#B89748]/70 pointer-events-none rounded" />
          <div className="absolute inset-2 border-2 border-[#8C6D27]/90 pointer-events-none rounded" />
          
          {/* Corner Florets */}
          <div className="absolute top-2 left-2 text-[#8C6D27] text-xs leading-none font-serif select-none">❖</div>
          <div className="absolute top-2 right-2 text-[#8C6D27] text-xs leading-none font-serif select-none">❖</div>
          <div className="absolute bottom-2 left-2 text-[#8C6D27] text-xs leading-none font-serif select-none">❖</div>
          <div className="absolute bottom-2 right-2 text-[#8C6D27] text-xs leading-none font-serif select-none">❖</div>

          {/* Header & Crest */}
          <div className="text-center pt-2 relative z-10">
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#8C6D27]/15 border border-[#8C6D27]/40 text-[#8C6D27] mb-1">
              <Scale className="w-4 h-4 stroke-[2.2]" />
            </div>
            
            <div className="text-[9px] font-mono tracking-widest uppercase font-bold text-[#6B531E]">
              {cert.issuer}
            </div>

            <div className="text-[7px] tracking-widest uppercase text-[#8C7646] font-mono mt-0.5">
              Official Institutional Accreditation &amp; Bench Registry
            </div>
          </div>

          {/* Title Banner */}
          <div className="text-center py-1.5 relative z-10">
            <h3 className="font-serif text-sm sm:text-base font-bold text-[#1A140B] tracking-tight leading-tight uppercase">
              {cert.title}
            </h3>
            
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#8C6D27] to-transparent mx-auto my-1" />

            <div className="text-[8px] font-serif italic text-[#594828]">
              Awarded in Recognition of Distinguished Service &amp; Adjudicative Integrity to
            </div>

            {/* Recipient Name in Regal Serif */}
            <div className="font-crest text-sm sm:text-base font-bold text-[#7A1F26] tracking-wider my-0.5">
              MEKLIT TASEW TABOR
            </div>

            <div className="text-[8px] font-mono text-[#6B531E] tracking-wide">
              Assistant Judge • Federal Supreme Court of Ethiopia
            </div>
          </div>

          {/* Commendation Summary Text */}
          <p className="text-[8px] sm:text-[8.5px] text-[#423722] text-center leading-snug font-serif italic px-2 line-clamp-3 relative z-10">
            "{cert.description}"
          </p>

          {/* Bottom Footer: Official Embossed Gold Seal + Signatures */}
          <div className="relative z-10 pt-2 border-t border-[#B89748]/40 flex items-end justify-between px-1">
            
            {/* Left Signature Line */}
            <div className="text-left">
              <div className="w-16 h-3 border-b border-[#6B531E]/60 flex items-end">
                <span className="font-serif italic text-[8px] text-[#4A3B1C] pl-1 select-none">
                  Presiding Judge
                </span>
              </div>
              <div className="text-[6.5px] font-mono text-[#7A6840] uppercase mt-0.5">
                Judicial Registrar
              </div>
            </div>

            {/* Center Embossed Gold Medallion with Satin Red Ribbon Tails */}
            <div className="relative flex flex-col items-center">
              {/* Embossed Metallic Gold Scalloped Seal */}
              <div className="relative z-20 w-11 h-11 rounded-full bg-gradient-to-tr from-[#8C6D27] via-[#FFE494] to-[#C8A45D] p-0.5 shadow-md flex items-center justify-center border border-[#FFE494]/80">
                <div className="w-full h-full rounded-full bg-gradient-to-b from-[#C8A45D] to-[#8C6D27] flex flex-col items-center justify-center text-[#3D2C08] p-0.5 border border-[#8C6D27]">
                  <Award className="w-4 h-4 text-[#FFF8E7] stroke-[2.2] filter drop-shadow" />
                  <span className="text-[5.5px] font-mono font-black tracking-tighter text-[#FFF8E7] uppercase mt-0.5">
                    {cert.year.split(' ')[0]}
                  </span>
                </div>
              </div>

              {/* Draped Red Silk Ribbon Tails */}
              <div className="absolute top-7 z-10 flex gap-1 pointer-events-none">
                <div 
                  className="w-3 h-5 bg-gradient-to-b from-[#B91C1C] via-[#991B1B] to-[#7F1D1D] shadow-sm transform -rotate-12"
                  style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 50% 80%, 0% 100%)' }}
                />
                <div 
                  className="w-3 h-5 bg-gradient-to-b from-[#B91C1C] via-[#991B1B] to-[#7F1D1D] shadow-sm transform rotate-12"
                  style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 50% 80%, 0% 100%)' }}
                />
              </div>
            </div>

            {/* Right Signature Line */}
            <div className="text-right">
              <div className="w-16 h-3 border-b border-[#6B531E]/60 flex items-end justify-end">
                <span className="font-serif italic text-[8px] text-[#4A3B1C] pr-1 select-none">
                  Chief Executive
                </span>
              </div>
              <div className="text-[6.5px] font-mono text-[#7A6840] uppercase mt-0.5">
                Official Seal Registry
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
