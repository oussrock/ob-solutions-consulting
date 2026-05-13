"use client";
import ScrollReveal from "@/components/ScrollReveal";
import StaggerChildren from "@/components/StaggerChildren";
import AnimatedCounter from "@/components/AnimatedCounter";
import { Award, CheckCircle, ArrowRight, Zap, Brain, Cpu, Shield, BarChart3, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import MeteorField from "@/components/MeteorField";
import AuroraBackground   from "@/components/AuroraBackground";
import DotMeshBackground  from "@/components/DotMeshBackground";
import { useLanguage } from "@/context/LanguageContext";

const competencyIcons = [Brain, Cpu, TrendingUp, BarChart3, Shield, Users];
const competencyColors = [
  { color: "bg-blue-50",   icon_c: "text-blue-600"   },
  { color: "bg-sky-50",    icon_c: "text-sky-600"    },
  { color: "bg-green-50",  icon_c: "text-green-600"  },
  { color: "bg-purple-50", icon_c: "text-purple-600" },
  { color: "bg-red-50",    icon_c: "text-red-600"    },
  { color: "bg-amber-50",  icon_c: "text-amber-600"  },
];

const experienceOrgs = ["Air Canada", "Air Canada", "Air Canada", "Air Canada"];
const experiencePeriods = ["Jan 2021 – Present", "Jun 2019 – Jan 2021", "Feb 2019 – Jun 2019", "Jul 2017 – Feb 2019"];
const certYears = ["Dec 2024", "Apr 2020", "Aug 2023", "Sep 2023", "Jul 2020", "Jan 2017", "Dec 2020", "2025"];

const kpiValues = [
  { value: 25, suffix: "M+", prefix: "$" },
  { value: 10, suffix: "+",  prefix: "" },
  { value: 6,  suffix: "M+", prefix: "$" },
  { value: 8,  suffix: "+",  prefix: "" },
];

export default function AboutPage() {
  const { t } = useLanguage();

  const kpis = kpiValues.map((k, i) => ({ ...k, label: t(`about.kpi.${i}.label`) }));

  const competencies = competencyIcons.map((icon, i) => ({
    icon,
    ...competencyColors[i],
    title: t(`about.comp.${i}.title`),
    desc:  t(`about.comp.${i}.desc`),
  }));

  const experience = [0, 1, 2, 3].map((i) => ({
    title: t(`about.exp.${i}.title`),
    org: experienceOrgs[i],
    period: experiencePeriods[i],
    highlights: [
      t(`about.exp.${i}.h0`),
      t(`about.exp.${i}.h1`),
      ...(i < 2 ? [t(`about.exp.${i}.h2`), t(`about.exp.${i}.h3`)] : []),
    ],
  }));

  const certifications = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => ({
    label: t(`about.certs.${i}`),
    year: certYears[i],
  }));

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
              <span className="text-blue-200 text-sm font-medium">{t("about.hero.badge")}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 max-w-3xl leading-tight">
              {t("about.hero.h1a")}<br /><span className="grad-blue">{t("about.hero.h1b")}</span>
            </h1>
            <p className="text-slate-300 text-xl max-w-2xl leading-relaxed mb-10">
              {t("about.hero.sub")}
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
                    <span className="badge-blue rounded-full px-3 py-1 text-xs">{t("about.bio.badge.role")}</span>
                    <span className="badge-green rounded-full px-3 py-1 text-xs">SAFe 6 Certified</span>
                    <span className="badge-amber rounded-full px-3 py-1 text-xs">ITIL V4</span>
                    <span className="badge-slate rounded-full px-3 py-1 text-xs">OIQ Engineer</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {t("about.bio.bio")}
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
              <div className="badge-blue rounded-full px-4 py-1.5 text-sm inline-block mb-5">{t("about.comp.badge")}</div>
              <h2 className="text-4xl font-bold text-slate-900 mb-3">{t("about.comp.h2")}</h2>
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
              <div className="badge-blue rounded-full px-4 py-1.5 text-sm inline-block mb-5">{t("about.exp.badge")}</div>
              <h2 className="text-4xl font-bold text-slate-900">{t("about.exp.h2")}</h2>
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
              <div className="badge-blue rounded-full px-4 py-1.5 text-sm inline-block mb-5">{t("about.certs.badge")}</div>
              <h2 className="text-4xl font-bold text-slate-900">{t("about.certs.h2")}</h2>
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
            <h2 className="text-4xl font-bold text-white mb-4">{t("about.cta.h2")}</h2>
            <p className="text-slate-300 mb-8 text-lg">{t("about.cta.sub")}</p>
            <Link href="/contact" className="btn-primary px-8 py-4 text-base inline-flex items-center gap-2 cursor-pointer">
              {t("about.cta.btn")} <ArrowRight size={18} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
