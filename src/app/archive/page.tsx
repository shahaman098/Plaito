'use client';

import React, { useState, useEffect } from 'react';
import './archive.css';

// Cowboy Component
const Cowboy = ({ side }: { side: 'left' | 'right' }) => {
    return (
        <div className={`cowboy cowboy-${side}`}>
            {/* Complete cowboy figure facing opponent */}
            <div className="cowboy-figure">
                {/* Hat */}
                <div className="cb-hat"></div>

                {/* Head with bandana */}
                <div className="cb-head">
                    <div className="cb-bandana"></div>
                </div>

                {/* Torso */}
                <div className="cb-torso"></div>

                {/* Extended arm with gun pointing at opponent */}
                <div className="cb-gun-arm">
                    <div className="cb-gun">
                        <div className="cb-gun-barrel"></div>
                        <div className="cb-gun-body"></div>
                        <div className="cb-muzzle-flash"></div>
                    </div>
                </div>

                {/* Legs */}
                <div className="cb-legs">
                    <div className="cb-leg"></div>
                    <div className="cb-leg"></div>
                </div>
            </div>

            {/* Bullet effect */}
            <div className="cb-bullet"></div>
        </div>
    );
};

// Train Component
const Train = () => {
    return (
        <div className="train-container">
            {/* Locomotive */}
            <div className="locomotive">
                {/* Smokebox (Front black section) */}
                <div className="smokebox">
                    <div className="smokebox-door">
                        <div className="door-handle"></div>
                    </div>
                    <div className="number-plate front-plate">5972</div>
                    <div className="lamp front-lamp"></div>
                </div>

                {/* Chimney */}
                <div className="chimney">
                    <div className="chimney-cap"></div>
                    <div className="smoke-emitter">
                        <div className="smoke s1"></div>
                        <div className="smoke s2"></div>
                        <div className="smoke s3"></div>
                        <div className="smoke s4"></div>
                        <div className="smoke s5"></div>
                    </div>
                </div>

                {/* Boiler */}
                <div className="boiler">
                    <div className="gold-band gb1"></div>
                    <div className="gold-band gb2"></div>
                    <div className="gold-band gb3"></div>
                    <div className="gold-band gb4"></div>
                    <div className="dome steam-dome"></div>
                    <div className="dome safety-valve"></div>
                    <div className="nameplate">HOGWARTS EXPRESS</div>
                </div>

                {/* Firebox/Cab transition */}
                <div className="firebox">
                    <div className="number-plate side-plate">5972</div>
                </div>

                {/* Cab */}
                <div className="cabin">
                    <div className="roof"></div>
                    <div className="cab-window left-window"></div>
                    <div className="cab-window right-window"></div>
                    <div className="cab-side-detail"></div>
                </div>

                {/* Buffer beam / Cowcatcher */}
                <div className="buffer-beam">
                    <div className="buffer left-buffer"></div>
                    <div className="buffer right-buffer"></div>
                    <div className="coupling"></div>
                </div>

                {/* Wheels and Running Gear */}
                <div className="wheels-container engine-wheels">
                    {/* Front small wheels (bogie) */}
                    <div className="bogie-wheels">
                        <div className="bogie-frame"></div>
                        <div className="bogie-pivot"></div>
                        <div className="cowcatcher">
                            <div className="cowcatcher-bar"></div>
                            <div className="cowcatcher-bar"></div>
                            <div className="cowcatcher-bar"></div>
                        </div>
                        <div className="wheel small-wheel bogie-1"><span className="spoke"></span></div>
                        <div className="wheel small-wheel bogie-2"><span className="spoke"></span></div>
                    </div>

                    {/* Large driving wheels */}
                    <div className="wheel big-wheel driver-1">
                        <span className="spoke"></span><span className="spoke"></span>
                        <span className="spoke"></span><span className="spoke"></span>
                        <span className="spoke"></span>
                        <span className="hub"></span>
                        <span className="counterweight"></span>
                    </div>
                    <div className="wheel big-wheel driver-2">
                        <span className="spoke"></span><span className="spoke"></span>
                        <span className="spoke"></span><span className="spoke"></span>
                        <span className="spoke"></span>
                        <span className="hub"></span>
                        <span className="counterweight"></span>
                    </div>
                    <div className="wheel big-wheel driver-3">
                        <span className="spoke"></span><span className="spoke"></span>
                        <span className="spoke"></span><span className="spoke"></span>
                        <span className="spoke"></span>
                        <span className="hub"></span>
                        <span className="counterweight"></span>
                    </div>

                    {/* Connecting Rod */}
                    <div className="connecting-rod"></div>
                    <div className="coupling-rod"></div>
                    <div className="piston-rod"></div>
                    <div className="cylinder"></div>
                </div>

                {/* Splashers over wheels */}
                <div className="splasher splasher-1"></div>
                <div className="splasher splasher-2"></div>
                <div className="splasher splasher-3"></div>

                {/* Running board */}
                <div className="running-board"></div>

                {/* Cowboy on locomotive (right side shooter) */}
                <Cowboy side="right" />
            </div>

            {/* Tender (Coal car) */}
            <div className="tender">
                <div className="tender-body">
                    <div className="coal-bunker">
                        <div className="coal"></div>
                    </div>
                    <div className="water-tank"></div>
                    <div className="gold-line tender-line-top"></div>
                    <div className="gold-line tender-line-bottom"></div>
                    <div className="tender-emblem"></div>
                </div>
                <div className="tender-connector"></div>
                <div className="tender-wheels">
                    <div className="wheel medium-wheel tender-w1"><span className="spoke"></span></div>
                    <div className="wheel medium-wheel tender-w2"><span className="spoke"></span></div>
                    <div className="wheel medium-wheel tender-w3"><span className="spoke"></span></div>
                    <div className="wheel medium-wheel tender-w4"><span className="spoke"></span></div>
                </div>
            </div>

            {/* Carriage 1 */}
            <div className="carriage carriage-1">
                <div className="connector"></div>
                <div className="carriage-body">
                    <div className="carriage-roof"></div>
                    <div className="windows">
                        <div className="win"></div>
                        <div className="win"></div>
                        <div className="win"></div>
                        <div className="win"></div>
                    </div>
                    <div className="gold-line carriage-line-top"></div>
                    <div className="gold-line carriage-line-bottom"></div>
                    <div className="door"></div>
                </div>
                <div className="wheels-container carriage-wheels">
                    <div className="wheel small-wheel"></div>
                    <div className="wheel small-wheel"></div>
                    <div className="wheel small-wheel"></div>
                    <div className="wheel small-wheel"></div>
                </div>
                {/* Cowboy on last carriage (left side shooter) */}
                <Cowboy side="left" />
            </div>

            {/* Carriage 2 */}
            <div className="carriage">
                <div className="connector"></div>
                <div className="carriage-body">
                    <div className="carriage-roof"></div>
                    <div className="windows">
                        <div className="win"></div>
                        <div className="win"></div>
                        <div className="win"></div>
                        <div className="win"></div>
                    </div>
                    <div className="gold-line carriage-line-top"></div>
                    <div className="gold-line carriage-line-bottom"></div>
                    <div className="door"></div>
                </div>
                <div className="wheels-container carriage-wheels">
                    <div className="wheel small-wheel"></div>
                    <div className="wheel small-wheel"></div>
                    <div className="wheel small-wheel"></div>
                    <div className="wheel small-wheel"></div>
                </div>
            </div>
        </div>
    );
};

// Environment Component
const Environment = ({ children }: { children: React.ReactNode }) => {
    const [stars, setStars] = useState<Array<{ left: number; top: number; delay: number }>>([]);

    useEffect(() => {
        // Generate stars on client side
        const newStars = [...Array(50)].map(() => ({
            left: Math.random() * 100,
            top: Math.random() * 60,
            delay: Math.random() * 3
        }));
        setStars(newStars);
    }, []);

    return (
        <div className="scene">
            {/* Night sky with stars */}
            <div className="sky">
                <div className="stars">
                    {stars.map((star, i) => (
                        <div
                            key={i}
                            className="star"
                            style={{
                                left: `${star.left}%`,
                                top: `${star.top}%`,
                                animationDelay: `${star.delay}s`
                            }}
                        ></div>
                    ))}
                </div>
                <div className="moon"></div>
            </div>

            {/* Clouds */}
            <div className="clouds">
                <div className="cloud cloud-1"></div>
                <div className="cloud cloud-2"></div>
                <div className="cloud cloud-3"></div>
            </div>

            {/* Multiple mountain layers for parallax */}
            <div className="mountains mountains-back"></div>
            <div className="mountains mountains-mid"></div>
            <div className="mountains mountains-front"></div>

            {/* Trees silhouettes */}
            <div className="trees"></div>

            {/* Track */}
            <div className="track">
                <div className="rail top-rail"></div>
                <div className="sleepers"></div>
                <div className="rail bottom-rail"></div>
            </div>

            {children}

            {/* Foreground with grass */}
            <div className="foreground">
                <div className="grass"></div>
                <div className="grass-blades"></div>
            </div>
        </div>
    );
};

// Animated PnL/Multiplier Display Component with Real Data
const PnLDisplay = () => {
    const [position, setPosition] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [closing, setClosing] = useState(false);
    const [closedTrade, setClosedTrade] = useState<any>(null);
    const [showComboEffect, setShowComboEffect] = useState(false);
    const [combo, setCombo] = useState(0);
    const [lastPnl, setLastPnl] = useState(0);

    // Fetch position data
    useEffect(() => {
        const fetchPosition = async () => {
            try {
                const { pearApi } = await import('@/lib/pear-api');
                const positions = await pearApi.getPositions();
                if (positions && positions.length > 0) {
                    // Get the most recent open position
                    const openPosition = positions.find((p: any) => p.status === 'open' || p.status === 'OPEN') || positions[0];
                    setPosition(openPosition);

                    // Check for combo effect (PnL increasing)
                    if (openPosition.unrealizedPnl > lastPnl + 0.5) {
                        setCombo(c => c + 1);
                        setShowComboEffect(true);
                        setTimeout(() => setShowComboEffect(false), 500);
                    }
                    setLastPnl(openPosition.unrealizedPnl || 0);
                }
            } catch (err) {
                console.error("Failed to fetch positions:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosition();
        // Poll for updates every 3 seconds
        const interval = setInterval(fetchPosition, 3000);
        return () => clearInterval(interval);
    }, [lastPnl]);

    const handleTakeProfits = async () => {
        if (!position?.positionId) return;

        setClosing(true);
        try {
            const { pearApi } = await import('@/lib/pear-api');
            await pearApi.closePosition(position.positionId);
            setClosedTrade({
                ...position,
                closedAt: new Date().toISOString(),
                finalPnl: position.unrealizedPnl,
            });
            setPosition(null);
        } catch (err: any) {
            console.error("Failed to close position:", err);
            alert("Failed to close position: " + err.message);
        } finally {
            setClosing(false);
        }
    };

    // Get display values
    const stake = position?.marginUsed || 50;
    const pnl = position?.unrealizedPnl || 0;
    const pnlPercent = position?.unrealizedPnlPercentage || 0;
    const multiplier = 1 + (pnlPercent / 100);
    const isPositive = pnl >= 0;
    const formattedPnl = isPositive ? `+$${pnl.toFixed(2)}` : `-$${Math.abs(pnl).toFixed(2)}`;

    const longAsset = position?.longAssets?.[0]?.asset || position?.longAssets?.[0]?.coin || 'LONG';
    const shortAsset = position?.shortAssets?.[0]?.asset || position?.shortAssets?.[0]?.coin || 'SHORT';

    // Trade Closed Overview
    if (closedTrade) {
        return (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[500] text-center">
                <div className="relative bg-black/80 backdrop-blur-xl border-4 border-yellow-500/50 rounded-3xl px-16 py-12 shadow-2xl">
                    {/* Victory Banner */}
                    <div className="text-6xl mb-4">🏆</div>
                    <div className="text-3xl font-black text-yellow-400 mb-2 tracking-wider">
                        TRADE CLOSED!
                    </div>

                    {/* Trade Overview */}
                    <div className="mt-6 space-y-4 text-left">
                        <div className="flex justify-between border-b border-white/20 pb-2">
                            <span className="text-white/60">Position</span>
                            <span className="text-white font-mono">{longAsset} vs {shortAsset}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/20 pb-2">
                            <span className="text-white/60">Stake</span>
                            <span className="text-white font-mono">${closedTrade.marginUsed?.toFixed(2) || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/20 pb-2">
                            <span className="text-white/60">Entry Ratio</span>
                            <span className="text-white font-mono">{closedTrade.entryRatio?.toFixed(4) || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/20 pb-2">
                            <span className="text-white/60">Exit Ratio</span>
                            <span className="text-white font-mono">{closedTrade.markRatio?.toFixed(4) || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between pt-2">
                            <span className="text-xl font-bold text-white">Final P&L</span>
                            <span className={`text-2xl font-black ${(closedTrade.finalPnl || 0) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {(closedTrade.finalPnl || 0) >= 0 ? '+' : ''}${(closedTrade.finalPnl || 0).toFixed(2)}
                            </span>
                        </div>
                    </div>

                    {/* Back to Battle Button */}
                    <a href="/battle" className="mt-8 inline-block w-full py-4 bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-black text-xl rounded-xl hover:from-yellow-400 hover:to-amber-400 transition-all transform hover:scale-105 shadow-lg">
                        🎲 NEW BATTLE
                    </a>
                </div>
            </div>
        );
    }

    // Loading State
    if (loading) {
        return (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[500] text-center">
                <div className="text-2xl text-white/60 animate-pulse">Loading position...</div>
            </div>
        );
    }

    // No position found
    if (!position) {
        return (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[500] text-center">
                <div className="relative bg-black/60 backdrop-blur-md border-4 border-white/20 rounded-3xl px-12 py-8 shadow-2xl">
                    <div className="text-2xl text-white/60 mb-4">No active position</div>
                    <a href="/battle" className="inline-block px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl hover:from-purple-400 hover:to-pink-400 transition-all">
                        Start a Battle
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[500] text-center">
            {/* Combo Effect */}
            {showComboEffect && (
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="text-4xl font-black text-yellow-400 animate-pulse drop-shadow-[0_0_20px_rgba(255,215,0,0.8)]">
                        🔥 COMBO x{combo}! 🔥
                    </div>
                </div>
            )}

            {/* Main Multiplier Display */}
            <div className={`relative transition-all duration-300 ${showComboEffect ? 'scale-110' : 'scale-100'}`}>
                {/* Glow Effect */}
                <div className={`absolute inset-0 rounded-3xl blur-3xl opacity-50 ${isPositive ? 'bg-green-500' : 'bg-red-500'}`} />

                {/* Card */}
                <div className="relative bg-black/60 backdrop-blur-md border-4 border-white/20 rounded-3xl px-12 py-8 shadow-2xl">
                    {/* Status Label */}
                    <div className="text-sm font-bold uppercase tracking-[0.3em] text-white/60 mb-2">
                        LIVE BET STATUS
                    </div>

                    {/* Multiplier */}
                    <div className={`text-8xl font-black tracking-tight ${isPositive ? 'text-green-400' : 'text-red-400'}`}
                        style={{
                            textShadow: isPositive
                                ? '0 0 40px rgba(74, 222, 128, 0.8), 0 0 80px rgba(74, 222, 128, 0.4)'
                                : '0 0 40px rgba(248, 113, 113, 0.8), 0 0 80px rgba(248, 113, 113, 0.4)'
                        }}>
                        {multiplier.toFixed(2)}x
                    </div>

                    {/* PnL */}
                    <div className={`text-4xl font-bold mt-2 ${isPositive ? 'text-green-300' : 'text-red-300'}`}>
                        {formattedPnl}
                    </div>

                    {/* Stake Info */}
                    <div className="text-sm text-white/50 mt-4 font-mono">
                        Stake: ${stake.toFixed(2)} • {longAsset} vs {shortAsset}
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className={`h-full transition-all duration-500 ${isPositive ? 'bg-gradient-to-r from-green-500 to-emerald-400' : 'bg-gradient-to-r from-red-500 to-orange-400'}`}
                            style={{ width: `${Math.min(100, Math.max(10, (multiplier / 2) * 100))}%` }}
                        />
                    </div>

                    {/* Win Threshold Indicator */}
                    <div className="flex justify-between text-xs text-white/40 mt-1 font-mono">
                        <span>0.5x</span>
                        <span className="text-yellow-400">Target: 2.0x</span>
                        <span>3.0x</span>
                    </div>

                    {/* Take Profits Button */}
                    <button
                        onClick={handleTakeProfits}
                        disabled={closing}
                        className={`mt-6 w-full py-4 rounded-xl font-black text-xl transition-all transform hover:scale-105 shadow-lg pointer-events-auto ${isPositive
                                ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white'
                                : 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-400 hover:to-orange-400 text-white'
                            } ${closing ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {closing ? '⏳ Closing...' : isPositive ? '💰 TAKE PROFITS' : '🛑 STOP LOSS'}
                    </button>
                </div>

                {/* Floating Particles on positive */}
                {isPositive && multiplier > 1.2 && (
                    <div className="absolute -inset-10 pointer-events-none overflow-hidden">
                        {[...Array(8)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-ping"
                                style={{
                                    left: `${10 + Math.random() * 80}%`,
                                    top: `${10 + Math.random() * 80}%`,
                                    animationDelay: `${i * 0.2}s`,
                                    animationDuration: '1.5s'
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// Main Archive Page
export default function ArchivePage() {
    return (
        <div className="game-container">
            {/* HUD Overlay */}
            <div className="hud">
                {/* Hearts in top left */}
                <div className="hearts-container">
                    <div className="heart"></div>
                    <div className="heart"></div>
                    <div className="heart"></div>
                </div>

                {/* Crypto circles */}
                <div className="crypto-circle solana-circle">
                    <span>SOL</span>
                </div>
                <div className="crypto-circle ethereum-circle">
                    <span>ETH</span>
                </div>
            </div>

            {/* PnL Display in Center */}
            <PnLDisplay />

            <Environment>
                <Train />
            </Environment>
        </div>
    );
}
