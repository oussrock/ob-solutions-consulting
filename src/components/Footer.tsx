"use client";
import Link from "next/link";
import { Zap, Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  const serviceLinks = [
    { href: "/services", labelKey: "footer.svc.ai" },
    { href: "/services", labelKey: "footer.svc.cloud" },
    { href: "/services", labelKey: "footer.svc.itpm" },
    { href: "/services", labelKey: "footer.svc.dt" },
    { href: "/services", labelKey: "footer.svc.da" },
    { href: "/services", labelKey: "footer.svc.gov" },
  ];

  const companyLinks = [
    { href: "/about",    labelKey: "footer.company.about" },
    { href: "/services", labelKey: "footer.company.services" },
    { href: "/contact",  labelKey: "footer.company.book" },
  ];

  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
                <Zap size={18} className="text-white fill-white" />
              </div>
              <span className="font-bold text-white text-lg">OB <span className="text-blue-400">Solutions</span></span>
            </div>
            <p className="text-sm leading-relaxed mb-2 max-w-xs">
              {t("footer.tagline")} <strong className="text-slate-300">Oussama Bousselsal, Ing.</strong>
            </p>
            <p className="text-xs text-slate-500 mb-6 max-w-xs">
              {t("footer.credentials")}
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2"><Mail size={14} className="text-blue-400" /> ouss.bousselsal@gmail.com</div>
              <div className="flex items-center gap-2"><Phone size={14} className="text-blue-400" /> 819-580-0313</div>
              <div className="flex items-center gap-2"><MapPin size={14} className="text-blue-400" /> Montréal, Québec, Canada</div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">{t("footer.group.services")}</h4>
            <ul className="space-y-3">
              {serviceLinks.map((l) => (
                <li key={l.labelKey}>
                  <Link href={l.href} className="text-sm hover:text-white transition-colors duration-200">{t(l.labelKey)}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">{t("footer.group.company")}</h4>
            <ul className="space-y-3">
              {companyLinks.map((l) => (
                <li key={l.labelKey}>
                  <Link href={l.href} className="text-sm hover:text-white transition-colors duration-200">{t(l.labelKey)}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <span>© {new Date().getFullYear()} {t("footer.copyright")}</span>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-white transition-colors">{t("footer.privacy")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
