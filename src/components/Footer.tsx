import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

const INSTAGRAM = 'https://instagram.com/shauryamath.darbhanga';
const PHONE = '+91-7667656723';
const WA_LINK = 'https://wa.me/917667656723';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src="/sirlogo.jpeg" alt="Shaurya Math Logo" className="h-12 w-12 object-contain rounded-lg" />
              <div>
                <h1 className="text-xl font-bold tracking-tight leading-none uppercase text-primary">SHAURYA MATH</h1>
                <p className="text-[10px] text-slate-400 tracking-[0.2em] uppercase mt-1">Institute for Excellence</p>
              </div>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              Leading coaching institute in Darbhanga dedicated to empowering students for JEE, Boards, and beyond. <em>Shaurya se Safalta!</em>
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-blue-50 transition-all">
                <Facebook size={18} />
              </a>
              <a href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 hover:text-pink-600 hover:bg-pink-50 transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" aria-label="YouTube" className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all">
                <Youtube size={18} />
              </a>
              <a href={WA_LINK} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 hover:text-[#25D366] hover:bg-emerald-50 transition-all">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-primary font-black mb-6 text-xs uppercase tracking-[0.2em]">Quick Links</h4>
            <ul className="space-y-3 text-sm font-semibold">
              {[
                { label: 'Home', to: '/' },
                { label: 'Courses', to: '/courses' },
                { label: 'Toppers / Results', to: '/toppers' },
                { label: 'Admissions', to: '/admissions' },
                { label: 'Coaching View', to: '/coaching-view' },
                { label: 'Contact Us', to: '/contact' },
              ].map(l => (
                <li key={l.to}><Link to={l.to} className="text-slate-500 hover:text-primary transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-primary font-black mb-6 text-xs uppercase tracking-[0.2em]">Our Programs</h4>
            <ul className="space-y-3 text-sm font-semibold">
              {['JEE Main + Advanced', 'Class 11 Foundation', 'Class 12 Boards (BSEB)', 'Crash Courses'].map(p => (
                <li key={p}><Link to="/courses" className="text-slate-500 hover:text-primary transition-colors">{p}</Link></li>
              ))}
            </ul>
            <div className="mt-8 p-4 rounded-2xl bg-gradient-to-br from-pink-50 to-purple-50 border border-pink-100">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Follow Us</p>
              <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-pink-600 font-black text-sm hover:text-pink-700 transition-colors">
                <Instagram size={16} />
                @shauryamath.darbhanga
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-primary font-black mb-6 text-xs uppercase tracking-[0.2em]">Visit Us</h4>
            <ul className="space-y-6 text-sm font-medium">
              <li className="flex items-start space-x-4">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-1" />
                <span className="text-slate-500">
                  Bhatiyarisarai, Bhikha Mazar ke saamne wali gali mein,{' '}
                  <span className="font-bold text-primary italic">Darbhanga, Bihar</span>
                </span>
              </li>
              <li className="flex items-center space-x-4">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <a href={WA_LINK} target="_blank" rel="noreferrer" className="text-primary font-black italic underline underline-offset-4 decoration-accent hover:text-accent transition-colors">
                  {PHONE}
                </a>
              </li>
              <li className="flex items-center space-x-4">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <a href="mailto:shauryamath@gmail.com" className="text-slate-500 hover:text-primary transition-colors">
                  shauryamath@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center py-8 border-t border-slate-100 gap-4">
          <div className="flex flex-wrap gap-6 items-center justify-center md:justify-start">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bihar Board Toppers 2025</span>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Doubt Clearing 24/7</span>
            <Link to="/admin" className="text-[10px] font-bold text-slate-300 hover:text-slate-400 transition-colors uppercase tracking-widest">Admin</Link>
          </div>
          <p className="text-[10px] text-slate-400 font-black tracking-[0.2em] uppercase">
            &copy; {new Date().getFullYear()} Shaurya Math. Empowering Future Leaders.
          </p>
        </div>
      </div>
    </footer>
  );
}