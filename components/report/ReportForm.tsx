"use client";
import { useState} from "react";
import { motion, AnimatePresence } from "framer-motion";

type ReportType = 'EMERGENCY' | 'NON_EMERGENCY';

//@ts-nocheck
interface ReportFormProps {
    onComplete: (data: any) => void;
}

const REPORT_TYPES = [
    "Theft",
    "Fire Outbreak",
    "Medical Emergency",
    "Natural Disaster",
    "Violence",
    "Other",
  ] as const;
  

export function ReportForm({onComplete}: ReportFormProps) {

    const [formData, setFormData] = useState({
        incidentType: "" as ReportType,
        specificType: "",
        location: "",
        description: "",
        title: "",
    });

    const [image, setImage] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [coordinates, setCoordinates] = useState<{
      latitude: number | null;
      longitude: number | null;
    }>({
      latitude: null,
      longitude: null,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [locationError, setLocationError] = useState<string | null>(null);
    const [isLoadingLocation, setIsLoadingLocation] = useState(false);

    console.log(onComplete, setImage, setIsAnalyzing, setIsSubmitting);

    const getCurrentLocation = () => {
        setIsLoadingLocation(true);
        setLocationError(null);

        if (!navigator.geolocation) {
            setLocationError("Geolocation is not supported by your browser");
            setIsLoadingLocation(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCoordinates({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
                setFormData(prev => ({
                    ...prev,
                    location: `${position.coords.latitude}, ${position.coords.longitude}`
                }));
                setIsLoadingLocation(false);
            },
            (error) => {
                setLocationError("Unable to retrieve your location");
                setIsLoadingLocation(false);
                console.log(error)
            }
        );
    };

    return (
        <motion.form 
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Emergency type selection */}
            <div className="grid grid-cols-2 gap-4">
                <motion.button 
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setFormData((prev) => ({...prev, incidentType: "EMERGENCY"}))}
                    className={`p-6 rounded-2xl border-2 transition-all duration-200 ${
                        formData.incidentType === "EMERGENCY"
                          ? "bg-red-500/20 border-red-500 shadow-lg shadow-red-500/20"
                          : "bg-zinc-900/50 border-zinc-800 hover:bg-red-500/10 hover:border-red-500/50"
                    }`}
                >
                    <div className="flex flex-col items-center space-y-2">
                        <svg
                            className="w-8 h-8 text-red-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                        <span className="font-medium text-red-500">Emergency</span>
                        <span className="text-xs text-zinc-400">
                            Immediate Response Required
                        </span>
                    </div>
                </motion.button>

                <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setFormData((prev) => ({ ...prev, incidentType: "NON_EMERGENCY" }))}
                    className={`p-6 rounded-2xl border-2 transition-all duration-200 ${
                        formData.incidentType === "NON_EMERGENCY"
                        ? "bg-orange-500/20 border-orange-500 shadow-lg shadow-orange-500/20"
                        : "bg-zinc-900/50 border-zinc-800 hover:bg-orange-500/10 hover:border-orange-500/50"
                    }`}
                >
                    <div className="flex flex-col items-center space-y-2">
                        <svg
                            className="w-8 h-8 text-orange-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                        </svg>
                        <span className="font-medium text-orange-500">Non-Emergency</span>
                        <span className="text-xs text-zinc-400">General Report</span>
                    </div>
                </motion.button>
            </div>

            <AnimatePresence>
                {formData.incidentType && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-6"
                    >
                        {/* Image Upload with enhanced styling */}
                        <motion.div 
                            className="relative group"
                            whileHover={{ scale: 1.01 }}
                        >
                            <input
                                type="file"
                                accept="image/*"
                                // onChange={handleImageUpload}
                                className="hidden"
                                id="image-upload"
                            />
                            <label
                                htmlFor="image-upload"
                                className="block w-full p-8 border-2 border-dashed border-zinc-700 rounded-2xl 
                                        hover:border-sky-500/50 hover:bg-sky-500/5 transition-all duration-200
                                        cursor-pointer text-center"
                            >
                            {image ? (
                                <div className="space-y-4">
                                <div className="w-full h-48 relative rounded-lg overflow-hidden">
                                    <img
                                    src={image}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                    />
                                </div>
                                <p className="text-sm text-zinc-400">Click to change image</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                <svg
                                    className="mx-auto h-12 w-12 text-zinc-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                                <p className="text-sm text-zinc-400">
                                    Drop an image here or click to upload
                                </p>
                                </div>
                            )}
                            </label>

                            {isAnalyzing && (
                                <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center">
                                    <div className="flex items-center space-x-3">
                                    <svg
                                        className="animate-spin h-5 w-5 text-sky-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        ></circle>
                                        <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    <span className="text-sky-500 font-medium">
                                        Analyzing image...
                                    </span>
                                    </div>
                                </div>
                            )}
                        </motion.div>

                        {/* Enhanced Report Type Selection */}
                        <motion.div
                            initial={{ x: -20 }}
                            animate={{ x: 0 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-zinc-400 mb-2">
                                    Incident Type
                                </label>
                                <select
                                    value={formData.specificType}
                                    onChange={(e) => setFormData((prev) => ({ 
                                        ...prev, 
                                        specificType: e.target.value 
                                    }))}
                                    className="w-full rounded-xl bg-zinc-900/50 border border-zinc-800 px-4 py-3.5
                                            text-white transition-all duration-200
                                            focus:outline-none focus:ring-2 focus:ring-sky-500/40
                                            hover:border-sky-500/50"
                                    required
                                >
                                    <option value="">Select type</option>
                                    {REPORT_TYPES.map((type) => (
                                        <option key={type} value={type}>
                                        {type}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Enhanced Location Input */}
                            <motion.div 
                                className="space-y-2"
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <label className="block text-sm font-medium text-zinc-400">
                                    Location
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={formData.location}
                                        onChange={(e) =>
                                            setFormData((prev) => ({ ...prev, location: e.target.value }))
                                        }
                                        placeholder="Enter location or use current location"
                                        className="flex-1 rounded-xl bg-zinc-900/50 border border-zinc-800 px-4 py-3.5
                                                text-white transition-colors duration-200
                                                focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={getCurrentLocation}
                                        className="px-4 py-2 rounded-xl bg-sky-500/10 text-sky-400 hover:bg-sky-500/20
                                                border border-sky-500/20 transition-colors duration-200"
                                    >
                                        {isLoadingLocation ? (
                                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                        ) : (
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                {locationError && (
                                    <p className="text-sm text-red-400">{locationError}</p>
                                )}
                                {coordinates.latitude && coordinates.longitude && (
                                    <p className="text-sm text-zinc-400">
                                        Coordinates: {coordinates.latitude}, {coordinates.longitude}
                                    </p>
                                )}
                            </motion.div>
                        </motion.div>

                        {/* Enhanced Title and Description */}
                        <motion.div 
                            className="space-y-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="group">
                                <label className="block text-sm font-medium text-zinc-400 mb-2 group-hover:text-sky-400 transition-colors">
                                    Report Title
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData((prev) => ({ 
                                        ...prev, 
                                        title: e.target.value 
                                    }))}
                                    className="w-full rounded-xl bg-zinc-900/50 border border-zinc-800 px-4 py-3.5
                                            text-white transition-all duration-200
                                            focus:outline-none focus:ring-2 focus:ring-sky-500/40
                                            hover:border-sky-500/50"
                                    required
                                />
                            </div>

                            <div className="group">
                                <label className="block text-sm font-medium text-zinc-400 mb-2 group-hover:text-sky-400 transition-colors">
                                    Description
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData((prev) => ({ 
                                        ...prev, 
                                        description: e.target.value 
                                    }))}
                                    rows={4}
                                    className="w-full rounded-xl bg-zinc-900/50 border border-zinc-800 px-4 py-3.5
                                            text-white transition-all duration-200
                                            focus:outline-none focus:ring-2 focus:ring-sky-500/40
                                            hover:border-sky-500/50"
                                    required
                                />
                            </div>
                        </motion.div>

                        {/* Enhanced Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 
                                    px-4 py-3.5 text-sm font-medium text-white shadow-lg
                                    transition-all duration-200 hover:from-sky-400 hover:to-blue-500
                                    disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <div className="relative flex items-center justify-center gap-2">
                            {isSubmitting ? (
                                <>
                                <svg
                                    className="animate-spin h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    ></circle>
                                    <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                <span>Submitting...</span>
                                </>
                            ) : (
                                <>
                                <span>Submit Report</span>
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
                                </>
                            )}
                            </div>
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.form>
    );
}