import React from 'react'
import { FaRegHeart } from 'react-icons/fa'
import { GoSearch } from 'react-icons/go'
import { IoCartOutline } from 'react-icons/io5'
import scss from "./header.module.scss"
import { clsx } from '@/utils/string'

const Header = () => {
  return (
    <>
   <header>
    
    <div className={scss.header_content}>
      <div className={clsx(scss.title,'d-flex mr-96')}>
        Myntra
        <div className='mx-2'><img className={scss.image_content} src='/assests/logo.png' alt='logo'></img></div>
      </div>
        <span >
        <GoSearch />
        </span>
        <span className='mr-2'><FaRegHeart />
</span>
        <span><IoCartOutline />
</span>
    </div>
   </header>
    </>
  )
}

export default Header
