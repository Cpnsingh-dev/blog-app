import { assets } from '@/Assets/assets'
import Image from 'next/image'
import React from 'react'

const Footer = () => {
    return (
        <div className='flex justify-around flex-col gap-4 sm:gap-0 sm:flex-row bg-black py-5 px-4 items-center text-center sm:text-left'>
            <Image src={assets.logo_light} width={120} alt="logo light" />
            <p className='text-white text-sm'>All rights reserved. Copyright @blogger</p>
            <div className='flex gap-3 sm:gap-4'>
                <Image src={assets.facebook_icon} alt='facebook icon' width={40} />
                <Image src={assets.twitter_icon} alt='twitter icon' width={40} />
                <Image src={assets.googleplus_icon} alt='google icon' width={40} />
            </div>
        </div>
    )
}

export default Footer