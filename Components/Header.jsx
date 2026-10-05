'use client';

import { assets } from '@/Assets/assets';
import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Header = () => {

    const [email, setEmail] = useState("");

    const fromSubmitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("email", email);

        const response = await axios.post("/api/email", formData);

        if (response.data.success) {
            toast.success(response.data.msg);
            setEmail("");
        } else {
            toast.error(response.data.msg);
        }

    }


    return (
        <div className="w-full flex flex-col">
            {/* Top Navigation Bar */}
            <header className="w-full border-b border-neutral-100 bg-white/95 backdrop-blur-md sticky top-0 z-50">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
                    {/* Left: Brand Logo */}
                    <div className="flex items-center">
                        <Image
                            src={assets.logo}
                            alt="Blog App Logo"
                            width={160}
                            height={50}
                            className="w-[120px] sm:w-[150px] md:w-[170px] h-auto object-contain cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
                            priority
                        />
                    </div>

                    {/* Middle: Optional Navigation Links */}
                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600">
                        <a href="#" className="text-black font-semibold">Home</a>
                        <a href="#blogs" className="hover:text-black transition-colors">Blogs</a>
                        <a href="#about" className="hover:text-black transition-colors">About</a>
                        <a href="#contact" className="hover:text-black transition-colors">Contact</a>
                    </nav>

                    {/* Right: CTA Button */}
                    <button className="group flex items-center gap-2 bg-black hover:bg-neutral-800 text-white font-medium text-xs sm:text-sm px-5 py-2.5 sm:px-7 sm:py-2.5 rounded-full shadow-sm hover:shadow-md transition-all duration-200 active:scale-95 cursor-pointer">
                        <span>Get Started</span>
                        <Image
                            src={assets.arrow}
                            alt="arrow icon"
                            width={16}
                            height={16}
                            className="w-3 h-3 object-contain brightness-0 invert transition-transform duration-200 group-hover:translate-x-0.5"
                        />
                    </button>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative w-full py-14 sm:py-20 md:py-24 bg-gradient-to-b from-neutral-50/70 via-white to-white overflow-hidden">
                {/* Ambient background glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-72 bg-gradient-to-r from-orange-100/40 via-amber-100/30 to-sky-100/40 blur-3xl -z-10 pointer-events-none" />

                <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-neutral-200/80 text-neutral-700 text-xs sm:text-sm font-medium mb-6 shadow-xs">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Insights, Stories & Ideas</span>
                    </div>

                    {/* Main Title */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-neutral-900 leading-[1.1] sm:leading-[1.15]">
                        Latest <span className="bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-500 bg-clip-text text-transparent">Blogs</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="mt-5 sm:mt-6 max-w-2xl text-xs sm:text-base md:text-lg text-neutral-600 leading-relaxed sm:leading-loose">
                        A full-stack blog application where users can create, edit, delete, and read blog posts. Experience a clean, modern interface for sharing knowledge and discovering inspiring ideas.
                    </p>

                    {/* Newsletter Subscription Form */}
                    <form
                        onSubmit={fromSubmitHandler}
                        className="relative w-full max-w-md sm:max-w-xl mt-8 sm:mt-10"
                    >
                        <div className="relative flex items-center bg-white rounded-full p-1.5 sm:p-2 border border-neutral-300 shadow-sm sm:shadow-md focus-within:border-black focus-within:ring-4 focus-within:ring-black/5 transition-all">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email address..."
                                className="w-full bg-transparent pl-5 pr-28 sm:pr-36 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base text-neutral-800 placeholder-neutral-400 outline-none"
                                required
                            />
                            <button
                                type="submit"
                                className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 bg-black hover:bg-neutral-800 text-white font-medium text-xs sm:text-sm px-5 py-2.5 sm:px-7 sm:py-3 rounded-full cursor-pointer transition-all duration-200 active:scale-95 shadow-sm"
                            >
                                Subscribe
                            </button>
                        </div>
                    </form>


                </div>
            </section>
        </div>
    );
};

export default Header;
