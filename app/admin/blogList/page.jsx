'use client'
import BlogTableItem from '@/Components/AdminComponents/BlogTableItem'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const Page = () => {

    const [blogs, setBlogs] = useState([]);

    const fetchBlogs = async () => {
        const response = await axios.get(`/api/blog`);
        setBlogs(response.data.blogs);
    }

    const deleteBlog = async (mongoId) => {
        const response = await axios.delete(`/api/blog?id=${mongoId}`);
        toast.success(response.data.msg);
        fetchBlogs();
    }

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <div className='flex-1 max-w-6xl'>
            <h1 className='text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 mb-4 sm:mb-6'>All Blogs List</h1>
            <div className='relative overflow-x-auto bg-white border border-neutral-200/80 rounded-xl sm:rounded-2xl shadow-sm'>
                <table className='w-full min-w-[600px] text-sm text-left text-neutral-600'>
                    <thead className='text-xs uppercase tracking-wider font-semibold text-neutral-500 bg-neutral-50/80 border-b border-neutral-200/80'>
                        <tr>
                            <th scope='col' className='px-4 sm:px-6 py-3 sm:py-4'>
                                Author Name
                            </th>
                            <th scope='col' className='px-4 sm:px-6 py-3 sm:py-4'>
                                Blog Title
                            </th>
                            <th scope='col' className='px-4 sm:px-6 py-3 sm:py-4'>
                                Date
                            </th>
                            <th className='px-4 sm:px-6 py-3 sm:py-4 text-center'>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-neutral-100'>
                        {
                            blogs.map((item, index) => (
                                <BlogTableItem
                                    key={index}
                                    mongoId={item._id}
                                    authorImg={item.authorImg}
                                    title={item.title}
                                    author={item.author}
                                    date={item.date}
                                    deleteBlog={deleteBlog}
                                />
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Page
