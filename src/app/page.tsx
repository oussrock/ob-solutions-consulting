"use client";
import Link from "next/link";
import { ArrowRight, CheckCircle, Star, ChevronRight, BarChart3, Shield, Users, Cpu, TrendingUp, Award, Phone, Zap, Lock, Brain } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import StaggerChildren from "@/components/StaggerChildren";
import AnimatedCounter from "@/components/AnimatedCounter";
import MeteorField from "@/components/MeteorField";
import AuroraBackground   from "@/components/AuroraBackground";
import DotMeshBackground  from "@/components/DotMeshBackground";
import { useLanguage } from "@/context/LanguageContext";

const certifications = [
  { icon: Award,  label: "SAFe 6 PO/PM" },
  { icon: Shield, label: "ITIL Foundation V4" },
  { icon: Cpu,    label: "Azure Cloud" },
  { icon: Lock,   label: "AWS Partner" },
  { icon: Users,  label: "Ordre des ingénieurs du Québec" },
  { icon: Brain,  label: "DataCamp Certified" },
];

const logos = ["Air Canada", "Databricks", "Azure", "AWS", "MuleSoft", "Jira", "Power BI", "Tableau", "Kubernetes", "Databricks"];

const testimonials = [
  { name: "Marc Tremblay",    role: "VP Technology, Logistix",    score: 5 },
  { name: "Sarah Brennan",    role: "CTO, FinEdge Solutions",     score: 5 },
  { name: "Karim Hadj",       role: "COO, Aero Dynamics Inc.",    score: 5 },
];

export default function Home() {
  const { t } = useLanguage();

  const stats = [
    { value: 25, suffix: "M+",  label: t("home.stats.0.label"), sub: t("home.stats.0.sub") },
    { value: 10, suffix: "+",   label: t("home.stats.1.label"), sub: t("home.stats.1.sub") },
    { value: 6,  suffix: "M+",  label: t("home.stats.2.label"), sub: t("home.stats.2.sub") },
    { value: 3,  suffix: "",    label: t("home.stats.3.label"), sub: t("home.stats.3.sub") },
  ];

  const services = [
    { icon: Brain,      badge: "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",     title: t("svc.ai.title"),   desc: t("home.svc.ai.desc")   },
    { icon: Cpu,        badge: "bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white",         title: t("svc.cloud.title"), desc: t("home.svc.cloud.desc") },
    { icon: TrendingUp, badge: "bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white",   title: t("svc.itpm.title"), desc: t("home.svc.itpm.desc") },
    { icon: Zap,        badge: "bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white",   title: t("svc.dt.title"),   desc: t("home.svc.dt.desc")   },
    { icon: BarChart3,  badge: "bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white", title: t("svc.da.title"),  desc: t("home.svc.da.desc")   },
    { icon: Shield,     badge: "bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white",         title: t("svc.tsg.title"),  desc: t("home.svc.tsg.desc")  },
  ];

  const whyBullets = [
    { text: t("home.why.bullet0.text"), detail: t("home.why.bullet0.detail") },
    { text: t("home.why.bullet1.text"), detail: t("home.why.bullet1.detail") },
    { text: t("home.why.bullet2.text"), detail: t("home.why.bullet2.detail") },
    { text: t("home.why.bullet3.text"), detail: t("home.why.bullet3.detail") },
  ];

  const whyCards = [
    { icon: Brain,      label: t("home.why.card0"), sub: t("home.why.card0sub"), color: "bg-blue-50",   icon_c: "text-blue-600"  },
    { icon: TrendingUp, label: t("home.why.card1"), sub: t("home.why.card1sub"), color: "bg-green-50",  icon_c: "text-green-600" },
    { icon: Cpu,        label: t("home.why.card2"), sub: t("home.why.card2sub"), color: "bg-sky-50",    icon_c: "text-sky-600"   },
    { icon: Award,      label: t("home.why.card3"), sub: t("home.why.card3sub"), color: "bg-amber-50",  icon_c: "text-amber-600" },
  ];

  return (
    <>
      {/* ─── HERO ── */}
      <section className="hero-bg relative min-h-[100svh] flex items-center overflow-hidden">
        <MeteorField showLandscape />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/85 via-[#1E3A8A]/65 to-[#0F172A]/85 pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[100px] animate-drift pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/5 w-80 h-80 bg-blue-400/8 rounded-full blur-[80px] animate-drift pointer-events-none" style={{animationDelay:"5s"}} />

        <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-24 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="animate-fadeInUp" style={{animationDelay:"0ms"}}>
                <div className="inline-flex items-center gap-2.5 bg-white/10 border border-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-7">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse-slow" />
                  <span className="text-blue-200 text-sm font-medium">{t("home.hero.badge")}</span>
                </div>
              </div>
              <div className="animate-fadeInUp" style={{animationDelay:"80ms"}}>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.08] mb-6">
                  {t("home.hero.h1a")}<br /><span className="grad-blue">{t("home.hero.h1b")}</span>
                </h1>
              </div>
              <div className="animate-fadeInUp" style={{animationDelay:"160ms"}}>
                <p className="text-slate-300 text-lg sm:text-xl leading-relaxed mb-9 max-w-lg">
                  {t("home.hero.sub")}
                </p>
              </div>
              <div className="animate-fadeInUp flex flex-col sm:flex-row gap-4 mb-10" style={{animationDelay:"240ms"}}>
                <Link href="/contact" className="btn-primary px-7 py-3.5 text-base flex items-center justify-center gap-2 cursor-pointer">
                  {t("home.hero.cta1")} <ArrowRight size={18} />
                </Link>
                <Link href="/services" className="btn-outline px-7 py-3.5 text-base flex items-center justify-center gap-2 cursor-pointer"
                  style={{borderColor:"rgba(255,255,255,0.25)", color:"white", background:"transparent"}}>
                  {t("home.hero.cta2")} <ChevronRight size={18} />
                </Link>
              </div>
              <div className="animate-fadeInUp flex flex-wrap gap-2.5" style={{animationDelay:"320ms"}}>
                {certifications.map((c) => (
                  <div key={c.label} className="trust-badge"
                    style={{background:"rgba(255,255,255,0.08)", borderColor:"rgba(255,255,255,0.15)", color:"rgba(203,213,225,1)"}}>
                    <c.icon size={13} /> {c.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block animate-fadeInRight" style={{animationDelay:"200ms"}}>
              <div className="relative bg-white/8 backdrop-blur-2xl border border-white/12 rounded-2xl p-8 animate-float">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600/10 to-transparent pointer-events-none" />
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {stats.map((s) => (
                    <div key={s.label} className="bg-white/8 border border-white/10 rounded-xl p-5 hover:bg-white/12 transition-colors duration-300">
                      <div className="num-highlight text-3xl text-white mb-0.5">
                        <AnimatedCounter from={0} to={s.value} suffix={s.suffix} />
                      </div>
                      <div className="text-slate-300 text-sm font-medium">{s.label}</div>
                      <div className="text-slate-500 text-xs mt-0.5">{s.sub}</div>
                    </div>
                  ))}
                </div>
                <div className="bg-blue-600/25 border border-blue-400/20 rounded-xl p-4 flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0 pulse-ring">
                    <Award size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{t("home.hero.certLine1")}</div>
                    <div className="text-slate-400 text-xs mt-0.5">{t("home.hero.certLine2")}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </section>

      {/* ─── LOGOS ── */}
      <section className="relative py-10 border-b border-slate-100 overflow-hidden bg-white">
        <AuroraBackground blobCount={3} />
        <div className="relative z-10">
          <div className="text-center text-slate-400 text-xs font-semibold uppercase tracking-[0.15em] mb-6">{t("home.logos.label")}</div>
          <div className="flex overflow-hidden">
            <div className="flex gap-14 animate-marquee whitespace-nowrap select-none">
              {[...logos,...logos].map((l, i) => (
                <span key={i} className="text-slate-400 font-semibold text-sm flex-shrink-0 hover:text-slate-600 transition-colors duration-300 cursor-default">{l}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ── */}
      <section className="relative py-28 overflow-hidden bg-white">
        <AuroraBackground blobCount={5} />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto text-center mb-16">
              <div className="badge-blue rounded-full px-4 py-1.5 text-sm inline-block mb-5">{t("home.services.badge")}</div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                {t("home.services.h2a")} <span className="grad-blue">{t("home.services.h2b")}</span>
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed">
                {t("home.services.sub")}
              </p>
            </div>
          </ScrollReveal>
          <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerMs={90}>
            {services.map((s, i) => (
              <div key={i} className="card-gradient p-7 group cursor-pointer bg-white/80 backdrop-blur-sm">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 icon-box transition-all duration-300 ${s.badge}`}>
                  <s.icon size={22} />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-blue-700 transition-colors duration-200">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">{s.desc}</p>
                <div className="flex items-center gap-1.5 text-blue-600 text-sm font-semibold">
                  {t("home.services.learnMore")} <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ─── STATS ── */}
      <section className="relative py-24 hero-bg overflow-hidden">
        <MeteorField />
        <div className="absolute inset-0 bg-[#0F172A]/70 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <StaggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center" staggerMs={120}>
            {stats.map((s) => (
              <div key={s.label} className="group">
                <div className="num-highlight text-5xl md:text-6xl text-white mb-2 transition-transform duration-300 group-hover:scale-105">
                  $<AnimatedCounter from={0} to={s.value} suffix={s.suffix} />
                </div>
                <div className="text-blue-200 font-semibold mb-1">{s.label}</div>
                <div className="text-blue-300/60 text-xs">{s.sub}</div>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ─── WHY ME ── */}
      <section className="relative py-28 overflow-hidden" style={{background:"#F0F7FF"}}>
        <DotMeshBackground />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <ScrollReveal direction="left">
              <div className="badge-blue rounded-full px-4 py-1.5 text-sm inline-block mb-5">{t("home.why.badge")}</div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 line-accent">
                {t("home.why.h2a")} <span className="grad-blue">{t("home.why.h2b")}</span>
              </h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                {t("home.why.sub")}
              </p>
              <div className="space-y-4 mb-8">
                {whyBullets.map((item, i) => (
                  <div key={i} className="flex items-start gap-3.5 group">
                    <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200" />
                    <div>
                      <div className="text-slate-800 font-medium text-sm">{item.text}</div>
                      <div className="text-slate-400 text-xs mt-0.5">{item.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/about" className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-sm cursor-pointer">
                {t("home.why.cta")} <ArrowRight size={16} />
              </Link>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={120}>
              <StaggerChildren className="grid grid-cols-2 gap-4" staggerMs={80}>
                {whyCards.map((itm) => (
                  <div key={itm.label} className="card p-7 text-center group cursor-default bg-white/90 backdrop-blur-sm">
                    <div className={`w-14 h-14 rounded-2xl ${itm.color} ${itm.icon_c} flex items-center justify-center mx-auto mb-4 icon-box`}>
                      <itm.icon size={24} />
                    </div>
                    <div className="font-bold text-slate-900 text-sm mb-1">{itm.label}</div>
                    <div className="text-slate-400 text-xs">{itm.sub}</div>
                  </div>
                ))}
              </StaggerChildren>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── CERTIFICATIONS ── */}
      <section className="relative py-16 overflow-hidden border-y border-blue-100" style={{background:"#EFF6FF"}}>
        <DotMeshBackground />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-10">
              <div className="text-slate-500 text-sm font-semibold uppercase tracking-widest">{t("home.certs.label")}</div>
            </div>
            <StaggerChildren className="flex flex-wrap justify-center gap-3" staggerMs={60}>
              {certifications.map((c) => (
                <div key={c.label} className="trust-badge bg-white/90 backdrop-blur-sm">
                  <c.icon size={14} /> {c.label}
                </div>
              ))}
            </StaggerChildren>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── TESTIMONIALS ── */}
      <section className="relative py-28 overflow-hidden bg-white">
        <AuroraBackground blobCount={4} />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="badge-blue rounded-full px-4 py-1.5 text-sm inline-block mb-5">{t("home.testimonials.badge")}</div>
              <h2 className="text-4xl font-bold text-slate-900 mb-3">{t("home.testimonials.h2")}</h2>
              <p className="text-slate-500">{t("home.testimonials.sub")}</p>
            </div>
          </ScrollReveal>
          <StaggerChildren className="grid md:grid-cols-3 gap-6" staggerMs={100}>
            {testimonials.map((testimonial, i) => (
              <div key={i} className="card p-7 group cursor-default bg-white/85 backdrop-blur-sm">
                <div className="flex gap-0.5 mb-5">
                  {Array(testimonial.score).fill(0).map((_,j) => <Star key={j} size={14} className="fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 group-hover:text-slate-700 transition-colors">
                  &ldquo;{t(`home.testimonials.${i}.text`)}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">{testimonial.name}</div>
                    <div className="text-slate-400 text-xs">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ─── CTA ── */}
      <section className="relative py-24 hero-bg overflow-hidden">
        <MeteorField />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/85 via-[#1E3A8A]/65 to-[#0F172A]/85 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <Phone size={13} className="text-blue-300" />
              <span className="text-blue-200 text-sm font-medium">{t("home.cta.badge")}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{t("home.cta.h2")}</h2>
            <p className="text-slate-300 text-lg mb-9 max-w-xl mx-auto">{t("home.cta.sub")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary px-8 py-4 text-base inline-flex items-center gap-2 justify-center cursor-pointer">
                <Phone size={18} /> {t("home.cta.btn1")}
              </Link>
              <Link href="/services"
                className="px-8 py-4 text-base font-semibold text-white border border-white/25 rounded-xl hover:bg-white/10 transition-all duration-200 inline-flex items-center gap-2 justify-center cursor-pointer hover:-translate-y-0.5">
                {t("home.cta.btn2")} <ChevronRight size={18} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
