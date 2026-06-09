// landing page
'use client';

import React from 'react';
import { Fraunces } from 'next/font/google';
import { ArrowRight, ArrowUpRight, Asterisk, Zap, Cloud, Database, Lock } from 'lucide-react';

const display = Fraunces({ subsets: ['latin'], weight: ['400', '500', '600', '700'], style: ['normal', 'italic'] });

const palette = {
  '--paper': '#f3ede2',
  '--paper-2': '#fbf8f1',
  '--ink': '#2a2521',
  '--muted': '#6f655a',
  '--clay': '#c75d3f',
  '--clay-deep': '#a8472d',
  '--sage': '#5f6b4f',
  '--line': 'rgba(42, 37, 33, 0.12)',
} as React.CSSProperties;

const FEATURES = [
  { icon: Zap, title: 'AI Image Generation', desc: 'Turn a sentence into a finished image with Google Vertex AI.' },
  { icon: Cloud, title: 'Cloud Storage', desc: 'Every piece you make is kept safe on Supabase Storage.' },
  { icon: Database, title: 'Database Integration', desc: 'Supabase PostgreSQL remembers every generation and session.' },
  { icon: Lock, title: 'Secure Authentication', desc: 'Clerk keeps your studio private, per-account.' },
];

const STACK = [
  { title: 'Frontend', items: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS 4'] },
  { title: 'AI & Backend', items: ['Google Vertex AI', 'Vercel AI SDK', 'Next.js API Routes', 'React Flow Canvas'] },
  { title: 'Infrastructure', items: ['Supabase (PostgreSQL)', 'Supabase Storage', 'Clerk Authentication', 'Google Cloud'] },
];

// serif display helper
function D({ children, className = '', as: Tag = 'h2', italic = false }: { children: React.ReactNode; className?: string; as?: React.ElementType; italic?: boolean }) {
  return <Tag className={`${display.className} ${italic ? 'italic' : ''} ${className}`}>{children}</Tag>;
}

export default function AICanvasLanding() {
  return (
    <div style={palette} className="relative min-h-screen overflow-hidden bg-[var(--paper)] text-[var(--ink)] selection:bg-[var(--clay)]/20">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="anim-drift absolute -top-40 -right-32 h-[36rem] w-[36rem] rounded-full bg-[var(--clay)]/15 blur-[120px]" />
        <div className="anim-drift-slow absolute top-1/3 -left-40 h-[32rem] w-[32rem] rounded-full bg-[var(--sage)]/15 blur-[120px]" style={{ animationDelay: '-9s' }} />
        <div className="anim-drift absolute -bottom-32 right-1/4 h-[28rem] w-[28rem] rounded-full bg-[var(--clay)]/10 blur-[120px]" style={{ animationDelay: '-15s' }} />
        <div className="absolute inset-0 opacity-[0.035] mix-blend-multiply" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
      </div>

      {/* Nav */}
      <nav className="relative z-50 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <D as="span" className="text-xl font-semibold tracking-tight">AICANVAS<span className="text-[var(--clay)]">.</span></D>
        <div className="hidden items-center gap-8 text-sm text-[var(--muted)] sm:flex">
          <a href="#about" className="transition hover:text-[var(--ink)]">About</a>
          <a href="#techstack" className="transition hover:text-[var(--ink)]">Tech Stack</a>
          <a href="https://github.com/agakshita5/ai-canvas" className="transition hover:text-[var(--ink)]">GitHub</a>
        </div>
        <a href="/generate" className="group inline-flex items-center gap-1.5 rounded-full bg-[var(--ink)] px-5 py-2 text-sm font-medium text-[var(--paper-2)] transition hover:bg-[var(--clay)]">
          Open Canvas
          <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </nav>

      {/* Hero */}
      <section className="relative z-10 mx-auto grid max-w-6xl items-center gap-14 px-6 pt-16 pb-24 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
            <Asterisk size={15} className="text-[var(--clay)]" /> Powered by Google Vertex AI
          </span>
          <D as="h1" className="mt-6 text-5xl font-semibold leading-[1.02] tracking-tight md:text-[4.5rem]">
            Where ideas
            <br />
            become <D as="span" italic className="text-[var(--clay)]">images</D>.
          </D>
          <p className="mt-7 max-w-md text-lg leading-relaxed text-[var(--muted)]">
            Describe a vision and let AI compose it, then refine and arrange every piece on an endless canvas — a calm, tactile studio for making images.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href="/generate" className="group inline-flex items-center gap-2 rounded-full bg-[var(--clay)] px-7 py-3.5 font-medium text-[var(--paper-2)] shadow-[0_10px_30px_-10px_rgba(167,71,45,0.6)] transition hover:-translate-y-0.5 hover:bg-[var(--clay-deep)]">
              Try the Canvas
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a href="https://github.com/agakshita5/ai-canvas" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-7 py-3.5 font-medium text-[var(--ink)] transition hover:-translate-y-0.5 hover:border-[var(--ink)]">
              View on GitHub
            </a>
          </div>
        </div>

        {/* gallery cards */}
        <div className="relative mx-auto h-[28rem] w-full max-w-md">
          <div className="anim-float-slow absolute right-2 top-10">
            <div className="rotate-[5deg] rounded-[1.25rem] shadow-[0_25px_50px_-15px_rgba(70,45,30,0.45)]">
              <img src="/card2.png" alt="" className="h-64 w-52 rounded-[0.75rem] object-cover" />
            </div>
          </div>
          <div className="anim-float absolute left-0 top-0" style={{ animationDelay: '-2.5s' }}>
            <div className="-rotate-[4deg] rounded-[1.25rem] shadow-[0_30px_60px_-18px_rgba(70,45,30,0.5)]">
              <img src="/card1.png" alt="AI generated preview" className="h-72 w-56 rounded-[0.75rem] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* About section */}
      <section id="about" className="relative z-10 mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-14 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--clay)]">What I Built</p>
            <D as="h2" className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">A full studio, <D as="span" italic>not just</D> a generator.</D>
            <p className="mt-6 max-w-sm leading-relaxed text-[var(--muted)]">
              AICANVAS combines generative models, a cloud database, signed-URL storage and an infinite canvas into one production-ready application.
            </p>
            <a href="/generate" className="mt-8 inline-flex items-center gap-2 font-medium text-[var(--clay)] transition hover:gap-3">
              Launch the canvas <ArrowRight size={18} />
            </a>
          </div>
          <ul>
            {FEATURES.map(({ icon: Icon, title, desc }, i) => (
              <li key={title} className="group grid grid-cols-[auto_auto_1fr] items-start gap-5 border-t border-[var(--line)] py-6 transition last:border-b">
                <span className="mt-1 text-[var(--sage)] transition group-hover:text-[var(--clay)]"><Icon size={20} /></span>
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How I Built It/TechStack */}
      <section id="techstack" className="relative z-10 mx-auto max-w-6xl px-6 py-20">
        <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-[var(--clay)]">How I Built It</p>
        <D as="h2" className="mx-auto mt-4 mb-14 max-w-2xl text-center text-4xl font-semibold md:text-5xl">The craft behind the canvas</D>
        <div className="grid gap-6 md:grid-cols-3">
          {STACK.map((col) => (
            <div key={col.title} className="rounded-2xl border border-[var(--line)] bg-[var(--paper-2)]/70 p-7 shadow-[0_2px_10px_rgba(70,45,30,0.05)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(70,45,30,0.3)]">
              <D as="h3" className="text-2xl font-semibold">{col.title}</D>
              <ul className="mt-5 space-y-3">
                {col.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[var(--muted)]">
                    <span className="h-px w-4 bg-[var(--clay)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 py-20">
        <div className="relative overflow-hidden rounded-[2rem] bg-[var(--ink)] px-8 py-20 text-center">
          <div className="pointer-events-none absolute -top-20 -right-10 h-72 w-72 rounded-full bg-[var(--clay)]/30 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-[var(--sage)]/25 blur-[100px]" />
          <div className="relative">
            <D as="h2" className="text-4xl font-semibold text-[var(--paper-2)] md:text-5xl">Ready to <D as="span" italic className="text-[var(--clay)]">create</D>?</D>
            <p className="mx-auto mt-5 max-w-md text-[var(--paper)]/70">Start making AI-powered images now. No credit card required.</p>
            <a href="/generate" className="group mt-9 inline-flex items-center gap-2 rounded-full bg-[var(--paper-2)] px-8 py-4 font-medium text-[var(--ink)] transition hover:-translate-y-0.5 hover:bg-[var(--clay)] hover:text-[var(--paper-2)]">
              Launch Live Demo
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="github" className="relative z-10 mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-4 border-t border-[var(--line)] pt-8 sm:flex-row">
          <div className="flex gap-8 text-sm text-[var(--muted)]">
            <a href="https://github.com/agakshita5/ai-canvas" target="_blank" rel="noopener noreferrer" className="transition hover:text-[var(--ink)]">GitHub Repository</a>
            <a href="/generate" className="transition hover:text-[var(--ink)]">Live Application</a>
          </div>
          <p className="text-sm text-[var(--muted)]">© 2026 AI Canvas</p>
        </div>
      </footer>
    </div>
  );
}
