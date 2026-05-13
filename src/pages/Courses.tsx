import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle2, Clock, Calendar, Users, GraduationCap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Courses() {
  const allCourses = [
    {
      id: "jee-adv",
      title: "JEE Main + Advanced (Integrated)",
      target: "Class 11 & 12 / Droppers",
      duration: "2 Years / 1 Year",
      level: "Elite",
      image: "https://images.unsplash.com/photo-1635350736475-c8cef4b21906?auto=format&fit=crop&q=80&w=800",
      description: "A high-intensity program covering everything from base NCERT to the complexity of IIT JEE Advanced problems.",
      syllabus: [
        { title: "Algebra", content: "Sets, Relations, Functions, Complex Numbers, Quadratic Equations, Progressions, Permutations & Combinations." },
        { title: "Trigonometry", content: "Trigonometric Ratios, Identity, Equations, Inverse Trigonometric Functions, Properties of Triangles." },
        { title: "Calculus", content: "Limits, Continuity, Differentiability, Integration (Definite & Indefinite), Differential Equations." },
        { title: "Coordinate Geometry", content: "Straight Lines, Circles, Parabola, Ellipse, Hyperbola, 3D Geometry." }
      ],
      fees: "₹15,000 - ₹25,000 per year"
    },
    {
      id: "class-11-foundation",
      title: "Class 11 Foundation Mastery",
      target: "Class 11 Students",
      duration: "1 Year",
      level: "Foundation",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800",
      description: "Specially designed for students starting their senior secondary journey to build an unshakeable foundation.",
      syllabus: [
        { title: "Mathematical Induction", content: "Principles and applications in proofs." },
        { title: "Conic Sections", content: "Deep dive into Circles, Ellipse, and Hyperbola basics." },
        { title: "Statistics & Probability", content: "Data interpretation and probability theory from basics to advanced." }
      ],
      fees: "₹12,000 - ₹18,000 per year"
    },
    {
      id: "bihar-board",
      title: "Class 12 Bihar Board Topper Batch",
      target: "Class 12 Students",
      duration: "1 Year",
      level: "Boards",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
      description: "Focused strictly on BSEB pattern to ensure students score 95%+ in Mathematics.",
      syllabus: [
        { title: "Matrices & Determinants", content: "Full coverage for board exams with speed tricks." },
        { title: "Vector & 3D", content: "High weightage topics with previous year paper solving." },
        { title: "LPP", content: "Linear Programming problems coverage for guaranteed marks." }
      ],
      fees: "₹8,000 - ₹12,000 per year"
    }
  ];

  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Badge className="bg-accent text-primary mb-4 p-2 px-4 text-xs font-bold uppercase tracking-widest leading-none">Our Curriculum</Badge>
            <h1 className="text-5xl md:text-7xl font-black text-primary leading-none mb-6">
                Master <span className="text-accent italic">Mathematics</span>
            </h1>
            <p className="text-xl text-slate-600">
                Choose the right path for your success. Our courses are designed by experts to maximize your potential.
            </p>
          </motion.div>
        </div>

        {/* Detailed Courses Grid */}
        <div className="space-y-32">
          {allCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-24 items-start`}
            >
              {/* Left Column: Info */}
              <div className="w-full lg:w-1/2 space-y-8">
                <div className="space-y-4">
                  <Badge className="bg-primary text-white font-bold">{course.level}</Badge>
                  <h2 className="text-4xl font-black text-primary leading-tight">{course.title}</h2>
                  <p className="text-lg text-slate-600 leading-relaxed">{course.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-6 p-6 rounded-3xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-accent" />
                        <div>
                            <p className="text-[10px] uppercase font-bold text-slate-400">Duration</p>
                            <p className="font-bold text-primary">{course.duration}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Users className="w-5 h-5 text-accent" />
                        <div>
                            <p className="text-[10px] uppercase font-bold text-slate-400">Target</p>
                            <p className="font-bold text-primary">{course.target}</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-xl font-black text-primary">Syllabus Highlights</h3>
                    <Accordion type="single" collapsible className="w-full">
                        {course.syllabus.map((item, i) => (
                            <AccordionItem key={i} value={`item-${i}`} className="border-slate-100">
                                <AccordionTrigger className="hover:no-underline font-bold text-primary py-4">
                                    {item.title}
                                </AccordionTrigger>
                                <AccordionContent className="text-slate-600 leading-relaxed">
                                    {item.content}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>

                <div className="pt-4 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase mb-1">Fee Structure (Mock)</p>
                        <p className="text-2xl font-black text-primary">{course.fees}</p>
                    </div>
                    <Button className="bg-accent text-primary font-black py-6 px-8 rounded-2xl group shadow-lg shadow-accent/20">
                        Enroll Now <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>
              </div>

              {/* Right Column: Visual */}
              <div className="w-full lg:w-1/2 relative">
                <div className="aspect-square rounded-full bg-accent/10 absolute -top-10 -right-10 w-full z-0 blur-3xl animate-pulse" />
                <div className="relative z-10 p-4 bg-white rounded-[4rem] shadow-3xl shadow-primary/10 border border-slate-100">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="rounded-[3rem] w-full h-[500px] object-cover shadow-2xl"
                      referrerPolicy="no-referrer"
                    />
                    {/* Stats Overlays */}
                    <div className="absolute top-12 -left-8 bg-white p-6 rounded-3xl shadow-xl flex items-center space-x-4">
                        <div className="bg-emerald-100 p-3 rounded-full">
                            <GraduationCap className="text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-black text-primary">100%</p>
                            <p className="text-[10px] uppercase font-bold text-slate-400 leading-none">Concept Guaranteed</p>
                        </div>
                    </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
