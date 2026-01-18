'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePearAuth } from '@/hooks/usePearAuth';
import { pearApi } from '@/lib/pear-api';
import { cn } from '@/lib/utils';
import { Swords, Loader2, Key, ShieldCheck, Coins, MoreHorizontal, Scale, Gavel, Trophy, TrendingUp } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { useBalance } from 'wagmi';
import { formatEther, formatUnits } from 'viem';

const PRESETS = [
    { id: 'eth-vs-btc', name: 'ETH vs BTC', vs: 'BTC', long: 'ETH', short: 'BTC', desc: 'The Flippening: ETH outperforms BTC' },
    { id: 'sol-vs-eth', name: 'SOL vs ETH', vs: 'ETH', long: 'SOL', short: 'ETH', desc: 'Speed vs Security: SOL outperforms ETH' },
    { id: 'btc-vs-sol', name: 'BTC vs SOL', vs: 'SOL', long: 'BTC', short: 'SOL', desc: 'Old Guard vs New Blood' },
];

const STAKES = [10, 50, 100];

// Client-only dust particles component to avoid hydration errors
function DustParticles() {
    const [particles, setParticles] = useState<Array<{ left: number, top: number, delay: number, duration: number }>>([]);

    useEffect(() => {
        // Generate particles only on client
        const newParticles = [...Array(8)].map((_, i) => ({
            left: Math.random() * 100,
            top: Math.random() * 100,
            delay: i * 0.5,
            duration: 3 + Math.random() * 2
        }));
        setParticles(newParticles);
    }, []);

    if (particles.length === 0) return null;

    return (
        <div className="fixed inset-0 pointer-events-none opacity-20">
            {particles.map((particle, i) => (
                <div
                    key={i}
                    className="absolute w-2 h-2 bg-[#D4C4A8] rounded-full blur-sm animate-float"
                    style={{
                        left: `${particle.left}%`,
                        top: `${particle.top}%`,
                        animationDelay: `${particle.delay}s`,
                        animationDuration: `${particle.duration}s`
                    }}
                />
            ))}
        </div>
    );
}

export default function BattlePage() {
    const router = useRouter();
    const { isLoggedIn, apiKey, setApiKey, login, isLoggingIn, agentWallet, createAgent, isCreatingAgent } = usePearAuth();

    const [selectedPreset, setSelectedPreset] = useState(PRESETS[0]);
    const [stake, setStake] = useState<number>(50);
    const [stakeInput, setStakeInput] = useState<string>('50');

    const battleMutation = useMutation({
        mutationFn: async () => {
            console.log("🎲 Placing Bet:", {
                preset: selectedPreset.name,
                long: selectedPreset.long,
                short: selectedPreset.short,
                stake
            });
            return pearApi.createPosition({
                longAssets: [{ asset: selectedPreset.long, weight: 1.0 }],
                shortAssets: [{ asset: selectedPreset.short, weight: 1.0 }],
                leverage: 1, // Must be integer
                usdValue: stake,
                executionType: 'MARKET'
            });
        },
        onSuccess: () => {
            router.push('/archive');
        },
        onError: (err: any) => {
            console.error(err);
            const msg = err.response?.data?.message || err.message || "Unknown error";
            alert("Trade Failed: " + msg);
        }
    });

    return (
        <div className="fixed inset-0 overflow-auto" style={{
            background: 'linear-gradient(to bottom, #5B9BD5 0%, #87CEEB 20%, #B0D9F1 50%, #D4C4A8 80%, #E8D5B7 100%)'
        }}>
            {/* Arena Floor Background */}
            <div className="fixed inset-0 pointer-events-none opacity-30" style={{
                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(139,111,71,0.1) 40px, rgba(139,111,71,0.1) 80px),
                                 repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(139,111,71,0.1) 40px, rgba(139,111,71,0.1) 80px)`
            }} />

            {/* Dust Particles */}
            <DustParticles />

            {/* Gladiator Character - Bottom Left Corner */}
            <div className="fixed bottom-0 left-8 z-50 pointer-events-none">
                <div className="relative" style={{
                    animation: 'breathe 3s ease-in-out infinite',
                    transform: 'scale(2)'
                }}>
                    {/* Gladiator Body (Top Half Only) */}
                    <div className="relative">
                        {/* Head - Simple Circle */}
                        <div className="relative w-32 h-32 mx-auto mb-4 bg-[#F5D7B1] rounded-full border-4 border-[#D4A574] shadow-2xl" />

                        {/* Armor/Torso */}
                        <div className="relative w-48 h-64 mx-auto bg-gradient-to-b from-[#8B4513] to-[#654321] rounded-t-3xl border-4 border-[#654321] shadow-2xl">
                            {/* Armor Details */}
                            <div className="absolute inset-4 border-4 border-[#A0522D]/40 rounded-t-2xl" />

                            {/* Left Hand with Sword */}
                            <div className="absolute -left-16 top-16 w-20 h-20">
                                <div className="w-18 h-18 bg-[#F5D7B1] rounded-full border-4 border-[#D4A574] shadow-xl" />
                                {/* Sword */}
                                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-4 h-40 bg-gradient-to-b from-[#E8E8E8] to-[#888888] rounded-t shadow-2xl transform rotate-45 origin-bottom">
                                    {/* Crossguard */}
                                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-16 h-3 bg-[#FFD700] rounded shadow-lg" />
                                    {/* Pommel */}
                                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-5 h-5 bg-[#DAA520] rounded-full shadow-md" />
                                </div>
                            </div>

                            {/* Right Hand */}
                            <div className="absolute -right-16 top-20 w-18 h-18 bg-[#F5D7B1] rounded-full border-4 border-[#D4A574] shadow-xl" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto pt-24 pb-12 px-4">

                {/* Header - Arena Style */}
                <div className="text-center space-y-4 mb-16">
                    <div className="inline-flex items-center gap-2 text-[#8B4513] border-2 border-[#654321] bg-[#E8D5B7] px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase shadow-lg">
                        <Trophy size={14} />
                        Gladiator Arena
                    </div>
                    <div className="relative">
                        <h2 className="text-6xl md:text-7xl font-black italic tracking-tighter drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] transform -skew-x-[6deg]"
                            style={{
                                color: '#2C1810',
                                textShadow: '3px 3px 0 rgba(218,165,32,0.3)'
                            }}>
                            PLACE YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DAA520] to-[#B8860B]">BETS</span>
                        </h2>
                        {/* Golden Underline */}
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-1 bg-[#DAA520] blur-sm" />
                    </div>
                    <p className="text-[#654321] font-bold tracking-wide text-lg">
                        Choose your champion. Back your warrior.
                    </p>
                </div>

                {/* Main Game Board */}
                <div className="grid lg:grid-cols-2 gap-8 items-start">

                    {/* Left Col: Market Selection */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 text-[#654321] mb-2">
                            <div className="w-8 h-8 rounded-full bg-[#C19A6B] border-2 border-[#8B6F47] flex items-center justify-center font-black text-white shadow-md">1</div>
                            <span className="uppercase tracking-widest font-black text-sm">Select Battle</span>
                        </div>

                        <div className="space-y-3">
                            {PRESETS.map(p => (
                                <button
                                    key={p.id}
                                    onClick={() => setSelectedPreset(p)}
                                    className={cn(
                                        "w-full relative group transition-all duration-300",
                                        selectedPreset.id === p.id ? "scale-105 z-10" : "hover:scale-[1.02]"
                                    )}
                                >
                                    <div className={cn(
                                        "relative overflow-hidden rounded-xl border-4 p-1 transition-all duration-300 shadow-lg",
                                        selectedPreset.id === p.id
                                            ? "bg-gradient-to-br from-[#E8D5B7] to-[#D4C4A8] border-[#DAA520] shadow-[0_0_30px_rgba(218,165,32,0.5)]"
                                            : "bg-gradient-to-br from-[#C19A6B] to-[#A67C52] border-[#8B6F47] hover:border-[#B8860B]"
                                    )}>
                                        <div className="bg-[#2C1810]/80 rounded-lg p-4 flex items-center justify-between backdrop-blur-sm">
                                            {/* Long Side */}
                                            <div className="text-left">
                                                <div className="text-2xl font-black text-[#FFD700] italic drop-shadow-md">{p.long}</div>
                                                <div className="text-[10px] font-mono text-[#87CEEB] uppercase tracking-wider">Champion</div>
                                            </div>

                                            {/* VS Badge */}
                                            <div className={cn(
                                                "w-12 h-12 rounded-full flex items-center justify-center font-black italic text-xl border-4 shadow-lg z-10",
                                                selectedPreset.id === p.id
                                                    ? "bg-[#FFD700] border-[#DAA520] text-[#2C1810] shadow-[#FFD700]/50 rotate-12"
                                                    : "bg-[#8B6F47] border-[#654321] text-[#E8D5B7]"
                                            )}>
                                                VS
                                            </div>

                                            {/* Short Side */}
                                            <div className="text-right">
                                                <div className="text-2xl font-black text-[#FFD700] italic drop-shadow-md">{p.short}</div>
                                                <div className="text-[10px] font-mono text-[#CD853F] uppercase tracking-wider">Challenger</div>
                                            </div>
                                        </div>

                                        {/* Description Footer */}
                                        <div className={cn(
                                            "px-4 py-2 text-xs font-bold text-center uppercase tracking-widest transition-colors",
                                            selectedPreset.id === p.id ? "text-[#8B4513]" : "text-[#D4C4A8]"
                                        )}>
                                            {p.name}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>


                    {/* Right Col: Stake & Confirm */}
                    <div className="space-y-8 bg-gradient-to-br from-[#E8D5B7] to-[#D4C4A8] border-4 border-[#8B6F47] rounded-3xl p-6 md:p-8 shadow-2xl">

                        {/* Stake Section */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 text-[#654321]">
                                <div className="w-8 h-8 rounded-full bg-[#C19A6B] border-2 border-[#8B6F47] flex items-center justify-center font-black text-white shadow-md">2</div>
                                <span className="uppercase tracking-widest font-black text-sm">Place Wager</span>
                            </div>

                            {/* Poker Chips Container */}
                            <div className="grid grid-cols-2 gap-4 place-items-center">
                                {STAKES.map((s, idx) => (
                                    <button
                                        key={s}
                                        onClick={() => { setStake(s); setStakeInput(s.toString()); }}
                                        className={cn(
                                            "relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 group",
                                            stake === s ? "-translate-y-2 scale-110 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]" : "hover:-translate-y-1"
                                        )}
                                    >
                                        {/* Chip Body */}
                                        <div className={cn(
                                            "absolute inset-0 rounded-full border-[6px] border-dashed shadow-inner",
                                            idx === 0 ? "bg-blue-600 border-white/30" :
                                                idx === 1 ? "bg-red-600 border-white/30" :
                                                    "bg-[#2C1810] border-[#FFD700]/30"
                                        )} />

                                        {/* Inner Ring */}
                                        <div className="absolute inset-3 rounded-full border border-white/20 bg-white/10 backdrop-blur-md" />

                                        {/* Value */}
                                        <div className="relative z-10 font-black text-2xl text-white drop-shadow-md">
                                            ${s}
                                        </div>

                                        {/* Selection Glow */}
                                        {stake === s && <div className="absolute -inset-4 rounded-full bg-[#FFD700]/30 blur-xl animate-pulse" />}
                                    </button>
                                ))}

                                {/* Custom Chip (Gold) */}
                                <div className={cn(
                                    "relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300",
                                    !STAKES.includes(stake) ? "-translate-y-2 scale-110 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]" : "hover:-translate-y-1"
                                )}>
                                    <div className="absolute inset-0 rounded-full border-[6px] border-dashed shadow-inner bg-[#FFD700] border-[#DAA520]/60" />
                                    <div className="absolute inset-3 rounded-full border border-[#B8860B]/40 bg-[#2C1810]/30 backdrop-blur-md flex flex-col items-center justify-center">
                                        <span className="text-[8px] font-bold uppercase text-[#FFD700] mb-0.5">Custom</span>
                                        <div className="flex items-center gap-0.5 text-white border-b border-white/30 px-1">
                                            <span className="text-sm font-bold">$</span>
                                            <input
                                                type="number"
                                                min="1"
                                                value={stakeInput}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    setStakeInput(val);
                                                    const num = parseFloat(val);
                                                    if (!isNaN(num)) setStake(num);
                                                    else setStake(0);
                                                }}
                                                className="w-10 bg-transparent text-center font-bold text-lg outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none placeholder-white/50"
                                                placeholder="?"
                                            />
                                        </div>
                                    </div>
                                    {!STAKES.includes(stake) && <div className="absolute -inset-4 rounded-full bg-[#FFD700]/40 blur-xl animate-pulse" />}
                                </div>
                            </div>

                            {/* Validation Msg */}
                            <div className="h-6 text-center">
                                {stake < 1 ? (
                                    <p className="text-red-700 text-xs font-bold uppercase tracking-widest animate-bounce bg-red-100 rounded px-2 py-1 inline-block">
                                        ⚠️ Minimum Wager $1
                                    </p>
                                ) : (
                                    <p className="text-[#654321] text-xs font-mono">
                                        Potential Payout: <span className="text-[#2C7A0B] font-bold">${((stake || 0) * 1.5).toFixed(2)} - ${((stake || 0) * 2.5).toFixed(2)}</span>
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="h-px bg-[#8B6F47]/30 w-full" />

                        {/* Action Area */}
                        <div className="space-y-4">
                            {!isLoggedIn ? (
                                <button
                                    onClick={() => login()}
                                    disabled={isLoggingIn}
                                    className="w-full py-4 bg-gradient-to-r from-[#DAA520] to-[#B8860B] hover:from-[#FFD700] hover:to-[#DAA520] text-[#2C1810] font-black uppercase tracking-widest text-lg rounded-xl shadow-[0_4px_12px_rgba(139,69,19,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98] border-2 border-[#8B6914]"
                                >
                                    {isLoggingIn ? "Connecting..." : "Connect Key"}
                                </button>
                            ) : !agentWallet ? (
                                <button
                                    onClick={() => createAgent()}
                                    disabled={isCreatingAgent}
                                    className="w-full py-4 bg-gradient-to-r from-[#8B4513] to-[#654321] hover:from-[#A0522D] hover:to-[#8B4513] text-white font-black uppercase tracking-widest text-lg rounded-xl shadow-[0_4px_12px_rgba(101,67,33,0.4)] transition-all hover:scale-[1.02] border-2 border-[#2C1810]"
                                >
                                    {isCreatingAgent ? "Setting Up..." : "Setup Arena"}
                                </button>
                            ) : (
                                <>
                                    <AgentBalanceDisplay address={agentWallet.address} stake={stake} />
                                    <button
                                        onClick={() => battleMutation.mutate()}
                                        disabled={battleMutation.isPending || stake < 1}
                                        className={cn(
                                            "w-full py-8 font-black uppercase tracking-[0.25em] text-2xl rounded-2xl transition-all duration-300 relative overflow-hidden group",
                                            stake < 1
                                                ? "bg-[#8B6F47] text-[#D4C4A8] cursor-not-allowed grayscale border-4 border-[#654321]"
                                                : "bg-gradient-to-b from-[#FFD700] via-[#DAA520] to-[#B8860B] text-[#2C1810] shadow-[0_8px_0_#8B6914,0_12px_20px_rgba(139,105,20,0.4)] hover:shadow-[0_6px_0_#8B6914,0_10px_25px_rgba(255,215,0,0.6)] active:shadow-[0_2px_0_#8B6914,0_4px_10px_rgba(139,105,20,0.4)] hover:-translate-y-1 active:translate-y-1 border-4 border-[#B8860B]"
                                        )}
                                    >
                                        {/* Inner glow */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/20 rounded-2xl" />

                                        <span className="relative z-10 flex items-center justify-center gap-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                                            {battleMutation.isPending ? (
                                                <>
                                                    <Loader2 className="animate-spin" size={32} />
                                                    <span>PLACING BET...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span className="text-4xl animate-pulse">⚔️</span>
                                                    <span className="font-[var(--font-cinzel)]">PLACE BET</span>
                                                    <span className="text-4xl animate-pulse">⚔️</span>
                                                </>
                                            )}
                                        </span>

                                        {/* Animated shine effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out skew-x-12" />

                                        {/* Pulsing glow on hover */}
                                        {stake >= 1 && (
                                            <div className="absolute -inset-1 bg-gradient-to-r from-[#FFD700] to-[#DAA520] rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10" />
                                        )}
                                    </button>
                                </>
                            )}

                            <p className="text-center text-[10px] text-[#8B6F47] font-mono italic">
                                *May the odds be ever in your favor
                            </p>
                        </div>

                    </div>
                </div>

            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
                
                @keyframes breathe {
                    0%, 100% { 
                        transform: scale(1.5) translateY(0); 
                    }
                    50% { 
                        transform: scale(1.5) translateY(-8px); 
                    }
                }
                .animate-breathe {
                    animation: breathe 3s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}

function AgentBalanceDisplay({ address, stake }: { address?: string, stake: number }) {
    if (!address) return null;
    const { data: balance } = useBalance({ address: address as `0x${string}` });

    // Arbitrum One USDC (Native)
    const { data: usdcNative } = useBalance({
        address: address as `0x${string}`,
        token: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831'
    });
    // Arbitrum One USDC.e (Bridged)
    const { data: usdcBridged } = useBalance({
        address: address as `0x${string}`,
        token: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8'
    });

    const ethBalance = balance ? parseFloat(formatEther(balance.value)) : 0;
    const nativeVal = usdcNative ? parseFloat(formatUnits(usdcNative.value, 6)) : 0;
    const bridgedVal = usdcBridged ? parseFloat(formatUnits(usdcBridged.value, 6)) : 0;
    const totalUsdc = nativeVal + bridgedVal;

    // Logic: Needs ETH for gas AND USDC for the trade stake
    const isLowGas = ethBalance < 0.0001;
    const isLowFunds = totalUsdc < stake;

    return (
        <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-3 bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs font-mono text-neutral-400">
                <Coins size={12} />
                <span>Wallet: {address.slice(0, 6)}...{address.slice(-4)}</span>
                <div className="h-3 w-px bg-neutral-800" />
                <span className={isLowGas ? "text-red-500" : "text-green-400"}>
                    {balance ? `${parseFloat(balance.formatted).toFixed(4)} ETH` : "..."}
                </span>
                <div className="h-3 w-px bg-neutral-800" />
                <span className={isLowFunds ? "text-red-500" : "text-green-400"}>
                    {usdcNative || usdcBridged ? `${totalUsdc.toFixed(2)} USDC` : "Loading..."}
                </span>
            </div>

            {(isLowGas || isLowFunds) && (
                <div className="text-red-400 text-xs font-bold bg-red-950/20 border border-red-900/50 p-3 rounded-lg animate-pulse">
                    ⚠️ {isLowGas ? "Insufficient Gas (ETH)" : ""} {isLowGas && isLowFunds ? "&" : ""} {isLowFunds ? `Insufficient USDC (Need $${stake})` : ""}
                </div>
            )}
        </div>
    );
}
