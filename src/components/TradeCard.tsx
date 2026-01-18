'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { pearApi, Position } from '@/lib/pear-api';
import { cn } from '@/lib/utils';
import { BalanceScale } from './BalanceScale';
import { TrendingUp, TrendingDown, Wand2, Loader2, RefreshCw, Key, ShieldCheck, Wallet, Clock, Trophy, AlertTriangle } from 'lucide-react';
import { useQuery, useMutation } from '@tanstack/react-query';

const PRESETS = [
    { id: 'ai-vs-eth', name: 'AI vs ETH', long: 'FET', short: 'ETH', desc: 'AI Narrative outperforms ETH' },
    { id: 'sol-vs-btc', name: 'SOL vs BTC', long: 'SOL', short: 'BTC', desc: 'Solana flips Bitcoin dominance' },
    { id: 'meme-vs-l2', name: 'Memes vs L2s', long: 'PEPE', short: 'ARB', desc: 'Memecoins run harder than L2s' },
];

const STAKES = [10, 50, 100];
const EXPIRIES = [
    { label: '24h', val: '24 Hours' },
    { label: '7d', val: '7 Days' }
];

export function TradeCard() {
    const { address, isConnected } = useAccount();

    // Prediction State
    const [selectedPreset, setSelectedPreset] = useState(PRESETS[0]);
    const [stake, setStake] = useState<number>(50);
    const [expiry, setExpiry] = useState(EXPIRIES[0]);

    // Auth State
    const [apiKey, setApiKey] = useState('10f9ecdd43734f3c9c384a27ff843fc761914f5a7b272b2c91cd7f3910c6de26');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Positions Query
    const { data: positions, refetch: refetchPositions } = useQuery({
        queryKey: ['positions', address],
        queryFn: () => pearApi.getPositions(),
        enabled: isLoggedIn && isConnected,
        retry: false,
    });
    // Login Mutation
    const loginMutation = useMutation({
        mutationFn: async () => {
            if (!address) throw new Error("No wallet connected");
            if (!apiKey) throw new Error("API Key required");

            const response = await pearApi.login(address, apiKey);
            pearApi.setTokens(response.accessToken, response.refreshToken);
            return response;
        },
        onSuccess: () => {
            setIsLoggedIn(true);
            refetchPositions();
            checkAgentMutation.mutate();
        },
        onError: (err) => {
            alert("Login failed: " + (err as Error).message);
        }
    });

    // Agent Wallet
    const { data: agentWallet, refetch: refetchAgent } = useQuery({
        queryKey: ['agentWallet', address],
        queryFn: () => pearApi.getAgentWallet(),
        enabled: isLoggedIn,
        retry: false,
    });

    const checkAgentMutation = useMutation({
        mutationFn: () => pearApi.getAgentWallet(),
    });

    const createAgentMutation = useMutation({
        mutationFn: () => pearApi.createAgentWallet(),
        onSuccess: () => {
            alert("Agent Wallet Created! Please check if you need to approve it within your wallet or dashboard.");
            refetchAgent();
        },
        onError: (err) => {
            alert("Failed to create Agent Wallet: " + (err as Error).message);
        }
    });

    // Trade Mutation (Fixed Stake)
    const tradeMutation = useMutation({
        mutationFn: async () => {
            return pearApi.createPosition({
                longAssets: [{ asset: selectedPreset.long, weight: 1.0 }],
                shortAssets: [{ asset: selectedPreset.short, weight: 1.0 }],
                leverage: 1, // Fixed low leverage
                usdValue: stake, // FIXED STAKE
                executionType: 'MARKET'
            });
        },
        onSuccess: () => {
            refetchPositions();
            alert(`Prediction Confirmed! Staked $${stake} on ${selectedPreset.name}`);
        },
        onError: (err) => {
            const errorMsg = err instanceof Error ? err.message : String(err);
            alert("❌ Trade Failed\n\n" + errorMsg);
        }
    });

    const handleTrade = () => {
        if (!isConnected) return alert("Connect wallet first");
        if (!isLoggedIn) return alert("Login with API Key first");

        // Validate agent wallet status
        if (!agentWallet) {
            return alert("⚠️ No Agent Wallet found!\n\nYou need to create an Agent Wallet first. Click 'Create Agent' in the status panel.");
        }

        if (agentWallet.status !== 'active' && !agentWallet.isApproved) {
            return alert("⚠️ Agent Wallet Not Approved!\n\nYour Agent Wallet needs to be approved before you can trade. Please check your wallet or the Pear dashboard to approve it.");
        }

        console.log("✅ Pre-trade checks passed. Agent wallet:", agentWallet.address);
        tradeMutation.mutate();
    };

    console.log("DEBUG: TradeCard State - Stake:", stake, typeof stake);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Col: Prediction Interface */}
            <div className="space-y-6">

                {/* Auth Warning */}
                {!isLoggedIn && isConnected && (
                    <div className="p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5 text-yellow-200 text-sm flex gap-2 items-center">
                        <Key size={16} />
                        <span>Please enter your API Key to enable staking.</span>
                        <button
                            onClick={() => loginMutation.mutate()}
                            className="ml-auto bg-yellow-500/20 px-3 py-1 rounded hover:bg-yellow-500/30"
                        >
                            Login
                        </button>
                    </div>
                )}

                {/* The "Prediction" Card */}
                <div className={cn(
                    "relative bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl transition-all",
                    (!isConnected) && "opacity-50 pointer-events-none grayscale"
                )}>
                    {/* Header */}
                    <div className="p-6 border-b border-neutral-800 bg-neutral-900/50">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <Trophy className="text-yellow-500" size={20} /> Make a Prediction
                            </h2>
                            <div className="text-xs font-mono text-neutral-500 bg-neutral-950 px-2 py-1 rounded flex items-center gap-1">
                                <Clock size={12} /> Window: {expiry.val}
                            </div>
                        </div>

                        {/* Narrative Selector */}
                        <div className="flex gap-2 p-1 bg-neutral-950 rounded-xl overflow-x-auto">
                            {PRESETS.map(p => (
                                <button
                                    key={p.id}
                                    onClick={() => setSelectedPreset(p)}
                                    className={cn(
                                        "px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all",
                                        selectedPreset.id === p.id
                                            ? "bg-neutral-800 text-white shadow-sm"
                                            : "text-neutral-500 hover:text-neutral-300"
                                    )}
                                >
                                    {p.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="p-6 space-y-8">
                        {/* Narrative Description */}
                        <div className="text-center space-y-2">
                            <div className="flex items-center justify-center gap-4 text-2xl font-black tracking-tight">
                                <span className="text-green-500">{selectedPreset.long}</span>
                                <span className="text-neutral-600 text-sm font-medium">BEATS</span>
                                <span className="text-red-500">{selectedPreset.short}</span>
                            </div>
                            <p className="text-neutral-400 text-sm">{selectedPreset.desc}</p>
                        </div>

                        {/* Stake Selection */}
                        <div className="space-y-3">
                            <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest block text-center">
                                Select Stake Amount (Max Loss)
                            </label>
                            <div className="grid grid-cols-3 gap-3">
                                {STAKES.map(s => (
                                    <button
                                        key={s}
                                        onClick={() => setStake(s)}
                                        className={cn(
                                            "py-4 rounded-xl font-mono text-lg font-bold border transition-all",
                                            stake === s
                                                ? "border-green-500 bg-green-500/10 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.2)]"
                                                : "border-neutral-800 bg-neutral-900 text-neutral-500 hover:border-neutral-700 hover:text-neutral-300"
                                        )}
                                    >
                                        ${s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Summary / Payout Preview (Mock) */}
                        <div className="bg-neutral-950 rounded-xl p-4 flex justify-between items-center text-sm">
                            <div className="space-y-1">
                                <span className="block text-neutral-500 text-xs">Potential Payout</span>
                                <span className="block text-green-400 font-bold text-lg">
                                    ${((Number(stake) || 0) * 1.5).toFixed(0)} - ${((Number(stake) || 0) * 2.5).toFixed(0)}
                                </span>
                            </div>
                            <div className="text-right space-y-1">
                                <span className="block text-neutral-500 text-xs">Max Loss</span>
                                <span className="block text-red-400 font-bold text-lg">
                                    ${Number(stake) || 0}
                                </span>
                            </div>
                        </div>

                        {/* Action Button */}
                        <button
                            onClick={handleTrade}
                            disabled={!isConnected || !isLoggedIn || tradeMutation.isPending}
                            className={cn(
                                "w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform active:scale-[0.98]",
                                isConnected && isLoggedIn
                                    ? "bg-white text-black hover:bg-neutral-200 shadow-white/10"
                                    : "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                            )}
                        >
                            {tradeMutation.isPending ? (
                                <span className="flex items-center justify-center gap-2">
                                    <Loader2 className="animate-spin" size={20} /> Placing Stake...
                                </span>
                            ) : "Confirm Stake"}
                        </button>

                        <p className="text-center text-[10px] text-neutral-600">
                            By staking, you agree that you can lose up to your full stake amount if the prediction is incorrect.
                        </p>

                    </div>
                </div>
            </div>

            {/* Right Col: Active Predictions */}
            <div className="space-y-6">
                {/* Agent Status (Mini) */}
                {isLoggedIn && (
                    <div className="flex items-center justify-between text-xs text-neutral-500 bg-neutral-900/50 p-3 rounded-xl border border-neutral-800">
                        <div className="flex items-center gap-2">
                            <ShieldCheck size={14} className="text-green-500" />
                            <span>API Connected</span>
                        </div>
                        {agentWallet ? (
                            <span className="font-mono text-neutral-400">Agent: {agentWallet.address?.slice(0, 4)}...{agentWallet.address?.slice(-4)}</span>
                        ) : (
                            <button onClick={() => createAgentMutation.mutate()} className="text-green-400 hover:underline">Create Agent</button>
                        )}
                    </div>
                )}

                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-neutral-300">Active Predictions</h3>
                    <button onClick={() => refetchPositions()} className="p-2 hover:bg-neutral-800 rounded-lg transition-colors">
                        <RefreshCw size={16} className={cn("text-neutral-500", positions && "hover:rotate-180 transition-transform")} />
                    </button>
                </div>

                {positions && Array.isArray(positions) && positions.length > 0 ? (
                    <div className="space-y-3">
                        {positions.map((pos: Position, idx) => (
                            <div key={idx} className="group bg-neutral-900/50 border border-neutral-800 rounded-xl p-4 hover:border-neutral-700 transition-colors">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-2">
                                        <div className="bg-neutral-800 p-1.5 rounded-lg">
                                            <Trophy size={14} className="text-neutral-400 group-hover:text-yellow-500 transition-colors" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-1 font-bold text-sm text-neutral-200">
                                                <span className="text-green-400">{pos.longAssets?.[0]?.asset}</span>
                                                <span className="text-neutral-600 text-[10px]">VS</span>
                                                <span className="text-red-400">{pos.shortAssets?.[0]?.asset}</span>
                                            </div>
                                            <div className="text-[10px] text-neutral-500">24h Prediction Window</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-bold text-white">${pos.marginUsed?.toFixed(2) || '0.00'}</div>
                                        <div className="text-[10px] text-neutral-500">Staked</div>
                                    </div>
                                </div>
                                <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-neutral-700 w-1/2 animate-pulse" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="h-64 rounded-3xl border border-dashed border-neutral-800 flex flex-col items-center justify-center text-neutral-600 gap-4 bg-neutral-900/20">
                        <div className="w-16 h-16 rounded-full bg-neutral-900 flex items-center justify-center">
                            <Trophy size={24} className="opacity-50" />
                        </div>
                        <p className="text-sm">No active predictions</p>
                    </div>
                )}

                {/* How it works simple */}
                <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 text-sm text-neutral-400">
                    <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                        <AlertTriangle size={16} className="text-yellow-500" /> Rules
                    </h4>
                    <ul className="space-y-3 text-xs leading-relaxed">
                        <li className="flex gap-2">
                            <span className="text-green-500 font-bold">1.</span>
                            Select a narrative (e.g. AI vs ETH).
                        </li>
                        <li className="flex gap-2">
                            <span className="text-green-500 font-bold">2.</span>
                            Stake a fixed amount. This is your max loss.
                        </li>
                        <li className="flex gap-2">
                            <span className="text-green-500 font-bold">3.</span>
                            If your narrative wins after 24h, you get Stake + Profit.
                        </li>
                    </ul>
                </div>

                <BalanceScaleDemo
                    longSymbol={selectedPreset.long}
                    shortSymbol={selectedPreset.short}
                />

            </div>
        </div>
    );
}

function BalanceScaleDemo({ longSymbol, shortSymbol }: { longSymbol: string, shortSymbol: string }) {
    const [spread, setSpread] = useState(0);

    // Simulate "Live" Market Fluctuation
    useEffect(() => {
        const interval = setInterval(() => {
            setSpread(prev => {
                const change = (Math.random() - 0.5) * 0.8; // Random walk
                const next = prev + change;
                // Keep it within -5% to +5% for demo
                return Math.max(Math.min(next, 5), -5);
            });
        }, 1000); // Update every second
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-2">
            <h3 className="text-lg font-semibold text-neutral-300">Live Spread (Simulation)</h3>
            <BalanceScale
                longSymbol={longSymbol}
                shortSymbol={shortSymbol}
                spread={spread}
            />
        </div>
    );
}
