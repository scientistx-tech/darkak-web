"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Drawer } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MenuOutlined,
  CloseOutlined,
  DownOutlined,
  UpOutlined,
  SearchOutlined,
  MenuFoldOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  HomeOutlined,
  AppstoreOutlined,
  PhoneOutlined,
  InfoCircleOutlined,
  ShoppingOutlined,
  MinusOutlined,
  PlusOutlined,
  ProductOutlined,
  BoldOutlined,
} from "@ant-design/icons";

import { AnimatePresence, motion } from "framer-motion";
import Bangla from "../../Assets/SVG/BanglaLag.svg";
import English from "../../Assets/SVG/EnglishLag.svg";
import logo from "../../Assets/IMG/PNG.png";
import NavLink from "./NavLink";
import HeadLineText from "./HeadLineText";

const Header: React.FC = () => {
  const pathname = usePathname();
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [open, setOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [lang, setLang] = useState<"en" | "bn">("en");
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Scroll Hide/Show Header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY + 15) {
        setShow(false);
      } else if (currentScrollY < lastScrollY - 15) {
        setShow(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Drawer Controls
  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  // Dummy placeholder counts
  const wishlistCount = 2;
  const cartCount = 3;

  const handleLanguageChange = (lang: "en" | "bn") => {
    setLang(lang);
    setIsDropdownOpen(false);
  };

  const toggleSubmenu = () => {
    setSubmenuOpen(!submenuOpen);
  };

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
  };

  return (
    <div className="relative w-full bg-black">
      <motion.div
        animate={{ y: show ? 0 : -130 }}
        transition={{
          type: "spring",
          stiffness: show ? 130 : 50,
          damping: 30,
        }}
        className="fixed top-0 z-50 w-full"
      >
        {/* Top Bar */}
        {lastScrollY < 45 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 40 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="mx-auto hidden w-full grid-cols-3 items-center bg-primary px-4 text-white md:px-6 lg:grid lg:px-12"
          >
            <p>🎉 Welcome to ScientistX 🎉</p>
            <p className="text-center">✨ Smart & Creative Technology ✨</p>

            {/* Language & Auth */}
            <div className="flex items-center justify-end gap-2">
              <div
                className="relative flex cursor-pointer items-center gap-1 rounded-md p-2 transition hover:bg-primaryDarkBlue"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
                ref={dropdownRef}
              >
                <Image
                  alt="Language"
                  src={lang === "bn" ? Bangla : English}
                  width={20}
                  height={20}
                />
                <p className="text-sm font-medium uppercase text-primaryWhite">
                  {lang === "bn" ? "বাংলা" : "English"}
                </p>
                <p className="text-sm">
                  {isDropdownOpen ? <UpOutlined /> : <DownOutlined />}
                </p>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      className="absolute right-0 top-9 z-30 w-[120px] rounded-md bg-primaryBlue shadow-md"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p
                        className="cursor-pointer px-4 py-2 text-sm uppercase text-primaryWhite hover:bg-primaryDarkBlue"
                        onClick={() => handleLanguageChange("en")}
                      >
                        English
                      </p>
                      <p
                        className="cursor-pointer px-4 py-2 text-sm uppercase text-primaryWhite hover:bg-primaryDarkBlue"
                        onClick={() => handleLanguageChange("bn")}
                      >
                        বাংলা
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/auth/login"
                  className="rounded-md bg-secondaryLiteBlue px-4 py-1 text-sm text-primaryDarkBlue transition hover:bg-primaryDarkBlue hover:text-primaryWhite"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="rounded-md border border-primary px-4 py-1 text-sm text-primaryWhite transition hover:bg-primaryDarkBlue"
                >
                  Register
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* Main Header */}
        <div className="mx-auto flex h-[65px] w-full items-center justify-between bg-primaryBlue px-4 text-white md:h-[70px] md:px-6 xl:px-12">
          <Link href="/">
            <Image alt="Logo" src={logo} height={50} />
          </Link>

          {/* Navigation */}
          <div className="hidden grid-flow-col items-center gap-8 lg:grid">
            <NavLink href="/" className="font-serif text-lg hover:text-primary">
              {lang === "bn" ? "হোম" : "Home"}
            </NavLink>
            <NavLink href="/explore" className="font-serif text-lg hover:text-primary">
              {lang === "bn" ? "ঘুরে দেখুন" : "Explore"}
            </NavLink>
            <NavLink href="/vendors" className="font-serif text-lg hover:text-primary">
              {lang === "bn" ? "ভেন্ডরস" : "Vendors"}
            </NavLink>
            <NavLink href="/contact-us" className="font-serif text-lg hover:text-primary">
              {lang === "bn" ? "যোগাযোগ করুন" : "Contact Us"}
            </NavLink>
          </div>

          {/* Search Bar */}
          <div className="relative w-[30%] hidden justify-center rounded-full bg-white md:flex">
            <div className="relative w-[75%]">
              <input
                className="w-full rounded-bl-full rounded-tl-full p-1.5 pl-4 pr-8 text-black outline-none"
                placeholder={lang === "bn" ? "অনুসন্ধান করুন..." : "Search..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-lg font-semibold text-gray-500 hover:text-black"
                >
                  ×
                </button>
              )}
            </div>
            <div className="flex w-[25%] justify-between">
              <button className="w-[30%] text-black">
                <MenuFoldOutlined />
              </button>
              <button
                onClick={handleSearch}
                className="w-[70%] rounded-br-full rounded-tr-full bg-primary p-1.5 pl-5 pr-5 text-white"
              >
                <SearchOutlined className="text-xl" />
              </button>
            </div>
          </div>

          {/* Icons */}
          <div className="hidden grid-flow-col gap-5 lg:grid">
            <Link
              href="/user/profile"
              className={`text-2xl transition-all duration-300 hover:scale-110 ${
                pathname === "/user/profile" ? "opacity-100" : "opacity-70"
              }`}
            >
              <UserOutlined />
            </Link>
            <Link
              href="/user/wishlist"
              className="relative text-2xl transition-all duration-300 hover:scale-110"
            >
              <HeartOutlined />
              <div className="absolute ml-[15px] mt-[-33px] flex h-[15px] w-[15px] items-center justify-center rounded-full bg-white text-black">
                <p className="text-[10px] font-semibold">{wishlistCount}</p>
              </div>
            </Link>
            <Link
              href="/user/cart"
              className="relative text-2xl transition-all duration-300 hover:scale-110"
            >
              <ShoppingCartOutlined />
              <div className="absolute ml-[15px] mt-[-33px] flex h-[15px] w-[15px] items-center justify-center rounded-full bg-white text-black">
                <p className="text-[10px] font-semibold">{cartCount}</p>
              </div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={open ? onClose : showDrawer}
            className="transition-all duration-500 ease-in-out hover:scale-110 lg:hidden"
          >
            {open ? <CloseOutlined /> : <MenuOutlined />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Drawer */}
      <Drawer placement="left" closable={false} onClose={onClose} open={open}>
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className="mb-3 flex h-[65px] items-center justify-between bg-primaryBlue">
              <Link href="/" onClick={onClose} className="ml-5">
                <Image alt="Logo" src={logo} height={45} />
              </Link>
              <button onClick={onClose} className="mr-5 text-white">
                <CloseOutlined />
              </button>
            </div>

            <div className="px-5 py-2">
              {/* Search */}
              <div className="mb-6 flex items-center overflow-hidden rounded border border-primaryBlue bg-white pl-3 shadow-md">
                <SearchOutlined className="mr-2 text-gray-500" />
                <input
                  placeholder="Search products..."
                  className="w-full border-none bg-transparent py-2 text-sm outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Links */}
              <nav className="flex flex-col gap-4 text-base font-medium">
                <Link href="/" onClick={onClose} className="flex items-center gap-3">
                  <HomeOutlined /> Home
                </Link>
                <div className="flex items-center justify-between">
                  <Link href="/category" onClick={onClose} className="flex items-center gap-3">
                    <AppstoreOutlined /> Category
                  </Link>
                  <button onClick={toggleSubmenu}>
                    {submenuOpen ? <MinusOutlined /> : <PlusOutlined />}
                  </button>
                </div>
                <AnimatePresence initial={false}>
                  {submenuOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-10 overflow-hidden"
                    >
                      <p className="py-1 text-sm text-gray-600">Subcategory 1</p>
                      <p className="py-1 text-sm text-gray-600">Subcategory 2</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Link href="/explore" onClick={onClose} className="flex items-center gap-3">
                  <ProductOutlined /> Explore
                </Link>
                <Link href="/vendors" onClick={onClose} className="flex items-center gap-3">
                  <ShoppingOutlined /> Vendors
                </Link>
                <Link href="/blogs" onClick={onClose} className="flex items-center gap-3">
                  <BoldOutlined /> Blogs
                </Link>
                <Link href="/contact-us" onClick={onClose} className="flex items-center gap-3">
                  <PhoneOutlined /> Contact Us
                </Link>
                <Link href="/about-us" onClick={onClose} className="flex items-center gap-3">
                  <InfoCircleOutlined /> About Us
                </Link>
              </nav>
            </div>
          </div>

          <div className="mt-3 border-t border-primaryBlue bg-[#f0f8ff] text-sm text-gray-700">
            <HeadLineText />
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Header;
