// App.tsx - Medico-Legal Landing Page
// Professional white theme with trustworthy medical-legal colors

import { useState, FormEvent, ChangeEvent } from 'react';

// API URL - empty string uses Vite proxy in development, full URL for production
const API_URL = import.meta.env.VITE_API_URL || '';

interface FormData {
  name: string;
  organisation: string;
  email: string;
  phone: string;
  message: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

const services = [
  {
    title: "Independent Medical Examinations (IME)",
    desc: "Objective assessments for injury claims, capacity, impairment, and causation with clear reporting and defensible methodology.",
    bullets: ["Causation & apportionment", "Permanent impairment ratings", "Functional capacity review"],
    icon: (
      <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: "Medico-Legal Reports",
    desc: "Court-ready reports written for clarity, relevance, and evidentiary standards across civil and insurance matters.",
    bullets: ["Chronology & records review", "Opinion evidence aligned to questions", "Plain-language summaries"],
    icon: (
      <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: "Expert Witness Testimony",
    desc: "Confident, impartial expert testimony with thorough preparation, joint meetings, and cross-examination readiness.",
    bullets: ["Expert conferencing", "Trial attendance", "Cross-exam support"],
    icon: (
      <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
  },
  {
    title: "Clinical Negligence Review",
    desc: "Independent review of standards of care, breach, and causation, with balanced opinions and comprehensive references.",
    bullets: ["Standard of care analysis", "Breach assessment", "Causation review"],
    icon: (
      <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    title: "Occupational & Workplace Health",
    desc: "Assessments related to work capacity, accommodations, return-to-work planning, and workplace injury considerations.",
    bullets: ["Fitness for duty", "RTW recommendations", "Restrictions & accommodations"],
    icon: (
      <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    title: "Record Screening & Case Triage",
    desc: "Efficient initial review to identify key medical issues, missing records, and the best next steps for instruction.",
    bullets: ["Gap analysis", "Key issues identification", "Next-step recommendations"],
    icon: (
      <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
];

const testimonials = [
  {
    name: "Senior Claims Counsel",
    role: "Insurance Company",
    quote:
      "Clear, precise, and well-structured reporting. The opinions were easy to follow and held up under scrutiny.",
  },
  {
    name: "Partner, Litigation Firm",
    role: "Legal Practice",
    quote:
      "Excellent communication and turnaround. Their courtroom manner was calm, neutral, and highly credible.",
  },
  {
    name: "Insurance Case Manager",
    role: "Claims Division",
    quote:
      "Professional process end-to-end. The report addressed every question directly with strong clinical grounding.",
  },
];

export default function App() {
  return (
    <div className="min-h-screen bg-offwhite text-slate-800">
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <Process />
        <About />
        <Testimonials />
        <CTA />
        <Footer />
      </main>
    </div>
  );
}

function Header() {
  return (
    <header className="bg-charcoal-dark sticky top-0 z-50 shadow-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <a href="#" className="flex items-center">
          <img
            src="/rtmedico-legal-logo-26.png"
            alt="Reilly & Throlstrup Medico-Legal"
            className="h-12 w-auto md:h-14 brightness-0 invert"
          />
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-300 md:flex">
          <a className="hover:text-white transition-colors" href="#services">
            Services
          </a>
          <a className="hover:text-white transition-colors" href="#process">
            Process
          </a>
          <a className="hover:text-white transition-colors" href="#about">
            About
          </a>
          <a className="hover:text-white transition-colors" href="#contact">
            Contact
          </a>
          <a
            className="rounded-lg bg-secondary-600 px-5 py-2.5 text-white font-semibold hover:bg-secondary-700 transition-colors"
            href="#contact"
          >
            Request a Consultation
          </a>
        </nav>

        <a
          className="md:hidden rounded-lg bg-secondary-600 px-4 py-2 text-sm text-white font-semibold hover:bg-secondary-700 transition-colors"
          href="#contact"
        >
          Contact
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Medical and legal professionals collaborating"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-dark/95 via-charcoal-dark/85 to-charcoal-dark/70" />
      </div>

      <div className="relative z-10 min-h-[85vh] flex items-center">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 text-sm text-white font-medium">
                <span className="h-2 w-2 rounded-full bg-secondary-400" />
                Independent opinions - Court-ready reporting - Professional integrity
              </div>

              <h1 className="mt-8 text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
                Medico-Legal Expertise{" "}
                <span className="text-secondary-400">
                  You Can Trust
                </span>
              </h1>

              <p className="mt-6 text-lg text-slate-300 md:text-xl leading-relaxed">
                Clear, impartial medical opinions and legal support services—built for
                insurers, solicitors, and courts.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#contact"
                  className="rounded-lg bg-secondary-600 px-8 py-4 text-center font-semibold text-white hover:bg-secondary-700 transition-colors shadow-lg shadow-secondary-600/25"
                >
                  Request an Appointment
                </a>
                <a
                  href="#services"
                  className="rounded-lg bg-white/10 backdrop-blur-sm border-2 border-white/30 px-8 py-4 text-center font-semibold text-white hover:bg-white/20 hover:border-white/50 transition-colors"
                >
                  View Services
                </a>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <HeroStat label="Turnaround" value="5-10 days" color="primary" />
                  <HeroStat label="Approach" value="Impartial" color="secondary" />
                </div>
                <div className="space-y-4 mt-8">
                  <HeroStat label="Report Style" value="Court-ready" color="secondary" />
                  <HeroStat label="Standards" value="Evidence-led" color="primary" />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile stats */}
          <div className="mt-12 grid grid-cols-2 gap-4 lg:hidden">
            <HeroStat label="Turnaround" value="5-10 days" color="primary" />
            <HeroStat label="Report Style" value="Court-ready" color="secondary" />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroStat({ label, value, color }: { label: string; value: string; color: 'primary' | 'secondary' }) {
  const bgColor = color === 'primary' ? 'bg-white/10 border-white/20' : 'bg-white/10 border-white/20';
  const textColor = color === 'primary' ? 'text-primary-300' : 'text-secondary-400';

  return (
    <div className={`rounded-xl ${bgColor} backdrop-blur-sm border p-5`}>
      <div className="text-xs uppercase tracking-widest text-slate-400 font-medium">
        {label}
      </div>
      <div className={`mt-1 text-xl font-bold ${textColor}`}>{value}</div>
    </div>
  );
}

function TrustBar() {
  return (
    <section className="relative -mt-8 z-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-2xl bg-white p-8 shadow-xl shadow-slate-300/50 border border-slate-200">
          <div className="grid gap-6 md:grid-cols-3">
            <TrustItem
              icon={
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              title="Evidence-led reporting"
              desc="Structured opinions aligned to instructions, records, and accepted clinical standards."
            />
            <TrustItem
              icon={
                <svg className="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              }
              title="Professional integrity"
              desc="Independent assessments with clear boundaries, transparency, and impartiality."
            />
            <TrustItem
              icon={
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              title="Smooth coordination"
              desc="Responsive scheduling, record handling, and straightforward communication."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustItem({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <div className="text-base font-semibold text-slate-900">{title}</div>
        <div className="mt-1 text-sm leading-relaxed text-slate-600">{desc}</div>
      </div>
    </div>
  );
}

function Services() {
  return (
    <section id="services" className="relative py-24 bg-offwhite">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-sm uppercase tracking-widest text-primary-600 font-semibold">
              Services
            </div>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
              Medico-Legal Services for Clear Outcomes
            </h2>
            <p className="mt-4 max-w-2xl text-slate-600">
              Built for legal teams, insurers, and courts—focused on clarity, defensibility,
              and professional standards.
            </p>
          </div>

          <a
            href="#contact"
            className="mt-4 inline-flex w-fit items-center justify-center rounded-lg bg-white border-2 border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 hover:border-primary-300 hover:text-primary-600 transition-colors md:mt-0"
          >
            Ask about your case
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="group rounded-xl bg-white p-6 border border-slate-200 hover:border-primary-300 hover:shadow-lg hover:shadow-primary-100/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-xl bg-primary-50 flex items-center justify-center">
                  {s.icon}
                </div>
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-900">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.desc}</p>

              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {s.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <svg className="w-5 h-5 text-secondary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <a
                  href="#contact"
                  className="inline-flex items-center text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
                >
                  Request this service
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="relative py-24 bg-white border-y border-slate-100">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <div className="text-sm uppercase tracking-widest text-primary-600 font-semibold">
              How it works
            </div>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
              A straightforward, defensible process
            </h2>
            <p className="mt-4 text-slate-600">
              We keep things predictable: clear instructions, careful review of records, impartial
              assessment, and structured reporting.
            </p>

            <div className="mt-10 space-y-6">
              <Step
                num="01"
                title="Instruction & intake"
                desc="Define the questions, scope, timeframe, and required records. We confirm schedule and deliverables."
              />
              <Step
                num="02"
                title="Records review"
                desc="Comprehensive screening of medical records, imaging, and relevant documentation for chronology and key issues."
              />
              <Step
                num="03"
                title="Assessment & opinion"
                desc="Independent examination or file-based opinion (as instructed), with clear reasoning and references."
              />
              <Step
                num="04"
                title="Report & support"
                desc="Court-ready report delivered on time, plus conferencing and testimony support when required."
              />
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-primary-50 to-secondary-50 p-8 border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900">What you can expect</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Pill title="Clear scope" desc="Defined questions and deliverables." />
              <Pill title="Neutral tone" desc="Impartial, balanced opinions." />
              <Pill title="Structured logic" desc="Readable reasoning & references." />
              <Pill title="Timely delivery" desc="Predictable turnaround windows." />
            </div>

            <div className="mt-8 rounded-xl bg-white p-6 border border-slate-200">
              <div className="text-base font-semibold text-slate-900">Need a quote or availability?</div>
              <p className="mt-2 text-sm text-slate-600">
                Share your matter type, required services, and preferred dates—our team will respond promptly.
              </p>
              <a
                href="#contact"
                className="mt-5 inline-flex items-center justify-center rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-700 transition-colors"
              >
                Get availability
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Step({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-xl bg-primary-600 flex items-center justify-center text-white text-sm font-bold">
          {num}
        </div>
      </div>
      <div>
        <div className="text-base font-semibold text-slate-900">{title}</div>
        <div className="mt-1 text-sm text-slate-600">{desc}</div>
      </div>
    </div>
  );
}

function Pill({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-xl bg-white p-4 border border-slate-200">
      <div className="text-sm font-semibold text-slate-900">{title}</div>
      <div className="mt-1 text-sm text-slate-500">{desc}</div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="relative py-24 bg-offwhite">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <div className="text-sm uppercase tracking-widest text-primary-600 font-semibold">
              About
            </div>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
              Professional, independent medico-legal guidance
            </h2>
            <p className="mt-4 text-slate-600">
              Reilly &amp; Throlstrup Medico-Legal supports legal and insurance professionals with
              impartial medical opinions, well-structured reporting, and practical clarity.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <InfoCard
                icon={
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                }
                title="Integrity first"
                desc="Independent, evidence-led opinions with clear boundaries."
              />
              <InfoCard
                icon={
                  <svg className="w-5 h-5 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                }
                title="Clarity matters"
                desc="Reports written for readability—without losing precision."
              />
              <InfoCard
                icon={
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                }
                title="Responsive team"
                desc="Fast coordination for records, scheduling, and questions."
              />
              <InfoCard
                icon={
                  <svg className="w-5 h-5 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                }
                title="Defensible work"
                desc="Methodical process aligned to professional standards."
              />
            </div>
          </div>

          <div className="rounded-2xl bg-white p-8 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">Key Focus Areas</h3>
            <div className="mt-6 space-y-4">
              {[
                "Personal injury, CTP, and insurance matters",
                "Work capacity, restrictions, and functional outcomes",
                "Negligence and standard-of-care review",
                "Chronology building and record review",
                "Expert testimony and conferencing support",
              ].map((item) => (
                <div key={item} className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-secondary-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-slate-700">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-xl bg-gradient-to-r from-primary-50 to-secondary-50 p-6 border border-slate-200">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <div className="text-sm font-semibold text-slate-900">Professional note</div>
                  <p className="mt-1 text-sm text-slate-600">
                    All opinions are provided independently and within scope of instruction and available materials.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-xl bg-white p-5 border border-slate-200 hover:border-primary-300 hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-3">
        {icon}
        <div className="text-base font-semibold text-slate-900">{title}</div>
      </div>
      <div className="mt-2 text-sm text-slate-600">{desc}</div>
    </div>
  );
}

function Testimonials() {
  return (
    <section className="relative py-24 bg-white border-y border-slate-100">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <div className="text-sm uppercase tracking-widest text-primary-600 font-semibold">
            Testimonials
          </div>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
            Trusted by legal &amp; insurance professionals
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-xl bg-offwhite p-6 border border-slate-200"
            >
              <svg className="w-8 h-8 text-primary-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="mt-4 text-slate-700 leading-relaxed">{t.quote}</p>
              <div className="mt-6 pt-4 border-t border-slate-200">
                <div className="text-sm font-semibold text-slate-900">{t.name}</div>
                <div className="text-sm text-slate-500">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    organisation: '',
    email: '',
    phone: '',
    message: '',
  });

  const [status, setStatus] = useState<FormStatus>({
    type: 'idle',
    message: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: '' });

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus({
        type: 'success',
        message: data.message || 'Thank you for your enquiry. We will respond within 1-2 business days.',
      });

      // Reset form on success
      setFormData({
        name: '',
        organisation: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'An error occurred. Please try again.',
      });
    }
  };

  return (
    <section id="contact" className="relative py-24 bg-gradient-to-br from-primary-600 to-primary-800">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500 rounded-full opacity-30 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-500 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 items-start">
          <div className="text-white">
            <div className="text-sm uppercase tracking-widest text-primary-200 font-semibold">
              Contact
            </div>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Request a consultation or report
            </h2>
            <p className="mt-4 text-primary-100 leading-relaxed">
              Send a brief outline of your matter, the questions to be addressed, and any timing
              requirements. We'll confirm scope, availability, and next steps.
            </p>

            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-primary-200">Phone</div>
                  <div className="text-white font-medium">COMING.SOON</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-primary-200">Email</div>
                  <div className="text-white font-medium">enquiries@rtmedicolegal.com</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-primary-200">Location</div>
                  <div className="text-white font-medium">Australia Wide</div>
                </div>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl bg-white p-8 shadow-2xl"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-6">Send us a message</h3>
            <div className="grid gap-5">
              <Field
                label="Full name"
                name="name"
                placeholder="Jane Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Field
                label="Organisation"
                name="organisation"
                placeholder="Firm / Insurer"
                value={formData.organisation}
                onChange={handleChange}
              />
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Email"
                  name="email"
                  placeholder="inquiries@rtmedicolegal.com"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Field
                  label="Phone"
                  name="phone"
                  placeholder="+61 COMING SOON"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  minLength={10}
                  className="mt-2 h-32 w-full rounded-lg bg-slate-50 p-4 text-sm text-slate-900 placeholder:text-slate-400 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="Brief matter outline, key questions, preferred timeframe..."
                />
              </div>

              {status.type === 'success' && (
                <div className="rounded-lg bg-green-50 border border-green-200 p-4 text-sm text-green-700 flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {status.message}
                </div>
              )}

              {status.type === 'error' && (
                <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700 flex items-start gap-3">
                  <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {status.message}
                </div>
              )}

              <button
                className="w-full rounded-lg bg-primary-600 px-6 py-4 text-base font-semibold text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                type="submit"
                disabled={status.type === 'loading'}
              >
                {status.type === 'loading' ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send enquiry'
                )}
              </button>

              <p className="text-xs text-slate-500 text-center">
                By submitting, you agree that information is provided for administrative purposes only.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
  value,
  onChange,
  required = false,
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-2 w-full rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
      />
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-charcoal-dark text-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <img
              src="/rtmedico-legal-logo-26.png"
              alt="Reilly & Throlstrup Medico-Legal"
              className="h-10 w-auto brightness-0 invert opacity-80"
            />
            <div className="mt-4 text-sm text-slate-400">
              Independent medical opinions for legal and insurance professionals.
            </div>
          </div>

          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <nav className="flex gap-6 text-sm text-slate-400">
              <a className="hover:text-white transition-colors" href="#services">
                Services
              </a>
              <a className="hover:text-white transition-colors" href="#process">
                Process
              </a>
              <a className="hover:text-white transition-colors" href="#about">
                About
              </a>
              <a className="hover:text-white transition-colors" href="#contact">
                Contact
              </a>
            </nav>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-charcoal-light/50">
          <div className="text-sm text-slate-400">
            © {new Date().getFullYear()} Reilly &amp; Throlstrup Medico-Legal. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
