import React, { useEffect, useState } from 'react'
import {HiOutlineX, HiOutlineMenu} from 'react-icons/hi'
import SideMenu from './SideMenu';
import ETLogo from '../../../public/logo.png'
const Navbar = ({activeMenu}) => {

  const [sticky, setSticky]= useState(false);
  const [openSideMenu,setOpenSideMenu]=useState(false);

  useEffect(()=>{
        const handleScroll=()=>{
          if(window.scrollY>0){
            setSticky(true);
          }
          else{
            setSticky(false);
          }
        };
        window.addEventListener('scroll', handleScroll);
      }, []);
  return (
    <>
      <div className={`flex gap-5bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30 navbar ${sticky ? 'navbar-mutate transition-all' : 'navbar'}`}>
        <button className='block lg:hidden text-black'
        onClick={()=>{
          setOpenSideMenu(!openSideMenu);
        }}
        >
          {
            openSideMenu 
            ?(<HiOutlineX className='text-2xl'/>) 
            :(<HiOutlineMenu className='text-2xl'/>) 
          }
        </button>

        <h2 className='text-lg font-medium nav-logo text-black'>
          <img src={ETLogo} alt="logo" className='h-10' />
        </h2>

        {
          openSideMenu && (
            <div className='fixed top-[61px] -ml-4 bg-white'>
               <SideMenu activeMenu={activeMenu}/>
            </div>
          )
        }

      </div>
    </>
  )
}

export default Navbar
