import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { supabase, Inquiry, Topper, Testimonial } from '@/lib/supabase';
import { Loader2, Users, MessageSquare, Trophy, Quote, RefreshCw, CheckCircle2, Phone, Mail, Clock, X, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700',
  contacted: 'bg-yellow-100 text-yellow-700',
  enrolled: 'bg-emerald-100 text-emerald-700',
  closed: 'bg-slate-100 text-slate-500',
};

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'shaurya2026';

export default function AdminDashboard() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState('');
  const [tab, setTab] = useState<'inquiries' | 'toppers' | 'testimonials'>('inquiries');
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [toppers, setToppers] = useState<Topper[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(false);

  // Topper form
  const [newTopper, setNewTopper] = useState<Partial<Topper>>({ name: '', achievement: '', year: new Date().getFullYear().toString(), exam: 'JEE Main' });
  // Testimonial form
  const [newTestimonial, setNewTestimonial] = useState<Partial<Testimonial>>({ quote: '', author: '', rank: '', is_active: true });

  const login = () => {
    if (pw === ADMIN_PASSWORD) { setAuthed(true); } else { toast.error('Wrong password!'); }
  };

  useEffect(() => {
    if (authed) fetchAll();
  }, [authed]);

  async function fetchAll() {
    setLoading(true);
    const [inqRes, topRes, tesRes] = await Promise.all([
      supabase.from('inquiries').select('*').order('created_at', { ascending: false }),
      supabase.from('toppers').select('*').order('year', { ascending: false }),
      supabase.from('testimonials').select('*').order('created_at', { ascending: false }),
    ]);
    if (inqRes.data) setInquiries(inqRes.data);
    if (topRes.data) setToppers(topRes.data);
    if (tesRes.data) setTestimonials(tesRes.data);
    setLoading(false);
  }

  async function updateStatus(id: string, status: string) {
    const { error } = await supabase.from('inquiries').update({ status }).eq('id', id);
    if (!error) {
      setInquiries(prev => prev.map(i => i.id === id ? { ...i, status: status as Inquiry['status'] } : i));
      toast.success('Status updated');
    }
  }

  async function deleteInquiry(id: string) {
    await supabase.from('inquiries').delete().eq('id', id);
    setInquiries(prev => prev.filter(i => i.id !== id));
    toast.success('Deleted');
  }

  async function addTopper() {
    if (!newTopper.name || !newTopper.achievement) return toast.error('Fill name and achievement');
    const { data, error } = await supabase.from('toppers').insert([newTopper]).select();
    if (error) return toast.error('Error: ' + error.message);
    if (data) setToppers(prev => [data[0], ...prev]);
    setNewTopper({ name: '', achievement: '', year: new Date().getFullYear().toString(), exam: 'JEE Main' });
    toast.success('Topper added!');
  }

  async function deleteTopper(id: string) {
    await supabase.from('toppers').delete().eq('id', id);
    setToppers(prev => prev.filter(t => t.id !== id));
  }

  async function toggleTopper(id: string, featured: boolean) {
    await supabase.from('toppers').update({ is_featured: !featured }).eq('id', id);
    setToppers(prev => prev.map(t => t.id === id ? { ...t, is_featured: !featured } : t));
  }

  async function addTestimonial() {
    if (!newTestimonial.quote || !newTestimonial.author) return toast.error('Fill quote and author');
    const { data, error } = await supabase.from('testimonials').insert([newTestimonial]).select();
    if (error) return toast.error('Error: ' + error.message);
    if (data) setTestimonials(prev => [data[0], ...prev]);
    setNewTestimonial({ quote: '', author: '', rank: '', is_active: true });
    toast.success('Testimonial added!');
  }

  async function toggleTestimonial(id: string, active: boolean) {
    await supabase.from('testimonials').update({ is_active: !active }).eq('id', id);
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, is_active: !active } : t));
  }

  async function deleteTestimonial(id: string) {
    await supabase.from('testimonials').delete().eq('id', id);
    setTestimonials(prev => prev.filter(t => t.id !== id));
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 pt-20">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white p-12 rounded-[3rem] shadow-2xl w-full max-w-sm text-center space-y-6">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center font-black text-accent text-2xl mx-auto">S</div>
          <h2 className="text-2xl font-black text-primary">Admin Dashboard</h2>
          <p className="text-slate-500 text-sm">Shaurya Math — Internal Use Only</p>
          <Input type="password" value={pw} onChange={e => setPw(e.target.value)} onKeyDown={e => e.key === 'Enter' && login()} placeholder="Enter admin password" className="py-6 rounded-2xl text-center text-lg font-bold" />
          <Button onClick={login} className="w-full bg-primary text-white font-black py-6 rounded-2xl">Login</Button>
        </motion.div>
      </div>
    );
  }

  const tabs = [
    { id: 'inquiries', label: 'Inquiries', icon: MessageSquare, count: inquiries.filter(i => i.status === 'new').length },
    { id: 'toppers', label: 'Toppers', icon: Trophy, count: toppers.length },
    { id: 'testimonials', label: 'Testimonials', icon: Quote, count: testimonials.length },
  ] as const;

  return (
    <div className="pt-28 pb-24 min-h-screen bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-black text-primary">Admin Dashboard</h1>
            <p className="text-slate-500 text-sm font-medium">Shaurya Math — Manage everything here</p>
          </div>
          <Button onClick={fetchAll} variant="outline" className="gap-2 rounded-2xl font-bold">
            <RefreshCw className="w-4 h-4" /> Refresh
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Inquiries', value: inquiries.length, icon: Users },
            { label: 'New / Unread', value: inquiries.filter(i => i.status === 'new').length, icon: MessageSquare },
            { label: 'Enrolled', value: inquiries.filter(i => i.status === 'enrolled').length, icon: CheckCircle2 },
            { label: 'Toppers Listed', value: toppers.length, icon: Trophy },
          ].map((s, i) => (
            <div key={i} className="p-6 bg-white rounded-3xl shadow-lg border border-slate-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center"><s.icon className="w-5 h-5 text-primary" /></div>
              <div>
                <p className="text-2xl font-black text-primary">{s.value}</p>
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all ${tab === t.id ? 'bg-primary text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}>
              <t.icon className="w-4 h-4" />
              {t.label}
              {t.count > 0 && <span className={`text-xs rounded-full px-2 py-0.5 font-black ${tab === t.id ? 'bg-accent text-primary' : 'bg-slate-200 text-slate-600'}`}>{t.count}</span>}
            </button>
          ))}
        </div>

        {loading && <div className="flex items-center justify-center py-20 gap-3"><Loader2 className="animate-spin w-6 h-6 text-primary" /><span className="text-slate-500 font-medium">Loading...</span></div>}

        {/* INQUIRIES */}
        {!loading && tab === 'inquiries' && (
          <div className="space-y-4">
            {inquiries.length === 0 && <p className="text-slate-400 text-center py-16 text-lg">No inquiries yet.</p>}
            {inquiries.map(inq => (
              <motion.div key={inq.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-6 shadow-md border border-slate-100 flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <h4 className="font-black text-primary text-lg">{inq.name}</h4>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${STATUS_COLORS[inq.status || 'new']}`}>{inq.status}</span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{inq.phone}</span>
                    {inq.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{inq.email}</span>}
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{inq.created_at ? new Date(inq.created_at).toLocaleString('en-IN') : '—'}</span>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700 font-bold text-xs">{inq.course}</Badge>
                  {inq.message && <p className="text-slate-500 text-sm bg-slate-50 p-3 rounded-2xl">{inq.message}</p>}
                </div>
                <div className="flex flex-wrap gap-2 shrink-0">
                  {['new', 'contacted', 'enrolled', 'closed'].map(s => (
                    <button key={s} onClick={() => updateStatus(inq.id!, s)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${inq.status === s ? STATUS_COLORS[s] + ' ring-2 ring-offset-1 ring-current' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
                      {s}
                    </button>
                  ))}
                  <button onClick={() => deleteInquiry(inq.id!)} className="p-2 rounded-full bg-red-50 text-red-400 hover:bg-red-100 transition-colors"><X className="w-3 h-3" /></button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* TOPPERS */}
        {!loading && tab === 'toppers' && (
          <div className="space-y-6">
            {/* Add Form */}
            <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-100">
              <h3 className="font-black text-primary mb-4 flex items-center gap-2"><Plus className="w-4 h-4" /> Add Topper</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <Input placeholder="Student Name *" value={newTopper.name} onChange={e => setNewTopper({ ...newTopper, name: e.target.value })} className="rounded-2xl" />
                <Input placeholder="Achievement e.g. AIR 127 JEE Main" value={newTopper.achievement} onChange={e => setNewTopper({ ...newTopper, achievement: e.target.value })} className="rounded-2xl" />
                <Input placeholder="Year e.g. 2026" value={newTopper.year} onChange={e => setNewTopper({ ...newTopper, year: e.target.value })} className="rounded-2xl" />
                <Input placeholder="Score e.g. 99.2 Percentile" value={newTopper.score || ''} onChange={e => setNewTopper({ ...newTopper, score: e.target.value })} className="rounded-2xl" />
                <select value={newTopper.exam} onChange={e => setNewTopper({ ...newTopper, exam: e.target.value })} className="p-3 rounded-2xl border-2 border-slate-100 font-medium text-slate-600 focus:border-accent outline-none">
                  <option>JEE Main</option>
                  <option>JEE Advanced</option>
                  <option>Bihar Board</option>
                  <option>IIT</option>
                </select>
                <Input placeholder="Photo URL (optional)" value={newTopper.photo_url || ''} onChange={e => setNewTopper({ ...newTopper, photo_url: e.target.value })} className="rounded-2xl" />
              </div>
              <Button onClick={addTopper} className="bg-primary text-white font-bold px-8 py-5 rounded-2xl gap-2"><Plus className="w-4 h-4" /> Add Topper</Button>
            </div>
            {/* Toppers List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {toppers.map(t => (
                <div key={t.id} className="bg-white rounded-3xl p-5 shadow-md border border-slate-100 flex items-center gap-4">
                  <div className="flex-1">
                    <h4 className="font-black text-primary">{t.name}</h4>
                    <p className="text-accent text-sm font-bold">{t.achievement}</p>
                    <p className="text-slate-400 text-xs">{t.exam} • {t.year} {t.score && `• ${t.score}`}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => toggleTopper(t.id!, !!t.is_featured)} className={`px-3 py-1 rounded-full text-xs font-bold ${t.is_featured ? 'bg-accent text-primary' : 'bg-slate-100 text-slate-500'}`}>
                      {t.is_featured ? '★ Featured' : 'Feature'}
                    </button>
                    <button onClick={() => deleteTopper(t.id!)} className="p-2 rounded-full bg-red-50 text-red-400 hover:bg-red-100"><Trash2 className="w-3 h-3" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TESTIMONIALS */}
        {!loading && tab === 'testimonials' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-100">
              <h3 className="font-black text-primary mb-4 flex items-center gap-2"><Plus className="w-4 h-4" /> Add Testimonial</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input placeholder="Student Name *" value={newTestimonial.author} onChange={e => setNewTestimonial({ ...newTestimonial, author: e.target.value })} className="rounded-2xl" />
                <Input placeholder="Rank/Achievement e.g. AIR 127 JEE" value={newTestimonial.rank} onChange={e => setNewTestimonial({ ...newTestimonial, rank: e.target.value })} className="rounded-2xl" />
                <textarea placeholder="Quote *" value={newTestimonial.quote} onChange={e => setNewTestimonial({ ...newTestimonial, quote: e.target.value })} rows={3} className="w-full p-4 rounded-2xl border-2 border-slate-100 focus:border-accent outline-none font-medium text-slate-600 md:col-span-2" />
                <Input placeholder="Avatar URL (optional)" value={newTestimonial.avatar_url || ''} onChange={e => setNewTestimonial({ ...newTestimonial, avatar_url: e.target.value })} className="rounded-2xl" />
              </div>
              <Button onClick={addTestimonial} className="bg-primary text-white font-bold px-8 py-5 rounded-2xl gap-2"><Plus className="w-4 h-4" /> Add Testimonial</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {testimonials.map(t => (
                <div key={t.id} className={`bg-white rounded-3xl p-5 shadow-md border-2 ${t.is_active ? 'border-emerald-100' : 'border-slate-100 opacity-60'} flex flex-col gap-3`}>
                  <p className="text-slate-600 italic text-sm">"{t.quote}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-primary text-sm">{t.author}</p>
                      <p className="text-accent text-xs font-bold">{t.rank}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => toggleTestimonial(t.id!, !!t.is_active)} className={`px-3 py-1 rounded-full text-xs font-bold ${t.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                        {t.is_active ? 'Active' : 'Hidden'}
                      </button>
                      <button onClick={() => deleteTestimonial(t.id!)} className="p-2 rounded-full bg-red-50 text-red-400 hover:bg-red-100"><Trash2 className="w-3 h-3" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
