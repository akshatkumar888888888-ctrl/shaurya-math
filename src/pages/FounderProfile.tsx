import { motion } from 'motion/react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Award, BookOpen, GraduationCap, Briefcase, Star, Quote, Camera } from 'lucide-react';

export default function FounderProfile() {
  const achievementPhotos = [
    {
      url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
      title: "Best Educator Award",
      desc: "Recognized for excellence in mathematics education."
    },
    {
      url: "https://images.unsplash.com/photo-1523240715630-341e48f760da?auto=format&fit=crop&q=80&w=800",
      title: "Convocation Ceremony",
      desc: "A moment of pride with our JEE achievers."
    },
    {
      url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
      title: "Seminar on Pedagogy",
      desc: "Sharing innovative math teaching techniques."
    }
  ];

  const experiences = [
    {
      year: "2015 - Present",
      title: "Founder & Head of Mathematics",
      org: "Shaurya Math, Darbhanga",
      desc: "Architected a unique pedagogy that has produced over 500+ successful JEE and Board results."
    },
    {
      year: "2010 - 2015",
      title: "Senior Math Faculty",
      org: "Leading National Institute",
      desc: "Mentored top 100 rankers in JEE Advanced and developed integrated curriculum modules."
    },
    {
      year: "2008 - 2010",
      title: "Assistant Professor",
      org: "Engineering Research Cell",
      desc: "Specialized in Applied Mathematics and Stochastic Processes."
    }
  ];

  const achievements = [
    "Published 5+ Research Papers in International Math Journals",
    "Awarded 'Best Educator of Bihar' by Education Council (2022)",
    "Authored 'Mastering JEE Calculus' - A recommended textbook",
    "Personalized mentorship resulted in 98% success rate in BSEB Board Exams",
    "Guest Speaker at National Math Symposium 2021"
  ];

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        {/* Intro Section */}
        <div className="flex flex-col md:flex-row gap-16 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1"
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-accent/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-full max-w-sm mx-auto aspect-square rounded-[3rem] overflow-hidden border-8 border-slate-50 shadow-2xl">
                <img 
                  src="https://i.pravatar.cc/600?img=68" 
                  alt="Founder" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-primary text-white p-6 rounded-3xl shadow-xl">
                 <p className="text-3xl font-black italic">15+</p>
                 <p className="text-[10px] font-bold uppercase tracking-tighter">Years Expo</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 space-y-8"
          >
            <div className="space-y-4">
              <Badge className="bg-blue-100 text-primary font-black uppercase tracking-widest px-4 py-2">The Visionary</Badge>
              <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-none">
                 Meet Our <br />
                 <span className="text-primary italic">Founder.</span>
              </h1>
            </div>
            
            <p className="text-lg text-slate-600 leading-relaxed font-medium">
               "My goal was never just to teach formulas, but to build the logic that makes formulas unnecessary. At Shaurya Math, we don't just solve problems; we build problem solvers."
            </p>

            <div className="flex gap-4 items-center p-6 bg-slate-50 rounded-3xl border border-slate-100 italic">
               <Quote className="text-accent shrink-0" size={32} />
               <p className="text-sm font-bold text-slate-500">Dedicated to transforming the educational landscape of North Bihar, one student at a time.</p>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Experience Column */}
          <div className="space-y-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white">
                <Briefcase size={24} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Professional Journey</h2>
            </div>

            <div className="space-y-8 border-l-2 border-slate-100 ml-6 pl-8">
              {experiences.map((exp, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-sm" />
                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-accent uppercase tracking-widest">{exp.year}</span>
                    <h3 className="text-xl font-bold text-slate-900">{exp.title}</h3>
                    <p className="text-sm font-bold text-primary">{exp.org}</p>
                    <p className="text-sm text-slate-500 leading-relaxed">{exp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements Column */}
          <div className="space-y-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center text-primary">
                <Award size={24} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Recognitions</h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
               {achievements.map((ach, i) => (
                 <Card key={i} className="border-none bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-300 rounded-[2rem] group">
                    <CardContent className="p-6 flex items-start gap-4">
                       <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                          <Star className="text-accent" size={16} fill="currentColor" />
                       </div>
                       <p className="text-sm font-semibold text-slate-700 leading-relaxed">{ach}</p>
                    </CardContent>
                 </Card>
               ))}
            </div>

            <div className="p-10 rounded-[3rem] bg-primary text-white space-y-6 relative overflow-hidden">
               <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
               <div className="flex items-center gap-4">
                  <GraduationCap size={32} className="text-accent" />
                  <h4 className="text-xl font-bold uppercase tracking-widest">Education</h4>
               </div>
               <div className="space-y-2">
                  <p className="font-bold border-l-2 border-accent pl-4">M.Sc. in Mathematics (Gold Medalist)</p>
                  <p className="font-bold border-l-2 border-accent pl-4">B.Tech (NIT Alumnus)</p>
               </div>
            </div>
          </div>
        </div>

        {/* Achievement Gallery Section */}
        <div className="mt-24 space-y-12">
          <div className="text-center space-y-4">
             <div className="w-12 h-12 bg-accent/20 text-accent rounded-2xl flex items-center justify-center mx-auto">
                <Camera size={24} />
             </div>
             <h2 className="text-4xl font-black text-slate-900 uppercase italic">Moments of Pride</h2>
             <p className="text-slate-500 max-w-2xl mx-auto">A glimpse into the awards, ceremonies, and the legacy of success built over the years.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {achievementPhotos.map((photo, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                   <Card className="overflow-hidden border-none shadow-2xl shadow-slate-200/50 rounded-[2.5rem] group">
                      <div className="relative h-72">
                         <img 
                           src={photo.url} 
                           alt={photo.title} 
                           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                           referrerPolicy="no-referrer"
                         />
                         <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                         <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                            <h3 className="text-white text-xl font-bold">{photo.title}</h3>
                            <p className="text-blue-100 text-sm mt-1">{photo.desc}</p>
                         </div>
                      </div>
                   </Card>
                </motion.div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}
