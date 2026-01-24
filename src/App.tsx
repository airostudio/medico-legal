// App.tsx - Medico-Legal Landing Page
// Tailwind CSS required for styling

import { useState, FormEvent, ChangeEvent } from 'react';

// API URL - defaults to localhost in development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

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
    icon: "🩺",
  },
  {
    title: "Medico-Legal Reports",
    desc: "Court-ready reports written for clarity, relevance, and evidentiary standards across civil and insurance matters.",
    bullets: ["Chronology & records review", "Opinion evidence aligned to questions", "Plain-language summaries"],
    icon: "📄",
  },
  {
    title: "Expert Witness Testimony",
    desc: "Confident, impartial expert testimony with thorough preparation, joint meetings, and cross-examination readiness.",
    bullets: ["Expert conferencing", "Trial attendance", "Cross-exam support"],
    icon: "⚖️",
  },
  {
    title: "Clinical Negligence Review",
    desc: "Independent review of standards of care, breach, and causation, with balanced opinions and comprehensive references.",
    bullets: ["Standard of care analysis", "Breach assessment", "Causation review"],
    icon: "🔍",
  },
  {
    title: "Occupational & Workplace Health",
    desc: "Assessments related to work capacity, accommodations, return-to-work planning, and workplace injury considerations.",
    bullets: ["Fitness for duty", "RTW recommendations", "Restrictions & accommodations"],
    icon: "🏢",
  },
  {
    title: "Record Screening & Case Triage",
    desc: "Efficient initial review to identify key medical issues, missing records, and the best next steps for instruction.",
    bullets: ["Gap analysis", "Key issues identification", "Next-step recommendations"],
    icon: "📚",
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
            alt="Reilly & Throlstrup Medico-Legal"
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
            className="rounded-xl bg-white/5 px-4 py-2 text-white ring-1 ring-white/10 hover:bg-white/10"
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
  return (
    <section className="relative">
      {/* Full-screen hero */}
      <div className="relative h-[92vh] min-h-[640px]">
        {/* HERO IMAGE: replace URL with your real asset */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=2400&q=80')",
            filter: "saturate(0.7) contrast(0.95) brightness(0.65)",
          }}
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1220]/50 via-[#0B1220]/70 to-[#0B1220]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1220]/85 via-[#0B1220]/55 to-transparent" />

        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center px-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs text-white/80 ring-1 ring-white/10">
              <span className="h-2 w-2 rounded-full bg-[#2FB7C9]" />
              Independent opinions • Court-ready reporting • Professional integrity
            </div>

            <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
              Medico-Legal Expertise{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2FB7C9] to-[#1E8FA6]">
                you can trust
              </span>
              .
            </h1>

            <p className="mt-5 text-lg text-white/80 md:text-xl">
              Clear, impartial medical opinions and legal support services—built for
              insurers, solicitors, and courts.
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
              <HeroStat label="Turnaround" value="5–10 days" />
              <HeroStat label="Report Style" value="Court-ready" />
              <HeroStat label="Approach" value="Impartial" />
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
          <div className="grid gap-5 md:grid-cols-3">
            <TrustItem
              title="Evidence-led reporting"
              desc="Structured opinions aligned to instructions, records, and accepted clinical standards."
            />
            <TrustItem
              title="Professional integrity"
              desc="Independent assessments with clear boundaries, transparency, and impartiality."
            />
            <TrustItem
              title="Smooth coordination"
              desc="Responsive scheduling, record handling, and straightforward communication."
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
              Services
            </div>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
              Medico-Legal Services for Clear Outcomes
            </h2>
            <p className="mt-3 max-w-2xl text-white/75">
              Built for legal teams, insurers, and courts—focused on clarity, defensibility,
              and professional standards.
            </p>
          </div>

          <a
            href="#contact"
            className="mt-4 inline-flex w-fit items-center justify-center rounded-2xl bg-white/5 px-5 py-3 text-sm font-semibold ring-1 ring-white/10 hover:bg-white/10 md:mt-0"
          >
            Ask about your case →
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

          <div className="rounded-3xl bg-[#0E1728]/70 p-8 ring-1 ring-white/10">
            <div className="rounded-3xl bg-gradient-to-br from-[#2FB7C9]/15 to-transparent p-8 ring-1 ring-white/10">
              <h3 className="text-xl font-semibold">What you can expect</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Pill title="Clear scope" desc="Defined questions and deliverables." />
                <Pill title="Neutral tone" desc="Impartial, balanced opinions." />
                <Pill title="Structured logic" desc="Readable reasoning & references." />
                <Pill title="Timely delivery" desc="Predictable turnaround windows." />
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
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-[#C98A2A]">
              About
            </div>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
              Professional, independent medico-legal guidance
            </h2>
            <p className="mt-4 text-white/75">
              Reilly &amp; Throlstrup Medico-Legal supports legal and insurance professionals with
              impartial medical opinions, well-structured reporting, and practical clarity.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <InfoCard title="Integrity first" desc="Independent, evidence-led opinions with clear boundaries." />
              <InfoCard title="Clarity matters" desc="Reports written for readability—without losing precision." />
              <InfoCard title="Responsive team" desc="Fast coordination for records, scheduling, and questions." />
              <InfoCard title="Defensible work" desc="Methodical process aligned to professional standards." />
            </div>
          </div>

          <div className="rounded-3xl bg-white/5 p-8 ring-1 ring-white/10">
            <h3 className="text-xl font-semibold">Key Focus Areas</h3>
            <div className="mt-4 space-y-3 text-white/75">
              {[
                "Personal injury, CTP, and insurance matters",
                "Work capacity, restrictions, and functional outcomes",
                "Negligence and standard-of-care review",
                "Chronology building and record review",
                "Expert testimony and conferencing support",
              ].map((item) => (
                <div key={item} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[#2FB7C9]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl bg-gradient-to-r from-[#2FB7C9]/20 via-white/5 to-[#C98A2A]/15 p-6 ring-1 ring-white/10">
              <div className="text-sm font-semibold">Professional note</div>
              <p className="mt-2 text-sm text-white/75">
                All opinions are provided independently and within scope of instruction and available materials.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
      <div className="text-base font-semibold">{title}</div>
      <div className="mt-2 text-sm text-white/75">{desc}</div>
    </div>
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
                  <span>Phone: (000) 000-0000</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-[#2FB7C9]">●</span>
                  <span>Email: enquiries@yourdomain.com</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-[#2FB7C9]">●</span>
                  <span>Location: Your City, State</span>
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
            © {new Date().getFullYear()} Reilly &amp; Throlstrup Medico-Legal. All rights reserved.
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
