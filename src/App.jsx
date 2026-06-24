import React from 'react';
import { motion } from 'framer-motion';
import StardustBackground from './components/StardustBackground';
import CountdownTimer from './components/CountdownTimer';
import DetailsCard from './components/DetailsCard';
import RSVPModal from './components/RSVPModal';

function App() {
  return (
    <div className="relative min-h-screen selection:bg-starlit-green selection:text-nocturnal font-sans text-ivory">
      <StardustBackground />
      
      <main className="relative z-10 container mx-auto px-6 pt-24 pb-12">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex flex-col items-center text-center mb-24"
        >
          <p className="font-serif italic text-burnished-gold text-lg sm:text-xl mb-16">
            Bismillah hir-Rahman nir-Rahim
          </p>

          <p className="font-sans uppercase tracking-[0.3em] text-xs sm:text-sm text-ivory/60 mb-8">
            Together with their families
          </p>

          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl text-ivory leading-tight mb-8">
            Muhammed Sanoof
            <span className="block mt-2 mb-2 text-starlit-green text-3xl sm:text-5xl">&amp;</span>
            Sifana M
          </h1>

          <p className="font-sans font-light text-ivory/80 text-lg sm:text-xl max-w-lg mx-auto mt-6">
            Request the honor of your presence at their Nikkah
          </p>
        </motion.section>

        <CountdownTimer />
        <DetailsCard />
        <RSVPModal />
      </main>
    </div>
  );
}

export default App;
