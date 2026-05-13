import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { CheckCircle2, Clock, MapPin } from 'lucide-react';
import { Button } from './ui/button';

interface CourseProps {
  title: string;
  duration: string;
  features: string[];
  level: string;
  image: string;
  delay?: number;
  key?: React.Key;
}

export default function CourseCard({ title, duration, features, level, image, delay = 0 }: CourseProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group h-full"
    >
      <Card className="h-full overflow-hidden border border-slate-200 bg-white rounded-[2.5rem] shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-500">
        <div className="p-4">
          <div className="relative h-64 overflow-hidden rounded-[2rem]">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
            <Badge className="absolute top-6 right-6 bg-blue-100 text-primary font-black border-none uppercase text-[10px] tracking-widest px-3 py-1">
              {level}
            </Badge>
          </div>
        </div>
        
        <CardHeader className="pt-2">
          <CardTitle className="text-2xl font-black text-slate-900 leading-tight">
            {title}
          </CardTitle>
          <div className="flex items-center text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] pt-2">
            <Clock className="w-3 h-3 mr-2 text-accent" />
            {duration}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <ul className="space-y-3">
            {features.slice(0, 3).map((feature, i) => (
              <li key={i} className="flex items-start text-xs font-medium text-slate-500">
                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 mr-3 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        
        <CardFooter className="pt-2 pb-8">
          <Button variant="ghost" className="w-full justify-between group-hover:bg-slate-50 text-primary font-black text-xs uppercase tracking-widest rounded-xl py-6 border border-slate-100 italic transition-all">
            Explore Program
            <CheckCircle2 className="w-4 h-4 text-accent" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
