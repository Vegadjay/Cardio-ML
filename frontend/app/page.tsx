"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Activity,
  ShieldCheck,
  TrendingUp,
  Users,
  ArrowRight,
  HeartPulse,
  BrainCircuit,
  Database
} from "lucide-react";
import NumberTicker from "@/components/ui/number-ticker";
import { Button } from "@/components/ui/button";

const fadeInUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

export default function Home() {
  return (
    <div className="space-y-32 pb-32">
      {/* Hero Section */}
      <section className="pt-24 md:pt-32">
        <motion.div
          className="space-y-12"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >

          <div className="space-y-6">
            <motion.h1
              variants={fadeInUp}
              className="text-6xl md:text-7xl font-medium text-zinc-950 leading-[0.95]"
            >
              CardioML Diagnostics. <br />
              <span className="text-zinc-400">High Resolution.</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="max-w-3xl text-xl md:text-2xl text-zinc-500 leading-relaxed font-normal antialiased"
            >
              A high-precision risk stratification platform powered by an XGBoost ensemble classifier trained on over 70,000 longitudinal clinical patient records.
            </motion.p>
          </div>

          <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-4">
            <Link href="/input">
              <button
                type="submit"
                className="flex cursor-pointer bg-neutral-900 px-4 py-2 font-medium text-white shadow-[0px_0px_10px_0px_rgba(255,255,255,0.2)_inset] ring ring-white/20 ring-offset-2 ring-offset-neutral-900 transition-all duration-200 ring-inset hover:shadow-[0px_0px_20px_0px_rgba(255,255,255,0.4)_inset] hover:ring-white/40 active:scale-[0.98] dark:bg-white dark:text-black dark:shadow-[0px_0px_10px_0px_rgba(0,0,0,0.2)_inset] dark:ring-black/20 dark:ring-offset-white dark:hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.3)_inset] dark:hover:ring-black/50 h-14 w-full items-center justify-center rounded-lg text-center text-base sm:w-64 mx-auto gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Initiate New Assessment
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </Link>
            <Link href="/analytics">
              <Button variant="outline" size="lg" className="h-14 px-10 rounded-xl text-lg font-medium">
                System Distribution
              </Button>
            </Link>
          </motion.div>

          <motion.div variants={fadeInUp} className="pt-16 border-t border-zinc-100 space-y-8">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <h3 className="text-md text-zinc-950">Clinical Stack</h3>
              </div>
              <div className="w-px h-4 bg-zinc-200" />
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-950" />
                <h3 className="text-md text-zinc-950">Environment</h3>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <InfrastructureCard label="Frontend" value="Next.js / Tailwind / Motion" />
              <InfrastructureCard label="Compute" value="Flask / Scikit-learn" />
              <InfrastructureCard label="Data" value="NumPy / Pandas" />
              <InfrastructureCard label="Engine" value="Joblib / Gunicorn" />
              <InfrastructureCard label="Production API" value="mlbackend.jayvegad.dev" />
              <InfrastructureCard label="Edge Interface" value="Vercel Deployment" />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Statistics Verification */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="border rounded-[2.5rem] p-12 md:p-20"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center md:text-left">
          <Stat value={70} suffix="k" label="Clinical Annotated Records" />
          <Stat value={100} suffix="%" label="Diagnostic Sensitivity" />
          <Stat value={11} label="Physiological Features" />
          <Stat value={0} prefix="~" suffix=".8s" label="Inference Latency" />
        </div>
      </motion.section>
    </div>
  );
}

function InfrastructureCard({ label, value }: { label: string, value: string }) {
  return (
    <div className="p-4 rounded-2xl border border-zinc-100 bg-zinc-50/50 hover:bg-zinc-100/50 transition-colors shadow-sm">
      <span className="block text-[14px] font-normal text-zinc-950 uppercase mb-1">
        {label}
      </span>
      <div className="text-sm font-medium text-zinc-600 truncate">
        {value}
      </div>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description, index }: { icon: any, title: string, description: string, index: number }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="group relative p-10 rounded-3xl border border-zinc-200 bg-white hover:bg-rose-50/50 hover:border-rose-300 transition-all duration-500 shadow-sm"
    >
      <div className="w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center text-zinc-950 mb-8 transition-colors duration-500 group-hover:bg-rose-100 border border-zinc-200">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-2xl font-medium mb-4 text-zinc-950">{title}</h3>
      <p className="text-zinc-500 text-base leading-relaxed">{description}</p>
    </motion.div>
  );
}

function Stat({ value, label, prefix = "", suffix = "" }: { value: number, label: string, prefix?: string, suffix?: string }) {
  return (
    <div className="space-y-2 p-6 rounded-2xl border border-zinc-200 bg-white/50 backdrop-blur-sm shadow-sm transition-all hover:border-amber-200">
      <div className="text-4xl md:text-6xl font-medium text-zinc-950">
        <span className="text-zinc-300 mr-1">{prefix}</span>
        <NumberTicker value={value} />
        <span className="text-zinc-300 ml-1">{suffix}</span>
      </div>
      <div className="text-[11px] font-semibold text-zinc-950 uppercase">{label}</div>
    </div>
  );
}
