import React from 'react';
import { motion } from 'framer-motion';
import { CalendarHeart, Clock, MapPin, Navigation } from 'lucide-react';

export default function DetailsCard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="max-w-2xl mx-auto bg-nocturnal-light/80 backdrop-blur-md rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/5"
    >
      <h2 className="font-serif text-3xl sm:text-4xl text-center text-burnished-gold mb-10">The Nikkah</h2>
      
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-center text-center">
          <CalendarHeart className="text-starlit-green mb-3" size={28} />
          <p className="text-ivory font-medium text-lg">Monday, July 13th 2026</p>
          <p className="text-ivory/60 text-sm mt-1">28 Muharram 1448 AH</p>
        </div>

        <div className="flex flex-col items-center text-center">
          <Clock className="text-starlit-green mb-3" size={28} />
          <p className="text-ivory font-medium text-lg">Ceremony begins exactly at 11:00 AM</p>
        </div>

        <div className="flex flex-col items-center text-center">
          <MapPin className="text-starlit-green mb-3" size={28} />
          <p className="text-ivory font-medium text-lg">Darsana Event Space</p>
          <p className="text-ivory/60 text-sm mt-1">Kuzhalmannam East, Palakkad</p>
        </div>
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-white/5 relative h-64 bg-nocturnal/50">
        {/* Placeholder Google Maps embed code, replace with actual if needed */}
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.6120853509173!2d76.5492211!3d10.7319985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8654c602cb101%3A0xc3b860ab8ce060b9!2sDarsana%20Event%20Space!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="opacity-70 grayscale hover:grayscale-0 transition-all duration-700 mix-blend-screen"
        ></iframe>
      </div>

      <div className="mt-8 flex justify-center">
        <a 
          href="https://maps.app.goo.gl/phyYXosbhgFozS9q6?g_st=ac" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-2 rounded-full border border-starlit-green text-starlit-green hover:bg-starlit-green hover:text-nocturnal transition-colors font-sans tracking-wide text-sm font-medium"
        >
          <Navigation size={16} />
          Get Directions
        </a>
      </div>
    </motion.div>
  );
}
