"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Report, ReportStatus, ReportType } from "@prisma/client";
import { signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/auth/signin');
    },
  });

  const [reports, setReports] = useState<Report[]>([]);
  const [filter, setFilter] = useState<ReportStatus | "ALL">("ALL");
  const [typeFilter, setTypeFilter] = useState<ReportType | "ALL">("ALL");
  const [isLoading, setIsLoading] = useState(true);

  // Initialize reports fetching only after session is available
  useEffect(() => {
    if (sessionStatus === "authenticated") {
      fetchReports();
    }
  }, [sessionStatus]);

  // Handle sign out with redirection
  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // for admins
  const fetchReports = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/reports");
      const data = await response.json();
      setReports(data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateReportStatus = async (
    reportId: string,
    newStatus: ReportStatus
  ) => {
    try {
      const response = await fetch(`/api/reports/${reportId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Error updating status:", error);
        return;
      }

      fetchReports();
    } catch (error) {
      console.error("Error updating report:", error);
    }
  };

  const getStatusColor = (status: ReportStatus) => {
    const colors = {
      PENDING: "bg-amber-500/10 text-amber-500 border border-amber-500/20",
      IN_PROGRESS: "bg-blue-500/10 text-blue-500 border border-blue-500/20",
      RESOLVED: "bg-blue-500/10 text-blue-500 border border-blue-500/20",
      DISMISSED:
        "bg-neutral-500/10 text-neutral-400 border border-neutral-500/20",
    };
    return colors[status];
  };

  // Loading state handling
  if (sessionStatus === "loading" || isLoading) {
    return (
      <div className="relative min-h-screen bg-black selection:bg-sky-500/20">
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.03),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.04),transparent_70%)]" />
        </div>
        <div className="flex items-center justify-center min-h-screen">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="h-12 w-12 rounded-full border-2 border-sky-500/20 border-t-sky-500 animate-spin" />
            <p className="text-sky-400">Loading dashboard...</p>
          </motion.div>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated

  // Safe to access reports array now
  const filteredReports = reports?.filter((report) => {
    const statusMatch = filter === "ALL" || report.status === filter;
    const typeMatch = typeFilter === "ALL" || report.type === typeFilter;
    return statusMatch && typeMatch;
  }) || [];

  return (
    <div className="relative min-h-screen bg-black selection:bg-sky-500/20">
      {/* Gradient Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.03),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.04),transparent_70%)]" />
      </div>

      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="border-b border-white/5 bg-zinc-900/50 backdrop-blur-xl sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <motion.h1 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent"
            >
              Admin Dashboard
            </motion.h1>
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex items-center gap-6"
            >
              <span className="text-zinc-400">{session?.user?.name || "Admin"}</span>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSignOut}
                className="px-4 py-2 text-sm font-medium rounded-xl bg-zinc-900/50 border border-white/5
                          hover:bg-sky-500/10 hover:border-sky-500/50 transition-all duration-200"
              >
                Sign out
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8 flex flex-wrap gap-4 items-center justify-between"
        >
          <div className="flex gap-4">
            {/* Enhanced Select Styling */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as ReportStatus | "ALL")}
              className="bg-zinc-900/50 border border-white/5 text-white rounded-xl px-4 py-3.5
                      transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500/40
                      hover:border-sky-500/50"
            >
              <option value="ALL">All Statuses</option>
              {Object.values(ReportStatus).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as ReportType | "ALL")}
              className="bg-zinc-900/50 border border-white/5 text-white rounded-xl px-4 py-3.5
                      transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500/40
                      hover:border-sky-500/50"
            >
              <option value="ALL">All Types</option>
              {Object.values(ReportType).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="text-zinc-400 bg-sky-500/10 px-4 py-2 rounded-full border border-sky-500/20">
            {filteredReports.length} Reports
          </div>
        </motion.div>

        <motion.div 
          className="grid gap-4"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          animate="show"
        >
          <AnimatePresence mode="wait">
            {filteredReports.map((report, index) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/5
                          hover:border-sky-500/50 transition-all duration-200"
              >
                <div className="flex justify-between items-start gap-6">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-3">
                      <h2 className="text-lg font-medium text-neutral-200">
                        {report.title}
                      </h2>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          report.status
                        )}`}
                      >
                        {report.status}
                      </span>
                    </div>
                    <p className="text-neutral-400 text-sm">
                      {report.description}
                    </p>
                    <div className="flex flex-wrap gap-6 text-sm text-neutral-500">
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-neutral-800 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-neutral-600"></div>
                        </div>
                        {report.type}
                      </span>
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-neutral-800 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-neutral-600"></div>
                        </div>
                        {report.location || "N/A"}
                      </span>
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-neutral-800 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-neutral-600"></div>
                        </div>
                        {new Date(report.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    {report.image && (
                      <img
                        src={report.image}
                        alt="Report"
                        className="mt-4 rounded-lg border border-neutral-800"
                      />
                    )}
                  </div>
                  <motion.select
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    value={report.status}
                    onChange={(e) =>
                      updateReportStatus(
                        report.reportId, // Change this from report.id to report.reportId
                        e.target.value as ReportStatus
                      )
                    }
                    className="bg-zinc-900/50 border border-white/5 text-white rounded-xl px-4 py-3.5
                            transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500/40
                            hover:border-sky-500/50"
                  >
                    {Object.values(ReportStatus).map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </motion.select>
                </div>
              </motion.div>
            ))}

            {filteredReports.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 text-zinc-400 bg-zinc-900/50 rounded-2xl border border-white/5"
              >
                No reports found matching the selected filters.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.main>
    </div>
  );
}