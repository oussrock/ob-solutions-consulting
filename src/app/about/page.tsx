"use client";
import ScrollReveal from "@/components/ScrollReveal";
import StaggerChildren from "@/components/StaggerChildren";
import AnimatedCounter from "@/components/AnimatedCounter";
import { Award, CheckCircle, ArrowRight, Zap, Brain, Cpu, Shield, BarChart3, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import MeteorField from "@/components/MeteorField";
import AuroraBackground   from "@/components/AuroraBackground";
import DotMeshBackground  from "@/components/DotMeshBackground";

const competencies = [
  { icon: Brain,      title: "AI & ML Integration",       desc: "GenAI, RAG, NLU, LLMs, model training and evaluation at enterprise scale.",             color: "bg-blue-50",   icon_c: "text-blue-600"   },
  { icon: Cpu,        title: "Cloud Architecture",         desc: "Azure, AWS cloud-native, microservices, Kubernetes, distributed systems.",               color: "bg-sky-50",    icon_c: "text-sky-600"    },
  { icon: TrendingUp, title: "Program Management",         desc: "$25M+ portfolio leadership with SAFe 6, Agile and Waterfall methodologies.",              color: "bg-green-50",  icon_c: "text-green-600"  },
  { icon: BarChart3,  title: "Data Strategy & Analytics",  desc: "ETL, data governance, Databricks, Power BI, Tableau and advanced analytics platforms.", color: "bg-purple-50", icon_c: "text-purple-600" },
  { icon: Shield,     title: "Trust, Safety & Governance", desc: "Cybersecurity, ITIL V4, IoT data analytics, vehicle telematics, mission-critical ops.", color: "bg-red-50",    icon_c: "text-red-600"    },
  { icon: Users,      title: "Cross-Functional Leadership","desc": "Aligning Engineering, Data Science, Ops and executive stakeholders on a shared roadmap.", color: "bg-amber-50",  icon_c: "text-amber-600"  },
];

const experience = [
  {
    title: "AI & Data Product Manager",
    org: "Air Canada",
    period: "Jan 2021 – Present",
    highlights: [
      "Direct a multi-program AI roadmap valued at $25M+: Cargo AI, AI Fuel Optimisation, AI Revenue Management.",
      "Lead predictive model deployments aligning data architecture with global revenue and dynamic pricing strategy.",
      "Collaborate with Engineering & Data Science on Azure-based systems automating revenue forecasting.",
      "Transformed legacy processes into Agile/Scrum cycles, driving AI tool adoption across business units.",
    ],
  },
  {
    title: "IT Project Manager",
    org: "Air Canada",
    period: "Jun 2019 – Jan 2021",
    highlights: [
      "Led Air Canada's business website delivery and MuleSoft EIP integration for global Direct Connect partners.",
      "Managed IT programs with budgets exceeding $6M, leveraging Azure for governance and cost management.",
      "Orchestrated API connectivity with major aggregators, ensuring high-performance latency and bookability.",
      "Secured executive sponsorship and managed complex multi-stakeholder program lifecycles.",
    ],
  },
  {
    title: "Aircraft Software & Data Distribution Manager",
    org: "Air Canada",
    period: "Feb 2019 – Jun 2019",
    highlights: [
      "Spearheaded cybersecurity and software safety initiatives for Air Canada's entire fleet.",
      "Pioneered wireless software transfer upgrade using Teledyne solution, reducing fleet downtime.",
      "Served as SME for aircraft software — critical off-hours support and complex issue resolution.",
    ],
  },
  {
    title: "Avionics Systems Engineer",
    org: "Air Canada",
    period: "Jul 2017 – Feb 2019",
    highlights: [
      "Designed ACMS and Satcom ORT software; managed ACARS links for seamless data exchange.",
      "Led root cause analysis of in-service failures and secured financial approvals for Mandatory Airworthiness Requirements.",
    ],
  },
];

const certifications = [
  { label: "SAFe 6 Certified PO/PM",                    year: "Dec 2024" },
  { label: "ITIL Foundation V4",                         year: "Apr 2020" },
  { label: "Data Analyst — DataCamp",                    year: "Aug 2023" },
  { label: "Data Engineer — DataCamp",                   year: "Sep 2023" },
  { label: "Aircraft Certification Specialty (TC)",      year: "Jul 2020" },
  { label: "Ordre des ingénieurs du Québec (OIQ)",       year: "Jan 2017" },
  { label: "Electrical Engineering Master's — Sherbrooke", year: "Dec 2020" },
  { label: "PMP — In Progress",                          year: "2025" },
];

const kpis = [
  { value: 25, suffix: "M+", label: "AI Portfolio", prefix: "$" },
  { value: 10, suffix: "+",  label: "Years Exp.",    prefix: "" },
  { value: 6,  suffix: "M+", label: "IT Delivered",  prefix: "$" },
  { value: 8,  suffix: "+",  label: "Certifications", prefix: "" },
];

export default function AboutPage() {
  return (
    <>
      {/* ─── Hero ── */}
      <section className="hero-bg relative pt-32 pb-28 overflow-hidden">
        <MeteorField />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/85 via-[#1E3A8A]/65 to-[#0F172A]/85 pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[80px] animate-drift pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <Zap size={13} className="text-blue-300" />
              <span className="text-blue-200 text-sm font-medium">About Oussama Bousselsal, Ing.</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 max-w-3xl leading-tight">
              10 Years of Enterprise Tech.<br /><span className="grad-blue">Now Working for You.</span>
            </h1>
            <p className="text-slate-300 text-xl max-w-2xl leading-relaxed mb-10">
              Strategic Technology & Operations leader. Electrical Engineer (OIQ). SAFe 6 & ITIL V4 certified. Bilingual EN/FR. Proven at Fortune 500 scale — now bringing that firepower to ambitious organisations.
            </p>
            <StaggerChildren className="flex flex-wrap gap-4" staggerMs={80} baseDelay={200}>
              {kpis.map((k) => (
                <div key={k.label} className="bg-white/8 border border-white/15 backdrop-blur-sm rounded-xl px-6 py-4 text-center min-w-[120px]">
                  <div className="num-highlight text-3xl text-white">
                    {k.prefix}<AnimatedCounter from={0} to={k.value} suffix={k.suffix} />
                  </div>
                  <div className="text-slate-400 text-xs mt-0.5">{k.label}</div>
                </div>
              ))}
            </StaggerChildren>
          </ScrollReveal>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </section>

      {/* ─── Bio card ── */}
      <section className="relative py-20 overflow-hidden bg-white">
        <AuroraBackground blobCount={3} />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <ScrollReveal>
            <div className="card p-10 bg-white/90 backdrop-blur-sm">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 text-white font-bold text-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/25">
                  OB
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-1">Oussama Bousselsal, Ing.</h2>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="badge-blue rounded-full px-3 py-1 text-xs">AI & Data Product Manager @ Air Canada</span>
                    <span className="badge-green rounded-full px-3 py-1 text-xs">SAFe 6 Certified</span>
                    <span className="badge-amber rounded-full px-3 py-1 text-xs">ITIL V4</span>
                    <span className="badge-slate rounded-full px-3 py-1 text-xs">OIQ Engineer</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    Strategic Technology & Operations Leader with over 10 years of experience building and scaling high-performance solutions in complex, mission-critical environments. Expert in global process ideation and system architecture, with a proven track record of leading business requirements between Operations and cross-functional teams — Engineering, Data Science, and Analytics — to drive business enablement. Fluent in English & French.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Competencies ── */}
      <section className="relative py-28 overflow-hidden" style={{background:"#F0F7FF"}}>
        <DotMeshBackground />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="badge-blue rounded-full px-4 py-1.5 text-sm inline-block mb-5">Core Competencies</div>
              <h2 className="text-4xl font-bold text-slate-900 mb-3">What I Bring to the Table</h2>
            </div>
          </ScrollReveal>
          <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerMs={90}>
            {competencies.map((c) => (
              <div key={c.title} className="card-gradient p-7 group cursor-default bg-white/85 backdrop-blur-sm">
                <div className={`w-12 h-12 rounded-xl ${c.color} ${c.icon_c} flex items-center justify-center mb-5 icon-box`}>
                  <c.icon size={22} />
                </div>
                <h3 className="font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">{c.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ─── Experience timeline ── */}
      <section className="relative py-28 overflow-hidden bg-white">
        <AuroraBackground blobCount={4} />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="badge-blue rounded-full px-4 py-1.5 text-sm inline-block mb-5">Career Journey</div>
              <h2 className="text-4xl font-bold text-slate-900">Professional Experience</h2>
            </div>
          </ScrollReveal>

          <div className="relative">
            <div className="absolute left-[23px] top-3 bottom-3 w-px bg-gradient-to-b from-blue-600 via-blue-300 to-slate-200" />
            {experience.map((e, i) => (
              <ScrollReveal key={i} delay={i * 100} direction="left">
                <div className="flex gap-8 mb-10">
                  <div className="relative flex-shrink-0 z-10">
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-blue-500/25">
                      {e.period.slice(-4)}
                    </div>
                  </div>
                  <div className="card p-6 flex-1 bg-white/90 backdrop-blur-sm">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className="font-bold text-slate-900">{e.title}</h3>
                        <div className="text-blue-600 font-semibold text-sm">{e.org}</div>
                      </div>
                      <span className="badge-slate rounded-full px-3 py-1 text-xs flex-shrink-0">{e.period}</span>
                    </div>
                    <ul className="space-y-1.5">
                      {e.highlights.map((h, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                          <CheckCircle size={14} className="text-green-500 flex-shrink-0 mt-0.5" />{h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Certifications ── */}
      <section className="relative py-24 overflow-hidden" style={{background:"#F0F7FF"}}>
        <DotMeshBackground />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="badge-blue rounded-full px-4 py-1.5 text-sm inline-block mb-5">Credentials</div>
              <h2 className="text-4xl font-bold text-slate-900">Certifications & Education</h2>
            </div>
          </ScrollReveal>
          <StaggerChildren className="grid md:grid-cols-2 gap-4" staggerMs={70}>
            {certifications.map((c) => (
              <div key={c.label} className="card p-4 flex items-center gap-4 bg-white/90 backdrop-blur-sm group cursor-default">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <Award size={18} />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-slate-900 text-sm">{c.label}</div>
                </div>
                <span className="badge-slate rounded-full px-3 py-1 text-xs flex-shrink-0">{c.year}</span>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ─── CTA ── */}
      <section className="relative py-24 hero-bg overflow-hidden">
        <MeteorField />
        <div className="absolute inset-0 bg-[#0F172A]/70 pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="text-4xl font-bold text-white mb-4">Let's Work Together</h2>
            <p className="text-slate-300 mb-8 text-lg">Bring Fortune 500-grade expertise to your next technology initiative.</p>
            <Link href="/contact" className="btn-primary px-8 py-4 text-base inline-flex items-center gap-2 cursor-pointer">
              Book a Free Strategy Call <ArrowRight size={18} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
