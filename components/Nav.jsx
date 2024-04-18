'use client';
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useInsertionEffect } from 'react'
import { signIn, signOut, useSession, getProviders} from 'next-auth/react'
const Nav = () => {
  const isUserLoggedIn = true;
  const [Providers, setProviders] = useState(null);
  useEffect(() => {
const setProviders = async ()=>{
  const response = await getProviders()
}
}, [])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href={"/"} className="flex gap-2 flex-center">
        <Image src={"/assets/images/logo.svg"} alt="logo" width={30} height={30}/>
        <p className="logo_text">My Blog</p>

        {/* Desktop Navigation */}
        <div className="sm:flex hidden">
          {isUserLoggedIn ? (
            <div className='flex gap-3 md:gap-5'>
              <Link href={"/create-post"} className={"black_btn"}>
              Create Post
              </Link>
              <button type='button' onClick={() => signOut()} className={"outline_btn"}>
                Sign Out
              </button>

              <Link href={"/profile"} className={"black_btn"}>
                <Image src={"/assets/images/profile.png"} alt="profile" width={37} height={37}/>
              </Link>
            </div>
          ) : (
            <>
            
            </>
          )
          }

        </div>
      </Link>
    </nav>

  )
}

export default Nav