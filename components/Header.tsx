import Image from "next/image";
import React from "react";
import logo from "../public/logo.png";
import {
  HomeIcon,
  InformationCircleIcon,
  LoginIcon,
  LogoutIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

function Header() {
  const { data: session } = useSession();

  return (
    <div className="sticky top-0 z-50 flex bg-white px-4 py-2 shadow-sm flex items-center">
      <div className="relative h-16 w-32 flex-shrink-0 cursor-pointer mr-5">
        <Link href="/">
          <Image objectFit="contain" src={logo} layout="fill" alt="blur" />
        </Link>
      </div>

      {/* Wyszukiwarka */}
      <form className="flex flex-1 items-center space-x-2 border border-gray-400 rounded-md px-3 py-1 max-w-5xl">
        <SearchIcon className="h-6 w-6 text-gray-400" />
        <input
          className="flex-1 bg-transparent outline-none"
          type="text"
          placeholder="Przeszukaj forum"
        ></input>
        <button type="submit" hidden />
      </form>
      <div className="ml-5 flex items-center space-x-2 text-gray-500">
      <Link href="/">
        <HomeIcon className="icon" />
        </Link>
        <Link href="/about">
          <InformationCircleIcon className="icon" />
        </Link>
      </div>
      <div className="mx-2 items-center space-x-2">
        {session ? (
          <div
            onClick={() => signOut()}
            className=" items-center text-black inline-flex"
          >
            <div className="flex-1 flex text-xs p-2">
              <p className="truncate">{session?.user?.name}</p>
            </div>
            <div className="items-center cursor-pointer space-x-2 border bg-sky-400 rounded-md p-2 lg:flex hover:bg-sky-400/80">
              <div className="relative h-5 w-5 flex-shrink-0">
                <LogoutIcon />
              </div>
              <p className="text-sm"> Wyloguj się</p>
            </div>
          </div>
        ) : (
          <div
            onClick={() => signIn()}
            className=" cursor-pointer items-center space-x-2 border bg-sky-400/40 rounded-md p-2 ml-5 flex hover:bg-sky-400/80"
          >
            <div className="relative h-5 w-5 flex-shrink-0">
              <LoginIcon />
            </div>
            <p className="text-sm"> Zaloguj się</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
