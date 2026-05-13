import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Loader2, Send, GraduationCap, Calendar, Users, BookOpen } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

const steps = ['Personal Info', 'Academic Details', 'Course Selection', 'Confirm'];

const courses = [
  { id: 'jee', title: 'JEE Main + Advanced', duration: '2 Years', fee: '₹25,000/yr', seats: '30 Seats', badge: 'Most Popular' },
  { id: 'class11', title: 'Class 11 Foundation', duration: '1 Year', fee: '₹18,000/yr', seats: '40 Seats', badge: '' },
  { id: 'bseb', title: 'Class 12 Bihar Board', duration: '1 Year', fee: '₹12,000/yr', seats: '40 Seats', badge: 'High Demand' },
  { id: 'crash', title: 'Crash Course', duration: '3 Months', fee: '₹6,000', seats: '20 Seats', badge: '' },
];

export default function Admissions() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', phone: '', email: '', dob: '', gender: '',
    currentClass: '', school: '', percentage: '',
    course: '', batch: '', message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.from('inquiries').insert([{
        name: form.name,
        phone: form.phone,
        email: form.email || null,
        course: form.course,
        message: `ADMISSION FORM — School: ${form.school}, Class: ${form.currentClass}, %: ${form.percentage}, Batch: ${form.batch}. ${form.message}`,
        status: 'new',
      }]);
      if (error) throw error;
      setSubmitted(true);
      toast.success('Application submitted! We will call you within 24 hours.');
    } catch (err) {
      console.error(err);
      toast.error('Error submitting. Please WhatsApp us directly.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="pt-32 pb-24 min-h-screen flex items-center justify-center bg-slate-50">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-lg mx-auto p-12 bg-white rounded-[3rem] shadow-2xl"
        >
          <CheckCircle2 className="w-24 h-24 text-emerald-500 mx-auto mb-6" />
          <h2 className="text-4xl font-black text-primary mb-4">Application Received!</h2>
          <p className="text-slate-500 text-lg leading-relaxed mb-8">
            Thank you, <strong>{form.name}</strong>! Our team will contact you at <strong>{form.phone}</strong> within 24 hours to confirm your seat.
          </p>
          <p className="text-sm text-slate-400 mb-8">For urgent inquiries, WhatsApp us at +91-7667656723</p>
          <Button asChild className="bg-primary text-white font-bold px-10 py-6 rounded-2xl">
            <a href="/">Back to Home</a>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="bg-accent text-primary font-bold mb-4 px-4 py-2 text-xs uppercase tracking-widest">2026 Batch Open</Badge>
            <h1 className="text-5xl md:text-6xl font-black text-primary leading-none mb-4">
              Apply for <span className="text-accent italic">Admission</span>
            </h1>
            <p className="text-slate-500 text-lg">Limited seats available. Secure your spot today.</p>
          </motion.div>
        </div>

        {/* Key Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: Calendar, label: 'Batch Starts', value: 'June 2026' },
            { icon: Users, label: 'Batch Size', value: 'Max 30' },
            { icon: BookOpen, label: 'Daily Classes', value: '3–4 Hours' },
            { icon: GraduationCap, label: 'Success Rate', value: '98%' },
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-3xl bg-white border border-slate-100 shadow-lg text-center">
              <item.icon className="w-6 h-6 text-accent mx-auto mb-2" />
              <p className="text-xl font-black text-primary">{item.value}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <button
                onClick={() => i < step && setStep(i)}
                className={`w-8 h-8 rounded-full text-xs font-black transition-all ${i === step ? 'bg-primary text-white scale-110' : i < step ? 'bg-accent text-primary' : 'bg-slate-200 text-slate-400'}`}
              >
                {i < step ? '✓' : i + 1}
              </button>
              {i < steps.length - 1 && <div className={`h-0.5 w-12 rounded-full transition-colors ${i < step ? 'bg-accent' : 'bg-slate-200'}`} />}
            </div>
          ))}
        </div>
        <p className="text-center text-primary font-bold mb-10 text-sm uppercase tracking-widest">{steps[step]}</p>

        <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden">
          <CardContent className="p-8 md:p-12">
            {/* Step 0: Personal Info */}
            {step === 0 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-bold text-primary">Full Name *</Label>
                    <Input id="name" value={form.name} onChange={handleChange} placeholder="Rahul Kumar" className="py-6 rounded-2xl" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="font-bold text-primary">Phone/WhatsApp *</Label>
                    <Input id="phone" value={form.phone} onChange={handleChange} placeholder="+91-XXXXXXXXXX" className="py-6 rounded-2xl" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-bold text-primary">Email (optional)</Label>
                    <Input id="email" type="email" value={form.email} onChange={handleChange} placeholder="you@email.com" className="py-6 rounded-2xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob" className="font-bold text-primary">Date of Birth</Label>
                    <Input id="dob" type="date" value={form.dob} onChange={handleChange} className="py-6 rounded-2xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender" className="font-bold text-primary">Gender</Label>
                    <select id="gender" value={form.gender} onChange={handleChange} className="w-full p-4 rounded-2xl border-2 border-slate-100 font-medium text-slate-600 focus:border-accent outline-none">
                      <option value="">Select</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <Button onClick={() => { if (form.name && form.phone) setStep(1); else toast.error('Please fill Name and Phone'); }} className="w-full bg-primary text-white font-black py-7 rounded-2xl text-lg">
                  Next: Academic Details →
                </Button>
              </motion.div>
            )}

            {/* Step 1: Academic Details */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="currentClass" className="font-bold text-primary">Current Class *</Label>
                    <select id="currentClass" value={form.currentClass} onChange={handleChange} className="w-full p-4 rounded-2xl border-2 border-slate-100 font-medium text-slate-600 focus:border-accent outline-none">
                      <option value="">Select Class</option>
                      <option>Class 10 (Preparing for 11)</option>
                      <option>Class 11</option>
                      <option>Class 12</option>
                      <option>Dropper (12 Passed)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="school" className="font-bold text-primary">School / College Name</Label>
                    <Input id="school" value={form.school} onChange={handleChange} placeholder="Delhi Public School" className="py-6 rounded-2xl" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="percentage" className="font-bold text-primary">Last Exam Percentage / Score</Label>
                    <Input id="percentage" value={form.percentage} onChange={handleChange} placeholder="e.g. 85% or 420/500" className="py-6 rounded-2xl" />
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button onClick={() => setStep(0)} variant="outline" className="flex-1 py-7 rounded-2xl font-bold">← Back</Button>
                  <Button onClick={() => { if (form.currentClass) setStep(2); else toast.error('Please select your class'); }} className="flex-[2] bg-primary text-white font-black py-7 rounded-2xl text-lg">
                    Next: Course Selection →
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Course Selection */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {courses.map(c => (
                    <button
                      key={c.id}
                      onClick={() => setForm({ ...form, course: c.title })}
                      className={`p-6 rounded-3xl border-2 text-left transition-all ${form.course === c.title ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10' : 'border-slate-100 bg-slate-50 hover:border-slate-300'}`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-black text-primary">{c.title}</h4>
                        {c.badge && <Badge className="bg-accent text-primary text-[10px] font-bold">{c.badge}</Badge>}
                      </div>
                      <p className="text-sm text-slate-500 font-medium">{c.duration} • {c.fee}</p>
                      <p className="text-xs text-accent font-bold mt-1">{c.seats}</p>
                    </button>
                  ))}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="batch" className="font-bold text-primary">Preferred Batch Time</Label>
                  <select id="batch" value={form.batch} onChange={handleChange} className="w-full p-4 rounded-2xl border-2 border-slate-100 font-medium text-slate-600 focus:border-accent outline-none">
                    <option value="">Select Timing</option>
                    <option>Morning (7:00 AM – 9:00 AM)</option>
                    <option>Afternoon (12:00 PM – 2:00 PM)</option>
                    <option>Evening (5:00 PM – 8:00 PM)</option>
                  </select>
                </div>
                <div className="flex gap-4">
                  <Button onClick={() => setStep(1)} variant="outline" className="flex-1 py-7 rounded-2xl font-bold">← Back</Button>
                  <Button onClick={() => { if (form.course) setStep(3); else toast.error('Please select a course'); }} className="flex-[2] bg-primary text-white font-black py-7 rounded-2xl text-lg">
                    Next: Review & Confirm →
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Confirm */}
            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <h3 className="text-2xl font-black text-primary">Review Your Application</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Name', value: form.name },
                    { label: 'Phone', value: form.phone },
                    { label: 'Email', value: form.email || 'Not provided' },
                    { label: 'Class', value: form.currentClass },
                    { label: 'School', value: form.school || 'Not provided' },
                    { label: 'Course', value: form.course },
                    { label: 'Batch', value: form.batch || 'Not specified' },
                  ].map((row, i) => (
                    <div key={i} className="flex justify-between items-center p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <span className="text-xs font-black text-slate-400 uppercase tracking-wider">{row.label}</span>
                      <span className="font-bold text-primary">{row.value}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="font-bold text-primary">Any special note (optional)</Label>
                  <textarea id="message" value={form.message} onChange={handleChange} rows={3} placeholder="Any additional information..." className="w-full p-4 rounded-2xl border-2 border-slate-100 focus:border-accent outline-none font-medium text-slate-600" />
                </div>
                <div className="flex gap-4">
                  <Button onClick={() => setStep(2)} variant="outline" className="flex-1 py-7 rounded-2xl font-bold">← Back</Button>
                  <Button onClick={handleSubmit} disabled={loading} className="flex-[2] bg-accent text-primary font-black py-7 rounded-2xl text-lg shadow-xl shadow-accent/20">
                    {loading ? <Loader2 className="animate-spin mr-2" /> : <Send className="mr-2 w-5 h-5" />}
                    {loading ? 'Submitting...' : 'Submit Application'}
                  </Button>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
