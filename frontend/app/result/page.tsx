"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
    Activity,
    AlertTriangle,
    CheckCircle,
    ArrowLeft,
    HeartPulse,
    Droplets,
    Stethoscope,
    ShieldPlus,
    Download,
    User,
    Syringe
} from "lucide-react";
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
    const probability = result.risk_score !== undefined ? result.risk_score : (result.prediction * 100);
    const isHighRisk = probability > 50;

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto space-y-12 pb-32 pt-12 px-6"
        >
            {/* Clinical Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-zinc-100 pb-8">
                <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-[11px] uppercase">
                        Diagnostic Assessment Complete
                    </div>
                    <div className="space-y-1.5">
                        <h1 className="text-4xl text-zinc-950">CardioML Report</h1>
                        <p className="text-zinc-500 text-base max-w-lg">High-resolution risk stratification derived from the clinical XGBoost matrix.</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="h-10 rounded-xl px-4 border-zinc-200 shadow-sm transition-all hover:bg-zinc-50 hover:text-zinc-900 font-normal" onClick={() => window.print()}>
                        <Download className="w-4 h-4 mr-2" />
                        Export PDF
                    </Button>
                </div>
            </div>

            {/* 1. Main Risk Score Feature */}
            <section className="relative overflow-hidden p-8 sm:p-14 rounded-[2.5rem] border border-zinc-200 bg-white shadow-sm flex flex-col items-center text-center transition-all hover:shadow-md">
                {/* Decorative background blur */}
                <div className={cn(
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-120 h-120 rounded-full blur-[120px] opacity-10 pointer-events-none transition-colors duration-1000",
                    isHighRisk ? "bg-rose-500" : "bg-emerald-500"
                )} />

                <div className="relative z-10 w-full max-w-xl flex flex-col items-center">
                    <div className="relative mb-10 group cursor-default">
                        <svg viewBox="0 0 288 288" className="w-56 h-56 sm:w-72 sm:h-72 transform -rotate-90 transition-transform duration-500 group-hover:scale-105">
                            <circle
                                cx="144"
                                cy="144"
                                r="130"
                                stroke="currentColor"
                                strokeWidth="6"
                                fill="transparent"
                                className="text-zinc-50"
                            />
                            <motion.circle
                                cx="144"
                                cy="144"
                                r="130"
                                stroke="currentColor"
                                strokeWidth="6"
                                fill="transparent"
                                strokeDasharray={816.8}
                                initial={{ strokeDashoffset: 816.8 }}
                                animate={{ strokeDashoffset: 816.8 - (816.8 * probability) / 100 }}
                                transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                                strokeLinecap="round"
                                className={isHighRisk ? "text-rose-500" : "text-emerald-500"}
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-[4.5rem] sm:text-[5.5rem] leading-none text-zinc-950">
                                <NumberTicker value={probability} />%
                            </span>
                            <span className="text-xs uppercase text-zinc-400 mt-2 sm:mt-3">Risk Score</span>
                        </div>
                    </div>

                    <div className="space-y-5 flex flex-col items-center">
                        <div className={cn(
                            "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm border transition-colors",
                            isHighRisk ? "bg-rose-50 border-rose-100 text-rose-700" : "bg-emerald-50 border-emerald-100 text-emerald-700"
                        )}>
                            {isHighRisk ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                            {isHighRisk ? "Clinically Significant Risk" : "Normal Physiological Risk"}
                        </div>
                        <p className="text-zinc-500 text-base sm:text-lg leading-relaxed max-w-md mx-auto">
                            The CardioML matrix indicates a <span className={cn(isHighRisk ? "text-rose-600" : "text-emerald-600")}>{isHighRisk ? "concentrated" : "nominal"}</span> potential for an acute cardiovascular event based on your active clinical markers.
                        </p>
                    </div>
                </div>
            </section>

            {/* 2. Patient Profile Bar */}
            <section className="bg-zinc-50/80 border border-zinc-200 rounded-[2rem] p-6 sm:px-10 sm:py-8 flex flex-col sm:flex-row items-center justify-between gap-8 transition-all hover:bg-zinc-50">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="w-12 h-12 bg-white rounded-2xl border border-zinc-200 flex items-center justify-center shrink-0 shadow-sm">
                        <User className="w-5 h-5 text-zinc-600" />
                    </div>
                    <div>
                        <p className="text-[10px] uppercase text-zinc-500 mb-1">Patient ID</p>
                        <p className="text-sm font-mono text-zinc-950">#CMD-9823-AQ</p>
                    </div>
                </div>

                <div className="w-full sm:w-px h-px sm:h-12 bg-zinc-200 shrink-0" />

                <div className="grid grid-cols-3 gap-6 sm:gap-14 w-full sm:w-auto">
                    <div>
                        <p className="text-[10px] uppercase text-zinc-500 mb-1.5">Height</p>
                        <p className="text-xl text-zinc-950">{input.height}<span className="text-sm text-zinc-400 font-normal ml-1">cm</span></p>
                    </div>
                    <div>
                        <p className="text-[10px] uppercase text-zinc-500 mb-1.5">Weight</p>
                        <p className="text-xl text-zinc-950">{input.weight}<span className="text-sm text-zinc-400 font-normal ml-1">kg</span></p>
                    </div>
                    <div>
                        <p className="text-[10px] uppercase text-zinc-500 mb-1.5">BMI</p>
                        <p className="text-xl text-zinc-950">{((input.weight / (input.height / 100) ** 2)).toFixed(1)}</p>
                    </div>
                </div>
            </section>

            {/* 3. Physiological Loads */}
            <section className="space-y-6">
                <div className="flex items-center gap-3 text-zinc-950 px-1">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-zinc-100 text-zinc-600">
                        <Activity className="w-4 h-4" />
                    </div>
                    <h2 className="text-xl">Physiological Loads</h2>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                    <AnalysisMetric
                        icon={HeartPulse}
                        label="Cardiac Overload"
                        value={input.ap_hi > 140 ? "Elevated" : "Baseline"}
                        status={input.ap_hi > 140 ? "warning" : "success"}
                        detail={`Systolic BP: ${input.ap_hi} mmHg`}
                    />
                    <AnalysisMetric
                        icon={Droplets}
                        label="Glycemic Variance"
                        value={Number(input.gluc) === 1 ? "Regulated" : "Variant"}
                        status={Number(input.gluc) === 1 ? "success" : "warning"}
                        detail={Number(input.gluc) === 1 ? "Within normal limits" : "Above normal threshold"}
                    />
                </div>
            </section>

            {/* 4. Recommendations */}
            <section className="space-y-6">
                <div className="flex items-center gap-3 text-zinc-950 px-1">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-zinc-100 text-zinc-600">
                        <Stethoscope className="w-4 h-4" />
                    </div>
                    <h2 className="text-xl">Clinical Recommendations</h2>
                </div>

                <div className="grid gap-4">
                    <RecommendationItem
                        icon={Syringe}
                        title="Comprehensive Diagnostic Panel"
                        description="Immediate scheduling of an echocardiogram and 12-lead ECG to validate active physiological markers."
                        highlight={isHighRisk}
                    />
                    <RecommendationItem
                        icon={ShieldPlus}
                        title="Lipid Profile Management"
                        description="Nutritional optimization targeting reduction in LDL concentration below 70mg/dL threshold."
                        highlight={false}
                    />
                    <RecommendationItem
                        icon={HeartPulse}
                        title="Hemodynamic Monitoring"
                        description="Biannual Serialization of blood pressure markers to establish updated longitudinal baselines."
                        highlight={false}
                    />
                </div>
            </section>

            {/* 5. Bottom Navigation Actions */}
            <div className="pt-10 flex flex-col items-center justify-center gap-4">
                <button
                    onClick={() => router.push("/input")}
                    type="button"
                    className="flex cursor-pointer bg-neutral-900 px-4 py-2 font-medium text-white shadow-[0px_0px_10px_0px_rgba(255,255,255,0.2)_inset] ring ring-white/20 ring-offset-2 ring-offset-neutral-900 transition-all duration-200 ring-inset hover:shadow-[0px_0px_20px_0px_rgba(255,255,255,0.4)_inset] hover:ring-white/40 active:scale-[0.98] dark:bg-white dark:text-black dark:shadow-[0px_0px_10px_0px_rgba(0,0,0,0.2)_inset] dark:ring-black/20 dark:ring-offset-white dark:hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.3)_inset] dark:hover:ring-black/50 h-14 w-full items-center justify-center rounded-lg text-center text-base sm:w-64 gap-3 group disabled:opacity-50 disabled:cursor-not-allowed mx-auto"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Run Another Assessment
                </button>
                <p className="text-xs text-zinc-400 uppercase flex items-center gap-2 mt-4">
                    <CheckCircle className="w-3 h-3" /> Report Generated Securely
                </p>
            </div>
        </motion.div>
    );
};

function AnalysisMetric({ icon: Icon, label, value, status, detail }: { icon: any, label: string, value: string, status: "success" | "warning", detail: string }) {
    return (
        <div className="flex items-start gap-4 p-6 rounded-[1.5rem] border border-zinc-200 bg-white shadow-sm hover:shadow-md transition-all group">
            <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center border shrink-0 transition-colors",
                status === "success"
                    ? "bg-emerald-50 border-emerald-100 text-emerald-600 group-hover:bg-emerald-100"
                    : "bg-amber-50 border-amber-200 text-amber-600 group-hover:bg-amber-100"
            )}>
                <Icon className="w-5 h-5" strokeWidth={2} />
            </div>
            <div className="space-y-1.5 pt-0.5">
                <p className="text-[10px] text-zinc-400 uppercase">{label}</p>
                <div className="flex items-center gap-2">
                    <p className="text-lg text-zinc-950">{value}</p>
                    {status === "warning" && (
                        <span className="flex w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    )}
                </div>
                <p className="text-sm text-zinc-500">{detail}</p>
            </div>
        </div>
    );
}

function RecommendationItem({ icon: Icon, title, description, highlight }: { icon: any, title: string, description: string, highlight: boolean }) {
    return (
        <div className={cn(
            "p-6 sm:p-7 rounded-[1.5rem] border transition-all duration-300",
            highlight
                ? "bg-rose-50/60 border-rose-200 shadow-sm"
                : "bg-white border-zinc-200 hover:border-zinc-300 hover:shadow-sm"
        )}>
            <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border",
                    highlight
                        ? "bg-white border-rose-200 text-rose-600 shadow-sm"
                        : "bg-zinc-50 border-zinc-200 text-zinc-500"
                )}>
                    <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-2 pt-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <h4 className="text-base text-zinc-950">{title}</h4>
                        {highlight && (
                            <span className="inline-flex w-fit py-0.5 px-2.5 rounded-full bg-rose-100 border border-rose-200 text-rose-700 text-[10px] uppercase">
                                Priority Action
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-zinc-500 leading-relaxed font-normal">{description}</p>
                </div>
            </div>
        </div>
    );
}

export default PredictionResult;
