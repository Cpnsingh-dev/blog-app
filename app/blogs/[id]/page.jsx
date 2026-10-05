"use client"

import { assets } from '@/Assets/assets';
import Footer from '@/Components/Footer';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { use, useEffect, useState } from 'react';

const Page = ({ params }) => {
    // In Next.js 15+ and Next.js 16, params is a Promise in client components and must be unwrapped using React.use()
    const resolvedParams = use(params);

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchBlogData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/blog', {
                params: {
                    id: resolvedParams.id
                }
            });
            if (response.data.success) {
                setData(response.data.blog);
            }
        } catch (error) {
            console.error("Error fetching blog details:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (resolvedParams?.id) {
            fetchBlogData();
        }
    }, [resolvedParams?.id]);

    if (loading) {
        return (
            <div className="flex flex-col min-h-screen bg-white justify-center items-center">
                <div className="w-10 h-10 border-3 border-neutral-200 border-t-neutral-900 rounded-full animate-spin"></div>
                <p className="mt-4 text-sm text-neutral-500 font-medium">Loading blog...</p>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex flex-col min-h-screen bg-white justify-center items-center text-center px-4">
                <h2 className="text-2xl font-bold text-neutral-900">Blog Not Found</h2>
                <p className="mt-2 text-sm text-neutral-500">The article you are looking for does not exist or has been removed.</p>
                <Link href="/" className="mt-6 px-6 py-2.5 bg-neutral-900 hover:bg-black text-white rounded-full text-sm font-medium transition-colors">
                    Return to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-white text-neutral-900 antialiased selection:bg-black selection:text-white">
            <main className="flex-1">
                {/* Header / Hero Banner Section - Distinct Dark Theme */}
                <div className="relative w-full bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 border-b border-neutral-800/80 pt-6 pb-24 sm:pb-32 md:pb-40 overflow-hidden">
                    {/* Ambient Soft Glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-gradient-to-r from-blue-900/15 via-purple-900/15 to-indigo-900/15 blur-3xl pointer-events-none" />

                    {/* Top Navigation Row - Spanning complete width with elegant margins */}
                    <div className="w-full max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-8 md:px-12 lg:px-16 relative z-10">
                        <Link href={'/'}>
                            <Image
                                src={assets.logo_light || assets.logo}
                                width={180}
                                alt="logo"
                                className="w-[125px] sm:w-[155px] md:w-[175px] h-auto object-contain cursor-pointer transition-transform duration-300 hover:scale-[1.02] drop-shadow-md"
                                priority
                            />
                        </Link>
                        <button className="group flex items-center gap-2.5 bg-white hover:bg-neutral-100 text-neutral-950 font-semibold text-xs sm:text-sm px-5 py-2.5 sm:px-6 sm:py-2.5 rounded-full shadow-sm hover:shadow-md active:scale-95 transition-all duration-200 cursor-pointer">
                            <span>Get started</span>
                            <Image
                                src={assets.arrow}
                                alt="arrow"
                                width={14}
                                height={14}
                                className="w-3.5 h-3.5 object-contain transition-transform duration-200 group-hover:translate-x-0.5"
                            />
                        </button>
                    </div>

                    {/* Title Section */}
                    <div className="text-center mt-12 sm:mt-16 md:mt-20 mb-8 sm:mb-12 max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center relative z-10">
                        {data.category && (
                            <span className="inline-block px-3.5 py-1 mb-4 text-xs font-semibold uppercase tracking-wider text-neutral-300 bg-white/10 backdrop-blur-md rounded-full border border-white/15 shadow-xs">
                                {data.category}
                            </span>
                        )}
                        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[50px] font-extrabold tracking-tight text-white leading-[1.2] sm:leading-[1.18] md:leading-[1.15] max-w-[820px] mx-auto drop-shadow-sm">
                            {data.title}
                        </h1>

                        {/* Classy Author Pill */}
                        <div className="inline-flex items-center gap-3 mt-7 sm:mt-9 px-4 py-2 rounded-full bg-neutral-900/90 backdrop-blur-md border border-neutral-700/80 shadow-lg hover:border-neutral-600 transition-all duration-300">
                            <Image
                                className="rounded-full border border-neutral-700/80 shadow-xs object-cover"
                                src={data.authorImg || data.author_img || assets.profile_icon}
                                width={38}
                                height={38}
                                alt="author"
                            />
                            <p className="text-sm sm:text-base font-semibold text-neutral-200 tracking-tight">
                                {data.author}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Featured Image Section with Editorial Framing & Overlap */}
                <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-22 md:-mt-28 relative z-20 flex flex-col items-center justify-center">
                    <div className="w-full rounded-2xl sm:rounded-3xl p-2 sm:p-3 bg-white border border-neutral-200/90 shadow-2xl shadow-neutral-950/20 transition-all duration-500 hover:shadow-neutral-950/25">
                        <div className="relative w-full aspect-[16/9] sm:aspect-[21/10] overflow-hidden rounded-xl sm:rounded-2xl bg-neutral-100">
                            <Image
                                className="w-full h-full object-cover rounded-xl sm:rounded-2xl transition-transform duration-700 hover:scale-[1.01]"
                                src={data.image}
                                width={1200}
                                height={700}
                                alt={data.title}
                                priority
                            />
                        </div>
                    </div>
                </div>

                {/* Blog Post Content Section */}
                <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-14 pb-20 sm:pb-28">

                    <div className='blog-content' dangerouslySetInnerHTML={{ __html: data.description }}>

                    </div>





                    <div className="my-12 pt-8 border-t border-neutral-200/80">
                        <p className='font-semibold my-4 text-black text-sm sm:text-base'>Share this article on Social Media</p>
                        <div className='flex gap-x-3 items-center'>
                            <Image src={assets.facebook_icon} width={45} alt="facebook icon" className="cursor-pointer hover:opacity-80 transition-opacity" />
                            <Image src={assets.twitter_icon} width={45} alt="twitter icon" className="cursor-pointer hover:opacity-80 transition-opacity" />
                            <Image src={assets.googleplus_icon} width={45} alt="linkedin icon" className="cursor-pointer hover:opacity-80 transition-opacity" />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Page;