'use client'
import { motion } from "framer-motion";
import React, { useState } from "react";

export default function App() {
    const [betAmount, setBetAmount] = useState<number | ''>(0); // Change '0' to 0
    const [threshold, setThreshold] = useState<number>(50);
    const [result, setResult] = useState<number | null>(null);
    const [message, setMessage] = useState<string>('');
    const [rolling, setRolling] = useState<boolean>(false);
    const [multiplier, setMultiplier] = useState<number | ''>(2); // Change '2' to 2

    const calculateWinChance = (): number => (threshold / 100) * 100;

    const rollDice = () => {
        // Clear previous result and message
        setResult(null);
        setMessage('');

        setRolling(true);
        setTimeout(() => {
            const roll = Math.floor(Math.random() * 100) + 1;
            setResult(roll);
            setRolling(false);
            if (roll > threshold) {
                setMessage(`You win! The roll was ${roll}. You won $${(betAmount as number) * (multiplier as number)}`);
            } else {
                setMessage(`You lose! The roll was ${roll}. You lost $${betAmount}`);
            }
        }, 500); // Simulate roll time
    };

    const handleBetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBetAmount(e.target.value === '' ? '' : Number(e.target.value));
    };

    const handleMultiplierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMultiplier(e.target.value === '' ? '' : Number(e.target.value));
    };

    return (
        <div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center space-y-8 p-6 rounded-lg shadow-lg"
                >
                    <h1 className="text-4xl font-bold text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>Dice of Misfortune</h1>
                    <div className="flex items-center space-x-4">
                        <div className="flex flex-col space-y-2 z-10">
                            <label className="flex flex-col text-white" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                Bet Amount:
                                <input
                                    type="number"
                                    value={betAmount}
                                    onChange={handleBetAmountChange}
                                    placeholder="0"
                                    className="p-1 border rounded text-black"
                                />
                            </label>
                            <label className="flex flex-col text-white" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                Multiplier:
                                <input
                                    type="number"
                                    value={multiplier}
                                    onChange={handleMultiplierChange}
                                    placeholder=""
                                    className="p-1 border rounded text-black"
                                />
                            </label>
                        </div>
                        <div className='pl-20 '>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-96 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer "
                            >
                                <input
                                    type="range"
                                    value={threshold}
                                    onChange={(e) => setThreshold(Number(e.target.value))}
                                    min={1}
                                    max={99}
                                    className="w-full h-full bg-transparent appearance-none cursor-pointer"
                                />
                                <motion.div
                                    initial={{ width: `${calculateWinChance()}%` }}
                                    animate={{ width: `${calculateWinChance()}%` }}
                                    transition={{ duration: 0.5 }}
                                    className="h-full bg-gradient-to-r from-green-500 to-green-800 rounded-lg"
                                />
                            </motion.div>
                        </div>
                    </div>

                    <div className="flex flex-row items-center gap-10 mt-10">
                        <label className="text-white text-2xl" style={{ fontFamily: 'Roboto, sans-serif' }}>Win Chance: {calculateWinChance().toFixed(2)}%</label>
                        <label className="text-white text-2xl" style={{ fontFamily: 'Roboto, sans-serif' }}>Threshold: {threshold}</label>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={rollDice}
                        disabled={rolling || betAmount === '' || multiplier === ''}
                        className={'group/button rounded-lg bg-white text-black'}
                    >
                        <span className={
                            'block -translate-x-1 -translate-y-1 rounded-lg border-2 border-[#222222] bg-green-400 px-4 py-1 text-md font-semibold  tracking-tight transition-all group-hover/button:-translate-y-2 group-active/button:translate-x-0 group-active/button:translate-y-0'
                        }>
                            {rolling ? 'Rolling...' : 'Roll Dice'}
                        </span>
                    </motion.button>

                    {rolling && (
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1 }}
                            className="text-6xl mt-4 text-white"
                        >
                            🎲
                        </motion.div>
                    )}
                    {result !== null && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="mt-4 text-white text-2xl"
                            style={{ fontFamily: 'Roboto, sans-serif' }}
                        >
                            {message}
                            {message.includes('win') && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.5, duration: 0.5 }}
                                    className="flex items-center justify-center mt-4"
                                >
                                    <span className="text-4xl text-green-400">🎉</span>
                                    <span className="text-4xl text-green-400">🎉</span>
                                    <span className="text-4xl text-green-400">🎉</span>
                                </motion.div>
                            )}
                            {message.includes('lose') && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.5, duration: 0.5 }}
                                    className="flex items-center justify-center mt-4"
                                >
                                    <span className="text-4xl text-red-600">💔</span>
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </motion.div>
            </motion.div>
        </div>
    );
}
