import { motion } from 'motion/react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, Users, Lightbulb, ShieldCheck } from 'lucide-react';

const galleryImages = [
  {
    url: "https://images.unsplash.com/photo-1523240715630-341e48f760da?auto=format&fit=crop&q=80&w=800",
    title: "Modern Classrooms",
    desc: "Spacious and well-lit learning environments."
  },
  {
    url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800",
    title: "Resource Library",
    desc: "Access to premium books and study materials."
  },
  {
    url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
    title: "Doubt Clearing Zone",
    desc: "Dedicated area for one-on-one student support."
  },
  {
    url: "https://images.unsplash.com/photo-1524178232363-1fb28f74b0cd?auto=format&fit=crop&q=80&w=800",
    title: "Digital Learning",
    desc: "Smart boards and interactive teaching tools."
  },
  {
    url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800",
    title: "Group Study Hub",
    desc: "Encouraging collaborative learning among peers."
  },
  {
    url: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800",
    title: "Success Wall",
    desc: "Inspiration from our past achievers."
  }
];

export default function CoachingView() {
  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge className="bg-primary text-white mb-4 p-2 px-4 text-xs font-bold uppercase tracking-widest leading-none">Institute Tour</Badge>
            <h1 className="text-5xl md:text-7xl font-black text-primary leading-none mb-6">
                Coaching <span className="text-accent italic">View.</span>
            </h1>
            <p className="text-xl text-slate-600">
                Take a look at where the magic happens. Our facilities are designed to foster focus and academic excellence.
            </p>
          </motion.div>
        </div>

        {/* Features Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
          {[
            { icon: Users, title: "Small Batches", desc: "Max 30 students per class" },
            { icon: Lightbulb, title: "Smart Classes", desc: "Interactive teaching tools" },
            { icon: ShieldCheck, title: "Safe Environment", desc: "Secure & focused atmosphere" },
            { icon: Camera, title: "CCTV Support", desc: "Constant safety monitoring" }
          ].map((item, i) => (
            <div key={i} className="text-center space-y-3 p-6 rounded-3xl bg-white shadow-sm border border-slate-100">
               <div className="w-12 h-12 bg-blue-50 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon size={24} />
               </div>
               <h3 className="font-bold text-primary">{item.title}</h3>
               <p className="text-sm text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages.map((image, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="overflow-hidden border-none shadow-xl shadow-slate-200/50 rounded-[2.5rem]">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={image.url} 
                    alt={image.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <h3 className="text-white text-xl font-bold">{image.title}</h3>
                    <p className="text-blue-100 text-sm mt-1">{image.desc}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
