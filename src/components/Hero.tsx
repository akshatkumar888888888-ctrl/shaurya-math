import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { ChevronRight, ArrowDown, Users, BookOpen } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered text entrance
      gsap.from('.hero-content > *', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center pt-32 pb-16 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-4 relative z-20">
        <div className="relative bg-white border border-slate-200 rounded-[3rem] p-10 md:p-20 flex-1 flex flex-col justify-center overflow-hidden shadow-2xl shadow-slate-200/50">
          {/* Decorative Blobs */}
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-blue-50 rounded-full opacity-50 blur-3xl" />
          <div className="absolute -left-10 bottom-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
          
          <div className="max-w-3xl hero-content relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-block py-1 px-4 mb-8 rounded-full bg-blue-100 border border-blue-200"
            >
              <span className="text-primary text-[10px] font-black uppercase tracking-[0.2em] leading-none">
                Leading Coaching in Darbhanga
              </span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tight">
              Redefining Mathematics <br />
              with <span className="text-primary italic">Strategic Mentorship.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-500 mb-12 max-w-2xl leading-relaxed font-medium">
              Shaurya Math is more than just a coaching institute; it's a mentorship journey designed by expert educators to transform potential into performance in the heart of Darbhanga.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 mb-16">
              <Button asChild className="bg-slate-900 hover:bg-primary text-white font-black py-8 px-12 text-lg rounded-2xl group shadow-xl shadow-slate-900/20">
                <Link to="/admissions">
                  Enroll Now
                  <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-slate-300 text-slate-800 hover:bg-slate-100 font-bold py-8 px-12 text-lg rounded-2xl">
                <Link to="/courses">Our Methodology</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <BookOpen className="text-primary w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-black text-primary uppercase text-[10px] tracking-widest">The Mission</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      Bridging the gap between theory and competitive excellence in North Bihar.
                  </p>
                </div>
              </div>

              <Link to="/founder" className="flex items-center gap-6 p-6 bg-blue-50/50 rounded-3xl border border-blue-100 hover:bg-blue-100/50 transition-colors group">
                <div className="w-16 h-16 rounded-2xl bg-slate-200 overflow-hidden shrink-0 border-2 border-white shadow-sm group-hover:scale-105 transition-transform">
                  <img src="https://i.pravatar.cc/100?img=68" alt="Founder" className="w-full h-full object-cover" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-black text-primary uppercase text-[10px] tracking-widest">Founder's Note</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      "Excellence is not a skill, it's an attitude. We build that attitude here."
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}