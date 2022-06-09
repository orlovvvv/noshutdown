import Image from "next/image";
import React from "react";
import logo from "../public/logo.png";
import {
  HomeIcon,
  InformationCircleIcon,
  LoginIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

function Header() {
  const { data: session } = useSession();

  return (
    <div className="sticky top-0 z-50 bg-white px-4 py-2 shadow-sm flex items-start flex-1">
      <div className="relative h-10 w-20 flex-shrink-0 cursor-pointer mr-5">
        <Link href="/">
          <Image objectFit="contain" src={logo} layout="fill" alt="blur" />
        </Link>
      </div>
      <div className="flex flex-1 items-end space-x-2 text-gray-500">
      <Link href="/">
        <HomeIcon className="icon" />
        </Link>
        <Link href="/about">
          <InformationCircleIcon className="icon" />
        </Link>
      </div>
      <div className="items-center space-x-2 hidden lg:flex">
        {session ? (
          <div
            onClick={() => signOut()}
            className=" items-center text-black inline-flex"
          >
            <div className="flex-1 flex  text-xs p-2">
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
