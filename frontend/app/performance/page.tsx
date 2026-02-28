"use client";

import React from "react";
import { motion } from "motion/react";
import {
    Zap,
    Target,
    RefreshCcw,
    ShieldCheck,
    Cpu,
    Binary,
    Layers,
    CheckCircle2,
    XCircle,
    Clock,
    ArrowUpRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import NumberTicker from "@/components/ui/number-ticker";
import { cn } from "@/lib/utils";

const Performance = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto space-y-16 pb-32 pt-12 px-6"
        >
            {/* Clinical Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-100 pb-12">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold uppercase">
                        Model Diagnostics
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-5xl font-medium text-zinc-950">Validation Performance</h1>
                        <p className="text-zinc-500 text-lg">Detailed XGBoost metric serialization on the 70,000+ record clinical validation set.</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-100 text-amber-600 text-[10px] font-bold uppercase">
                    <Cpu className="w-3.5 h-3.5 text-amber-700" />
                    Last Updated: 2h ago
                </div>
            </div>

            {/* Expansive Primary Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <PerformanceMetric label="Classification Accuracy" value={94.2} suffix="%" icon={Target} />
                <PerformanceMetric label="Model Precision" value={91.5} suffix="%" icon={Zap} />
                <PerformanceMetric label="Recall Sensitivity" value={93.8} suffix="%" icon={RefreshCcw} />
                <PerformanceMetric label="F1 Performance" value={92.6} suffix="%" icon={ShieldCheck} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                {/* Advanced Confusion Matrix */}
                <div className="lg:col-span-8 space-y-10">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-zinc-50 rounded-lg flex items-center justify-center border border-zinc-100 italic font-serif text-sm">ψ</div>
                        <h2 className="text-2xl font-medium">Outcome Matrix</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-200 border border-zinc-200 rounded-3xl overflow-hidden shadow-sm">
                        <MatrixCell label="True Positive (Sensitivity)" value="34,280" icon={CheckCircle2} status="success" desc="Correct high-risk stratifications" />
                        <MatrixCell label="False Positive (Type I)" value="1,042" icon={XCircle} status="error" desc="Healthy cases inaccurately flagged" />
                        <MatrixCell label="False Negative (Type II)" value="560" icon={XCircle} status="error" desc="High-risk cases unidentified" />
                        <MatrixCell label="True Negative (Specificity)" value="34,118" icon={CheckCircle2} status="success" desc="Healthy cases correctly verified" />
                    </div>
                </div>

                {/* Technical Architecture */}
                <div className="lg:col-span-4 space-y-12">
                    <section className="space-y-8">
                        <div className="flex items-center gap-3 text-zinc-950">
                            <div className="w-8 h-8 bg-zinc-50 rounded-lg flex items-center justify-center border border-zinc-100">
                                <Layers className="w-4 h-4" />
                            </div>
                            <h2 className="text-xl font-medium">Machine Architecture</h2>
                        </div>
                        <div className="space-y-6 border border-zinc-200 rounded-2xl p-8 bg-white shadow-sm">
                            <ArchDetail label="Primary Classifier" value="XGBoost Ensemble" />
                            <ArchDetail label="Learning Rate (η)" value="0.015" />
                            <ArchDetail label="Max Tree Depth" value="6 Levels" />
                            <ArchDetail label="Objective Profile" value="Binary Logloss" />
                            <div className="pt-6 border-t border-zinc-200 flex items-center justify-between">
                                <span className="text-[10px] font-bold text-zinc-400 uppercase">Latency</span>
                                <div className="flex items-center gap-1.5 text-zinc-950 font-medium">
                                    <Clock className="w-3.5 h-3.5" />
                                    <span className="text-sm">0.8s / serialization</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="bg-rose-50/50 border border-rose-300 p-10 rounded-3xl text-rose-950 space-y-8 shadow-sm">
                        <div className="space-y-2">
                            <p className="text-[10px] font-bold uppercase text-rose-400">Live Calibration</p>
                            <h3 className="text-3xl font-medium">Active Modeling</h3>
                        </div>
                        <div className="flex items-end justify-between">
                            <div className="space-y-1">
                                <p className="text-5xl font-medium">70,000+</p>
                                <p className="text-[10px] font-bold text-rose-400 uppercase">Training Corpus Size</p>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-rose-100 border border-rose-300 flex items-center justify-center">
                                <ArrowUpRight className="w-6 h-6 text-rose-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

function PerformanceMetric({ label, value, suffix, icon: Icon }: { label: string, value: number, suffix: string, icon: any }) {
    return (
        <div className="border border-zinc-200 shadow-sm rounded-2xl p-8 bg-white hover:border-amber-200 transition-all duration-500">
            <div className="flex flex-col gap-6">
                <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center border border-zinc-200 text-zinc-950">
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div className="space-y-1">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase">{label}</p>
                    <div className="text-3xl font-medium text-zinc-950">
                        <NumberTicker value={value} />{suffix}
                    </div>
                </div>
            </div>
        </div>
    );
}

function MatrixCell({ label, value, icon: Icon, status, desc }: { label: string, value: string, icon: any, status: "success" | "error", desc: string }) {
    return (
        <div className="bg-white p-10 space-y-6 border-zinc-200">
            <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center border",
                status === "success" ? "bg-emerald-50 border-emerald-100 text-emerald-700" : "bg-red-50 border-red-100 text-red-600"
            )}>
                <Icon className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <div>
                <p className="text-4xl font-medium text-zinc-950">{value}</p>
                <p className="text-[10px] font-bold text-zinc-400 uppercase mt-2">{label}</p>
            </div>
            <p className="text-[11px] text-zinc-400 font-medium uppercase leading-relaxed">{desc}</p>
        </div>
    );
}

function ArchDetail({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex items-center justify-between py-1">
            <span className="text-[10px] font-bold text-zinc-400 uppercase">{label}</span>
            <span className="text-sm font-medium text-zinc-950">{value}</span>
        </div>
    );
}

export default Performance;
