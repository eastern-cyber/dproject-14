import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#110030] text-white py-8 mt-14">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Description */}
        <div>
          <h2 className="text-[24px] text-red-500 font-bold hover:text-yellow-500">
            <Link href="/">DFI.Fund</Link>
        </h2>
          <p className="mt-2 text-[16px] text-gray-400">
          <b>DProject</b> Financial Innovation<br />
          <b>Web3 SuperApp</b> of the Future.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-[19px] font-semibold text-yellow-500 mb-4">Navigation</h3>
          <ul className="space-y-2 text-[17px] text-gray-400">
            <li className="hover:text-blue-300 hover:font-semibold"><Link href="/">Home</Link></li>
            <li className="hover:text-blue-300 hover:font-semibold"><Link href="/about">About</Link></li>
            <li className="hover:text-blue-300 hover:font-semibold"><Link href="/timeline">Timeline</Link></li>
            <li className="hover:text-blue-300 hover:font-semibold"><Link href="/member-area/">Member Area</Link></li>
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h3 className="text-[19px] font-semibold text-yellow-500 mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://web.facebook.com/people/KOK-KOK-KOK/61573998052437/" target="_blank" aria-label="Facebook"><Facebook className="w-6 h-6 hover:text-blue-500 pt-2" /></a>
            <a href="#" aria-label="Instagram"><Instagram className="w-6 h-6 hover:text-pink-500 pt-1" /></a>
            <a href="https://www.youtube.com/@kokkokkok-w5z" target="_blank" aria-label="YouTube Channel"><Youtube className="w-7 h-8 hover:text-red-500 pb-1" /></a>
            <a href="#" aria-label="X (formerly Twitter)"><span className="text-xl font-bold hover:text-sky-400">X</span></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-6 border-t border-gray-700 px-2 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} DFI.Fund All rights reserved.
      </div>
    </footer>
  );
}