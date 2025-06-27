import React, { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { CrowdFundingContext } from "../Context/CroudFunding";
import { Logo, Menu, Close } from "./"; // Assuming you have Menu and Close icons

const NavBar = () => {
  const { currentAccount, connectWallet, disconnectWallet } = useContext(CrowdFundingContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Campaigns", path: "/project" },
    { title: "White Paper", path: "/white-paper" },
    { title: "Donation", path: "/donation" },
    { title: "Members", path: "/members" },
  ];

  return (
    <nav className="bg-[#13131a] border-b border-[#3a3a43] sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" legacyBehavior>
              <a className="flex items-center space-x-2">
                <Logo />
                <span className="text-white font-bold text-xl">CauseFi</span>
              </a>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link href={link.path} key={link.title} legacyBehavior>
                <a
                  className={`text-gray-300 hover:text-white transition-colors duration-300 ${
                    router.pathname === link.path ? "text-white font-semibold" : ""
                  }`}
                >
                  {link.title}
                </a>
              </Link>
            ))}
          </div>
          <div className="hidden md:block">
            {currentAccount ? (
              <button
                onClick={() => disconnectWallet()}
                className="bg-red-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-700 transition-colors duration-300"
              >
                Disconnect
              </button>
            ) : (
              <button
                onClick={() => connectWallet()}
                className="bg-[#8c6dfd] text-white px-4 py-2 rounded-full font-semibold hover:bg-[#7b5be1] transition-colors duration-300"
              >
                Connect Wallet
              </button>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <Close /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link href={link.path} key={link.title} legacyBehavior>
                <a
                  className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.title}
                </a>
              </Link>
            ))}
            <div className="pt-4 pb-2">
              {currentAccount ? (
                <button
                  onClick={() => {
                    disconnectWallet();
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-red-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-700 transition-colors duration-300"
                >
                  Disconnect
                </button>
              ) : (
                <button
                  onClick={() => {
                    connectWallet();
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-[#8c6dfd] text-white px-4 py-2 rounded-full font-semibold hover:bg-[#7b5be1] transition-colors duration-300"
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
