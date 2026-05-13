import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Phone, Mail, MapPin, Send, MessageSquare, Clock, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    course: 'JEE Main + Advanced',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from('inquiries').insert([{
        name: form.name,
        phone: form.phone,
        email: form.email || null,
        course: form.course,
        message: form.message,
        status: 'new',
      }]);
      if (error) throw error;
      toast.success('Message received! We will contact you shortly on WhatsApp.');
      setForm({ name: '', phone: '', email: '', course: 'JEE Main + Advanced', message: '' });
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Please try WhatsApp directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl md:text-7xl font-black text-primary leading-none mb-6">
              Get in <span className="text-accent italic">Touch.</span>
            </h1>
            <p className="text-xl text-slate-600">
              Have questions about our batches or enrollment? Visit us or drop a message!
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: Phone, title: 'Phone/WhatsApp', detail: '+91-7667656723', color: 'bg-emerald-100 text-emerald-600', href: 'https://wa.me/917667656723' },
                { icon: Mail, title: 'Email Address', detail: 'shauryamath@gmail.com', color: 'bg-blue-100 text-blue-600', href: 'mailto:shauryamath@gmail.com' },
                { icon: Clock, title: 'Office Hours', detail: '7:00 AM – 8:00 PM', color: 'bg-orange-100 text-orange-600', href: undefined },
                { icon: MessageSquare, title: 'Live Chat', detail: 'Online 24/7', color: 'bg-purple-100 text-purple-600', href: undefined },
              ].map((item, i) => (
                <Card key={i} className="border-none shadow-xl shadow-slate-200/50 rounded-3xl group hover:scale-105 transition-all">
                  <CardContent className="p-8 space-y-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.color}`}>
                      <item.icon size={24} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-bold text-primary">{item.title}</h3>
                      {item.href
                        ? <a href={item.href} className="text-slate-500 text-sm font-medium hover:text-accent transition-colors">{item.detail}</a>
                        : <p className="text-slate-500 text-sm font-medium">{item.detail}</p>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-none shadow-xl shadow-slate-200/50 rounded-3xl overflow-hidden bg-primary text-white">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start space-x-4 text-accent">
                  <MapPin size={32} />
                  <div>
                    <h3 className="text-2xl font-black text-white italic underline underline-offset-8 decoration-accent">Our Location</h3>
                    <p className="mt-4 text-slate-300 font-medium leading-relaxed">
                      Shaurya Math Coaching Institute,<br />
                      Bhatiyarisarai, Bhikha Mazar ke saamne wali gali mein,<br />
                      Darbhanga, Bihar 846004
                    </p>
                  </div>
                </div>
                <div className="w-full h-64 rounded-2xl overflow-hidden grayscale contrast-125 opacity-80 mt-6 border-4 border-white/10">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14349.569472658814!2d85.8943!3d26.1554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39edbe0000000001%3A0x0000000000000000!2sDarbhanga!5e0!3m2!1sen!2sin!4v1713430000000!5m2!1sen!2sin"
                    width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <Card className="border-none shadow-2xl shadow-slate-300/50 rounded-[3rem] p-4 md:p-12 bg-white sticky top-32">
              <CardContent className="space-y-8">
                <div className="space-y-2">
                  <h2 className="text-4xl font-black text-primary">Inquiry Form</h2>
                  <p className="text-slate-500 font-medium">Send us a message and we'll reach out within 24 hours.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="name" className="font-bold text-primary ml-1">Your Name *</Label>
                      <Input id="name" value={form.name} onChange={handleChange} placeholder="Rahul Kumar" className="py-7 rounded-2xl border-slate-200" required />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="phone" className="font-bold text-primary ml-1">Phone Number *</Label>
                      <Input id="phone" value={form.phone} onChange={handleChange} placeholder="+91-XXXXXXXXXX" className="py-7 rounded-2xl border-slate-200" required />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="email" className="font-bold text-primary ml-1">Email (optional)</Label>
                    <Input id="email" type="email" value={form.email} onChange={handleChange} placeholder="you@email.com" className="py-7 rounded-2xl border-slate-200" />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="course" className="font-bold text-primary ml-1">Interested Course</Label>
                    <select id="course" value={form.course} onChange={handleChange} className="w-full p-4 rounded-2xl border-2 border-slate-100 font-medium text-slate-600 focus:border-accent outline-none transition-all">
                      <option>JEE Main + Advanced</option>
                      <option>Class 11 Foundation</option>
                      <option>Class 12 Boards (BSEB)</option>
                      <option>Crash Course</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="message" className="font-bold text-primary ml-1">Your Message</Label>
                    <textarea id="message" value={form.message} onChange={handleChange} rows={5} placeholder="Tell us about your goals..." className="w-full p-6 rounded-[2rem] border-2 border-slate-100 focus:border-accent outline-none transition-all font-medium text-slate-600" required />
                  </div>
                  <Button disabled={loading} className="w-full bg-primary hover:bg-primary/95 text-white font-black py-8 text-xl rounded-2xl group shadow-xl shadow-primary/20">
                    {loading ? <Loader2 className="animate-spin mr-2 w-5 h-5" /> : <Send className="mr-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
