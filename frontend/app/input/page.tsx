"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
    Activity,
    ArrowRight,
    Ruler,
    Weight,
    CheckCircle2,
    ChevronDown,
    Calendar,
    HeartPulse,
    Check,
    Milestone
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const PatientInput = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        age: 50,
        gender: "2",
        height: 165,
        weight: 65,
        ap_hi: 120,
        ap_lo: 80,
        cholesterol: "1",
        gluc: "1",
        smoke: false,
        alco: false,
        active: true
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : (value === "" ? "" : Number(value) || value)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Validate inputs
        const requiredNumberFields = ['age', 'height', 'weight', 'ap_hi', 'ap_lo'];
        for (const field of requiredNumberFields) {
            const val = formData[field as keyof typeof formData];
            if (val === "" || val === null || isNaN(Number(val)) || Number(val) <= 0) {
                alert(`Please enter a valid positive number for ${field}`);
                setLoading(false);
                return;
            }
        }

        try {
            const payload = {
                ...formData,
                age: Number(formData.age) * 365,
                gender: Number(formData.gender),
                height: Number(formData.height),
                weight: Number(formData.weight),
                ap_hi: Number(formData.ap_hi),
                ap_lo: Number(formData.ap_lo),
                cholesterol: Number(formData.cholesterol),
                gluc: Number(formData.gluc),
                smoke: formData.smoke ? 1 : 0,
                alco: formData.alco ? 1 : 0,
                active: formData.active ? 1 : 0
            };

            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000";
            const response = await fetch(`${API_URL}/predict`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            if (data.error) throw new Error(data.error);

            // Store result in sessionStorage to pass to the result page
            sessionStorage.setItem("prediction_result", JSON.stringify({ input: formData, result: data }));
            router.push("/result");

        } catch (error: unknown) {
            console.error("Prediction Error:", error);
            if (error instanceof Error) {
                alert(error.message || "Prediction failed. Is the API server reachable?");
            } else {
                alert("Prediction failed. Is the API server reachable?");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative w-full">

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-7xl mx-auto space-y-16 pb-32 pt-12 px-6 relative z-10"
            >
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-100 pb-12">
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <h1 className="text-5xl font-medium text-zinc-950">CardioML Assessment</h1>
                            <p className="text-zinc-500 text-lg">Stratified physiological parameter serialization powered by over 70,000 clinically annotated records.</p>
                        </div>
                    </div>
                    <div className="group relative flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-50 border border-zinc-200 text-zinc-950 text-[11px] uppercase cursor-help transition-colors hover:bg-zinc-100 focus:outline-none" tabIndex={0}>
                        <div className="size-2 bg-green-500 rounded-full animate-pulse">
                            <div className="size-2 bg-green-500 rounded-full animate-ping" />
                        </div>
                        <span className="text-md">Server is running....</span>

                        <div className="absolute top-[calc(100%+8px)] right-0 w-max opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 bg-zinc-900 text-white font-medium text-[11px] px-3 py-2 rounded-lg shadow-xl z-[100] normal-case tracking-wide cursor-text">
                            https://mlbackend.jayvegad.xyz
                            <div className="absolute -top-1 right-5 w-3 h-3 bg-zinc-900 rotate-45 -z-10"></div>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-16">
                    <div className="space-y-16">
                        {/* Demographics */}
                        <section className="space-y-8">
                            <div className="space-y-2">
                                <div className="flex items-center gap-3 text-zinc-950">
                                    <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center border border-amber-100 italic font-serif text-lg text-amber-700">1</div>
                                    <h2 className="text-2xl font-medium">Physiological Demographics</h2>
                                </div>
                                <p className="text-sm text-zinc-500 ml-13 max-w-2xl">
                                    Essential patient profiles including age, gender, and baseline physiological markers used for initial risk stratification.
                                </p>
                            </div>

                            <div className="bg-white border border-zinc-200 p-8 rounded-[2rem] shadow-sm">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <FormGroup label="Age (Years)" icon={Calendar}>
                                        <input
                                            type="number"
                                            name="age"
                                            value={formData.age}
                                            onChange={handleChange}
                                            className="w-full bg-white border border-zinc-200 rounded-xl pl-12 pr-4 py-3.5 focus:shadow-inner focus:border-zinc-950 outline-none transition-all shadow-sm"
                                        />
                                    </FormGroup>

                                    <FormGroup label="Gender Identification">
                                        <div className="flex p-1 bg-zinc-50 rounded-xl border border-zinc-200 shadow-inner">
                                            <button
                                                type="button"
                                                className={`flex-1 py-3 rounded-lg text-md font-medium transition-all ${formData.gender === "1" ? "bg-white shadow-sm text-zinc-950" : "text-zinc-400 hover:text-zinc-600"}`}
                                                onClick={() => setFormData({ ...formData, gender: "1" })}
                                            >Male</button>
                                            <button
                                                type="button"
                                                className={`flex-1 py-3 rounded-lg text-md font-medium transition-all ${formData.gender === "2" ? "bg-white shadow-sm text-zinc-950" : "text-zinc-400 hover:text-zinc-600"}`}
                                                onClick={() => setFormData({ ...formData, gender: "2" })}
                                            >Female</button>
                                        </div>
                                    </FormGroup>

                                    <FormGroup label="Stature (Height cm)" icon={Ruler}>
                                        <input type="number" name="height" value={formData.height} onChange={handleChange} className="w-full bg-white border border-zinc-200 rounded-xl pl-12 pr-4 py-3.5 focus:shadow-inner focus:border-zinc-950 outline-none shadow-sm" />
                                    </FormGroup>

                                    <FormGroup label="Body Mass (Weight kg)" icon={Weight}>
                                        <input type="number" name="weight" value={formData.weight} onChange={handleChange} className="w-full bg-white border border-zinc-200 rounded-xl pl-12 pr-4 py-3.5 focus:shadow-inner focus:border-zinc-950 outline-none shadow-sm" />
                                    </FormGroup>
                                </div>
                            </div>
                        </section>

                        {/* Vitals */}
                        <section className="space-y-8">
                            <div className="space-y-2">
                                <div className="flex items-center gap-3 text-zinc-950">
                                    <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center border border-amber-100 italic font-serif text-lg text-amber-700">2</div>
                                    <h2 className="text-2xl font-medium">Hemodynamic Profiling</h2>
                                </div>
                                <p className="text-sm text-zinc-500 ml-13 max-w-2xl">
                                    Real-time vital signs and circulatory metrics to assess current cardiovascular stress levels and stability.
                                </p>
                            </div>

                            <div className="bg-white border border-zinc-200 p-8 rounded-[2rem] shadow-sm">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <FormGroup label="Systolic Pressure (mmHg)" icon={HeartPulse}>
                                        <input type="number" name="ap_hi" value={formData.ap_hi} onChange={handleChange} className="w-full bg-white border border-zinc-200 rounded-xl pl-12 pr-4 py-3.5 focus:shadow-inner focus:border-zinc-950 outline-none shadow-sm transition-all" />
                                    </FormGroup>
                                    <FormGroup label="Diastolic Pressure (mmHg)" icon={HeartPulse}>
                                        <input type="number" name="ap_lo" value={formData.ap_lo} onChange={handleChange} className="w-full bg-white border border-zinc-200 rounded-xl pl-12 pr-4 py-3.5 focus:shadow-inner focus:border-zinc-950 outline-none shadow-sm transition-all" />
                                    </FormGroup>
                                </div>
                            </div>
                        </section>

                        {/* Laboratory Results */}
                        <section className="space-y-8">
                            <div className="space-y-2">
                                <div className="flex items-center gap-3 text-zinc-950">
                                    <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center border border-amber-100 italic font-serif text-lg text-amber-700">3</div>
                                    <h2 className="text-2xl font-medium">Biometric Assays</h2>
                                </div>
                                <p className="text-sm text-zinc-500 ml-13 max-w-2xl">
                                    Detailed laboratory results and secondary biomarkers providing high-resolution data for diagnostic precision.
                                </p>
                            </div>

                            <div className="bg-white border border-zinc-200 p-8 rounded-[2rem] shadow-sm">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <FormGroup label="Cholesterol Analysis">
                                        <Select
                                            value={String(formData.cholesterol)}
                                            onValueChange={(val) => setFormData((prev) => ({ ...prev, cholesterol: val }))}
                                        >
                                            <SelectTrigger className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-6 focus:shadow-inner focus:ring-1 focus:ring-zinc-950 outline-none shadow-sm cursor-pointer hover:border-zinc-300 transition-all text-zinc-950 text-base data-[state=open]:border-zinc-300">
                                                <SelectValue placeholder="Select concentration..." />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-xl border-zinc-200 shadow-lg">
                                                <SelectItem value="1" className="py-3 px-4 rounded-lg cursor-pointer">Physiological Baseline (Normal)</SelectItem>
                                                <SelectItem value="2" className="py-3 px-4 rounded-lg cursor-pointer">Supra-Normal Elevation</SelectItem>
                                                <SelectItem value="3" className="py-3 px-4 rounded-lg cursor-pointer">Pathological Concentration</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormGroup>
                                    <FormGroup label="Glucose Concentration">
                                        <Select
                                            value={String(formData.gluc)}
                                            onValueChange={(val) => setFormData((prev) => ({ ...prev, gluc: val }))}
                                        >
                                            <SelectTrigger className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-6 focus:shadow-inner focus:ring-1 focus:ring-zinc-950 outline-none shadow-sm cursor-pointer hover:border-zinc-300 transition-all text-zinc-950 text-base data-[state=open]:border-zinc-300">
                                                <SelectValue placeholder="Select concentration..." />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-xl border-zinc-200 shadow-lg">
                                                <SelectItem value="1" className="py-3 px-4 rounded-lg cursor-pointer">Glycemic Baseline (Normal)</SelectItem>
                                                <SelectItem value="2" className="py-3 px-4 rounded-lg cursor-pointer">Post-Prandial Elevation</SelectItem>
                                                <SelectItem value="3" className="py-3 px-4 rounded-lg cursor-pointer">Pathological Hyperglycemia</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormGroup>
                                </div>
                            </div>
                        </section>

                        {/* Behavioral Checklist */}
                        <section className="space-y-8">
                            <div className="space-y-2">
                                <div className="flex items-center gap-3 text-zinc-950">
                                    <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center border border-amber-100 italic font-serif text-lg text-amber-700">4</div>
                                    <h2 className="text-2xl font-medium">Behavioral Checklist</h2>
                                </div>
                                <p className="text-sm text-zinc-500 ml-13 max-w-2xl">
                                    Lifestyle factors including tobacco use, alcohol consumption, and physical activity levels.
                                </p>
                            </div>

                            <div className="bg-white border border-zinc-200 p-8 rounded-[2rem] shadow-sm">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <CheckboxCard
                                        label="Active Tobacco Use"
                                        name="smoke"
                                        checked={formData.smoke}
                                        onChange={handleChange}
                                        description="Ongoing nicotine consumption"
                                    />
                                    <CheckboxCard
                                        label="Alcohol Consumption"
                                        name="alco"
                                        checked={formData.alco}
                                        onChange={handleChange}
                                        description="Regular ethanol intake"
                                    />
                                    <CheckboxCard
                                        label="Physiological Activity"
                                        name="active"
                                        checked={formData.active}
                                        onChange={handleChange}
                                        description="Consistency with cardio protocol"
                                    />
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="space-y-6 pt-12 border-t border-zinc-100 max-w-lg mx-auto">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex cursor-pointer bg-neutral-900 px-4 py-2 font-medium text-white shadow-[0px_0px_10px_0px_rgba(255,255,255,0.2)_inset] ring ring-white/20 ring-offset-2 ring-offset-neutral-900 transition-all duration-200 ring-inset hover:shadow-[0px_0px_20px_0px_rgba(255,255,255,0.4)_inset] hover:ring-white/40 active:scale-[0.98] dark:bg-white dark:text-black dark:shadow-[0px_0px_10px_0px_rgba(0,0,0,0.2)_inset] dark:ring-black/20 dark:ring-offset-white dark:hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.3)_inset] dark:hover:ring-black/50 h-14 w-full items-center justify-center rounded-lg text-center text-base sm:w-56 mx-auto gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Analyzing Matrix...
                                </span>
                            ) : (
                                <div className="flex items-center justify-center gap-2">
                                    <span className="text-xl font-normal">Predict Risk</span>
                                    <Milestone className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </div>
                            )}
                        </button>
                        <div className="mt-4 space-y-2">
                            <p className="text-[15px] text-red-500 text-center">
                                Please avoid fake requests — MY AWS COSTING GOING CRAZY
                            </p>
                        </div>
                    </div>
                </form >
            </motion.div >
        </div>
    );
};

function FormGroup({ label, children, icon: Icon }: { label: string, children: React.ReactNode, icon?: React.ElementType }) {
    return (
        <div className="space-y-4">
            <label className="text-[15px] text-black uppercase ml-1">{label}</label>
            <div className="relative group/field">
                {Icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within/field:text-zinc-950 transition-colors pointer-events-none">
                        <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                )}
                {children}
            </div>
        </div>
    );
}

function CheckboxCard({ label, name, checked, onChange, description }: { label: string, name: string, checked: boolean, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, description: string }) {
    return (
        <label
            className={cn(
                "block cursor-pointer p-6 rounded-2xl border transition-all duration-500",
                checked
                    ? "bg-white border-zinc-200 shadow-lg shadow-zinc-200/50 ring-1 ring-zinc-950/5 relative z-10 scale-[1.02]"
                    : "bg-white border-zinc-100 hover:border-zinc-200"
            )}
        >
            <input
                type="checkbox"
                name={name}
                checked={checked}
                onChange={onChange}
                className="sr-only"
            />
            <div className="flex items-center justify-between mb-3">
                <span className={cn("font-medium text-xl transition-colors", checked ? "text-zinc-950" : "text-zinc-800")}>{label}</span>
                <div className={`w-5 h-5 rounded flex items-center justify-center transition-all ${checked ? "bg-zinc-100text-zinc-950" : "border border-zinc-200"}`}>
                    {checked && <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }}><Check className="size-6 text-zinc-600" /></motion.div>}
                </div>
            </div>
            <p className={cn("text-[13px] transition-colors mt-2 leading-relaxed", checked ? "text-zinc-600" : "text-zinc-500")}>{description}</p>
            <input type="checkbox" name={name} checked={checked} onChange={onChange} className="hidden" />
        </label>
    );
}

export default PatientInput;
