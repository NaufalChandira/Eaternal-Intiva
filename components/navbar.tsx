"use client";

import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import Link from "next/link";
import Image from "next/image";
import Logo from "../assets/product_logo.png";
import Icons from "../assets/icons.png";
import Icons2 from "../assets/icons2.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <nav className="bg-gradient-to-b from-blue-700 to-blue-500 h-20 flex items-center px-6 lg:px-12 fixed top-0 left-0 w-full z-40">
        <div className="flex items-center gap-4">
          <Image src={Logo} alt="Logo" className="h-10 w-auto" />
          <div className="hidden lg:flex items-center gap-6 ml-auto ps-8">
            <Link href="/transaction" className="flex items-center gap-2 text-white text-lg p-2 rounded-lg hover:bg-blue-600 bg-opacity-30">
              <Image src={Icons} alt="Transaction Icon" className="w-5 h-5" />
              Transaction
            </Link>
            <Link href="/products" className="flex items-center gap-2 text-white text-lg p-2 rounded-lg hover:bg-blue-600 bg-opacity-30">
              <Image src={Icons2} alt="Product Icon" className="w-5 h-5" />
              Product
            </Link>
          </div>
        </div>
        <div className="lg:hidden ml-auto">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2 rounded-full focus:outline-none" aria-label="Open Menu">
            {isOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
          </button>
        </div>
      </nav>
      <div className={`fixed top-20 left-0 w-full bg-white shadow-md transition-transform transform ${isOpen ? "translate-y-0" : "-translate-y-full"} lg:hidden z-30`}>
        <div className="flex flex-col gap-4 p-6">
          <Link href="/transaction" className="flex items-center gap-2 text-gray-900 text-lg p-2 rounded-lg hover:bg-gray-200" onClick={() => setIsOpen(false)}>
            <Image src={Icons} alt="Transaction Icon" className="w-5 h-5" />
            Transaction
          </Link>
          <Link href="/products" className="flex items-center gap-2 text-gray-900 text-lg p-2 rounded-lg hover:bg-gray-200" onClick={() => setIsOpen(false)}>
            <Image src={Icons2} alt="Product Icon" className="w-5 h-5" />
            Product
          </Link>
        </div>
      </div>

      {isOpen && <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-20 lg:hidden"></div>}
    </div>
  );
}
