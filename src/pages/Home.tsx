import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import Hero from '../components/Hero';
import CourseCard from '../components/CourseCard';
import Testimonials from '../components/Testimonials';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { CheckCircle2, Award, Users, BookOpen, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function Home() {
  const [ init, setInit ] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const courses = [
    {
      title: "JEE Main + Advanced",
      duration: "2 Year Integrated",
      level: "Class 11 & 12",
      features: ["Full Syllabus Coverage", "Daily Assignment Sheets", "Chapterwise Mock Tests", "Personal Mentor"],
      image: "https://images.unsplash.com/photo-1635350736475-c8cef4b21906?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Class 11 Foundation",
      duration: "1 Year Mastery",
      level: "Class 11",
      features: ["Base Building", "NCERT + Boards Focus", "Competitive Intro", "Monthly Analysis"],
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Bihar Board Topper",
      duration: "1 Year Specialized",
      level: "Class 12",
      features: ["Concept Clarity", "Previous Year Papers", "Answer Writing Skill", "100/100 Strategy"],
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <div className="relative">
      {init && (
        <Particles
          id="tsparticles"
          options={{
            background: { color: { value: "transparent" } },
            fpsLimit: 120,
            interactivity: { events: { onHover: { enable: true, mode: "repulse" } } },
            particles: {
              color: { value: "#1E3A8A" },
              links: { color: "#F59E0B", distance: 150, enable: true, opacity: 0.2, width: 1 },
              move: { enable: true, speed: 1 },
              number: { density: { enable: true }, value: 80 },
              opacity: { value: 0.15 },
              shape: { type: "circle" },
              size: { value: { min: 1, max: 3 } },
            },
            detectRetina: true,
          }}
          className="absolute inset-0 pointer-events-none z-0"
        />
      )}

      <Hero />

      {/* About Section */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
            >
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-accent/20 rounded-full z-0 blur-2xl" />
              <img 
                src="https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&q=80&w=1200" 
                alt="Mathematics Board" 
                className="rounded-3xl shadow-2xl relative z-10 w-full"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-10 -right-10 bg-primary p-8 rounded-3xl shadow-xl z-20 hidden md:block">
                <p className="text-4xl font-black text-accent mb-1">10+</p>
                <p className="text-white text-xs font-bold uppercase tracking-wider">Years Excellence</p>
              </div>
            </motion.div>

            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-primary text-white font-bold">About Us</Badge>
                <h2 className="text-4xl md:text-5xl font-black text-primary leading-tight">
                  Where Passion Meets <span className="text-accent italic">Mathematical Precision.</span>
                </h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Shaurya Math is Darbhanga's premier destination for young minds aspiring to conquer the world of Mathematics. Founded with a vision to simplify complex concepts, we bridge the gap between classroom learning and competitive success.
                </p>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Our unique teaching methodology focuses on three pillars: Concept Mastery, Logical Application, and Speed-Accuracy Balance. At Shaurya Math, we don't just teach math; we train thinkers.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: BookOpen, title: "Structured Curriculum" },
                  { icon: Users, title: "Personal Attention" },
                  { icon: Clock, title: "Practice & Mock Tests" },
                  { icon: Award, title: "Bihar Board Specialized" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 transition-colors hover:bg-slate-100">
                    <item.icon className="w-5 h-5 text-accent" />
                    <span className="font-bold text-primary text-sm">{item.title}</span>
                  </div>
                ))}
              </div>

              <Button asChild variant="link" className="group p-0 text-accent font-black text-lg hover:no-underline">
                <Link to="/contact">
                  Start Your Journey
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-primary">Explore Our Courses</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Tailored programs designed for every stage of your academic career.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {courses.map((course, i) => (
              <CourseCard key={i} {...course} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Results / Wall of Fame */}
      <section id="results" className="py-24 bg-primary text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <div className="absolute top-10 right-10 text-9xl font-black italic">WINNERS</div>
            <div className="absolute bottom-10 left-10 text-9xl font-black italic">SHAURYA</div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-black text-accent uppercase italic">Wall of Fame</h2>
              <p className="text-slate-400 text-xl font-medium">100+ Selections in Premier Institutions Last Year</p>
            </div>
            <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-primary font-bold px-8 py-6 rounded-full border-2">
                View All Results
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Rahul Kumar", detail: "AIR 127 JEE Main 2026", year: "2026" },
              { name: "Priya Jha", detail: "Bihar Board Rank 4", year: "2025" },
              { name: "Amit Raj", detail: "IIT Kanpur (EE)", year: "2024" }
            ].map((res, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md group hover:bg-white/10 transition-colors"
              >
                <div className="flex justify-between items-start mb-6">
                    <Award className="w-12 h-12 text-accent" />
                    <span className="text-slate-500 font-bold">{res.year}</span>
                </div>
                <h3 className="text-2xl font-black mb-2">{res.name}</h3>
                <p className="text-accent font-bold uppercase tracking-widest text-sm">{res.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      {/* Institute Tour Preview */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-6">
              <Badge className="bg-accent text-primary font-bold">Facility Tour</Badge>
              <h2 className="text-4xl font-black text-primary italic">Inside Shaurya Math</h2>
              <p className="text-slate-500 text-lg leading-relaxed">
                We believe that a conducive environment is key to academic success. Take a virtual tour of our institute and see our modern classrooms, resource library, and study zones.
              </p>
              <Button asChild className="bg-primary text-white font-bold px-8 py-6 rounded-2xl hover:scale-105 transition-transform">
                <Link to="/coaching-view">View Institute Gallery</Link>
              </Button>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
               <div className="space-y-4">
                  <img src="https://images.unsplash.com/photo-1523240715630-341e48f760da?auto=format&fit=crop&q=80&w=400" className="rounded-3xl shadow-lg border-4 border-white" alt="Classroom" />
                  <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400" className="rounded-3xl shadow-lg border-4 border-white" alt="Study Area" />
               </div>
               <div className="pt-12">
                  <img src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400" className="rounded-3xl shadow-lg border-4 border-white" alt="Library" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto p-12 md:p-20 rounded-[3rem] bg-gradient-to-br from-primary to-slate-900 text-white relative overflow-hidden shadow-3xl shadow-primary/30"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[100px] -mr-32 -mt-32" />
            
            <div className="relative z-10 space-y-8">
              <h2 className="text-5xl md:text-7xl font-black leading-tight italic">
                Ready to <span className="text-accent underline decoration-4 underline-offset-8">Conquer</span> Math?
              </h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Join Darbhanga's most result-oriented math coaching. Limited seats for the 2026 Batch.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
                <Button className="bg-slate-900 hover:bg-primary text-white font-black py-8 px-12 text-xl rounded-2xl group shadow-2xl shadow-slate-900/30">
                  Secure Your Seat
                  <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 py-8 px-12 text-xl rounded-2xl font-bold" asChild>
                    <Link to="/contact">Get Free Counseling</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
