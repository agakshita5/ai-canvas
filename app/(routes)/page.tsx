// landing page
'use client';

import React from 'react';
import { ExternalLink, ArrowRight, Zap, Database, Lock, Cloud, Search } from 'lucide-react';

export default function AICanvasLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#36213E] via-[#2b1136] to-[#1a0820] text-white overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#554971]/20 rounded-full blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute -top-20 -right-40 w-96 h-96 bg-[#63768D]/15 rounded-full blur-3xl opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-[#36213E]/30 rounded-full blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-20 -right-40 w-96 h-96 bg-[#554971]/20 rounded-full blur-3xl opacity-40 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'linear-gradient(90deg, #63768D 1px, transparent 1px), linear-gradient(#63768D 1px, transparent 1px)', backgroundSize: '50px 50px'}}></div>
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-[#63768D]/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-[#36213E]/80 backdrop-blur-md border-b border-[#554971]/30 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#63768D] to-[#554971] bg-clip-text text-transparent">
            AICANVAS
          </h1>
          <div className="flex gap-8 items-center">
            <a href="#about" className="text-sm text-[#63768D] hover:text-white transition">About</a>
            <a href="#techstack" className="text-sm text-[#63768D] hover:text-white transition">Tech Stack</a>
            <a href="#github" className="text-sm text-[#63768D] hover:text-white transition">GitHub</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-6">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/landing-bg.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            opacity: 0.5
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#36213E]/50 to-[#2b1136]/80 z-0"></div>

        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          <div className="space-y-6">
            <h2 className="text-6xl md:text-7xl font-bold leading-tight">
              Generate Images with
              <br />
              <span className="bg-gradient-to-r from-[#63768D] via-[#554971] to-[#36213E] bg-clip-text text-transparent">
                AICANVAS
              </span>
            </h2>
            <p className="text-xl text-[#63768D] max-w-3xl mx-auto leading-relaxed">
              Describe your vision and let our AI create stunning, unique images. Powered by Vertex AI, cloud storage, and secure authentication.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <a
              href="/generate"
              className="group px-8 py-4 bg-gradient-to-r from-[#554971] to-[#63768D] rounded-lg font-semibold hover:shadow-2xl hover:shadow-[#554971]/40 transition transform hover:scale-105 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#63768D] to-[#554971] opacity-0 group-hover:opacity-100 transition duration-300"></div>
              <span className="relative flex items-center justify-center">
                Try Live Demo
                <span className="ml-2">→</span>
              </span>
            </a>
            <a
              href="https://github.com/agakshita5/ai-canvas"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-[#63768D] rounded-lg font-semibold hover:bg-[#554971]/20 transition flex items-center justify-center gap-2 hover:border-white"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* About Section - What I Built */}
      <section id="about" className="relative py-24 px-6 bg-gradient-to-b from-transparent via-[#36213E]/40 to-transparent">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-5xl font-bold mb-16 text-center">What I Built</h3>
          
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Features Grid */}
            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-br from-[#554971]/30 to-[#36213E]/20 border border-[#554971]/40 rounded-xl hover:border-[#63768D]/60 transition group hover:shadow-lg hover:shadow-[#554971]/20 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <Zap className="text-[#63768D] mt-1 group-hover:text-white transition" size={24} />
                  <div>
                    <h4 className="text-lg font-semibold mb-2">AI Image Generation</h4>
                    <p className="text-[#63768D] text-sm">Generate high-quality images from text prompts using Google Vertex AI</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-[#554971]/30 to-[#36213E]/20 border border-[#554971]/40 rounded-xl hover:border-[#63768D]/60 transition group hover:shadow-lg hover:shadow-[#554971]/20 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <Cloud className="text-[#63768D] mt-1 group-hover:text-white transition" size={24} />
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Cloud Storage</h4>
                    <p className="text-[#63768D] text-sm">All generated images stored securely on Supabase</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-[#554971]/30 to-[#36213E]/20 border border-[#554971]/40 rounded-xl hover:border-[#63768D]/60 transition group hover:shadow-lg hover:shadow-[#554971]/20 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <Database className="text-[#63768D] mt-1 group-hover:text-white transition" size={24} />
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Database Integration</h4>
                    <p className="text-[#63768D] text-sm">Supabase PostgreSQL tracks all generations and user data</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-[#554971]/30 to-[#36213E]/20 border border-[#554971]/40 rounded-xl hover:border-[#63768D]/60 transition group hover:shadow-lg hover:shadow-[#554971]/20 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <Lock className="text-[#63768D] mt-1 group-hover:text-white transition" size={24} />
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Secure Authentication</h4>
                    <p className="text-[#63768D] text-sm">Clerk authentication for safe access</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-8">
              <div>
                <h4 className="text-2xl font-semibold mb-4 text-[#63768D]">Full-Stack AI Canvas Platform</h4>
                <p className="text-[#63768D] leading-relaxed mb-4">
                  AI Canvas is a complete image generation platform where you can generate unlimited images, edit images, and experiment with them on canvas.
                </p>
                <p className="text-[#63768D] leading-relaxed mb-4">
                  The project showcases how to combine generative AI models, cloud databases, and responsive design into a production-ready application.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section - How I Built It */}
      <section id="techstack" className="relative py-24 px-6 bg-gradient-to-b from-[#36213E]/20 via-transparent to-[#36213E]/20">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-5xl font-bold mb-16 text-center">How I Built It</h3>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Frontend */}
            <div className="p-8 bg-gradient-to-br from-[#554971]/20 to-[#36213E]/10 border border-[#554971]/40 rounded-xl hover:border-[#63768D]/60 transition hover:shadow-lg hover:shadow-[#554971]/20 backdrop-blur-sm">
              <h4 className="text-2xl font-semibold mb-8 text-[#63768D]">Frontend</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-[#63768D]">
                  <div className="w-2 h-2 bg-gradient-to-r from-[#554971] to-[#63768D] rounded-full"></div>
                  <span>Next.js 16</span>
                </li>
                <li className="flex items-center gap-3 text-[#63768D]">
                  <div className="w-2 h-2 bg-gradient-to-r from-[#554971] to-[#63768D] rounded-full"></div>
                  <span>React 19</span>
                </li>
                <li className="flex items-center gap-3 text-[#63768D]">
                  <div className="w-2 h-2 bg-gradient-to-r from-[#554971] to-[#63768D] rounded-full"></div>
                  <span>TypeScript</span>
                </li>
                <li className="flex items-center gap-3 text-[#63768D]">
                  <div className="w-2 h-2 bg-gradient-to-r from-[#554971] to-[#63768D] rounded-full"></div>
                  <span>Tailwind CSS 4</span>
                </li>
              </ul>
            </div>

            {/* AI & Backend */}
            <div className="p-8 bg-gradient-to-br from-[#554971]/20 to-[#36213E]/10 border border-[#554971]/40 rounded-xl hover:border-[#63768D]/60 transition hover:shadow-lg hover:shadow-[#554971]/20 backdrop-blur-sm">
              <h4 className="text-2xl font-semibold mb-8 text-[#63768D]">AI & Backend</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-[#63768D]">
                  <div className="w-2 h-2 bg-gradient-to-r from-[#554971] to-[#63768D] rounded-full"></div>
                  <span>Google Vertex AI</span>
                </li>
                <li className="flex items-center gap-3 text-[#63768D]">
                  <div className="w-2 h-2 bg-gradient-to-r from-[#554971] to-[#63768D] rounded-full"></div>
                  <span>Vercel AI SDK</span>
                </li>
                <li className="flex items-center gap-3 text-[#63768D]">
                  <div className="w-2 h-2 bg-gradient-to-r from-[#554971] to-[#63768D] rounded-full"></div>
                  <span>Next.js API Routes</span>
                </li>
              </ul>
            </div>

            {/* Infrastructure */}
            <div className="p-8 bg-gradient-to-br from-[#554971]/20 to-[#36213E]/10 border border-[#554971]/40 rounded-xl hover:border-[#63768D]/60 transition hover:shadow-lg hover:shadow-[#554971]/20 backdrop-blur-sm">
              <h4 className="text-2xl font-semibold mb-8 text-[#63768D]">Infrastructure</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-[#63768D]">
                  <div className="w-2 h-2 bg-gradient-to-r from-[#554971] to-[#63768D] rounded-full"></div>
                  <span>Supabase (PostgreSQL)</span>
                </li>
                <li className="flex items-center gap-3 text-[#63768D]">
                  <div className="w-2 h-2 bg-gradient-to-r from-[#554971] to-[#63768D] rounded-full"></div>
                  <span>Supabase Storage</span>
                </li>
                <li className="flex items-center gap-3 text-[#63768D]">
                  <div className="w-2 h-2 bg-gradient-to-r from-[#554971] to-[#63768D] rounded-full"></div>
                  <span>Clerk Authentication</span>
                </li>
                <li className="flex items-center gap-3 text-[#63768D]">
                  <div className="w-2 h-2 bg-gradient-to-r from-[#554971] to-[#63768D] rounded-full"></div>
                  <span>Google Cloud Platform</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-6 bg-gradient-to-r from-[#36213E]/60 via-[#2b1136]/60 to-[#36213E]/60">
        <div className="absolute inset-0 bg-gradient-to-b from-[#554971]/10 to-transparent"></div>
        
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <h3 className="text-5xl font-bold">Ready to Create?</h3>
          <p className="text-lg text-[#63768D]">
            Start generating AI-powered images now. No credit card required.
          </p>
          <a
            href="/generate"
            className="inline-block px-8 py-4 bg-gradient-to-r from-[#554971] to-[#63768D] rounded-lg font-semibold hover:shadow-2xl hover:shadow-[#554971]/40 transition transform hover:scale-105"
          >
            Launch Live Demo →
          </a>
        </div>
      </section>

      {/* Footer */}
      <section id="github" className="relative py-10 px-6 bg-gradient-to-b from-[#36213E]/40 to-[#2b1136]/60 border-t border-[#554971]/30">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex gap-10 mb-5">
            <a
              href="https://github.com/agakshita5/ai-canvas"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#63768D] hover:text-white transition flex items-center gap-2 text-sm hover:gap-3 duration-300"
            >
              GitHub Repository
            </a>
          
            <a href="/generate" className="text-[#63768D] text-sm hover:text-white transition flex items-center gap-1 hover:gap-2 duration-300" >
              <ExternalLink size={14} />
              Live Application
            </a>
          </div>
          <div className="text-center text-[#63768D] text-sm">
            <p>© 2026 AI Canvas</p>
          </div>
        </div>
      </section>
    </div>
  );
}