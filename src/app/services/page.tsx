"use client";
import ScrollReveal from "@/components/ScrollReveal";
import StaggerChildren from "@/components/StaggerChildren";
import { Brain, Cpu, BarChart3, Shield, TrendingUp, Zap, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import MeteorField from "@/components/MeteorField";
import AuroraBackground   from "@/components/AuroraBackground";
import DotMeshBackground  from "@/components/DotMeshBackground";

const services = [
  { icon: Brain,      color: "bg-blue-50 text-blue-600",    tag: "bg-blue-50 text-blue-700 border-blue-200",
    title: "AI & Data Strategy", price: "From $8,000 CAD",
    desc: "From GenAI roadmaps to predictive model deployment — I help organisations design, prioritise, and execute AI initiatives that tie directly to revenue and cost outcomes.",
    features: ["GenAI & LLM architecture","RAG pipeline design","AI program management","Model training & evaluation","Data governance & ETL"] },
  { icon: Cpu,        color: "bg-sky-50 text-sky-600",      tag: "bg-sky-50 text-sky-700 border-sky-200",
    title: "Cloud Architecture", price: "From $6,000 CAD",
    desc: "Azure and AWS cloud-native design, microservices, Kubernetes, and distributed systems engineered for mission-critical reliability and scale.",
    features: ["Azure & AWS architecture","Microservices & K8s","Cloud cost optimisation","Migration strategy","Distributed systems design"] },
  { icon: TrendingUp, color: "bg-green-50 text-green-600",  tag: "bg-green-50 text-green-700 border-green-200",
    title: "IT Program Management", price: "From $5,000 CAD",
    desc: "End-to-end program delivery from $1M to $25M+ budgets using SAFe 6 Agile — with rigorous governance, executive stakeholder management, and on-time delivery.",
    features: ["SAFe 6 / Agile delivery","Executive stakeholder mgmt","Budget & risk governance","Roadmap prioritisation","OKR & KPI frameworks"] },
  { icon: Zap,        color: "bg-amber-50 text-amber-600",  tag: "bg-amber-50 text-amber-700 border-amber-200",
    title: "Digital Transformation", price: "From $7,000 CAD",
    desc: "Legacy-to-modern migrations, API integrations (MuleSoft EIP), and enterprise platform modernisation with measurable productivity and revenue outcomes.",
    features: ["MuleSoft EIP integration","Legacy system migration","API strategy","Process re-engineering","Change management"] },
  { icon: BarChart3,  color: "bg-purple-50 text-purple-600", tag: "bg-purple-50 text-purple-700 border-purple-200",
    title: "Data & Analytics Platforms", price: "From $4,500 CAD",
    desc: "Databricks, Power BI, and Tableau implementations turning raw operational data into executive dashboards, automated reporting, and BI-driven decisions.",
    features: ["Databricks implementation","Power BI / Tableau","ETL pipeline design","KPI dashboards","Data catalogue & governance"] },
  { icon: Shield,     color: "bg-red-50 text-red-600",      tag: "bg-red-50 text-red-700 border-red-200",
    title: "Trust, Safety & IT Governance", price: "From $4,000 CAD",
    desc: "Cybersecurity, ITIL V4 governance frameworks, mission-critical system reliability, and quality-assurance standards for regulated industries.",
    features: ["ITIL V4 governance","Cybersecurity frameworks","System reliability audits","IoT & telematics analytics","Compliance & risk registers"] },
];

const steps = [
  { n: "01", title: "Discovery",    desc: "30-minute free call to understand your challenges, current state, and desired outcomes." },
  { n: "02", title: "Assessment",   desc: "I audit your environment and produce a clear written assessment with prioritised recommendations." },
  { n: "03", title: "Delivery",     desc: "Hands-on execution — I work directly with your team using SAFe Agile sprints and weekly reviews." },
  { n: "04", title: "Handover",     desc: "Full knowledge transfer, documentation, and optional ongoing retainer for continued support." },
];

export default function ServicesPage() {
  return (
    <>
      {/* ─── Hero ── */}
      <section className="hero-bg relative pt-32 pb-28 overflow-hidden">
        <MeteorField />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/85 via-[#1E3A8A]/65 to-[#0F172A]/85 pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-[80px] animate-drift pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <Zap size={13} className="text-blue-300" />
              <span className="text-blue-200 text-sm font-medium">Services</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 max-w-3xl leading-tight">
              Enterprise Expertise. <span className="grad-blue">Delivered Personally.</span>
            </h1>
            <p className="text-slate-300 text-xl max-w-2xl leading-relaxed">
              Six specialised practices built on $25M+ of real program delivery. You work directly with me — not a junior team.
            </p>
          </ScrollReveal>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </section>

      {/* ─── Service cards ── */}
      <section className="relative py-28 overflow-hidden bg-white">
        <AuroraBackground blobCount={5} />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-7" staggerMs={90}>
            {services.map((s) => (
              <div key={s.title} className="card-gradient p-7 h-full flex flex-col group cursor-default bg-white/85 backdrop-blur-sm">
                <div className={`w-12 h-12 rounded-xl ${s.color} flex items-center justify-center mb-5 icon-box`}>
                  <s.icon size={22} />
                </div>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-xl text-slate-900 group-hover:text-blue-700 transition-colors">{s.title}</h3>
                  <span className={`text-xs font-semibold border rounded-full px-3 py-1 flex-shrink-0 ml-3 ${s.tag}`}>{s.price}</span>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">{s.desc}</p>
                <ul className="space-y-2 mb-6">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle size={14} className="text-green-500 flex-shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="text-blue-600 font-semibold text-sm flex items-center gap-1.5 hover:gap-3 transition-all duration-200 cursor-pointer">
                  Get a Quote <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ─── Process ── */}
      <section className="relative py-28 overflow-hidden" style={{background:"#F0F7FF"}}>
        <DotMeshBackground />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="badge-blue rounded-full px-4 py-1.5 text-sm inline-block mb-5">How I Work</div>
              <h2 className="text-4xl font-bold text-slate-900 mb-3">Simple. Transparent. Results-Driven.</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">Four clear phases with weekly communication and zero hidden surprises.</p>
            </div>
          </ScrollReveal>
          <StaggerChildren className="grid md:grid-cols-4 gap-6" staggerMs={100}>
            {steps.map((s, i) => (
              <div key={s.n} className="card p-7 text-center relative group bg-white/90 backdrop-blur-sm">
                <div className="text-6xl font-bold text-blue-100 mb-4 group-hover:text-blue-200 transition-colors">{s.n}</div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 bg-white border border-slate-200 rounded-full items-center justify-center shadow-sm">
                    <ArrowRight size={12} className="text-slate-400" />
                  </div>
                )}
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
            <h2 className="text-4xl font-bold text-white mb-4">Not Sure Which Service Fits?</h2>
            <p className="text-slate-300 mb-8 text-lg">Book a free 30-minute call. I'll assess your situation and recommend the right starting point.</p>
            <Link href="/contact" className="btn-primary px-8 py-4 text-base inline-flex items-center gap-2 cursor-pointer">
              Book Free Discovery Call <ArrowRight size={18} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
