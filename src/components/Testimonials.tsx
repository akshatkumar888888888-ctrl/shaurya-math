import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Quote } from 'lucide-react';
import { supabase, Testimonial } from '@/lib/supabase';

const staticTestimonials: Testimonial[] = [
  { id: '1', quote: "Shaurya Math changed my perspective on JEE problems. The logical approach is unparalleled.", author: "Rahul Kumar", rank: "AIR 127 JEE Main 2026", is_active: true },
  { id: '2', quote: "Individual attention and doubt clearing sessions helped me top the Bihar Board Exams.", author: "Priya Singh", rank: "98% Bihar Board 2025", is_active: true },
  { id: '3', quote: "Best coaching in Darbhanga for Mathematics. Concepts are cleared from foundation level.", author: "Amit Raj", rank: "JEE Advanced Qualified", is_active: true },
  { id: '4', quote: "The weekly mock tests give a real exam-like feel. Highly recommended for JEE aspirants.", author: "Sneha Jha", rank: "12th Board Topper", is_active: true },
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(staticTestimonials);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const { data } = await supabase
          .from('testimonials')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false });
        if (data && data.length > 0) setTestimonials(data);
      } catch {
        // silently fall back to static data
      }
    }
    fetchTestimonials();
  }, []);

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-4">Student Success Stories</h2>
            <div className="w-24 h-2 bg-accent mx-auto rounded-full" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.slice(0, 4).map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <Card className="h-full bg-white border-none shadow-xl shadow-slate-200/50 rounded-3xl relative">
                <CardContent className="pt-12 pb-8 px-6">
                  <Quote className="absolute top-6 left-6 text-accent/20 w-12 h-12" />
                  <p className="text-slate-600 mb-8 italic relative z-10">"{t.quote}"</p>
                  <div className="flex items-center space-x-4">
                    {t.avatar_url
                      ? <img src={t.avatar_url} alt={t.author} className="w-12 h-12 rounded-full border-2 border-accent object-cover" />
                      : <div className="w-12 h-12 rounded-full border-2 border-accent bg-primary/10 flex items-center justify-center font-black text-primary text-lg">{t.author[0]}</div>
                    }
                    <div>
                      <h4 className="font-bold text-primary">{t.author}</h4>
                      <p className="text-xs text-accent font-bold uppercase tracking-wider">{t.rank}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
