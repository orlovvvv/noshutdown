import Image from "next/image";
import React from "react";
import logo from "../public/logo.png";
import {
  BellIcon,
  ChatIcon,
  GlobeIcon,
  HomeIcon,
  LoginIcon,
  LogoutIcon,
  MenuIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

function Header() {
  const { data: session } = useSession();

  return (
    <div className="sticky top-0 z-50 flex bg-white px-4 py-2 shadow-sm">
      <div className="relative h-10 w-20 flex-shrink-0 cursor-pointer">
        <Link href="/">
        <Image objectFit="contain" src={logo} layout="fill" />
        </Link>
      </div>

      <div className="mx-7 flex items-center">
        <HomeIcon className="h-5 w-5" />
        <p className="flex-1 ml-2 hidden lg:inline">Strona główna</p>
      </div>

      {/* Wyszukiwarka */}
      <form className="flex flex-1 items-center space-x-2 border border-gray-400 rounded-md px-3 py-1">
        <SearchIcon className="h-6 w-6 text-gray-400" />
        <input
          className="flex-1 bg-transparent outline-none"
          type="text"
          placeholder="Przeszukaj forum"
        ></input>
        <button type="submit" hidden />
      </form>
      <div className="mx-5 hidden items-center space-x-2 text-gray-500 lg:inline-flex">
        <GlobeIcon className="icon" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
      </div>
      <div className="ml-5  flex items-center lg:hidden">
        <MenuIcon className="icon" />
      </div>

      {/* przyciski Zaloguj / Zarejestruj */}
      {session ? (
        <div
          onClick={() => signOut()}
          className="hidden items-center lg:flex"
        >
          <div className="flex-1 text-xs p-2">
            <p className="truncate">{session?.user?.name}</p>
          </div>
          <div className="items-center cursor-pointer space-x-2 border bg-sky-400/40 rounded-md p-2 lg:flex hover:bg-sky-400/80">
            <div className="relative h-5 w-5 flex-shrink-0">
              <LogoutIcon />
            </div>
            <p className='text-sm'> Wyloguj się</p>
          </div>
        </div>
      ) : (
        <div
          onClick={() => signIn()}
          className="hidden cursor-pointer items-center space-x-2 border bg-sky-400/40 rounded-md p-2 lg:flex hover:bg-sky-400/80"
        >
          <div className="relative h-5 w-5 flex-shrink-0">
            <LoginIcon />
          </div>
          <p className='text-sm'> Zaloguj się</p>
        </div>
      )}
    </div>
  );
}

export default Header;
