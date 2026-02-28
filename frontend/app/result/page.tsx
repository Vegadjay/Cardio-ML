"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
    Activity,
    AlertTriangle,
    CheckCircle,
    ArrowLeft,
    ChevronRight,
    HeartPulse,
    Droplets,
    Scale,
    Stethoscope,
    ShieldPlus,
    FileText,
    Download,
    Share2,
    Info,
    ArrowRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NumberTicker from "@/components/ui/number-ticker";
import { cn } from "@/lib/utils";

const PredictionResult = () => {
    const router = useRouter();
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const storedData = sessionStorage.getItem("prediction_result");
        if (storedData) {
            setData(JSON.parse(storedData));
        } else {
            router.push("/input");
        }
    }, [router]);

    if (!data) return null;

    const { result, input } = data;
    const probability = result.probability !== undefined ? result.probability * 100 : (result.prediction * 100);
    const isHighRisk = probability > 50;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-7xl mx-auto space-y-16 pb-32 pt-12 px-6"
        >
            {/* Clinical Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-zinc-100 pb-12">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[11px] font-semibold uppercase tracking-wider">
                        Diagnostic Assessment
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-5xl font-medium text-zinc-950">CardioML Report</h1>
                        <p className="text-zinc-500 text-lg">High-resolution risk stratification derived from the clinical XGBoost matrix.</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-11 rounded-xl px-5 border-zinc-200" onClick={() => window.print()}>
                        <Download className="w-4 h-4 mr-2" />
                        Export Protocol
                    </Button>
                    <Button variant="outline" className="h-11 rounded-xl px-5 border-zinc-200">
                        <Share2 className="w-4 h-4 mr-2" />
                        Staff Review
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                {/* Visual Probability Matrix */}
                <div className="lg:col-span-5 space-y-12">
                    <div className="relative group p-10 rounded-[2.5rem] border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-md">
                        <div className="flex flex-col items-center text-center space-y-10 py-2">
                            <div className="relative">
                                <svg className="w-64 h-64 transform -rotate-90">
                                    <circle
                                        cx="128"
                                        cy="128"
                                        r="116"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        fill="transparent"
                                        className="text-zinc-100"
                                    />
                                    <motion.circle
                                        cx="128"
                                        cy="128"
                                        r="116"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        fill="transparent"
                                        strokeDasharray={728.85}
                                        initial={{ strokeDashoffset: 728.85 }}
                                        animate={{ strokeDashoffset: 728.85 - (728.85 * probability) / 100 }}
                                        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                                        className={isHighRisk ? "text-rose-500" : "text-emerald-500"}
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-7xl font-medium text-zinc-950">
                                        <NumberTicker value={probability} />%
                                    </span>
                                    <span className="text-[11px] font-semibold uppercase text-zinc-950 mt-2 tracking-wider">Baseline Risk Score</span>
                                </div>
                            </div>

                            <div className="space-y-4 px-8">
                                <h2 className={cn(
                                    "text-3xl font-medium",
                                    isHighRisk ? "text-zinc-950" : "text-emerald-700"
                                )}>
                                    {isHighRisk ? "Clinically Significant Risk" : "Normal Physiological Risk"}
                                </h2>
                                <p className="text-zinc-500 text-base leading-relaxed">
                                    The CardioML matrix indicates a {isHighRisk ? "concentrated" : "nominal"} potential for an acute cardiovascular event based on 11 active markers.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 rounded-2xl bg-amber-50/50 border border-zinc-200 text-zinc-950 space-y-6 shadow-sm">
                        <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
                            <span className="text-[11px] font-semibold uppercase text-zinc-950 tracking-wider">Patient Serial</span>
                            <span className="text-sm font-mono text-zinc-500">#CMD-9823-AQ</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <p className="text-[11px] font-semibold uppercase text-zinc-950 mb-1 tracking-wider">Height</p>
                                <p className="text-xl font-medium">{input.height}cm</p>
                            </div>
                            <div>
                                <p className="text-[11px] font-semibold uppercase text-zinc-950 mb-1 tracking-wider">Weight</p>
                                <p className="text-xl font-medium">{input.weight}kg</p>
                            </div>
                            <div>
                                <p className="text-[11px] font-semibold uppercase text-zinc-950 mb-1 tracking-wider">BMI</p>
                                <p className="text-xl font-medium">{((input.weight / (input.height / 100) ** 2)).toFixed(1)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recommendations and Analytics */}
                <div className="lg:col-span-7 space-y-16">
                    <section className="space-y-8">
                        <div className="flex items-center gap-3 text-zinc-950">
                            <div className="w-8 h-8 bg-zinc-50 rounded-lg flex items-center justify-center border border-zinc-100">
                                <Stethoscope className="w-4 h-4" />
                            </div>
                            <h2 className="text-xl font-medium">Clinical Recommendations</h2>
                        </div>

                        <div className="grid gap-6">
                            <RecommendationItem
                                title="Comprehensive Diagnostic Panel"
                                description="Immediate scheduling of an echocardiogram and 12-lead ECG to validate active physiological markers."
                                highlight={isHighRisk}
                            />
                            <RecommendationItem
                                title="Lipid Profile Management"
                                description="Nutritional optimization targeting reduction in LDL concentration below 70mg/dL threshold."
                                highlight={false}
                            />
                            <RecommendationItem
                                title="Hemodynamic Monitoring"
                                description="Biannual Serialization of blood pressure markers to establish updated longitudinal baselines."
                                highlight={false}
                            />
                        </div>
                    </section>

                    <section className="space-y-8">
                        <div className="flex items-center gap-3 text-zinc-950">
                            <div className="w-8 h-8 bg-zinc-50 rounded-lg flex items-center justify-center border border-zinc-100">
                                <Activity className="w-4 h-4" />
                            </div>
                            <h2 className="text-xl font-medium">Physiological Loads</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <AnalysisMetric
                                icon={HeartPulse}
                                label="Cardiac Overload"
                                value={input.ap_hi > 140 ? "Elevated" : "Baseline"}
                                status={input.ap_hi > 140 ? "warning" : "success"}
                            />
                            <AnalysisMetric
                                icon={Droplets}
                                label="Glycemic Variance"
                                value={input.gluc === "1" ? "Regulated" : "Variant"}
                                status={input.gluc === "1" ? "success" : "warning"}
                            />
                        </div>
                    </section>
                </div>
            </div>
        </motion.div>
    );
};

function AnalysisMetric({ icon: Icon, label, value, status }: { icon: any, label: string, value: string, status: "success" | "warning" }) {
    return (
        <div className="flex items-center gap-6 p-6 rounded-2xl border border-zinc-200 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center border",
                status === "success" ? "bg-emerald-50 border-emerald-100 text-emerald-700" : "bg-zinc-50 border-zinc-200 text-zinc-900"
            )}>
                <Icon className="w-7 h-7" strokeWidth={1.5} />
            </div>
            <div className="space-y-1">
                <p className="text-[11px] font-semibold text-zinc-950 uppercase tracking-wider">{label}</p>
                <p className="text-2xl font-medium text-zinc-950">{value}</p>
            </div>
        </div>
    );
}

function RecommendationItem({ title, description, highlight }: { title: string, description: string, highlight: boolean }) {
    return (
        <div className={cn(
            "p-6 rounded-2xl border transition-all duration-500",
            highlight ? "bg-rose-50/50 border-rose-300 shadow-lg shadow-rose-200/20 scale-[1.01] relative z-10" : "bg-zinc-50/50 border-zinc-200 hover:border-zinc-300"
        )}>
            <div className="flex items-start gap-4">
                <div className={cn(
                    "mt-1.5 w-2 h-2 rounded-full shrink-0 animate-pulse",
                    highlight ? "bg-zinc-950" : "bg-zinc-300"
                )} />
                <div className="space-y-2">
                    <h4 className="text-base font-medium text-zinc-950">{title}</h4>
                    <p className="text-sm text-zinc-500 leading-relaxed font-normal">{description}</p>
                </div>
            </div>
        </div>
    );
}

export default PredictionResult;
