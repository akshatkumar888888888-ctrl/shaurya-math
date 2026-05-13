import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => setIsOpen(false), [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'Toppers', path: '/toppers' },
    { name: 'Admissions', path: '/admissions' },
    { name: 'Coaching View', path: '/coaching-view' },
    { name: 'Founder', path: '/founder' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-primary shadow-lg py-3' : 'bg-primary/95 md:bg-transparent py-4'
      )}
    >
      <div className="container mx-auto px-4 flex items-center relative h-full">
        {/* Mobile Toggle */}
        <div className="md:hidden absolute left-4 inset-y-0 z-50 flex flex-col justify-center items-center">
          <button
            className="text-slate-900 bg-white/30 p-1.5 rounded-lg hover:bg-white/50 transition-colors shadow-sm"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          {!isOpen && (
            <span className="text-[8px] text-slate-900 font-bold uppercase tracking-tight mt-0.5 whitespace-nowrap">Menu</span>
          )}
        </div>

        {/* Logo */}
        <div className="flex-1 flex justify-center">
          <Link to="/" className="flex items-center space-x-3 group">
            <img src="/sirlogo.jpeg" alt="Shaurya Math Logo" className="h-10 w-10 object-contain rounded-lg" />
            <div className="text-center md:text-left">
              <h1 className="text-lg md:text-xl font-bold tracking-tight leading-none uppercase text-white">SHAURYA MATH</h1>
              <p className="text-[9px] md:text-[10px] text-blue-200 tracking-[0.2em] uppercase mt-1">Institute for Excellence</p>
            </div>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 absolute right-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                'text-xs font-semibold transition-colors hover:text-accent tracking-wide',
                location.pathname === link.path ? 'text-accent' : 'text-blue-100'
              )}
            >
              {link.name}
            </Link>
          ))}
          <Button asChild className="bg-accent text-primary hover:bg-accent/90 transition-colors rounded-full px-5 font-black text-xs uppercase tracking-widest shadow-md">
            <a href="https://wa.me/840903063" target="_blank" rel="noreferrer">
              ENROLL NOW
            </a>
          </Button>
        </nav>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b shadow-xl"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'text-base font-semibold py-3 px-4 rounded-2xl transition-colors',
                    location.pathname === link.path
                      ? 'text-primary bg-blue-50 font-black'
                      : 'text-slate-700 hover:bg-slate-50'
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 flex gap-3">
                <Button asChild className="bg-primary text-white flex-1 py-6 text-base rounded-2xl font-black">
                  <a href="https://wa.me/917667656723" target="_blank" rel="noreferrer">
                    <Phone className="w-5 h-5 mr-2" />
                    WhatsApp Us
                  </a>
                </Button>
                <Button asChild className="bg-accent text-primary flex-1 py-6 text-base rounded-2xl font-black">
                  <Link to="/admissions">Enroll Now</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
