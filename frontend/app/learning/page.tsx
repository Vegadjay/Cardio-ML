"use client";

import React from "react";
import { motion } from "motion/react";
import { BrainCircuit, Cpu, Database, Layout, Server, Zap } from "lucide-react";

const fadeInUp = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

export default function LearningPage() {
    return (
        <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="space-y-16"
        >
            <section className="space-y-6">
                <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-[11px] font-semibold uppercase tracking-wider">
                    <Zap className="w-3 h-3" />
                    <span>Educational Insights</span>
                </motion.div>

                <motion.h1
                    variants={fadeInUp}
                    className="text-5xl font-medium text-zinc-950 leading-tight"
                >
                    Learning & Project <br />
                    <span className="text-zinc-400">Documentation.</span>
                </motion.h1>

                <motion.p
                    variants={fadeInUp}
                    className="max-w-3xl text-xl text-zinc-500 leading-relaxed font-normal"
                >
                    Detailed documentation on the 11 physiological markers, XGBoost ensemble classification, and the 70,000+ patient record dataset powering CardioML.
                </motion.p>
            </section>

            <section className="grid md:grid-cols-2 gap-12">
                <motion.div variants={fadeInUp} className="space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-medium text-zinc-950 flex items-center gap-3">
                            <BrainCircuit className="w-6 h-6 text-amber-500" />
                            Model Intelligence
                        </h2>
                        <p className="text-zinc-500 leading-relaxed">
                            CardioML utilizes a specialized XGBoost Gradient Boosting pipeline focused on binary cardiovascular risk classification.
                        </p>
                    </div>

                    <ul className="space-y-6">
                        <LearningItem
                            title="11 Core Physiological Markers"
                            description="Modeling age, gender, height, weight, systolic (ap_hi), diastolic (ap_lo), cholesterol (3 levels), glucose (3 levels), tobacco use, alcohol, and activity."
                        />
                        <LearningItem
                            title="XGBoost Ensemble"
                            description="Selected for its superior performance on tabular medical data, optimizing binary log-loss to maximize diagnostic sensitivity."
                        />
                        <LearningItem
                            title="Model Validation"
                            description="Employing cross-validation strategies with focus on diagnostic sensitivity (recall) and specificity for medical reliability."
                        />
                    </ul>
                </motion.div>

                <motion.div variants={fadeInUp} className="space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-medium text-zinc-950 flex items-center gap-3">
                            <Layout className="w-6 h-6 text-zinc-950" />
                            Technical Architecture
                        </h2>
                        <p className="text-zinc-500 leading-relaxed">
                            A high-performance stack designed for low-latency inference and professional-grade data visualization.
                        </p>
                    </div>

                    <div className="grid gap-4">
                        <ArchitectureCard
                            icon={Cpu}
                            title="Frontend Ecosystem"
                            tech="Next.js 16 / React 19 / Tailwind / Motion"
                            desc="Component-driven UI with fluid micro-interactions for reduced cognitive load."
                        />
                        <ArchitectureCard
                            icon={Server}
                            title="Backend Intelligence"
                            tech="Flask / Scikit-learn / Joblib / Gunicorn"
                            desc="Optimized REST API serving serialized predictive models with high concurrency."
                        />
                        <ArchitectureCard
                            icon={Database}
                            title="Data Science Pipeline"
                            tech="NumPy / Pandas / SciPy"
                            desc="Rigorous pre-processing and normalization of heterogeneous EMR data sources."
                        />
                    </div>
                </motion.div>
            </section>

            <motion.section variants={fadeInUp} className="pt-16 border-t border-zinc-100">
                <div className="bg-zinc-50 rounded-3xl p-10 md:p-14 space-y-8">
                    <h2 className="text-3xl font-medium text-zinc-950">Key Takeaways</h2>
                    <div className="grid md:grid-cols-3 gap-10">
                        <Takeaway
                            number="01"
                            title="70k Dataset Fidelity"
                            desc="The model is trained on a massive 70,000 record dataset, providing robust coverage of heterogeneous patient physiological profiles."
                        />
                        <Takeaway
                            number="02"
                            title="Inference Optimized"
                            desc="Maintaining mean inference latency below 0.8s on Gunicorn/Flask workers to ensure high real-time professional throughput."
                        />
                        <Takeaway
                            number="03"
                            title="Baseline Normalization"
                            desc="Every prediction is standardized through a MinMax scaler to ensure physiological outliers don't compromise risk scores."
                        />
                    </div>
                </div>
            </motion.section>
        </motion.div>
    );
}

function LearningItem({ title, description }: { title: string, description: string }) {
    return (
        <li className="flex gap-4">
            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
            <div className="space-y-1">
                <h3 className="font-medium text-zinc-900">{title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{description}</p>
            </div>
        </li>
    );
}

function ArchitectureCard({ icon: Icon, title, tech, desc }: { icon: any, title: string, tech: string, desc: string }) {
    return (
        <div className="p-6 rounded-2xl border border-zinc-200 bg-white hover:border-zinc-300 transition-all shadow-sm group">
            <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-950 group-hover:bg-amber-100 group-hover:text-amber-600 transition-colors">
                    <Icon className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="font-medium text-zinc-950 leading-tight">{title}</h3>
                    <p className="text-[11px] font-semibold text-zinc-950 uppercase tracking-wider mt-0.5">{tech}</p>
                </div>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed">{desc}</p>
        </div>
    );
}

function Takeaway({ number, title, desc }: { number: string, title: string, desc: string }) {
    return (
        <div className="space-y-4">
            <div className="text-4xl font-medium text-zinc-200 tabular-nums">{number}</div>
            <h3 className="text-xl font-medium text-zinc-950">{title}</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">{desc}</p>
        </div>
    );
}
