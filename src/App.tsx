// App.tsx - Medico-Legal Landing Page
// Tailwind CSS required for styling

import { useState, useEffect, FormEvent, ChangeEvent } from 'react';

// API URL - empty string uses Vite proxy in development, full URL for production
const API_URL = import.meta.env.VITE_API_URL || '';

// Hero slideshow images - female professionals in medico-legal/psychology contexts
const heroImages = [
  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=2400&q=80', // Professional woman portrait
  'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=2400&q=80', // Woman in professional meeting
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=2400&q=80', // Professional woman at desk
  'https://images.unsplash.com/photo-1551836022-8b2858c9c69b?auto=format&fit=crop&w=2400&q=80', // Woman consulting/discussion
  'https://images.unsplash.com/photo-1590650153855-d9e808231d41?auto=format&fit=crop&w=2400&q=80', // Female professional writing
];

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
    title: "Independent Medico-Legal Psychological Assessments",
    desc: "We conduct IME-style psychological assessments and prepare comprehensive medico-legal reports addressing diagnosis, causation, contributory factors, functional capacity, fitness for work, treatment needs and prognosis.",
    bullets: ["Diagnosis & causation analysis", "Functional capacity & fitness for work", "Treatment needs & prognosis"],
    icon: "🧠",
  },
  {
    title: "Workplace Psychological Injury & Psychosocial Risk",
    desc: "We bring specialist expertise in workplace psychological injury and psychosocial risk, supporting nuanced evaluation of organisational stressors, systemic contributors and employer liability considerations in complex compensation matters.",
    bullets: ["Psychosocial hazard assessment", "Organisational stressor evaluation", "Employer liability considerations"],
    icon: "🏢",
  },
  {
    title: "Targeted Trauma Treatment & EMDR",
    desc: "Where clinically appropriate, we provide brief, evidence-based treatment, including EMDR, with an emphasis on early intervention, sustainable functional recovery and minimising long-term treatment dependency.",
    bullets: ["EMDR therapy", "Early intervention focus", "Sustainable recovery outcomes"],
    icon: "💚",
  },
  {
    title: "Psychological Assessment",
    desc: "We conduct comprehensive psychological assessments to inform medico-legal opinion, treatment planning and rehabilitation decision-making.",
    bullets: ["Clinical interview & structured history", "Psychometric assessment", "Functional & vocational considerations"],
    icon: "📋",
  },
  {
    title: "Evidence-Based Psychological Treatment",
    desc: "Targeted psychological treatment to address trauma and associated symptoms arising from workplace incidents, motor vehicle accidents and criminal injuries.",
    bullets: ["CBT & ACT therapies", "Mindfulness-based interventions", "Vocational counselling & RTW support"],
    icon: "🎯",
  },
  {
    title: "Compensation Scheme Expertise",
    desc: "We accept referrals across all major compensation schemes, providing expert psychological opinion for legal practitioners, insurers and rehabilitation providers.",
    bullets: ["Workers' Compensation", "Motor Vehicle Accident (CTP)", "Criminal Injuries Compensation"],
    icon: "⚖️",
  },
];

const testimonials = [
  {
    name: "Senior Claims Counsel",
    quote:
      "Clear, precise, and well-structured reporting. The opinions were easy to follow and held up under scrutiny.",
  },
  {
    name: "Partner, Litigation Firm",
    quote:
      "Excellent communication and turnaround. Their courtroom manner was calm, neutral, and highly credible.",
  },
  {
    name: "Insurance Case Manager",
    quote:
      "Professional process end-to-end. The report addressed every question directly with strong clinical grounding.",
  },
];

export default function App() {
  return (
    <div className="min-h-screen bg-[#0B1220] text-white">
      {/* Top gradient / subtle texture */}
      <div
        className="pointer-events-none fixed inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(1200px 600px at 20% 10%, rgba(47,183,201,0.18), transparent 60%), radial-gradient(900px 500px at 80% 30%, rgba(201,138,42,0.10), transparent 55%), linear-gradient(180deg, rgba(255,255,255,0.03), transparent 40%)",
        }}
      />

      <Header />

      <main className="relative">
        <Hero />
        <TrustBar />
        <Services />
        <Process />
        <About />
        <Referrals />
        <Testimonials />
        <CTA />
        <Footer />
      </main>
    </div>
  );
}

function Header() {
  return (
    <header className="relative z-10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6 md:py-5">
        <a href="#">
          <img
            src="/rtmedico-legal-logo-26.png"
            alt="Reilly & Tholstrup Medico-Legal"
            className="h-12 w-auto md:h-14"
          />
        </a>

        <nav className="hidden items-center gap-7 text-sm text-white/80 md:flex">
          <a className="hover:text-white" href="#services">
            Services
          </a>
          <a className="hover:text-white" href="#process">
            Process
          </a>
          <a className="hover:text-white" href="#about">
            About
          </a>
          <a className="hover:text-white" href="#contact">
            Contact
          </a>
          <a
            className="rounded-xl bg-[#C98A2A] px-4 py-2 font-semibold text-[#0B1220] hover:brightness-110"
            href="#contact"
          >
            Request a Consultation
          </a>
        </nav>

        <a
          className="md:hidden rounded-xl bg-white/5 px-4 py-2 text-sm text-white ring-1 ring-white/10 hover:bg-white/10"
          href="#contact"
        >
          Contact
        </a>
      </div>
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </header>
  );
}

function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000); // Change image every 6 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative">
      {/* Full-screen hero */}
      <div className="relative h-[92vh] min-h-[640px]">
        {/* HERO IMAGE SLIDESHOW */}
        {heroImages.map((image, index) => (
          <div
            key={image}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{
              backgroundImage: `url('${image}')`,
              filter: "saturate(0.7) contrast(0.95) brightness(0.65)",
              opacity: index === currentImageIndex ? 1 : 0,
            }}
          />
        ))}
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1220]/50 via-[#0B1220]/70 to-[#0B1220]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1220]/85 via-[#0B1220]/55 to-transparent" />

        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center px-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs text-white/80 ring-1 ring-white/10">
              <span className="h-2 w-2 rounded-full bg-[#2FB7C9]" />
              Medico-Legal Psychologists & Trauma Specialists
            </div>

            <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
              Reilly & Tholstrup{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2FB7C9] to-[#1E8FA6]">
                Medico-Legal
              </span>
            </h1>

            <p className="mt-5 text-lg text-white/80 md:text-xl">
              Independent IME-style psychological assessments and targeted trauma treatment for workers' compensation, motor vehicle accident and criminal injuries compensation matters.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="rounded-2xl bg-[#C98A2A] px-6 py-3 text-center font-semibold text-[#0B1220] hover:brightness-110"
              >
                Request an Appointment
              </a>
              <a
                href="#services"
                className="rounded-2xl bg-white/5 px-6 py-3 text-center font-semibold text-white ring-1 ring-white/10 hover:bg-white/10"
              >
                View Services
              </a>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <HeroStat label="Expertise" value="25+ Years" />
              <HeroStat label="Reports" value="Court-ready" />
              <HeroStat label="Coverage" value="Australia Wide" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
      <div className="text-xs uppercase tracking-[0.22em] text-white/60">
        {label}
      </div>
      <div className="mt-1 text-lg font-semibold">{value}</div>
    </div>
  );
}

function TrustBar() {
  return (
    <section className="relative -mt-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-3xl bg-[#0E1728]/80 p-6 ring-1 ring-white/10 backdrop-blur">
          <p className="text-white/80 text-center mb-6">
            Reilly & Tholstrup is a boutique medico-legal consultancy providing independent psychological assessments and expert opinion for legal practitioners, insurers, rehabilitation providers and medical referrers across Australia.
          </p>
          <div className="grid gap-5 md:grid-cols-3">
            <TrustItem
              title="Psychological Injury Expertise"
              desc="Specialising in workplace incidents, motor vehicle accidents and criminal offences, including trauma and associated symptoms."
            />
            <TrustItem
              title="Senior Medico-Legal Experience"
              desc="Accurate diagnostic opinion, defensible causation analysis and outcome-focused intervention."
            />
            <TrustItem
              title="Evidence-Based Treatment"
              desc="Brief, targeted trauma treatment designed to support sustainable recovery and reduce long-term claim impact."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustItem({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
      <div className="text-base font-semibold">{title}</div>
      <div className="mt-2 text-sm leading-relaxed text-white/75">{desc}</div>
      <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-[#C98A2A]/40 to-transparent" />
    </div>
  );
}

function Services() {
  return (
    <section id="services" className="relative py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-[#C98A2A]">
              Our Services
            </div>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
              Medico-Legal Psychology & Trauma Services
            </h2>
            <p className="mt-3 max-w-2xl text-white/75">
              Independent psychological assessments, expert opinion and evidence-based treatment for legal practitioners, insurers and rehabilitation providers.
            </p>
          </div>

          <a
            href="#contact"
            className="mt-4 inline-flex w-fit items-center justify-center rounded-2xl bg-white/5 px-5 py-3 text-sm font-semibold ring-1 ring-white/10 hover:bg-white/10 md:mt-0"
          >
            Discuss a referral →
          </a>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="group rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 transition hover:bg-white/[0.07]"
            >
              <div className="flex items-start justify-between">
                <div className="text-3xl">{s.icon}</div>
                <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-[#2FB7C9]/30 to-[#1E8FA6]/10 ring-1 ring-white/10" />
              </div>

              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/75">{s.desc}</p>

              <ul className="mt-4 space-y-2 text-sm text-white/75">
                {s.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#C98A2A]" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-[#2FB7C9]/35 to-transparent" />
              <a
                href="#contact"
                className="mt-4 inline-flex text-sm font-semibold text-white/90 hover:text-white"
              >
                Request this service →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="relative py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-3xl bg-white/5 p-8 ring-1 ring-white/10">
            <div className="text-xs uppercase tracking-[0.22em] text-[#C98A2A]">
              How it works
            </div>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
              A straightforward, defensible process
            </h2>
            <p className="mt-4 text-white/75">
              We keep things predictable: clear instructions, careful review of records, impartial
              assessment, and structured reporting.
            </p>

            <div className="mt-8 space-y-5">
              <Step
                num="01"
                title="Instruction & intake"
                desc="Define the assessment questions, scope and timeframe. We confirm availability and required collateral materials."
              />
              <Step
                num="02"
                title="Collateral review"
                desc="Comprehensive review of relevant records, clinical history and documentation to inform assessment."
              />
              <Step
                num="03"
                title="Psychological assessment"
                desc="Clinical interview, structured history taking and psychometric assessment where indicated."
              />
              <Step
                num="04"
                title="Report & recommendations"
                desc="Court-ready medico-legal report addressing diagnosis, causation, treatment needs and prognosis."
              />
            </div>
          </div>

          <div className="rounded-3xl bg-[#0E1728]/70 p-8 ring-1 ring-white/10">
            <div className="rounded-3xl bg-gradient-to-br from-[#2FB7C9]/15 to-transparent p-8 ring-1 ring-white/10">
              <h3 className="text-xl font-semibold">What you can expect</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Pill title="Clear scope" desc="Defined assessment questions and deliverables." />
                <Pill title="Independent opinion" desc="Impartial, evidence-based conclusions." />
                <Pill title="Defensible analysis" desc="Clear diagnostic reasoning & causation." />
                <Pill title="Practical utility" desc="Reports designed for legal decision-making." />
              </div>

              <div className="mt-8 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                <div className="text-sm font-semibold">Need a quote or availability?</div>
                <p className="mt-2 text-sm text-white/75">
                  Share your matter type, required services, and preferred dates—our team will respond promptly.
                </p>
                <a
                  href="#contact"
                  className="mt-5 inline-flex w-fit items-center justify-center rounded-2xl bg-[#C98A2A] px-5 py-3 text-sm font-semibold text-[#0B1220] hover:brightness-110"
                >
                  Get availability →
                </a>
              </div>
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
      <div className="mt-1 w-12 shrink-0">
        <div className="rounded-2xl bg-white/5 px-3 py-2 text-center text-xs font-semibold tracking-[0.22em] text-[#2FB7C9] ring-1 ring-white/10">
          {num}
        </div>
      </div>
      <div>
        <div className="text-base font-semibold">{title}</div>
        <div className="mt-1 text-sm text-white/75">{desc}</div>
      </div>
    </div>
  );
}

function Pill({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-1 text-sm text-white/70">{desc}</div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="relative py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-[0.22em] text-[#C98A2A]">
            Meet Our Directors
          </div>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
            Senior Consultant Psychologists
          </h2>
          <p className="mt-4 text-white/75 max-w-3xl mx-auto">
            Our directors bring combined clinical and organisational psychology expertise, with national and international experience in medico-legal assessment and trauma treatment.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Rose Reilly */}
          <div className="rounded-3xl bg-white/5 p-8 ring-1 ring-white/10">
            <div className="flex items-start gap-4 mb-6">
              <img
                src="/rose-reilly.jpg"
                alt="Rose Reilly"
                className="h-16 w-16 rounded-2xl object-cover ring-1 ring-white/10"
              />
              <div>
                <h3 className="text-xl font-semibold">Rose Reilly</h3>
                <p className="text-sm text-[#2FB7C9]">Consultant Psychologist</p>
                <p className="text-xs text-white/60 mt-1">Medico-Legal, Workplace Psychological Injury & Trauma Specialist</p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-white/75">
              <p>
                Rose Reilly is a senior registered psychologist specialising in the assessment of workplace psychological injury, psychosocial risk and trauma-related conditions arising from occupational incidents, motor vehicle accidents and criminal offences.
              </p>
              <p>
                Rose brings over 28 years of combined clinical and organisational psychology experience, with extensive national and international work across occupational, compensation and medico-legal settings. She is a recognised subject matter expert in psychosocial risk and workplace psychological injury, with substantial experience in the identification and assessment of psychosocial hazard exposures, organisational stressors and systemic contributors to injury. She has also led the development and delivery of workplace psychosocial risk training programs for organisations across multiple sectors.
              </p>
              <p>
                Rose has many years of experience conducting IME-style psychological assessments and preparing comprehensive medico-legal reports for workers' compensation, motor vehicle accident and criminal injuries compensation matters. Her reports address diagnosis, causation, organisational and contributory factors, functional capacity, fitness for work, treatment needs and prognosis, and are valued for their clarity, balance and practical utility in legal and insurer decision-making.
              </p>
              <p>
                In addition to her medico-legal work, Rose is an experienced treating clinician with advanced training in trauma-focused therapies, including EMDR. She specialises in the delivery of brief, targeted and sustainable psychological interventions to address trauma and associated symptoms such as anxiety, low mood, pain-related distress and stress dysregulation, with a focus on durable functional recovery and timely return-to-work outcomes.
              </p>
              <p>
                Rose adopts an independent, objective and evidence-based approach in all medico-legal matters and regularly provides expert psychological opinion for court, tribunal and compensation proceedings.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="text-xs uppercase tracking-[0.22em] text-[#C98A2A] mb-3">Key Expertise</div>
              <div className="flex flex-wrap gap-2">
                {["Psychosocial Risk", "EMDR", "Workplace Injury", "Expert Testimony"].map((tag) => (
                  <span key={tag} className="rounded-full bg-white/5 px-3 py-1 text-xs ring-1 ring-white/10">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Tess Tholstrup */}
          <div className="rounded-3xl bg-white/5 p-8 ring-1 ring-white/10">
            <div className="flex items-start gap-4 mb-6">
              <img
                src="/tess-tholstrup.jpg"
                alt="Tess Tholstrup"
                className="h-16 w-16 rounded-2xl object-cover ring-1 ring-white/10"
              />
              <div>
                <h3 className="text-xl font-semibold">Tess Tholstrup</h3>
                <p className="text-sm text-[#C98A2A]">Consultant Psychologist</p>
                <p className="text-xs text-white/60 mt-1">Medico-Legal, Trauma & Psychological Injury Specialist</p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-white/75">
              <p>
                Tess brings combined clinical and organisational psychology expertise, with national and international experience in the assessment and management of complex psychological injury and occupational stress presentations.
              </p>
              <p>
                She has particular expertise in the assessment of psychological injury, causation and functional capacity, providing a strong foundation for medico-legal opinion in workers' compensation, motor vehicle accident and criminal injuries compensation matters.
              </p>
              <p>
                Tess has years of experience conducting IME-style psychological assessments and preparing comprehensive medico-legal reports. She has specific expertise in the delivery of short-term, evidence-based trauma treatment, including EMDR.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="text-xs uppercase tracking-[0.22em] text-[#C98A2A] mb-3">Key Expertise</div>
              <div className="flex flex-wrap gap-2">
                {["Trauma Treatment", "EMDR", "Causation Analysis", "Functional Capacity"].map((tag) => (
                  <span key={tag} className="rounded-full bg-white/5 px-3 py-1 text-xs ring-1 ring-white/10">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Shared approach note */}
        <div className="mt-10 rounded-3xl bg-gradient-to-r from-[#2FB7C9]/10 via-white/5 to-[#C98A2A]/10 p-8 ring-1 ring-white/10">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Our Approach</h3>
            <p className="text-white/75 max-w-3xl mx-auto">
              Both directors adopt an independent, objective and evidence-based approach in all medico-legal matters. Their treatment interventions are designed to promote early symptom resolution, facilitate durable functional recovery and support timely return-to-work outcomes while minimising long-term treatment dependency.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Referrals() {
  const referralSources = [
    { title: "Law Firms", desc: "Independent medico-legal reports and expert opinion for litigation matters" },
    { title: "Insurers & Self-Insured Employers", desc: "IME-style assessments and treatment recommendations" },
    { title: "Rehabilitation Providers", desc: "Psychological assessment to inform rehabilitation planning" },
    { title: "General Practitioners & Medical Specialists", desc: "Specialist psychological assessment and treatment" },
  ];

  return (
    <section id="referrals" className="relative py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-[#C98A2A]">
              Referral Pathways
            </div>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
              We accept referrals from
            </h2>
            <p className="mt-4 text-white/75">
              Medico-legal assessments and treatment referrals are managed through clearly defined pathways to ensure independence of expert opinion and adherence to ethical and professional standards.
            </p>

            <div className="mt-8 space-y-4">
              {referralSources.map((source) => (
                <div key={source.title} className="flex gap-4 items-start">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[#2FB7C9] shrink-0" />
                  <div>
                    <div className="font-semibold">{source.title}</div>
                    <div className="text-sm text-white/70">{source.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white/5 p-8 ring-1 ring-white/10">
            <h3 className="text-xl font-semibold mb-6">Treatment Modalities</h3>
            <p className="text-white/75 text-sm mb-6">
              Treatment is individualised, time-limited and outcome-focused, with an emphasis on functional recovery, regulation of stress responses and sustainable return to work or daily activities.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Psychoeducation",
                "Exposure Therapy",
                "EMDR",
                "Cognitive Behavioural Therapy (CBT)",
                "Acceptance & Commitment Therapy (ACT)",
                "Mindfulness-Based Interventions",
                "Emotion-Focused Therapy (EFT)",
                "Supportive Psychotherapy",
              ].map((modality) => (
                <div key={modality} className="flex gap-2 items-center text-sm text-white/75">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C98A2A]" />
                  <span>{modality}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl bg-gradient-to-r from-[#2FB7C9]/20 to-transparent p-6 ring-1 ring-white/10">
              <div className="text-sm font-semibold">Discuss a Referral</div>
              <p className="mt-2 text-sm text-white/75">
                We are available to discuss referral suitability and scope prior to formal instruction.
              </p>
              <a
                href="#contact"
                className="mt-4 inline-flex items-center justify-center rounded-2xl bg-[#C98A2A] px-5 py-3 text-sm font-semibold text-[#0B1220] hover:brightness-110"
              >
                Contact us →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-[#C98A2A]">
              Testimonials
            </div>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
              Trusted by legal &amp; insurance professionals
            </h2>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10"
            >
              <div className="text-sm text-white/75">"{t.quote}"</div>
              <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-[#C98A2A]/40 to-transparent" />
              <div className="mt-4 text-sm font-semibold">{t.name}</div>
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

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Unable to connect to server. Please try again later.');
      }

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
    <section id="contact" className="relative py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-[2rem] bg-gradient-to-br from-white/10 to-white/5 p-10 ring-1 ring-white/10">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <div className="text-xs uppercase tracking-[0.22em] text-[#C98A2A]">
                Contact
              </div>
              <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
                Request a consultation or report
              </h2>
              <p className="mt-4 text-white/75">
                Send a brief outline of your matter, the questions to be addressed, and any timing
                requirements. We'll confirm scope, availability, and next steps.
              </p>

              <div className="mt-8 space-y-3 text-sm text-white/80">
                <div className="flex gap-3">
                  <span className="text-[#2FB7C9]">●</span>
                  <span>Phone: COMING SOON </span>
                </div>
                <div className="flex gap-3">
                  <span className="text-[#2FB7C9]">●</span>
                  <span>Email: enquiries@rtmedicolegal.com</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-[#2FB7C9]">●</span>
                  <span>Location: Australia Wide</span>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-3xl bg-[#0B1220]/40 p-8 ring-1 ring-white/10"
            >
              <div className="grid gap-4">
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
                <Field
                  label="Email"
                  name="email"
                  placeholder="jane@company.com"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Field
                  label="Phone"
                  name="phone"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <div>
                  <label className="text-sm text-white/80">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    minLength={10}
                    className="mt-2 h-28 w-full rounded-2xl bg-white/5 p-4 text-sm text-white placeholder:text-white/40 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-[#2FB7C9]/50"
                    placeholder="Brief matter outline, key questions, preferred timeframe..."
                  />
                </div>

                {status.type === 'success' && (
                  <div className="rounded-2xl bg-[#2FB7C9]/20 p-4 text-sm text-[#2FB7C9]">
                    {status.message}
                  </div>
                )}

                {status.type === 'error' && (
                  <div className="rounded-2xl bg-red-500/20 p-4 text-sm text-red-400">
                    {status.message}
                  </div>
                )}

                <button
                  className="mt-2 rounded-2xl bg-[#C98A2A] px-6 py-3 text-sm font-semibold text-[#0B1220] hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={status.type === 'loading'}
                >
                  {status.type === 'loading' ? 'Sending...' : 'Send enquiry'}
                </button>

                <p className="text-xs text-white/55">
                  By submitting, you agree that information is provided for administrative purposes only.
                </p>
              </div>
            </form>
          </div>
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
      <label htmlFor={name} className="text-sm text-white/80">
        {label}
        {required && <span className="text-[#C98A2A] ml-1">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-2 w-full rounded-2xl bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-[#2FB7C9]/50"
      />
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative pb-10 pt-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="mt-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="text-sm text-white/60">
            © {new Date().getFullYear()} Reilly &amp; Tholstrup Medico-Legal. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-white/60">
            <a className="hover:text-white" href="#services">
              Services
            </a>
            <a className="hover:text-white" href="#about">
              About
            </a>
            <a className="hover:text-white" href="#contact">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
