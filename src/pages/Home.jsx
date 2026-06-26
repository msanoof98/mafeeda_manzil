import React, { useEffect, useState, useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Heart,
  Home as HomeIcon,
  Navigation,
  X,
  Send,
  Users,
} from "lucide-react";

/* ───────────────────────────────────────────────
   Constants
   ─────────────────────────────────────────────── */
const TARGET_DATE = new Date("2026-08-02T18:00:00+05:30");
const MAPS_DIRECTIONS_URL =
  "https://maps.app.goo.gl/YHGXw27Zny17cXP1A?g_st=ac";

/* ───────────────────────────────────────────────
   Countdown Hook
   ─────────────────────────────────────────────── */
function useCountdown(targetDate) {
  const calc = useCallback(() => {
    const diff = Math.max(targetDate.getTime() - Date.now(), 0);
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff / 3600000) % 24),
      minutes: Math.floor((diff / 60000) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }, [targetDate]);
  const [timeLeft, setTimeLeft] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calc()), 1000);
    return () => clearInterval(id);
  }, [calc]);
  return timeLeft;
}

/* ───────────────────────────────────────────────
   Floating Gold Particles
   ─────────────────────────────────────────────── */
function GoldParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 12,
        duration: 16 + Math.random() * 18,
        size: 2 + Math.random() * 4,
        color: i % 2 === 0 ? "rgba(208,175,131,0.3)" : "rgba(246,242,233,0.2)",
      })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, ${p.color}, transparent)`,
          }}
          initial={{ top: "-3%" }}
          animate={{
            top: "105%",
            x: [0, 30, -20, 15, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

/* ───────────────────────────────────────────────
   Decorative Divider
   ─────────────────────────────────────────────── */
function GoldDivider() {
  return (
    <div className="my-6 flex items-center justify-center gap-3 sm:my-8">
      <motion.div
        className="h-px w-10 sm:w-16"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(208,175,131,0.5))",
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />
      <div className="h-1.5 w-1.5 rotate-45 bg-champagne-400/80" />
      <motion.div
        className="h-px w-10 sm:w-16"
        style={{
          background: "linear-gradient(90deg, rgba(208,175,131,0.5), transparent)",
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />
    </div>
  );
}

/* ───────────────────────────────────────────────
   Countdown Box
   ─────────────────────────────────────────────── */
function CountdownBox({ value, label }) {
  return (
    <motion.div
      className="flex flex-col items-center rounded-2xl bg-taupe-900/60 px-4 py-4 backdrop-blur-sm sm:px-6"
      style={{
        border: "1px solid rgba(208,175,131,0.2)",
        boxShadow: "inset 0 0 20px rgba(208,175,131,0.03)",
      }}
      whileHover={{ scale: 1.04, y: -2 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <motion.span
        key={value}
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="font-serif text-3xl font-semibold tabular-nums text-champagne-100 sm:text-4xl md:text-5xl"
      >
        {String(value).padStart(2, "0")}
      </motion.span>
      <span className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-champagne-400/80 sm:text-xs">
        {label}
      </span>
    </motion.div>
  );
}

/* ───────────────────────────────────────────────
   Fade-in Section
   ─────────────────────────────────────────────── */
function FadeInSection({ children, className = "", delay = 0 }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.15 }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ───────────────────────────────────────────────
   Detail Card
   ─────────────────────────────────────────────── */
function DetailCard({ icon: Icon, title, children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.2 }}
      className="soft-card relative overflow-hidden rounded-3xl p-6 sm:p-8"
    >
      <div className="glow-bg absolute -right-20 -top-20 h-64 w-64 rounded-full" />
      
      <div className="relative z-10">
        <motion.div
          className="mb-4 inline-flex rounded-2xl bg-taupe-800/80 p-3"
          style={{ border: "1px solid rgba(208,175,131,0.2)" }}
          whileHover={{ rotate: 6, scale: 1.08 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Icon className="h-5 w-5 text-champagne-400" strokeWidth={1.5} />
        </motion.div>
        {title && (
          <h3 className="mb-3 font-serif text-xl font-semibold text-champagne-100 sm:text-2xl">
            {title}
          </h3>
        )}
        {children}
      </div>
    </motion.div>
  );
}

/* ───────────────────────────────────────────────
   RSVP Modal
   ─────────────────────────────────────────────── */
function RSVPModal({ open, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: "",
    attending: "Yes",
    guests: 1,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Failed to submit RSVP');
      }

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setError('');
    }, 300);
  };

  const inputCls =
    "w-full rounded-2xl border border-taupe-700 bg-taupe-950/50 px-4 py-3 text-sm text-taupe-100 placeholder-taupe-400 transition-all focus:border-champagne-400/60 focus:bg-taupe-900";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 backdrop-blur-md"
            style={{ backgroundColor: "rgba(38,34,30,0.7)" }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 30 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl bg-taupe-900 shadow-2xl"
            style={{ border: "1px solid rgba(208,175,131,0.3)" }}
          >
            {/* Top accent */}
            <div
              className="h-1 w-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent 10%, rgba(208,175,131,0.7) 50%, transparent 90%)",
              }}
            />

            <div className="p-6 sm:p-8">
              <button
                onClick={handleClose}
                className="absolute right-4 top-5 rounded-full p-2 text-taupe-400 transition-colors hover:bg-taupe-800 hover:text-champagne-200"
              >
                <X className="h-5 w-5" />
              </button>

              {!submitted ? (
                <>
                  <div className="mb-3 inline-flex rounded-2xl bg-taupe-800 p-2.5"
                    style={{ border: "1px solid rgba(208,175,131,0.2)" }}
                  >
                    <Send className="h-5 w-5 text-champagne-400" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-champagne-100 sm:text-3xl">
                    RSVP
                  </h3>
                  <p className="mt-1 text-sm text-taupe-300">
                    We'd love to know if you can make it!
                  </p>
                  
                  {error && (
                    <div className="mt-4 rounded-lg bg-red-900/50 border border-red-500/50 p-3 text-sm text-red-200">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-champagne-200/80">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter your name"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        className={inputCls}
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-champagne-200/80">
                        Attending?
                      </label>
                      <select
                        value={form.attending}
                        onChange={(e) =>
                          setForm({ ...form, attending: e.target.value })
                        }
                        className={inputCls + " appearance-none"}
                      >
                        <option value="Yes">Yes, I'll be there!</option>
                        <option value="No">Sorry, can't make it</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-champagne-200/80">
                        Number of Guests
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={form.guests}
                        onChange={(e) =>
                          setForm({ ...form, guests: Number(e.target.value) })
                        }
                        className={inputCls}
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: loading ? 1 : 1.02 }}
                      whileTap={{ scale: loading ? 1 : 0.98 }}
                      className="w-full rounded-full px-6 py-3.5 text-sm font-semibold text-taupe-950 shadow-md transition-all disabled:opacity-70"
                      style={{
                        background:
                          "linear-gradient(135deg, #dfcbac 0%, #c29761 100%)",
                        boxShadow: "0 4px 20px rgba(208,175,131,0.25)",
                      }}
                    >
                      {loading ? 'Submitting...' : 'Confirm RSVP'}
                    </motion.button>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="py-8 text-center"
                >
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-taupe-800"
                    style={{ border: "1px solid rgba(208,175,131,0.3)" }}
                  >
                    <Heart
                      className="h-7 w-7 text-champagne-400"
                      fill="currentColor"
                    />
                  </motion.div>
                  <h3 className="font-serif text-2xl font-semibold text-champagne-100">
                    Thank You!
                  </h3>
                  <p className="mt-2 text-sm text-taupe-300">
                    We're thrilled and look forward to welcoming you.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleClose}
                    className="mt-6 rounded-full px-8 py-3 text-sm font-semibold text-taupe-950"
                    style={{
                      background:
                        "linear-gradient(135deg, #dfcbac 0%, #c29761 100%)",
                    }}
                  >
                    Close
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ───────────────────────────────────────────────
   Home Page
   ─────────────────────────────────────────────── */
export default function Home() {
  const countdown = useCountdown(TARGET_DATE);
  const [rsvpOpen, setRsvpOpen] = useState(false);

  return (
    <>
      <main className="relative min-h-screen overflow-hidden bg-taupe-950">
        {/* Soft gold particles */}
        <GoldParticles />

        {/* Subtle gradient ambient light */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <div
            className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/3 rounded-full"
            style={{
              background:
                "radial-gradient(ellipse, rgba(208,175,131,0.1) 0%, transparent 60%)",
            }}
          />
          <div
            className="absolute bottom-0 left-1/2 h-[500px] w-[600px] -translate-x-1/2 translate-y-1/3 rounded-full"
            style={{
              background:
                "radial-gradient(ellipse, rgba(208,175,131,0.06) 0%, transparent 60%)",
            }}
          />
        </div>

        {/* ═══════════════════════════════════
            Content
            ═══════════════════════════════════ */}
        <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center px-5 py-12 sm:px-8 sm:py-20 lg:py-24">

          {/* ──── 1. HERO SECTION ──── */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="soft-card w-full rounded-3xl px-6 py-14 text-center sm:px-10 sm:py-20"
          >
            {/* Home icon with pulsing ring */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="relative mx-auto mb-6 inline-flex"
            >
              <div className="rounded-full bg-taupe-900 p-4"
                style={{ border: "1px solid rgba(208,175,131,0.3)" }}
              >
                <HomeIcon className="h-7 w-7 text-champagne-400" strokeWidth={1.5} />
              </div>
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ border: "1px solid rgba(208,175,131,0.4)" }}
                animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            </motion.div>

            {/* Invitation text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-[10px] font-semibold uppercase tracking-[0.4em] text-champagne-400/80 sm:text-xs"
            >
              You are cordially invited to the
              <br />
              housewarming ceremony of
            </motion.p>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="gold-accent mt-6 font-serif text-5xl font-bold leading-tight tracking-tight sm:text-6xl md:text-7xl"
            >
              Mafeeda Manzil
            </motion.h1>

            <GoldDivider />

            {/* Hosted by */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="text-sm font-medium text-taupe-300 sm:text-base"
            >
              Hosted by{" "}
              <span className="font-serif text-base font-semibold text-champagne-100 sm:text-lg">
                Mr. Saajan Lathif
              </span>{" "}
              &amp;{" "}
              <span className="font-serif text-base font-semibold text-champagne-100 sm:text-lg">
                Mafeeda Saajan
              </span>
            </motion.p>

            {/* Quote */}
            <motion.blockquote
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="mx-auto mt-8 max-w-lg border-l-2 border-champagne-400/40 pl-5 text-left font-serif text-sm italic leading-relaxed text-taupe-200 sm:text-base"
            >
              "A house is made of walls and beams, but a home is built with love
              and dreams. Please join us as we open the doors to our new home."
            </motion.blockquote>
          </motion.section>

          {/* ──── 2. COUNTDOWN ──── */}
          <FadeInSection className="mt-8 w-full" delay={0.2}>
            <div className="soft-card rounded-3xl px-5 py-8 text-center sm:px-8 sm:py-10">
              <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.4em] text-champagne-400/70 sm:text-xs">
                ✦ Counting down to the celebration ✦
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                <CountdownBox value={countdown.days} label="Days" />
                <CountdownBox value={countdown.hours} label="Hours" />
                <CountdownBox value={countdown.minutes} label="Minutes" />
                <CountdownBox value={countdown.seconds} label="Seconds" />
              </div>
            </div>
          </FadeInSection>

          {/* ──── 3. EVENT DETAILS ──── */}
          <div className="mt-8 w-full space-y-6">
            {/* Date & Time */}
            <DetailCard icon={Calendar} title="Date & Time" delay={0.1}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                <div className="flex items-center gap-2.5">
                  <Calendar
                    className="h-4 w-4 flex-shrink-0 text-champagne-400/60"
                    strokeWidth={1.5}
                  />
                  <span className="text-sm text-taupe-100 sm:text-base">
                    Sunday, 2nd August 2026
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock
                    className="h-4 w-4 flex-shrink-0 text-champagne-400/60"
                    strokeWidth={1.5}
                  />
                  <span className="text-sm text-taupe-100 sm:text-base">
                    06:00 PM onwards
                  </span>
                </div>
              </div>
            </DetailCard>

            {/* Location */}
            <DetailCard icon={MapPin} title="Location" delay={0.2}>
              <p className="mb-4 font-serif text-base font-medium text-champagne-100 sm:text-lg">
                Mafeeda Manzil
              </p>

              <div className="overflow-hidden rounded-2xl border border-taupe-800/80">
                <div className="aspect-[16/10] w-full">
                  <iframe
                    title="Venue location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.0!2d76.0!3d10.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDAwJzAwLjAiTiA3NsKwMDAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                    className="h-full w-full opacity-[0.85] sepia-[0.4] hue-rotate-[-10deg] saturate-[0.8]"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

              <motion.a
                href={MAPS_DIRECTIONS_URL}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-champagne-400/30 bg-taupe-900/60 px-5 py-3 text-sm font-medium text-champagne-100 transition-all hover:border-champagne-400/60 hover:bg-taupe-800 sm:w-auto"
              >
                <Navigation className="h-4 w-4 text-champagne-400" strokeWidth={1.5} />
                Get Directions
              </motion.a>
            </DetailCard>

            {/* Contact */}
            <DetailCard icon={Phone} title="Contact" delay={0.3}>
              <p className="text-sm text-taupe-300 sm:text-base">
                For any queries, please contact:
              </p>
              <a
                href="tel:+919645111101"
                className="mt-2 inline-flex items-center gap-2 font-serif text-lg font-semibold text-champagne-200 transition-colors hover:text-champagne-400"
              >
                <Phone
                  className="h-4 w-4 text-champagne-400/60"
                  strokeWidth={1.5}
                />
                +91 9645111101
              </a>
            </DetailCard>
          </div>

          {/* ──── 4. RSVP SECTION ──── */}
          <FadeInSection className="mt-10 w-full" delay={0.2}>
            <div className="soft-card rounded-3xl px-6 py-10 text-center sm:px-10 sm:py-14">
              <motion.div
                className="mx-auto mb-4 inline-flex rounded-full bg-taupe-900 p-3"
                style={{ border: "1px solid rgba(208,175,131,0.3)" }}
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Users className="h-6 w-6 text-champagne-400" strokeWidth={1.5} />
              </motion.div>
              <h2 className="font-serif text-2xl font-semibold text-champagne-100 sm:text-3xl">
                Will You Join Us?
              </h2>
              <p className="mx-auto mt-2 max-w-sm text-sm text-taupe-300">
                Your presence would make our celebration complete. Please let us
                know if you can attend.
              </p>
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setRsvpOpen(true)}
                className="mt-6 inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-taupe-950 shadow-lg transition-all"
                style={{
                  background:
                    "linear-gradient(135deg, #dfcbac 0%, #c29761 100%)",
                  boxShadow: "0 6px 24px rgba(208,175,131,0.25)",
                }}
              >
                <Send className="h-4 w-4" strokeWidth={2} />
                RSVP Now
              </motion.button>
            </div>
          </FadeInSection>

          {/* ──── Footer ──── */}
          <FadeInSection className="mt-10 w-full text-center" delay={0.2}>
            <GoldDivider />
            <p className="font-serif text-sm italic text-taupe-400">
              We look forward to welcoming you to our new home
            </p>
            <div className="mt-2 flex items-center justify-center gap-1.5 text-taupe-500">
              <Heart className="h-3 w-3" fill="currentColor" />
              <span className="text-xs tracking-wider">
                Mafeeda Manzil · 2026
              </span>
              <Heart className="h-3 w-3" fill="currentColor" />
            </div>
          </FadeInSection>
        </div>

        {/* RSVP Modal */}
        <RSVPModal open={rsvpOpen} onClose={() => setRsvpOpen(false)} />
      </main>
    </>
  );
}
