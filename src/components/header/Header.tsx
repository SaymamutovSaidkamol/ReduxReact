import { memo } from 'react'
import { Link } from 'react-router-dom'
import { IoMdHome } from "react-icons/io";
import { MdCreateNewFolder } from "react-icons/md";
import { FaHeart } from "react-icons/fa";



const Header = () => {
  return (
    <div className='fixed top-0  w-full bg-navbar z-50 '>
      <div className='container mx-auto w-full flex justify-between py-2 px-5 items-center '>
        <div><Link to={'/'}><img className='w-[100px]' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgl4QzJlMcNGybuWC06zldct088W6yxYprMA&s' /></Link></div>
        <div className='flex gap-30'>
          <Link to={'/'} className={"flex flex-col items-center "}>
            <IoMdHome className='text-3xl' />
            Home
          </Link>
          <Link to={'/create'} className={"flex flex-col items-center "}>
            <MdCreateNewFolder className='text-3xl' />
            Create
          </Link>
          <Link to={'/saved'} className={"flex flex-col items-center "}>
            <FaHeart className='text-3xl' />
            Saved
          </Link>
        </div>
      </div>
    </div>
  )
}

export default memo(Header)
