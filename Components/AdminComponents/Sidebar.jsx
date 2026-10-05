'use client'

import { assets } from '@/Assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {
    const pathname = usePathname();

    const navLinks = [
        {
            name: 'Add Blogs',
            path: '/admin/addProduct',
            icon: assets.add_icon,
        },
        {
            name: 'Blog Lists',
            path: '/admin/blogList',
            icon: assets.blog_icon,
        },
        {
            name: 'Subscriptions',
            path: '/admin/subscription',
            icon: assets.email_icon,
        },
    ];

    return (
        <aside className='w-20 sm:w-24 md:w-64 lg:w-72 min-h-screen bg-slate-50 border-r border-neutral-200 flex flex-col justify-between shrink-0 select-none transition-all duration-300'>
            {/* Top Brand Header */}
            <div>
                <div className='px-4 sm:px-6 h-16 sm:h-20 border-b border-neutral-200/80 flex items-center justify-center md:justify-between bg-white shrink-0'>
                    <Link href='/' className='transition-transform duration-200 hover:scale-[1.02]'>
                        <Image
                            src={assets.logo}
                            width={130}
                            alt='Logo'
                            priority
                            className='w-24 sm:w-28 md:w-32 h-auto object-contain'
                        />
                    </Link>
                    <span className='hidden lg:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-neutral-100 text-neutral-600 border border-neutral-200'>
                        Admin
                    </span>
                </div>

                {/* Navigation Links */}
                <div className='p-3 sm:p-4 md:p-6 space-y-2.5'>
                    <p className='hidden md:block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider px-3 mb-2'>
                        Menu
                    </p>

                    {navLinks.map((item) => {
                        const isActive = pathname === item.path;

                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`group flex items-center justify-center md:justify-start gap-3.5 px-3 md:px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${
                                    isActive
                                        ? 'bg-neutral-900 text-white shadow-md shadow-neutral-900/10 font-semibold'
                                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60 font-medium'
                                }`}
                                title={item.name}
                            >
                                <div className={`relative flex items-center justify-center w-7 h-7 shrink-0 transition-transform duration-200 group-hover:scale-110`}>
                                    <Image
                                        src={item.icon}
                                        width={24}
                                        height={24}
                                        alt={item.name}
                                        className={`w-6 h-6 object-contain transition-all duration-200 ${
                                            isActive ? 'brightness-0 invert' : 'opacity-80 group-hover:opacity-100'
                                        }`}
                                    />
                                </div>

                                <span className='hidden md:inline-block text-sm tracking-tight'>
                                    {item.name}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Bottom Footer / Back to site */}
            <div className='p-3 sm:p-4 md:p-6 border-t border-neutral-200/80 bg-white/50'>
                <Link
                    href='/'
                    className='group flex items-center justify-center md:justify-between px-3 md:px-4 py-3 rounded-xl text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-all duration-200 text-sm font-medium'
                    title='Back to website'
                >
                    <span className='hidden md:inline-block'>View Website</span>
                    <Image
                        src={assets.arrow}
                        width={14}
                        height={14}
                        alt='arrow'
                        className='w-3.5 h-3.5 object-contain transition-transform duration-200 group-hover:translate-x-1 opacity-70 group-hover:opacity-100'
                    />
                </Link>
            </div>
        </aside>
    )
}

export default Sidebar