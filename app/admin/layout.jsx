import Sidebar from "@/Components/AdminComponents/Sidebar";
import Image from "next/image";
import { assets } from "@/Assets/assets";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Layout({ children }) {
    return (
        <div className="flex min-h-screen bg-slate-50/50">
            <ToastContainer theme="dark" />
            <Sidebar />
            <div className="flex flex-col w-full min-w-0">
                {/* Admin Top Header */}
                <header className="flex items-center justify-between w-full h-16 sm:h-20 px-4 sm:px-8 md:px-10 border-b border-neutral-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-30 shrink-0">
                    <h3 className="font-semibold text-neutral-800 text-base sm:text-lg tracking-tight">
                        Admin Panel
                    </h3>
                    <div className="flex items-center gap-3">
                        <Image
                            src={assets.profile_icon}
                            width={38}
                            height={38}
                            alt="Admin Profile"
                            className="rounded-full border border-neutral-200 shadow-xs object-cover cursor-pointer hover:ring-2 hover:ring-neutral-900/10 transition-all"
                        />
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 p-4 sm:p-7 md:p-10 bg-slate-50/40 min-w-0">
                    {children}
                </main>
            </div>
        </div>
    )
}