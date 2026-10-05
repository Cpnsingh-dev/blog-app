import React from 'react'

const Subscription = ({ email, mongoId, date, deleteEmail }) => {

    const emailDate = new Date(date);

    return (
        <tr className='bg-white border-b border-neutral-100 hover:bg-neutral-50/80 transition-colors duration-200'>
            <th scope='row' className='px-4 sm:px-6 py-3 sm:py-4 font-medium text-neutral-900 whitespace-nowrap text-xs sm:text-sm'>
                {email ? email : "No Email"}
            </th>
            <td className='px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-neutral-500 whitespace-nowrap'>
                {date ? emailDate.toDateString() : "No date"}
            </td>
            <td onClick={() => deleteEmail(mongoId)} className='px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-neutral-400 hover:text-rose-600 text-center cursor-pointer transition-colors duration-200 select-none'>
                x
            </td>
        </tr>
    )
}

export default Subscription 