import { clsx } from '@/utils/string'
import React from 'react'
import scss from "./Footer.module.scss"

const Footer = () => {
  return (
    <>
    <div>
        <div className={clsx(scss.footer_content,'d-flex mx-10')}><span>Made by me </span><span>@copyrigth@2024</span></div>
    </div>
    </>
  )
}

export default Footer
