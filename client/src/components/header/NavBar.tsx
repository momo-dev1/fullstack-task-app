"use client";
import Image from "next/image";
import DarkModeToggle from "./DarkModeToggle";
import Link from "next/link";
import LogOutBtn from "../LogoutBtn";
import { navLinks } from "@/lib/data";
import { useState } from "react";

const NavBar = () => {
  const [isMobileMenuOpen, setisMobileMenuOpen] = useState(false);
  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-white shadow-md dark:bg-[#101929]">
      <div className="mx-auto flex h-20 max-w-screen-xl items-center justify-between gap-8 px-2">
        <nav aria-label="Global" className="flex items-center gap-6">
          <Link href="/" className="block dark:text-white">
            <span className="sr-only">Tasks</span>
            <Image
              className="h-8"
              src="/logo.png"
              alt="Logo"
              width={32}
              height={32}
            />
          </Link>
          <ul className="hidden items-center gap-4 text-sm md:flex">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  className="font-semibold transition hover:text-teal-500/75 dark:text-white"
                  href={link.href}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <ul
            className={`${
              isMobileMenuOpen ? "block" : "hidden"
            } absolute top-24 right-2 w-1/2 bg-white dark:bg-[#101929] p-4 md:hidden rounded-md border shadow-md`}
          >
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  className="block py-2 font-semibold transition hover:text-teal-500/75 dark:text-white"
                  href={link.href}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <div className="">
            <DarkModeToggle />
          </div>
          <div className="sm:flex sm:gap-4">
            <LogOutBtn />
          </div>

          <button
            onClick={() => setisMobileMenuOpen(!isMobileMenuOpen)}
            className="block rounded border-2  p-2.5 dark:text-gray-300 transition md:hidden "
          >
            <span className="sr-only">Toggle menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
