import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Linkedin, 
  ExternalLink, 
  Copy, 
  Check, 
  FileDown, 
  Scale, 
  MessageSquare,
  Sparkles,
  Building2
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'Judicial Inquiry',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Frontend-only inquiry formatting
    const mailtoSubject = encodeURIComponent(`[${formData.category}] ${formData.subject || 'Portfolio Inquiry'}`);
    const mailtoBody = encodeURIComponent(
      `From: ${formData.name} (${formData.email})\nCategory: ${formData.category}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${personalInfo.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 relative bg-court-dark border-t border-court-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-court-gold/30 bg-court-card text-court-gold text-xs font-mono tracking-widest uppercase">
            <Mail className="w-4 h-4" />
            <span>Chambers &amp; Professional Contact</span>
          </div>
          <h2 className="font-crest text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100">
            Connect with <span className="text-gold-gradient font-serif italic">Judge Meklit Tasew</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
            Available for official judicial correspondence, academic legal research dialogue, conference panels, and professional inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Official Contact Channels */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-8 rounded-3xl bg-court-card/80 border border-court-border space-y-6 shadow-xl">
              <h3 className="font-crest text-xl font-bold text-slate-100 flex items-center gap-2.5">
                <Scale className="w-5 h-5 text-court-gold" />
                <span>Judicial Registry &amp; Channels</span>
              </h3>

              {/* LinkedIn Direct Link */}
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl bg-court-darkest/70 border border-court-border hover:border-court-gold/60 transition-all group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-court-gold/15 border border-court-gold/30 flex items-center justify-center text-court-gold group-hover:scale-105 transition-transform">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-crest text-sm font-bold text-slate-100 group-hover:text-court-goldLight transition-colors">
                      LinkedIn Professional Profile
                    </div>
                    <div className="text-xs text-court-muted font-mono">
                      Meklit Tasew
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-court-gold transition-colors" />
              </a>

              {/* Telegram Direct Link */}
              <a
                href={personalInfo.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl bg-court-darkest/70 border border-court-border hover:border-court-gold/60 transition-all group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-court-gold/15 border border-court-gold/30 flex items-center justify-center text-court-gold group-hover:scale-105 transition-transform">
                    <Send className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-crest text-sm font-bold text-slate-100 group-hover:text-court-goldLight transition-colors">
                      Telegram Direct Channel
                    </div>
                    <div className="text-xs text-court-muted font-mono">
                      @meklit11
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-court-gold transition-colors" />
              </a>

              {/* Official Email with Copy Action */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-court-darkest/70 border border-court-border hover:border-court-gold transition-all">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-court-gold/15 border border-court-gold/40 flex items-center justify-center text-court-gold">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-crest text-sm font-bold text-slate-100">
                      Official Judicial Email
                    </div>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-xs text-court-goldLight hover:underline font-mono"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg border border-court-border hover:border-court-gold text-slate-300 hover:text-court-gold transition-colors focus:outline-none"
                  title="Copy email address"
                  aria-label="Copy email address"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Direct Telephone */}
              <a
                href={`tel:${personalInfo.phone}`}
                className="flex items-center justify-between p-4 rounded-2xl bg-court-darkest/70 border border-court-border hover:border-court-gold transition-all group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-court-navy/80 border border-court-gold/30 flex items-center justify-center text-court-gold">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-crest text-sm font-bold text-slate-100">
                      Direct Telephone
                    </div>
                    <div className="text-xs text-slate-300 font-mono">
                      {personalInfo.phone}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-mono text-court-gold">Direct Call</span>
              </a>

              {/* Physical Chambers Location */}
              <div className="p-4 rounded-2xl bg-court-darkest/70 border border-court-border flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-court-navy/80 border border-court-gold/30 flex items-center justify-center text-court-gold">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-crest text-sm font-bold text-slate-100">
                    Jurisdiction &amp; Residence
                  </div>
                  <div className="text-xs text-slate-300 font-mono">
                    Federal Supreme Court of Ethiopia • Addis Ababa
                  </div>
                </div>
              </div>

            </div>

            {/* Download Official CV Card */}
            <div className="p-6 rounded-2xl bg-court-card/70 border border-court-gold/30 flex items-center justify-between gap-4">
              <div>
                <div className="font-crest text-sm font-bold text-slate-100">
                  Official Curriculum Vitae (PDF)
                </div>
                <div className="text-xs text-court-muted mt-0.5">
                  Complete Adjudicative, Academic &amp; Credential Record
                </div>
              </div>

              <a
                href="/cv/Meklit_Tasew_CV.pdf"
                download="Meklit_Tasew_CV.pdf"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-court-gold hover:bg-court-goldLight text-court-darkest text-xs font-bold tracking-wide uppercase transition-all shadow-md shrink-0"
              >
                <FileDown className="w-4 h-4" />
                <span>Download CV</span>
              </a>
            </div>

          </div>

          {/* Right Column: Interactive Inquiry / Consultation Drafter */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-court-card/80 border border-court-gold/25 shadow-2xl space-y-6">
              
              <div className="space-y-1">
                <div className="text-xs font-mono text-court-gold uppercase tracking-wider flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Interactive Judicial Correspondence</span>
                </div>
                <h3 className="font-crest text-2xl font-bold text-slate-100">
                  Transmit an Official Inquiry
                </h3>
                <p className="text-xs text-slate-300 font-light">
                  Direct communication routed to Judge Meklit Tasew's desk.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="text-xs font-mono text-slate-300">Your Full Name</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Adv. Yohannes Tesfaye"
                      className="w-full px-4 py-3 rounded-xl bg-court-darkest/90 border border-court-border focus:border-court-gold focus:outline-none text-slate-100 text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="text-xs font-mono text-slate-300">Your Email Address</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. counsel@lawchamber.et"
                      className="w-full px-4 py-3 rounded-xl bg-court-darkest/90 border border-court-border focus:border-court-gold focus:outline-none text-slate-100 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-category" className="text-xs font-mono text-slate-300">Inquiry Classification</label>
                    <select
                      id="contact-category"
                      name="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-court-darkest/90 border border-court-border focus:border-court-gold focus:outline-none text-slate-100 text-sm"
                    >
                      <option value="Judicial Inquiry">Official Judicial Inquiry</option>
                      <option value="Academic & LL.M. Scholarship">Academic &amp; LL.M. Scholarship</option>
                      <option value="Corporate Law Consultation">Corporate Governance &amp; Property Law</option>
                      <option value="Human Rights Advocacy">Human Rights &amp; Constitutional Inquiry</option>
                      <option value="Conference & Panel Invitation">Conference, Panel, or Guest Lecture</option>
                      <option value="General Professional">General Professional Inquiry</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-subject" className="text-xs font-mono text-slate-300">Subject / Matter</label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Commercial Code Precedent Discussion"
                      className="w-full px-4 py-3 rounded-xl bg-court-darkest/90 border border-court-border focus:border-court-gold focus:outline-none text-slate-100 text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="text-xs font-mono text-slate-300">Message / Statement</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows="5"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide detailed context regarding your legal inquiry or collaborative proposal..."
                    className="w-full px-4 py-3 rounded-xl bg-court-darkest/90 border border-court-border focus:border-court-gold focus:outline-none text-slate-100 text-sm resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-court-gold hover:bg-court-goldLight text-court-darkest font-crest font-bold text-sm tracking-wider uppercase transition-all shadow-[0_4px_25px_rgba(200,164,93,0.3)] hover:scale-[1.01]"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Official Correspondence</span>
                </button>
              </form>

              {submitted && (
                <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2 animate-in fade-in">
                  <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Inquiry formatted! Email client launched with pre-addressed correspondence.</span>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
