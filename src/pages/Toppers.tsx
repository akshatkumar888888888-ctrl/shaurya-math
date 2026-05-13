import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Badge } from '@/components/ui/badge';
import { Award, Trophy, Star, Filter } from 'lucide-react';
import { supabase, Topper } from '@/lib/supabase';

const EXAMS = ['All', 'JEE Main', 'JEE Advanced', 'Bihar Board', 'IIT'];

// Fallback static data shown when DB has no data yet
const staticToppers: Topper[] = [
  { id: '1', name: 'Rahul Kumar', achievement: 'AIR 127 JEE Main', year: '2026', exam: 'JEE Main', score: '99.2 Percentile', is_featured: true },
  { id: '2', name: 'Priya Jha', achievement: 'Bihar Board Rank 4 — 98%', year: '2025', exam: 'Bihar Board', score: '98%', is_featured: true },
  { id: '3', name: 'Amit Raj', achievement: 'IIT Kanpur (EE)', year: '2024', exam: 'JEE Advanced', score: 'CRL 340', is_featured: true },
  { id: '4', name: 'Sneha Kumari', achievement: 'AIR 892 JEE Advanced', year: '2024', exam: 'JEE Advanced', score: 'CRL 892' },
  { id: '5', name: 'Rohan Sinha', achievement: 'Bihar Board Rank 12', year: '2025', exam: 'Bihar Board', score: '97%' },
  { id: '6', name: 'Ananya Mishra', achievement: 'AIR 445 JEE Main', year: '2025', exam: 'JEE Main', score: '98.7 Percentile' },
  { id: '7', name: 'Vikash Yadav', achievement: 'IIT Patna (CS)', year: '2023', exam: 'JEE Advanced' },
  { id: '8', name: 'Pooja Devi', achievement: '100/100 in Bihar Board Maths', year: '2024', exam: 'Bihar Board', score: '100/100' },
  { id: '9', name: 'Arjun Kumar', achievement: 'AIR 210 JEE Main', year: '2026', exam: 'JEE Main', score: '99.1 Percentile' },
];

export default function Toppers() {
  const [toppers, setToppers] = useState<Topper[]>([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchToppers() {
      try {
        const { data, error } = await supabase
          .from('toppers')
          .select('*')
          .order('year', { ascending: false });
        if (error || !data || data.length === 0) {
          setToppers(staticToppers);
        } else {
          setToppers(data);
        }
      } catch {
        setToppers(staticToppers);
      } finally {
        setLoading(false);
      }
    }
    fetchToppers();
  }, []);

  const filtered = filter === 'All' ? toppers : toppers.filter(t => t.exam === filter);
  const featured = filtered.filter(t => t.is_featured);
  const rest = filtered.filter(t => !t.is_featured);

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="bg-accent text-primary font-bold mb-4 px-4 py-2 text-xs uppercase tracking-widest">Wall of Fame</Badge>
            <h1 className="text-5xl md:text-7xl font-black text-primary leading-none mb-6">
              Our <span className="text-accent italic">Toppers</span>
            </h1>
            <p className="text-xl text-slate-600">
              100+ selections in premier institutions. These are the stars who made Shaurya Math proud.
            </p>
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {[
            { label: 'JEE Selections', value: '100+', icon: Trophy },
            { label: 'Bihar Board Toppers', value: '50+', icon: Award },
            { label: 'IIT/NIT Admits', value: '30+', icon: Star },
            { label: 'Years of Results', value: '10+', icon: Award },
          ].map((stat, i) => (
            <div key={i} className="text-center p-8 rounded-3xl bg-primary text-white shadow-xl shadow-primary/20">
              <stat.icon className="w-8 h-8 text-accent mx-auto mb-3" />
              <p className="text-4xl font-black text-accent mb-1">{stat.value}</p>
              <p className="text-xs font-bold uppercase tracking-widest text-blue-200">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <Filter className="w-5 h-5 text-slate-400 self-center" />
          {EXAMS.map(exam => (
            <button
              key={exam}
              onClick={() => setFilter(exam)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${filter === exam ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {exam}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center text-slate-400 py-20 text-xl font-bold animate-pulse">Loading toppers...</div>
        ) : (
          <>
            {/* Featured Toppers */}
            {featured.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {featured.map((t, i) => (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="relative p-8 rounded-3xl bg-gradient-to-br from-primary to-slate-800 text-white shadow-2xl shadow-primary/30 overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl -mr-10 -mt-10" />
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center">
                          {t.photo_url
                            ? <img src={t.photo_url} alt={t.name} className="w-full h-full object-cover rounded-2xl" />
                            : <Trophy className="w-7 h-7 text-accent" />}
                        </div>
                        <Badge className="bg-accent text-primary font-black text-xs">{t.year}</Badge>
                      </div>
                      <h3 className="text-2xl font-black mb-1">{t.name}</h3>
                      <p className="text-accent font-bold uppercase tracking-wider text-sm mb-2">{t.achievement}</p>
                      {t.score && <p className="text-blue-200 text-xs font-medium">{t.score}</p>}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Regular Toppers Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-5 p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:border-accent/30 hover:bg-blue-50/30 transition-all group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    {t.photo_url
                      ? <img src={t.photo_url} alt={t.name} className="w-full h-full object-cover rounded-2xl" />
                      : <Award className="w-6 h-6 text-primary" />}
                  </div>
                  <div>
                    <h4 className="font-black text-primary">{t.name}</h4>
                    <p className="text-accent font-bold text-xs uppercase tracking-wider">{t.achievement}</p>
                    {t.score && <p className="text-slate-400 text-xs mt-0.5">{t.score}</p>}
                  </div>
                  <span className="ml-auto text-xs font-bold text-slate-300">{t.year}</span>
                </motion.div>
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="text-center text-slate-400 py-16 text-lg font-medium">No results found for this filter.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
