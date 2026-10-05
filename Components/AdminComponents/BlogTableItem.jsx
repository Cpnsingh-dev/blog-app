import { assets } from '@/Assets/assets'
import Image from 'next/image'
import React from 'react'

const BlogTableItem = ({ authorImg, title, author, date, mongoId, deleteBlog }) => {

    const BlogDate = new Date(date);



    return (
        <tr className='bg-white border-b border-neutral-100 hover:bg-neutral-50/80 transition-colors duration-200'>
            <th scope='row' className='items-center gap-2.5 sm:gap-3 flex px-4 sm:px-6 py-3 sm:py-4 font-medium text-neutral-900 whitespace-nowrap'>
                <Image className='w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover ring-2 ring-neutral-200/70 shadow-xs shrink-0' src={authorImg ? authorImg : assets.profile_icon} width={40} height={40} alt='' />
                <p className='text-xs sm:text-sm font-medium text-neutral-800'>{author ? author : "No author."}</p>
            </th>
            <td className='px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-neutral-800 leading-snug'>
                {title ? title : "No title."}
            </td>
            <td className='px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-neutral-500 whitespace-nowrap'>
                {date ? BlogDate.toDateString() : "No date"}
            </td>
            <td onClick={() => deleteBlog(mongoId)} className='px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-neutral-400 hover:text-rose-600 text-center cursor-pointer transition-colors duration-200 select-none'>
                X
            </td>
        </tr>
    )
}

export default BlogTableItem