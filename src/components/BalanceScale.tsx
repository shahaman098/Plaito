'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Trophy, TrendingDown, TrendingUp, CircleDollarSign } from 'lucide-react';

interface BalanceScaleProps {
    longSymbol: string;
    shortSymbol: string;
    spread: number; // Positive = Long winning, Negative = Short winning (e.g. 2.5 means Long is up 2.5% vs Short)
}

export function BalanceScale({ longSymbol, shortSymbol, spread }: BalanceScaleProps) {
    // Clamp rotation to avoid flipping (max +/- 20 degrees)
    const rotation = Math.max(Math.min(spread * 5, 20), -20);

    // Calculate "chips" to stack (1 chip per 0.5%)
    const chipsCount = Math.floor(Math.abs(spread) / 0.5);
    const isLongWinning = spread > 0;
    const isShortWinning = spread < 0;

    return (
        <div className="w-full flex flex-col items-center justify-center p-8 bg-neutral-950/30 rounded-3xl border border-neutral-800/50 relative overflow-hidden">

            {/* Background Glow based on winner */}
            <div className={cn(
                "absolute inset-0 opacity-10 transition-colors duration-500 pointer-events-none",
                isLongWinning ? "bg-green-500" : isShortWinning ? "bg-red-500" : "bg-transparent"
            )} />

            <div className="relative w-full max-w-[300px] h-[160px] flex justify-center items-start pt-8">

                {/* The Fulcrum (Center Base) */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-24 bg-neutral-800 rounded-t-lg z-10 flex flex-col items-center justify-end pb-2">
                    <div className="w-8 h-1 bg-neutral-700 rounded-full mb-1" />
                    <div className="w-12 h-2 bg-neutral-900 rounded-t-full" />
                </div>

                {/* The Beam (Rotates) */}
                <div
                    className="relative w-full h-2 bg-neutral-700 rounded-full transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                    style={{ transform: `rotate(${rotation}deg)` }}
                >
                    {/* Center Pivot Point */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-neutral-600 rounded-full border-2 border-neutral-800 z-20" />

                    {/* Left Pan (Long) Connection */}
                    <div className="absolute left-2 top-1/2 w-[2px] h-16 bg-neutral-600/50 origin-top"
                        style={{ transform: `rotate(${-rotation}deg)` }}>

                        {/* The Pan Itself */}
                        <div className="absolute bottom-0 -left-6 w-12 h-2 bg-green-900/40 border-b-2 border-green-500/50 rounded-b-xl flex flex-col-reverse items-center justify-start gap-[1px]">
                            {/* Symbol Label */}
                            <div className="absolute top-full mt-2 text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                                {longSymbol}
                            </div>

                            {/* Stacked Chips (Long) */}
                            {isLongWinning && Array.from({ length: Math.min(chipsCount, 12) }).map((_, i) => (
                                <div
                                    key={i}
                                    className="w-8 h-1.5 bg-green-500 rounded-full shadow-[0_0_5px_rgba(34,197,94,0.5)] border-t border-white/20"
                                    style={{
                                        animation: `chip-drop 0.3s ease-out backwards`,
                                        animationDelay: `${i * 0.05}s`
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right Pan (Short) Connection */}
                    <div className="absolute right-2 top-1/2 w-[2px] h-16 bg-neutral-600/50 origin-top"
                        style={{ transform: `rotate(${-rotation}deg)` }}>

                        {/* The Pan Itself */}
                        <div className="absolute bottom-0 -right-6 w-12 h-2 bg-red-900/40 border-b-2 border-red-500/50 rounded-b-xl flex flex-col-reverse items-center justify-start gap-[1px]">
                            {/* Symbol Label */}
                            <div className="absolute top-full mt-2 text-[10px] font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                                {shortSymbol}
                            </div>

                            {/* Stacked Chips (Short) */}
                            {isShortWinning && Array.from({ length: Math.min(chipsCount, 12) }).map((_, i) => (
                                <div
                                    key={i}
                                    className="w-8 h-1.5 bg-red-500 rounded-full shadow-[0_0_5px_rgba(239,68,68,0.5)] border-t border-white/20"
                                    style={{
                                        animation: `chip-drop 0.3s ease-out backwards`,
                                        animationDelay: `${i * 0.05}s`
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

            </div>

            {/* Info Display */}
            <div className="flex gap-8 mt-12 text-center z-10">
                <div className={cn("transition-opacity duration-300", isLongWinning ? "opacity-100" : "opacity-30")}>
                    <div className="text-xs text-neutral-500">Long Spread</div>
                    <div className="text-green-400 font-mono font-bold">+{isLongWinning ? spread.toFixed(2) : "0.00"}%</div>
                </div>
                <div className={cn("transition-opacity duration-300", isShortWinning ? "opacity-100" : "opacity-30")}>
                    <div className="text-xs text-neutral-500">Short Spread</div>
                    <div className="text-red-400 font-mono font-bold">+{isShortWinning ? Math.abs(spread).toFixed(2) : "0.00"}%</div>
                </div>
            </div>

        </div>
    );
}
