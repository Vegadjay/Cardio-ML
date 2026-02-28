"use client";

import React from "react";
import { motion } from "motion/react";
import {
    BarChart3,
    TrendingUp,
    Users,
    Activity,
    BrainCircuit,
    ArrowUpRight,
    ArrowDownRight,
    FilePieChart,
    Search
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
} from "recharts";

const data = [
    { name: "Jan", accuracy: 94.2, records: 4500 },
    { name: "Feb", accuracy: 95.8, records: 5200 },
    { name: "Mar", accuracy: 95.1, records: 4800 },
    { name: "Apr", accuracy: 97.4, records: 6100 },
    { name: "May", accuracy: 98.2, records: 5900 },
    { name: "Jun", accuracy: 98.4, records: 7200 },
];

const Analytics = () => {
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
                        System Performance
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-5xl font-medium text-zinc-950">System Analytics</h1>
                        <p className="text-zinc-500 text-lg">Historical model performance and longitudinal data distribution metrics.</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-100 text-amber-600 text-[10px] font-bold uppercase">
                    <BrainCircuit className="w-3.5 h-3.5 text-amber-700" />
                    XGBoost Ensemble Active
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <MetricCard title="Model Sensitivity" value="98.4%" trend="+2.1%" positive={true} icon={BrainCircuit} />
                <MetricCard title="Clinical Record Volume" value="70,000" trend="+12%" positive={true} icon={Activity} />
                <MetricCard title="Assay Validation" value="512k" trend="+5.4k" positive={true} icon={Users} />
                <MetricCard title="Mean Latency" value="0.8s" trend="-0.2s" positive={true} icon={TrendingUp} />
            </div>

            {/* Expansive Charts Section */}
            <div className="grid grid-cols-1 gap-16">
                <div className="space-y-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-zinc-50 rounded-lg flex items-center justify-center border border-zinc-100 italic font-serif text-sm">λ</div>
                            <h2 className="text-2xl font-medium">Diagnostic Serialization Trends</h2>
                        </div>
                        <div className="flex items-center gap-4 text-[10px] font-bold uppercase text-zinc-400">
                            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-zinc-100" /> Log-Loss Recovery</span>
                            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-zinc-200" /> Sensitivity Threshold</span>
                        </div>
                    </div>
                    <div className="h-[450px] w-full border border-zinc-200 rounded-3xl p-8 bg-white shadow-sm hover:border-zinc-300 transition-all">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#000000" stopOpacity={0.05} />
                                        <stop offset="95%" stopColor="#000000" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#a1a1aa", fontWeight: 600 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#a1a1aa", fontWeight: 600 }} dx={-10} />
                                <Tooltip
                                    contentStyle={{ borderRadius: "16px", border: "1px solid #f4f4f5", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)", padding: "12px 16px" }}
                                    itemStyle={{ fontSize: "12px", fontWeight: "600", color: "#18181b" }}
                                    labelStyle={{ fontSize: "10px", fontWeight: "800", textTransform: "uppercase", color: "#a1a1aa", marginBottom: "4px" }}
                                />
                                <Area type="monotone" dataKey="accuracy" stroke="#09090b" strokeWidth={2.5} fillOpacity={1} fill="url(#colorAcc)" animationDuration={2000} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-zinc-50 rounded-lg flex items-center justify-center border border-zinc-100 italic font-serif text-sm">μ</div>
                        <h2 className="text-2xl font-medium">Clinical Record Volume</h2>
                    </div>
                    <div className="h-[450px] w-full border border-zinc-200 rounded-3xl p-8 bg-white shadow-sm hover:border-zinc-300 transition-all">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#a1a1aa", fontWeight: 600 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#a1a1aa", fontWeight: 600 }} dx={-10} />
                                <Tooltip
                                    cursor={{ fill: "#f8f8f8" }}
                                    contentStyle={{ borderRadius: "16px", border: "1px solid #f4f4f5", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)", padding: "12px 16px" }}
                                    itemStyle={{ fontSize: "12px", fontWeight: "600", color: "#18181b" }}
                                    labelStyle={{ fontSize: "10px", fontWeight: "800", textTransform: "uppercase", color: "#a1a1aa", marginBottom: "4px" }}
                                />
                                <Bar dataKey="records" fill="#09090b" radius={[4, 4, 0, 0]} barSize={50} animationDuration={2000} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

function MetricCard({ title, value, trend, positive, icon: Icon }: { title: string, value: string, trend: string, positive: boolean, icon: any }) {
    return (
        <div className="border border-zinc-200 shadow-sm rounded-2xl p-8 bg-white hover:border-amber-200 transition-all duration-500">
            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center border border-zinc-200 text-zinc-950">
                        <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    {positive ? (
                        <div className="flex items-center text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100/50">
                            <ArrowUpRight className="w-3 h-3 mr-1" />
                            {trend}
                        </div>
                    ) : (
                        <div className="flex items-center text-[10px] font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full border border-red-100/50">
                            <ArrowDownRight className="w-3 h-3 mr-1" />
                            {trend}
                        </div>
                    )}
                </div>
                <div className="space-y-1">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase">{title}</p>
                    <p className="text-3xl font-medium text-zinc-950">{value}</p>
                </div>
            </div>
        </div>
    );
}

export default Analytics;
