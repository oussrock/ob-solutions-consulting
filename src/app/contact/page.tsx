"use client";
import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import StaggerChildren from "@/components/StaggerChildren";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Zap, ExternalLink } from "lucide-react";
import MeteorField from "@/components/MeteorField";
import AuroraBackground  from "@/components/AuroraBackground";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactPage() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name:"", email:"", company:"", service:"", message:"" });

  const info = [
    { icon: Mail,    label: t("contact.info.0.label"), value: "ouss.bousselsal@gmail.com",   sub: t("contact.info.0.sub") },
    { icon: Phone,   label: t("contact.info.1.label"), value: "819-580-0313",                sub: t("contact.info.1.sub") },
    { icon: MapPin,  label: t("contact.info.2.label"), value: "Montréal, Québec, Canada",    sub: t("contact.info.2.sub") },
    { icon: Clock,   label: t("contact.info.3.label"), value: "Bilingual EN / FR",           sub: t("contact.info.3.sub") },
  ];

  const serviceOptions = [
    { value: "AI & Data Strategy",            label: t("contact.svc.ai") },
    { value: "Cloud Architecture",            label: t("contact.svc.cloud") },
    { value: "IT Program Management",         label: t("contact.svc.itpm") },
    { value: "Digital Transformation",        label: t("contact.svc.dt") },
    { value: "Data & Analytics Platforms",    label: t("contact.svc.da") },
    { value: "Trust, Safety & IT Governance", label: t("contact.svc.tsg") },
    { value: "Other / Not Sure",              label: t("contact.svc.other") },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Send failed");
      setSubmitted(true);
    } catch {
      setError(t("contact.form.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ─── Hero ── */}
      <section className="hero-bg relative pt-32 pb-28 overflow-hidden">
        <MeteorField />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/85 via-[#1E3A8A]/65 to-[#0F172A]/85 pointer-events-none" />
        <div className="absolute top-1/4 right-1/3 w-72 h-72 bg-blue-500/10 rounded-full blur-[80px] animate-drift pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <Zap size={13} className="text-blue-300" />
              <span className="text-blue-200 text-sm font-medium">{t("contact.hero.badge")}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 max-w-3xl leading-tight">
              {t("contact.hero.h1a")} <span className="grad-blue">{t("contact.hero.h1b")}</span>
            </h1>
            <p className="text-slate-300 text-xl max-w-xl leading-relaxed">
              {t("contact.hero.sub")}
            </p>
          </ScrollReveal>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </section>

      {/* ─── Form + Info ── */}
      <section className="relative py-28 overflow-hidden bg-white">
        <AuroraBackground blobCount={5} />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-14">

            {/* Left info */}
            <div className="lg:col-span-2">
              <ScrollReveal direction="left">
                <h2 className="text-2xl font-bold text-slate-900 mb-2 line-accent">{t("contact.left.h2")}</h2>
                <p className="text-slate-500 mb-8 leading-relaxed mt-4">
                  {t("contact.left.sub")}
                </p>

                <StaggerChildren className="space-y-4" staggerMs={80}>
                  {info.map((i) => (
                    <div key={i.label} className="card p-4 flex items-start gap-4 group cursor-default bg-white/85 backdrop-blur-sm">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 icon-box">
                        <i.icon size={17} />
                      </div>
                      <div>
                        <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-0.5">{i.label}</div>
                        <div className="text-slate-800 font-semibold text-sm">{i.value}</div>
                        <div className="text-slate-400 text-xs mt-0.5">{i.sub}</div>
                      </div>
                    </div>
                  ))}
                </StaggerChildren>

                <a href="https://www.linkedin.com/in/oussb/" target="_blank" rel="noopener noreferrer"
                  className="mt-5 card p-4 flex items-center gap-4 group cursor-pointer bg-white/85 backdrop-blur-sm hover:border-blue-300 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    <ExternalLink size={17} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-0.5">{t("contact.linkedin.label")}</div>
                    <div className="text-slate-800 font-semibold text-sm">Oussama Bousselsal</div>
                    <div className="text-slate-400 text-xs mt-0.5">{t("contact.linkedin.sub")}</div>
                  </div>
                </a>

                <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-blue-700 to-blue-900 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
                  <div className="relative">
                    <div className="text-white font-bold text-lg mb-2">{t("contact.strategy.title")}</div>
                    <p className="text-blue-100 text-sm leading-relaxed mb-4">{t("contact.strategy.body")}</p>
                    <div className="flex items-center gap-2 text-blue-200 text-xs">
                      <CheckCircle size={13} className="text-green-400" /> {t("contact.strategy.reply")}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <ScrollReveal direction="right" delay={100}>
                {submitted ? (
                  <div className="card p-14 text-center bg-white/90 backdrop-blur-sm">
                    <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle size={40} className="text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{t("contact.success.h3")}</h3>
                    <p className="text-slate-500 text-lg">{t("contact.success.sub")}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="card p-8 space-y-5 bg-white/90 backdrop-blur-sm">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{t("contact.form.title")}</h3>
                    <p className="text-slate-500 text-sm mb-4">{t("contact.form.sub")}</p>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t("contact.form.nameLabel")}</label>
                        <input required type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all duration-200"
                          placeholder={t("contact.form.namePH")} />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t("contact.form.emailLabel")}</label>
                        <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all duration-200"
                          placeholder={t("contact.form.emailPH")} />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t("contact.form.orgLabel")}</label>
                        <input type="text" value={form.company} onChange={e => setForm({...form, company: e.target.value})}
                          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all duration-200"
                          placeholder={t("contact.form.orgPH")} />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t("contact.form.serviceLabel")}</label>
                        <select value={form.service} onChange={e => setForm({...form, service: e.target.value})}
                          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all duration-200">
                          <option value="">{t("contact.form.servicePH")}</option>
                          {serviceOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t("contact.form.msgLabel")}</label>
                      <textarea required rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all duration-200 resize-none"
                        placeholder={t("contact.form.msgPH")} />
                    </div>

                    <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed">
                      <Send size={16} /> {loading ? t("contact.form.sending") : t("contact.form.submit")}
                    </button>
                    {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                    <p className="text-xs text-center text-slate-400">{t("contact.form.privacy")}</p>
                  </form>
                )}
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
