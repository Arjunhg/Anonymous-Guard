"use client";
import { motion } from "framer-motion";

// @ts-ignore: Will be handled dynamically
interface ReportSubmittedProps {
  data: any;
  onComplete: (data: any) => void;
}

export function ReportFormCompleted({ data }: ReportSubmittedProps) {
  const reportId = data.reportId || "ERROR-ID-NOT-FOUND";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center space-y-8"
    >
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.1 
        }}
        className="flex flex-col items-center"
      >
        <div className="bg-green-500/10 rounded-full p-6 border-2 border-green-500/20 shadow-lg shadow-green-500/10">
          <motion.svg
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
            className="w-20 h-20 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </motion.svg>
        </div>
        <motion.h3 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-2xl font-medium bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent"
        >
          Report Successfully Submitted
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-3 text-zinc-400"
        >
          Your report has been securely transmitted to law enforcement
        </motion.p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-zinc-800/50 rounded-2xl p-8 max-w-md mx-auto border border-white/5 backdrop-blur-sm"
      >
        <h4 className="text-white font-medium mb-4">Your Report ID</h4>
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-zinc-900/80 rounded-xl p-4 border border-sky-500/20 shadow-lg shadow-sky-500/10"
        >
          <code className="text-sky-400 text-lg font-mono">{reportId}</code>
        </motion.div>
        <p className="mt-4 text-sm text-zinc-400 leading-relaxed">
          Save this ID to check your report status or communicate securely with
          law enforcement
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="pt-6"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => (window.location.href = "/")}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 
                    px-6 py-3.5 text-sm font-medium text-white shadow-lg
                    transition-all duration-200 hover:from-sky-400 hover:to-blue-500
                    group relative overflow-hidden"
        >
          <span>Return to Home</span>
          <svg
            className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}