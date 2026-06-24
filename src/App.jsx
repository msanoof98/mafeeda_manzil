import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarHeart, Clock, MapPin, Navigation, X } from "lucide-react";

const TARGET_DATE = new Date("2026-07-13T11:00:00+05:30");

function useCountdown(targetDate) {
  const calc = () => {
    const diff = Math.max(targetDate.getTime() - new Date().getTime(), 0);
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calc());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calc()), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

function CountdownBox({ value, label }) {
  return (
    <div className="flex min-w-[72px] flex-col items-center">
      <div
        className="font-serif tabular-nums text-4xl font-medium tracking-tight sm:text-5xl"
        style={{ color: "var(--text-heading)" }}
      >
        {String(value).padStart(2, "0")}
      </div>
      <div
        className="mt-1 text-[10px] font-semibold tracking-[0.35em]"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </div>
    </div>
  );
}

/* Floating petal particle component */
function FloatingPetals() {
  const petals = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 8,
    duration: 10 + Math.random() * 12,
    size: 6 + Math.random() * 10,
    opacity: 0.15 + Math.random() * 0.2,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            background:
              "radial-gradient(circle, rgba(200,150,130,0.5), rgba(180,130,110,0.2))",
          }}
          initial={{ top: "-5%", rotate: 0 }}
          animate={{
            top: "105%",
            rotate: 360,
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

export default function App() {
  const countdown = useCountdown(TARGET_DATE);
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", attending: "yes", guests: 1 });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {/* Animated Floral Background — more visible */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url('/floral-bg.png')",
          backgroundSize: "550px",
          backgroundRepeat: "repeat",
          opacity: 0.45,
        }}
        animate={{
          backgroundPosition: ["0px 0px", "550px 550px"],
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Floating petal particles */}
      <FloatingPetals />

      {/* Soft radial vignette overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(220,195,185,0.35) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-5 py-10 sm:px-8 sm:py-16">
        {/* ─── Hero Section ─── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-full rounded-[2rem] px-6 py-12 text-center backdrop-blur-md sm:px-10 sm:py-16"
          style={{
            backgroundColor: "var(--bg-card)",
            boxShadow: "0 18px 60px var(--shadow-color)",
            border: "1px solid var(--ring-color)",
          }}
        >
          {/* Bismillah */}
          <div
            className="mb-5 font-serif text-2xl italic sm:text-3xl"
            style={{ direction: "rtl", color: "var(--text-heading)" }}
          >
            بسم الله الرحمن الرحيم
          </div>

          {/* Subtitle */}
          <div
            className="text-[11px] font-semibold uppercase tracking-[0.45em] sm:text-xs"
            style={{ color: "var(--text-muted)" }}
          >
            Together with their families
          </div>

          {/* Names — stacked & centered */}
          <h1
            className="mt-6 flex flex-col items-center justify-center font-serif text-5xl leading-tight tracking-tight sm:text-7xl lg:text-8xl"
            style={{ color: "var(--text-heading)" }}
          >
            <span className="text-center">Muhammed Sanoof N</span>
            <span
              className="my-2 text-4xl sm:my-3 sm:text-6xl"
              style={{ color: "var(--text-muted)" }}
            >
              &
            </span>
            <span className="text-center">Sifana M</span>
          </h1>

          {/* Tagline */}
          <p
            className="mx-auto mt-5 max-w-2xl text-sm leading-7 sm:text-base"
            style={{ color: "var(--text-accent)" }}
          >
            Request the honor of your presence at their Nikkah.
          </p>

          {/* Countdown */}
          <div
            className="mt-10 rounded-[2rem] px-5 py-6 sm:px-8"
            style={{ backgroundColor: "var(--bg-accent)" }}
          >
            <div
              className="mb-4 text-[10px] font-semibold uppercase tracking-[0.4em]"
              style={{ color: "var(--text-muted)" }}
            >
              Countdown to the Nikkah
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <CountdownBox value={countdown.days} label="DAYS" />
              <CountdownBox value={countdown.hours} label="HRS" />
              <CountdownBox value={countdown.minutes} label="MINS" />
              <CountdownBox value={countdown.seconds} label="SECS" />
            </div>
          </div>
        </motion.section>

        {/* ─── Details Card ─── */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.25 }}
          className="mt-8 w-full"
        >
          <div
            className="overflow-hidden rounded-[2rem] px-6 py-8 backdrop-blur-md sm:px-10 sm:py-10"
            style={{
              backgroundColor: "var(--bg-card)",
              boxShadow: "0 18px 60px var(--shadow-color)",
              border: "1px solid var(--ring-color)",
            }}
          >
            <h2
              className="font-serif text-3xl sm:text-4xl"
              style={{ color: "var(--text-heading)" }}
            >
              The Nikkah
            </h2>

            <div className="mt-8 grid gap-6 text-center sm:grid-cols-3">
              {/* Date */}
              <div
                className="rounded-3xl p-5"
                style={{ backgroundColor: "var(--bg-accent)" }}
              >
                <CalendarHeart
                  className="mx-auto h-6 w-6"
                  style={{ color: "var(--accent-primary)" }}
                />
                <p
                  className="mt-3 text-sm font-medium"
                  style={{ color: "var(--text-heading)" }}
                >
                  Monday, July 13th 2026
                  <span
                    className="block"
                    style={{ color: "var(--text-muted)" }}
                  >
                    28 Muharram 1448 AH
                  </span>
                </p>
              </div>

              {/* Time */}
              <div
                className="rounded-3xl p-5"
                style={{ backgroundColor: "var(--bg-accent)" }}
              >
                <Clock
                  className="mx-auto h-6 w-6"
                  style={{ color: "var(--accent-primary)" }}
                />
                <p
                  className="mt-3 text-sm font-medium"
                  style={{ color: "var(--text-heading)" }}
                >
                  Ceremony begins exactly at
                  <span
                    className="block"
                    style={{ color: "var(--text-muted)" }}
                  >
                    11:00 AM
                  </span>
                </p>
              </div>

              {/* Venue */}
              <div
                className="rounded-3xl p-5"
                style={{ backgroundColor: "var(--bg-accent)" }}
              >
                <MapPin
                  className="mx-auto h-6 w-6"
                  style={{ color: "var(--accent-primary)" }}
                />
                <p
                  className="mt-3 text-sm font-medium"
                  style={{ color: "var(--text-heading)" }}
                >
                  Darsana Event Space
                  <span
                    className="block"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Kuzhalmannam East, Palakkad
                  </span>
                </p>
              </div>
            </div>

            {/* Map */}
            <div
              className="mt-8 overflow-hidden rounded-[1.75rem] shadow-inner"
              style={{ backgroundColor: "rgba(180,148,130,0.12)" }}
            >
              <div className="aspect-[16/9] w-full">
                {/* Paste your real Google Maps embed code here if you have one */}
                <iframe
                  title="Venue map"
                  src="https://www.google.com/maps?q=Darsana%20Event%20Space,%20Kuzhalmannam%20East,%20Palakkad&output=embed"
                  className="h-full w-full"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-5 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
              <a
                href="https://maps.app.goo.gl/phyYXosbhgFozS9q6?g_st=ac"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition"
                style={{
                  color: "var(--accent-primary)",
                  border: "1px solid var(--ring-color)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--accent-primary)";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "var(--accent-primary)";
                }}
              >
                <Navigation className="h-4 w-4" />
                Get Directions
              </a>

              <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white transition"
                style={{
                  backgroundColor: "var(--accent-primary)",
                  boxShadow: "0 8px 24px rgba(139,111,92,0.25)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "var(--accent-hover)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "var(--accent-primary)")
                }
              >
                RSVP Now
              </button>
            </div>
          </div>
        </motion.section>
      </div>

      {/* ─── RSVP Modal ─── */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm"
            style={{ backgroundColor: "rgba(60,45,35,0.4)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setOpen(false);
              setSubmitted(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-[2rem] p-6 shadow-2xl sm:p-8"
              style={{ backgroundColor: "var(--bg-card-solid)" }}
            >
              <button
                onClick={() => {
                  setOpen(false);
                  setSubmitted(false);
                }}
                className="absolute right-4 top-4 rounded-full p-2 transition"
                style={{ color: "var(--text-muted)" }}
              >
                <X className="h-5 w-5" />
              </button>

              {!submitted ? (
                <>
                  <h3
                    className="pr-10 font-serif text-3xl"
                    style={{ color: "var(--text-heading)" }}
                  >
                    RSVP
                  </h3>
                  <p
                    className="mt-2 text-sm"
                    style={{ color: "var(--text-accent)" }}
                  >
                    Kindly share your response below.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                    <div>
                      <label
                        className="mb-2 block text-sm font-medium"
                        style={{ color: "var(--text-accent)" }}
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        className="w-full rounded-2xl border-0 px-4 py-3 text-sm outline-none transition"
                        style={{
                          backgroundColor: "var(--bg-primary)",
                          color: "var(--text-primary)",
                          boxShadow: "inset 0 0 0 1px var(--ring-color)",
                        }}
                        onFocus={(e) =>
                          (e.target.style.boxShadow =
                            "inset 0 0 0 2px var(--accent-primary)")
                        }
                        onBlur={(e) =>
                          (e.target.style.boxShadow =
                            "inset 0 0 0 1px var(--ring-color)")
                        }
                      />
                    </div>

                    <div>
                      <label
                        className="mb-2 block text-sm font-medium"
                        style={{ color: "var(--text-accent)" }}
                      >
                        Attending?
                      </label>
                      <select
                        value={form.attending}
                        onChange={(e) =>
                          setForm({ ...form, attending: e.target.value })
                        }
                        className="w-full rounded-2xl border-0 px-4 py-3 text-sm outline-none transition"
                        style={{
                          backgroundColor: "var(--bg-primary)",
                          color: "var(--text-primary)",
                          boxShadow: "inset 0 0 0 1px var(--ring-color)",
                        }}
                      >
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>

                    <div>
                      <label
                        className="mb-2 block text-sm font-medium"
                        style={{ color: "var(--text-accent)" }}
                      >
                        Number of Guests
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={form.guests}
                        onChange={(e) =>
                          setForm({ ...form, guests: e.target.value })
                        }
                        className="w-full rounded-2xl border-0 px-4 py-3 text-sm outline-none transition"
                        style={{
                          backgroundColor: "var(--bg-primary)",
                          color: "var(--text-primary)",
                          boxShadow: "inset 0 0 0 1px var(--ring-color)",
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-full px-5 py-3 text-sm font-semibold text-white transition"
                      style={{ backgroundColor: "var(--accent-primary)" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          "var(--accent-hover)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          "var(--accent-primary)")
                      }
                    >
                      Submit
                    </button>
                  </form>
                </>
              ) : (
                <div className="py-10 text-center">
                  <h3
                    className="font-serif text-3xl"
                    style={{ color: "var(--text-heading)" }}
                  >
                    Thank you for RSVPing!
                  </h3>
                  <p
                    className="mt-3 text-sm"
                    style={{ color: "var(--text-accent)" }}
                  >
                    We look forward to celebrating with you.
                  </p>
                  <button
                    onClick={() => {
                      setOpen(false);
                      setSubmitted(false);
                    }}
                    className="mt-6 rounded-full px-5 py-3 text-sm font-semibold text-white"
                    style={{ backgroundColor: "var(--accent-primary)" }}
                  >
                    Close
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
