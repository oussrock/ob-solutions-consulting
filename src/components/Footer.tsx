import Link from "next/link";
import { Zap, Mail, Phone, MapPin } from "lucide-react";

const links = {
  "Services": [
    { href:"/services", label:"AI & Data Strategy" },
    { href:"/services", label:"Cloud Architecture" },
    { href:"/services", label:"IT Program Management" },
    { href:"/services", label:"Digital Transformation" },
    { href:"/services", label:"Data & Analytics" },
    { href:"/services", label:"IT Governance" },
  ],
  "Company": [
    { href:"/about",   label:"About Oussama" },
    { href:"/services",label:"Services" },
    { href:"/contact", label:"Book a Call" },
  ],
};

export default function Footer() {
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
              AI & Technology Consulting by <strong className="text-slate-300">Oussama Bousselsal, Ing.</strong>
            </p>
            <p className="text-xs text-slate-500 mb-6 max-w-xs">
              SAFe 6 PO/PM · ITIL V4 · Ordre des ingénieurs du Québec · 10+ yrs Fortune 500 delivery
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2"><Mail size={14} className="text-blue-400" /> ouss.bousselsal@gmail.com</div>
              <div className="flex items-center gap-2"><Phone size={14} className="text-blue-400" /> 819-580-0313</div>
              <div className="flex items-center gap-2"><MapPin size={14} className="text-blue-400" /> Montréal, Québec, Canada</div>
            </div>
          </div>

          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h4 className="text-white font-semibold mb-4 text-sm">{group}</h4>
              <ul className="space-y-3">
                {items.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm hover:text-white transition-colors duration-200">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <span>© {new Date().getFullYear()} OB Solutions — Oussama Bousselsal. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span className="badge-blue rounded-full px-3 py-1 text-xs font-medium">EN / FR</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
