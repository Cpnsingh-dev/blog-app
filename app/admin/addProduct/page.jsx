'use client'
import { assets } from '@/Assets/assets'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Page = () => {

    const [image, setImage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        title: "",
        description: "",
        category: "Startup",
        author: "Alex Bennet",
        authorImg: "/author_img.png",
    });

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data => ({ ...data, [name]: value }));
    }

    const onsubmitHandler = async (e) => {
        e.preventDefault();

        if (!image) {
            toast.error("Please upload a thumbnail image");
            return;
        }

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('description', data.description);
            formData.append('category', data.category);
            formData.append('author', data.author);
            formData.append('authorImg', data.authorImg);
            formData.append('image', image);

            const response = await axios.post('/api/blog', formData);

            if (response.data.success) {
                toast.success(response.data.msg || "Blog Added Successfully!");
                setImage(false);
                setData({
                    title: "",
                    description: "",
                    category: "Startup",
                    author: "Alex Bennet",
                    authorImg: "/author_img.png",
                });
                const fileInput = document.getElementById('image');
                if (fileInput) fileInput.value = '';
            } else {
                toast.error(response.data.msg || "Failed to add blog");
            }
        } catch (error) {
            console.error("Submission error:", error);
            toast.error(error.response?.data?.msg || error.message || "An error occurred while adding the blog");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <div className='max-w-4xl mx-auto'>
            <div className='bg-white border border-neutral-200/80 rounded-2xl sm:rounded-3xl shadow-xs p-6 sm:p-10'>
                <div className='mb-8 border-b border-neutral-100 pb-5'>
                    <h1 className='text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight'>
                        Add New Blog
                    </h1>
                    <p className='text-sm text-neutral-500 mt-1.5'>
                        Fill in the details below to upload a thumbnail and create a new article.
                    </p>
                </div>

                <form onSubmit={onsubmitHandler} className='space-y-6 sm:space-y-7'>
                    {/* Thumbnail Upload */}
                    <div>
                        <p className='text-sm font-semibold text-neutral-800 mb-2.5'>
                            Upload Thumbnail
                        </p>
                        <label
                            htmlFor="image"
                            className='inline-flex flex-col items-center justify-center p-4 border-2 border-dashed border-neutral-300 hover:border-neutral-900/60 rounded-2xl bg-neutral-50/60 hover:bg-neutral-100/50 cursor-pointer transition-all duration-200 group'
                        >
                            <div className='relative overflow-hidden rounded-xl'>
                                <Image
                                    src={!image ? assets.upload_area : URL.createObjectURL(image)}
                                    width={140}
                                    height={70}
                                    alt='Blog thumbnail'
                                    className={`object-cover transition-all duration-200 ${!image
                                        ? 'w-36 h-20 opacity-70 group-hover:opacity-100 group-hover:scale-105'
                                        : 'w-44 h-24 rounded-lg shadow-xs'
                                        }`}
                                />
                            </div>
                            <span className='text-xs text-neutral-500 mt-2 font-medium group-hover:text-neutral-700 transition-colors'>
                                {!image ? 'Click to browse image' : 'Click to change image'}
                            </span>
                        </label>
                        <input
                            onChange={(e) => setImage(e.target.files[0])}
                            type="file"
                            id="image"
                            className='hidden'
                            required
                        />
                    </div>
                    {/* Blog Title */}
                    <div>
                        <label htmlFor="title" className='block text-sm font-semibold text-neutral-800 mb-2'>
                            Blog Title
                        </label>
                        <input
                            type="text"
                            placeholder='Enter Title'
                            name='title'
                            id='title'
                            required
                            onChange={onChangeHandler}
                            value={data.title}
                            className='w-full max-w-2xl px-4 py-3 text-sm sm:text-base text-neutral-900 placeholder-neutral-400 bg-white border border-neutral-300 rounded-xl outline-none focus:border-neutral-900 focus:ring-4 focus:ring-neutral-900/5 transition-all shadow-2xs'
                        />
                    </div>
                    {/* Blog Description */}
                    <div>
                        <label htmlFor="description" className='block text-sm font-semibold text-neutral-800 mb-2'>
                            Blog Description
                        </label>
                        <textarea
                            placeholder='Write Content Here'
                            name='description'
                            id='description'
                            required
                            onChange={onChangeHandler}
                            value={data.description}
                            rows={6}
                            className='w-full max-w-2xl px-4 py-3 text-sm sm:text-base text-neutral-900 placeholder-neutral-400 bg-white border border-neutral-300 rounded-xl outline-none focus:border-neutral-900 focus:ring-4 focus:ring-neutral-900/5 transition-all shadow-2xs resize-y'
                        />
                    </div>
                    {/* Blog Category */}
                    <div>
                        <label htmlFor="category" className='block text-sm font-semibold text-neutral-800 mb-2'>
                            Blog Category
                        </label>
                        <div className='relative max-w-xs'>
                            <select
                                name="category"
                                id="category"
                                className='w-full appearance-none bg-white border border-neutral-300 text-neutral-800 text-sm sm:text-base px-4 py-3 pr-10 rounded-xl outline-none focus:border-neutral-900 focus:ring-4 focus:ring-neutral-900/5 transition-all shadow-2xs cursor-pointer'
                                onChange={onChangeHandler}
                                value={data.category}
                            >
                                <option value="Startup">Startup</option>
                                <option value="Technology">Technology</option>
                                <option value="LifeStyle">LifeStyle</option>
                            </select>
                            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-neutral-500'>
                                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7' />
                                </svg>
                            </div>
                        </div>
                    </div>
                    {/* Submit Button */}
                    <div className='pt-2'>
                        <button
                            type='submit'
                            disabled={loading}
                            className={`inline-flex items-center justify-center px-10 py-3.5 bg-neutral-900 hover:bg-neutral-800 active:scale-[0.99] text-white text-sm sm:text-base font-semibold rounded-xl shadow-sm hover:shadow-md hover:shadow-neutral-900/10 transition-all duration-200 cursor-pointer ${loading ? 'opacity-70 cursor-not-allowed' : ''
                                }`}
                        >
                            {loading ? 'ADDING...' : 'ADD'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Page
