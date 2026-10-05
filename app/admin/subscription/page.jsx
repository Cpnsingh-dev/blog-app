'use client'
import Subscription from '@/Components/AdminComponents/Subscription'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const Page = () => {

    const [email, setEmail] = useState([]);

    const fecthEmails = async () => {
        const response = await axios.get('/api/email');
        setEmail(response.data.emails);
    }

    const deleteEmail = async (mongoId) => {
        try {
            const response = await axios.delete('/api/email', {
                params: {
                    id: mongoId
                }
            })
            if (response.data.success) {
                toast.success(response.data.msg);
                fecthEmails();
            } else {
                toast.error(response.data.msg);
            }
        } catch (error) {
            console.error("Error deleting email:", error);
            toast.error(error.response?.data?.msg || "Failed to delete email");
        }
    }



    useEffect(() => {
        fecthEmails();
    }, [])

    return (
        <div className='flex-1 max-w-5xl'>
            <h1 className='text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 mb-4 sm:mb-6'>All Subscriptions</h1>
            <div className='relative overflow-x-auto bg-white border border-neutral-200/80 rounded-xl sm:rounded-2xl shadow-sm'>
                <table className='w-full min-w-[500px] text-sm text-left text-neutral-600'>
                    <thead className='text-xs uppercase tracking-wider font-semibold text-neutral-500 bg-neutral-50/80 border-b border-neutral-200/80'>
                        <tr>
                            <th scope='col' className='px-4 sm:px-6 py-3 sm:py-4'>Email Subscriptions</th>
                            <th scope='col' className='px-4 sm:px-6 py-3 sm:py-4'>Date</th>
                            <th scope='col' className='px-4 sm:px-6 py-3 sm:py-4 text-center'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-neutral-100'>
                        {email.map((item, index) => {
                            return (
                                <Subscription
                                    key={index}
                                    mongoId={item._id}
                                    email={item.email}
                                    date={item.date}
                                    deleteEmail={deleteEmail}
                                />
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Page
