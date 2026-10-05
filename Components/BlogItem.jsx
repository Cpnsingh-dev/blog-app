import { assets, blog_data } from '@/Assets/assets';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const BlogItem = ({
    title, description, category, image, id,
}) => {
    return (
        <div className="max-w-[340px] sm:max-w-[320px] md:max-w-[350px] w-full bg-white border border-neutral-200/90 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer flex flex-col mx-auto">
            {/* Thumbnail */}
            <div className="relative w-full aspect-[16/10] overflow-hidden bg-neutral-100">
                <Link href={`/blogs/${id}`}>
                    <Image
                        src={image}
                        alt={title || "Blog image"}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </Link>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
                {/* Category Pill */}
                <p className="inline-block self-start px-3 py-1 mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-800 bg-neutral-100 rounded-full border border-neutral-200/80">
                    {category}
                </p>

                {/* Details */}
                <div className="flex flex-col flex-1 justify-between">
                    <div>
                        <h5 className="text-lg font-bold text-neutral-900 leading-snug line-clamp-2 mb-2 group-hover:text-black transition-colors">
                            {title}
                        </h5>
                        <p className="text-sm text-neutral-600 leading-relaxed line-clamp-3 mb-4" dangerouslySetInnerHTML={{ __html: description.slice(0, 100) + "..." }}>

                        </p>
                    </div>

                    {/* Read More Link */}
                    <Link href={`/blogs/${id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-black pt-3 border-t border-neutral-100 w-full group/link">
                        <span>Read more</span>
                        <Image
                            src={assets.arrow}
                            alt="arrow icon"
                            width={12}
                            height={12}
                            className="w-3 h-3 object-contain group-hover/link:translate-x-1.5 transition-transform duration-200"
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogItem;