import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, UserCheck, Inbox, FileText, Download } from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

export default function Dashboard() {
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchRsvps() {
      try {
        const response = await fetch("/api/rsvps");
        if (!response.ok) throw new Error("Failed to fetch RSVPs");
        const data = await response.json();
        setRsvps(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load RSVPs. Make sure the backend server is running.");
      } finally {
        setLoading(false);
      }
    }
    fetchRsvps();
  }, []);

  const totalResponses = rsvps.length;
  const attendingRsvps = rsvps.filter((r) => r.attending === "Yes");
  const totalGuests = attendingRsvps.reduce((acc, curr) => acc + curr.guests, 0);

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Mafeeda Manzil RSVP List", 14, 15);
    doc.autoTable({
      startY: 20,
      head: [["Date", "Name", "Attending", "Guests"]],
      body: rsvps.map((rsvp) => [
        new Date(rsvp.created_at).toLocaleDateString(),
        rsvp.name,
        rsvp.attending,
        rsvp.attending === "Yes" ? rsvp.guests : "-",
      ]),
    });
    doc.save("Mafeeda_Manzil_RSVPs.pdf");
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      rsvps.map((rsvp) => ({
        Date: new Date(rsvp.created_at).toLocaleDateString(),
        Name: rsvp.name,
        Attending: rsvp.attending,
        Guests: rsvp.attending === "Yes" ? rsvp.guests : "-",
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "RSVPs");
    XLSX.writeFile(wb, "Mafeeda_Manzil_RSVPs.xlsx");
  };

  return (
    <div className="min-h-screen bg-taupe-950 px-5 py-12 text-taupe-100 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-5xl">
        
        {/* Header */}
        <div className="mb-10 text-center flex flex-col items-center">
          <h1 className="gold-accent font-serif text-4xl font-bold tracking-tight sm:text-5xl">
            RSVP Dashboard
          </h1>
          <p className="mt-2 text-taupe-300">Mafeeda Manzil Housewarming</p>
        </div>

        {/* Stats Row */}
        <div className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <StatCard
            icon={Inbox}
            label="Total Responses"
            value={totalResponses}
          />
          <StatCard
            icon={UserCheck}
            label="Attending"
            value={attendingRsvps.length}
          />
          <StatCard
            icon={Users}
            label="Total Guests Expected"
            value={totalGuests}
          />
        </div>

        {/* Main Content Area */}
        <div className="soft-card overflow-hidden rounded-3xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-taupe-800/50 bg-taupe-900/40 px-6 py-5 gap-4">
            <h2 className="font-serif text-xl font-semibold text-champagne-100">
              Recent RSVPs
            </h2>
            <div className="flex gap-3">
              <button
                onClick={exportToPDF}
                className="inline-flex items-center gap-2 rounded-lg border border-taupe-700 bg-taupe-800 px-4 py-2 text-sm font-medium text-champagne-200 transition-colors hover:bg-taupe-700"
              >
                <FileText className="h-4 w-4" />
                PDF
              </button>
              <button
                onClick={exportToExcel}
                className="inline-flex items-center gap-2 rounded-lg border border-taupe-700 bg-taupe-800 px-4 py-2 text-sm font-medium text-champagne-200 transition-colors hover:bg-taupe-700"
              >
                <Download className="h-4 w-4" />
                Excel
              </button>
            </div>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="py-12 text-center text-taupe-400">Loading data...</div>
            ) : error ? (
              <div className="rounded-xl border border-red-500/30 bg-red-900/20 p-6 text-center text-red-300">
                {error}
              </div>
            ) : rsvps.length === 0 ? (
              <div className="py-12 text-center text-taupe-400">
                No RSVPs yet. They will appear here once submitted.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-taupe-800/50 text-champagne-400/80">
                      <th className="pb-4 font-medium uppercase tracking-wider">Date</th>
                      <th className="pb-4 font-medium uppercase tracking-wider">Name</th>
                      <th className="pb-4 font-medium uppercase tracking-wider">Attending</th>
                      <th className="pb-4 font-medium uppercase tracking-wider">Guests</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-taupe-800/30">
                    {rsvps.map((rsvp) => (
                      <motion.tr
                        key={rsvp.id || rsvp.name + rsvp.created_at}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="transition-colors hover:bg-taupe-900/30"
                      >
                        <td className="py-4 text-taupe-400">
                          {new Date(rsvp.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-4 font-medium text-taupe-100">
                          {rsvp.name}
                        </td>
                        <td className="py-4">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              rsvp.attending === "Yes"
                                ? "bg-green-900/40 text-green-300 border border-green-500/30"
                                : "bg-red-900/40 text-red-300 border border-red-500/30"
                            }`}
                          >
                            {rsvp.attending}
                          </span>
                        </td>
                        <td className="py-4 text-champagne-200">
                          {rsvp.attending === "Yes" ? rsvp.guests : "-"}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="soft-card flex items-center gap-5 rounded-2xl p-6"
    >
      <div
        className="flex h-12 w-12 items-center justify-center rounded-xl bg-taupe-800"
        style={{ border: "1px solid rgba(208,175,131,0.2)" }}
      >
        <Icon className="h-6 w-6 text-champagne-400" strokeWidth={1.5} />
      </div>
      <div>
        <p className="text-sm font-medium text-taupe-400">{label}</p>
        <p className="font-serif text-3xl font-semibold text-champagne-100">
          {value}
        </p>
      </div>
    </motion.div>
  );
}
