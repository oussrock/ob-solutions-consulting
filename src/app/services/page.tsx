"use client";
import ScrollReveal from "@/components/ScrollReveal";
import StaggerChildren from "@/components/StaggerChildren";
import { Brain, Cpu, BarChart3, Shield, TrendingUp, Zap, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import MeteorField from "@/components/MeteorField";
import AuroraBackground   from "@/components/AuroraBackground";
import DotMeshBackground  from "@/components/DotMeshBackground";
import { useLanguage } from "@/context/LanguageContext";

export default function ServicesPage() {
  const { t } = useLanguage();

  const services = [
    { icon: Brain,      color: "bg-blue-50 text-blue-600",    tag: "bg-blue-50 text-blue-700 border-blue-200",
      title: t("svc.ai.title"),   price: t("svcs.ai.price"),   desc: t("svcs.ai.desc"),
      features: [t("svcs.ai.f0"), t("svcs.ai.f1"), t("svcs.ai.f2"), t("svcs.ai.f3"), t("svcs.ai.f4")] },
    { icon: Cpu,        color: "bg-sky-50 text-sky-600",      tag: "bg-sky-50 text-sky-700 border-sky-200",
      title: t("svc.cloud.title"), price: t("svcs.cloud.price"), desc: t("svcs.cloud.desc"),
      features: [t("svcs.cloud.f0"), t("svcs.cloud.f1"), t("svcs.cloud.f2"), t("svcs.cloud.f3"), t("svcs.cloud.f4")] },
    { icon: TrendingUp, color: "bg-green-50 text-green-600",  tag: "bg-green-50 text-green-700 border-green-200",
      title: t("svc.itpm.title"), price: t("svcs.itpm.price"), desc: t("svcs.itpm.desc"),
      features: [t("svcs.itpm.f0"), t("svcs.itpm.f1"), t("svcs.itpm.f2"), t("svcs.itpm.f3"), t("svcs.itpm.f4")] },
    { icon: Zap,        color: "bg-amber-50 text-amber-600",  tag: "bg-amber-50 text-amber-700 border-amber-200",
      title: t("svc.dt.title"),   price: t("svcs.dt.price"),   desc: t("svcs.dt.desc"),
      features: [t("svcs.dt.f0"), t("svcs.dt.f1"), t("svcs.dt.f2"), t("svcs.dt.f3"), t("svcs.dt.f4")] },
    { icon: BarChart3,  color: "bg-purple-50 text-purple-600", tag: "bg-purple-50 text-purple-700 border-purple-200",
      title: t("svc.da.title"),   price: t("svcs.da.price"),   desc: t("svcs.da.desc"),
      features: [t("svcs.da.f0"), t("svcs.da.f1"), t("svcs.da.f2"), t("svcs.da.f3"), t("svcs.da.f4")] },
    { icon: Shield,     color: "bg-red-50 text-red-600",      tag: "bg-red-50 text-red-700 border-red-200",
      title: t("svc.tsg.title"),  price: t("svcs.tsg.price"),  desc: t("svcs.tsg.desc"),
      features: [t("svcs.tsg.f0"), t("svcs.tsg.f1"), t("svcs.tsg.f2"), t("svcs.tsg.f3"), t("svcs.tsg.f4")] },
  ];

  const steps = [
    { n: "01", title: t("svcs.process.0.title"), desc: t("svcs.process.0.desc") },
    { n: "02", title: t("svcs.process.1.title"), desc: t("svcs.process.1.desc") },
    { n: "03", title: t("svcs.process.2.title"), desc: t("svcs.process.2.desc") },
    { n: "04", title: t("svcs.process.3.title"), desc: t("svcs.process.3.desc") },
  ];

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
              <span className="text-blue-200 text-sm font-medium">{t("svcs.hero.badge")}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 max-w-3xl leading-tight">
              {t("svcs.hero.h1a")} <span className="grad-blue">{t("svcs.hero.h1b")}</span>
            </h1>
            <p className="text-slate-300 text-xl max-w-2xl leading-relaxed">
              {t("svcs.hero.sub")}
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
                  {t("svcs.getQuote")} <ArrowRight size={14} />
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
              <div className="badge-blue rounded-full px-4 py-1.5 text-sm inline-block mb-5">{t("svcs.process.badge")}</div>
              <h2 className="text-4xl font-bold text-slate-900 mb-3">{t("svcs.process.h2")}</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">{t("svcs.process.sub")}</p>
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
            <h2 className="text-4xl font-bold text-white mb-4">{t("svcs.cta.h2")}</h2>
            <p className="text-slate-300 mb-8 text-lg">{t("svcs.cta.sub")}</p>
            <Link href="/contact" className="btn-primary px-8 py-4 text-base inline-flex items-center gap-2 cursor-pointer">
              {t("svcs.cta.btn")} <ArrowRight size={18} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
