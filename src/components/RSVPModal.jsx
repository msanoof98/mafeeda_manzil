import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function RSVPModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setTimeout(() => setSubmitted(false), 500);
    }, 2500);
  };

  return (
    <>
      <div className="flex justify-center mt-16 mb-24">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-emerald-800 text-ivory px-10 py-4 rounded-full font-sans tracking-widest text-sm uppercase shadow-lg shadow-emerald-900/30 hover:bg-emerald-700 transition-all duration-300 hover:scale-105 active:scale-95 border border-emerald-600/30"
        >
          RSVP Now
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-nocturnal/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-nocturnal-light border border-white/10 p-8 sm:p-10 rounded-3xl shadow-2xl max-w-md w-full relative"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 text-starlit-green hover:text-ivory transition-colors"
              >
                <X size={24} />
              </button>

              <h2 className="font-serif text-3xl text-burnished-gold mb-8 text-center">RSVP</h2>

              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="text-center py-12"
                >
                  <p className="font-serif text-2xl text-starlit-green mb-3">Thank you for RSVPing!</p>
                  <p className="text-ivory/80 font-sans font-light text-lg">We look forward to seeing you.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div>
                    <label className="block text-sm font-sans tracking-wide text-ivory/80 mb-2">Full Name</label>
                    <input 
                      required 
                      type="text" 
                      className="w-full bg-nocturnal border border-white/10 rounded-xl px-4 py-3 text-ivory focus:outline-none focus:border-starlit-green/50 transition-colors"
                      placeholder="e.g. John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-sans tracking-wide text-ivory/80 mb-2">Will you be attending?</label>
                    <select className="w-full bg-nocturnal border border-white/10 rounded-xl px-4 py-3 text-ivory focus:outline-none focus:border-starlit-green/50 transition-colors appearance-none">
                      <option value="yes">Yes, I will attend</option>
                      <option value="no">No, I cannot attend</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-sans tracking-wide text-ivory/80 mb-2">Number of Guests</label>
                    <input 
                      required 
                      type="number" 
                      min="1"
                      max="10"
                      defaultValue="1"
                      className="w-full bg-nocturnal border border-white/10 rounded-xl px-4 py-3 text-ivory focus:outline-none focus:border-starlit-green/50 transition-colors"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="mt-6 w-full bg-burnished-gold/90 text-nocturnal font-medium tracking-wide py-4 rounded-xl hover:bg-burnished-gold transition-colors font-sans text-lg shadow-lg shadow-burnished-gold/20"
                  >
                    Submit
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
