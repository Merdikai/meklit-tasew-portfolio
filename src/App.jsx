import React from 'react';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import ThreeBackground from './components/ThreeCanvas/ThreeBackground';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import JurisprudenceSection from './components/JurisprudenceSection';
import ExperienceTimeline from './components/ExperienceTimeline';
import CertificatesCabinet from './components/CertificatesCabinet';
import SkillsSection from './components/SkillsSection';
import ReferencesSection from './components/ReferencesSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen bg-court-darkest text-slate-100 selection:bg-court-gold selection:text-court-darkest font-sans overflow-x-hidden">
      {/* Interactive Cursor Spotlight */}
      <CustomCursor />

      {/* Persistent 3D Floating Polyhedra & Golden Dust Canvas */}
      <ThreeBackground />

      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Adjudicative Profile & Judicial Ethics */}
        <AboutSection />

        {/* Jurisprudence & Dual LL.M. Theses */}
        <JurisprudenceSection />

        {/* Judicial Service & Bench Progression Timeline */}
        <ExperienceTimeline />

        {/* Honors, Accreditations & Certificates Cabinet */}
        <CertificatesCabinet />

        {/* Core Competencies & Skills */}
        <SkillsSection />

        {/* Judicial Bench References */}
        <ReferencesSection />

        {/* Chambers & Contact Channels */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
