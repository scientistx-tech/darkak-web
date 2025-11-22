"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

import Link from "next/link";
import { usePathname } from "next/navigation";
import NavLink from "@/components/shared/NavLink";
import CustomDrawer from "./CustomDrawer";

import {
  FaBars,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
  FaSearch,
  FaAlignLeft,
  FaRegHeart,
  FaShoppingCart,
  FaUser,
  FaHome,
  FaThLarge,
  FaPhone,
  FaInfoCircle,
  FaShoppingBag,
  FaMinus,
  FaPlus,
  FaBoxOpen,
  FaBold,
} from "react-icons/fa";

import { AnimatePresence, motion } from "framer-motion";
import Bangla from "@/Data/Img/BanglaLag.svg";
import English from "@/Data/Img/EnglishLag.svg";
import HeadLineText from "./HeadLineText";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "@/redux/slices/authSlice";
import HeaderDropdown from "./HeaderDropdown";
import logo from "@/Data/Icon/PNG.png";
import { auth } from "@/utils/firebase";
import { useGetMyCartQuery } from "@/redux/services/client/myCart";
import { useGetMyWishListQuery } from "@/redux/services/client/myWishList";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetProductCategoriesQuery } from "@/redux/services/client/categories";
import { FaSpinner } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useGetSearchPublicQuery } from "@/redux/services/client/searchedProducts";
import MobileDropdown from "./MobileDropdown";
import { useGetHomeContentQuery } from "@/redux/services/client/homeContentApi";
import { setLanguage } from "@/redux/slices/languageSlice";
import ProductCard from "@/components/shared/ProductCard";

const Header: React.FC = () => {
  const { data: home } = useGetHomeContentQuery();
  const { data: cart, refetch: cartRefetch } = useGetMyCartQuery();
  const { data: wishlist, refetch: wishRefetch } = useGetMyWishListQuery({
    page: 1,
    limit: 100,
  });
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const carts = useSelector((state: RootState) => state.auth.cart);
  const wishs = useSelector((state: RootState) => state.auth.wish);

  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const lang = useSelector((state: RootState) => state.language.language);

  const handleSearch = () => {
    const trimmed = searchTerm.trim();
    if (!trimmed) return;

    const params = new URLSearchParams({
      keyword: trimmed,
    });

    router.push(`/search?${params.toString()}`);
  };

  const handleLanguageChange = (lang: "en" | "bn") => {
    setIsDropdownOpen(false);
    dispatch(setLanguage(lang));
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    wishRefetch();
  }, [wishs]);

  useEffect(() => {
    cartRefetch();
  }, [carts]);

  //  For Drawer
  const [open, setOpen] = useState<boolean>(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const handleLogOut = () => {
    dispatch(clearUser());
    auth.signOut();
  };

  // Search functionality
  const { data: categories } = useGetProductCategoriesQuery("");

  const { data, isFetching} = useGetSearchPublicQuery({
    search: `${debouncedSearch}`,
  });

  const products = data?.data || [];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Check if the clicked element or any of its parents has the 'ignore-click-outside' class
      let targetElement: HTMLElement | null = event.target as HTMLElement;
      let shouldIgnore = false;

      // Traverse up the DOM tree to check for the ignore class
      while (targetElement) {
        if (targetElement.classList?.contains("ignore-click-outside")) {
          shouldIgnore = true;
          break;
        }
        targetElement = targetElement.parentElement;
      }

      if (
        dropdownRef.current &&
        !shouldIgnore &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  useEffect(() => {
    setIsOpen(!!debouncedSearch);
  }, [debouncedSearch]);

  const [submenuOpen, setSubmenuOpen] = useState(false);
  const toggleSubmenu = () => {
    setSubmenuOpen(!submenuOpen);
  };

  return (
    <div className="relative w-full bg-black">
      <motion.div
        animate={{ y: show ? 0 : -130 }}
        transition={
          show
            ? { type: "spring", stiffness: 130, damping: 30 }
            : { type: "spring", stiffness: 50 }
        }
        className="fixed top-0 z-50 w-full"
      >
        {/* Top Bar */}
        {lastScrollY < 45 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 40 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="mx-auto hidden w-full grid-cols-3 items-center overflow-visible bg-primary px-4 text-white md:px-6 lg:grid lg:px-12"
          >
            <p>🎉 {home?.content?.header_first_title} 🎉</p>
            <p className="text-center">
              ✨ {home?.content?.header_second_title} ✨
            </p>

            {/* DropDown-menu */}
            <div className="flex w-full items-center justify-end gap-2">
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
                  {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                </p>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      className="absolute right-0 top-9 z-30 w-[120px] rounded-md bg-primaryBlue shadow-md"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
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
              {/* Login & Register Buttons */}
              {user ? (
                <button
                  onClick={handleLogOut}
                  className="rounded-md bg-secondaryLiteBlue px-4 py-1 text-sm text-primaryDarkBlue transition hover:bg-primaryDarkBlue hover:text-primaryWhite"
                >
                  Log Out
                </button>
              ) : (
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
              )}
            </div>
          </motion.div>
        )}

        {/* Main Header */}
        <div className="mx-auto flex h-[65px] w-full items-center justify-between bg-primaryBlue px-4 text-white md:h-[70px] md:px-6 xl:px-12">
          <Link href="/" className="">
            <Image alt="Darkak-Logo" src={logo} height={50} className="" />
          </Link>

          <div className="hidden grid-flow-col items-center gap-8 lg:grid">
            {/* Home Link */}
            <NavLink href="/" className="font-serif text-lg hover:text-primary">
              {lang === "bn" ? "হোম" : "Home"}
            </NavLink>
            <div className="relative font-serif text-lg">
              <HeaderDropdown />
            </div>

            <NavLink
              href="/explore"
              className="font-serif text-lg hover:text-primary"
            >
              {lang === "bn" ? "ঘুরে দেখুন" : "Explore"}
            </NavLink>

            <NavLink
              href="/vendors"
              className="font-serif text-lg hover:text-primary"
            >
              {lang === "bn" ? "ভেন্ডরস" : "Vendors"}
            </NavLink>

            {/* Contact Us Link */}
            <NavLink
              href="/contact-us"
              className="font-serif text-lg hover:text-primary"
            >
              {lang === "bn" ? "যোগাযোগ করুন" : "Contact Us"}
            </NavLink>
          </div>

          <div className="relative w-[30%]">
            <div className="relative hidden justify-center rounded-full bg-white md:flex">
              <div className="relative w-[75%]">
                <input
                  className="ignore-click-outside w-full rounded-bl-full rounded-tl-full p-1.5 pl-4 pr-8 text-black outline-none"
                  placeholder={
                    lang === "bn" ? "অনুসন্ধান করুন..." : "Search..."
                  }
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => {
                    if (searchTerm.trim() !== "") {
                      setIsOpen(true);
                    }
                  }}
                />

                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 text-lg font-semibold text-gray-500 hover:text-black"
                  >
                    ×
                  </button>
                )}
              </div>
              <div className="flex w-[25%] justify-between">
                <button className="w-[30%] text-black">
                  <FaAlignLeft />
                </button>
                <button
                  onClick={handleSearch}
                  className="w-[70%] cursor-pointer rounded-br-full rounded-tr-full border-none bg-primary p-1.5 pl-5 pr-5 text-white"
                >
                  <FaSearch className="text-xl" />
                </button>
              </div>
              {/* <BiSolidDownArrow size={24} className={`rotate-180 ${isOpen ? 'absolute' : 'hidden'} -bottom-5 left-1/2 -translate-x-1/2 shadow-none`} /> */}
            </div>
          </div>

          <div className="hidden grid-flow-col gap-5 lg:grid">
            <Link
              href="/user/profile"
              className={`text-2xl transition-all duration-300 hover:scale-110 hover:text-primary ${
                pathname === "/user/profile" ? "opacity-100" : "opacity-70"
              }`}
            >
              <FaUser />
            </Link>

            <Link
              href="/user/wishlist"
              className="group text-2xl transition-all duration-300 hover:scale-110 hover:text-primary"
            >
              <FaRegHeart
                className={` ${
                  pathname === "/user/wishlist" ? "opacity-100" : "opacity-70"
                }`}
              />
              <div
                className={`absolute ml-[15px] mt-[-33px] flex h-[15px] w-[15px] items-center justify-center rounded-full text-black group-hover:bg-primary group-hover:text-white ${
                  pathname === "/user/wishlist"
                    ? "bg-primary text-white"
                    : "bg-white"
                }`}
              >
                <p className="text-[10px] font-semibold">
                  {wishlist ? wishlist.data.length : "0"}
                </p>
              </div>
            </Link>

            <Link
              href="/user/cart"
              className="group text-2xl transition-all duration-300 hover:scale-110 hover:text-primary"
            >
              <FaShoppingCart
                className={` ${
                  pathname === "/user/cart" ? "opacity-100" : "opacity-70"
                }`}
              />
              <div
                className={`absolute ml-[15px] mt-[-33px] flex h-[15px] w-[15px] items-center justify-center rounded-full text-black group-hover:bg-primary group-hover:text-white ${
                  pathname === "/user/cart"
                    ? "bg-primary text-white"
                    : "bg-white"
                }`}
              >
                <p className="text-[10px] font-semibold">
                  {cart ? cart.cart.length : "0"}
                </p>
              </div>
            </Link>
          </div>

          {/* For mobile menu Button */}
          <button
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            className="text-2xl cursor-pointer transition-all duration-500 ease-in-out hover:scale-110 lg:hidden"
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>

          
        </div>
      </motion.div>

      {/* Mobile Drawer */}
      <CustomDrawer open={open} onClose={handleDrawerClose}>
        <div className="flex h-full flex-col justify-between text-gray-800 backdrop-blur-md">
          <div className="w-full">
            {/* Header */}
            <div className="mb-3 flex h-[65px] items-center justify-between bg-primaryBlue">
              <Link href="/" onClick={handleDrawerClose} className="ml-5">
                <Image alt="Darkak-Logo" src={logo} height={45} className="" />
              </Link>
              
            </div>

            <div className="px-5 py-2">
              {/* Search Bar */}
              <div className="relative">
                <div className="mb-7 flex items-center overflow-hidden rounded-full border border-primaryBlue bg-white pl-3 shadow">
                  <FaSearch className="mr-2 text-gray-500" />
                  <input
                    placeholder={
                      lang === "bn"
                        ? "পণ্য অনুসন্ধান করুন..."
                        : "Search products..."
                    }
                    className="w-full border-none bg-transparent py-3 pr-4 pl-0 text-sm outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button
                    className="rounded-full bg-primaryBlue px-4 py-2.5 text-sm text-white  duration-200 hover:bg-primaryDarkBlue"
                  >
                    {lang === "bn" ? "অনুসন্ধান" : "Search"}
                  </button>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex flex-col gap-4 text-base font-medium">
                <Link
                  href="/"
                  onClick={handleDrawerClose}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-100"
                >
                  <FaHome className="text-lg text-primaryBlue" />
                  {lang === "bn" ? "হোম" : "Home"}
                </Link>

                {/* Categories */}
                <div className="flex items-center justify-between">
                  <Link
                    href="/category"
                    onClick={handleDrawerClose}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-100"
                  >
                    <FaThLarge className="text-lg text-primaryBlue" />
                    <div className="flex w-full items-center justify-between">
                      <span>{lang === "bn" ? "ক্যাটাগরি" : "Category"}</span>
                    </div>
                  </Link>

                  <button onClick={toggleSubmenu} className="w-auto p-1 text-gray-600 hover:text-primaryBlue">
                    {submenuOpen ? (
                      <FaMinus className="text-xl cursor-pointer" />
                    ) : (
                      <FaPlus className="text-xl cursor-pointer" />
                    )}
                  </button>
                </div>

                <AnimatePresence initial={false}>
                  {submenuOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-[10%] overflow-hidden"
                    >
                      <MobileDropdown onClose={handleDrawerClose} />
                    </motion.div>
                  )}
                </AnimatePresence>
                <Link
                  href="/explore"
                  onClick={handleDrawerClose}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-100"
                >
                  <FaBoxOpen className="text-lg text-primaryBlue" />
                  {lang === "bn" ? "ঘুরে দেখুন" : "Explore Now"}
                </Link>
                {/* Vendors */}

                <Link
                  href="/vendors"
                  onClick={handleDrawerClose}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-100"
                >
                  <FaShoppingBag className="text-lg text-primaryBlue" />
                  {lang === "bn" ? "ভেন্ডরস" : "Vendors"}
                </Link>

                <Link
                  href="/blogs"
                  onClick={handleDrawerClose}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-100"
                >
                  <FaBold className="text-lg text-primaryBlue" />
                  {lang === "bn" ? "ব্লগ" : "Blogs"}
                </Link>

                <Link
                  href="/contact-us"
                  onClick={handleDrawerClose}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-100"
                >
                  <FaPhone className="text-lg text-primaryBlue" />
                  {lang === "bn" ? "যোগাযোগ করুন" : "Contact Us"}
                </Link>

                <Link
                  href="/about-us"
                  onClick={handleDrawerClose}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-100"
                >
                  <FaInfoCircle className="text-lg text-primaryBlue" />
                  {lang === "bn" ? "আমাদের সম্পর্কে" : "About Us"}
                </Link>
              </nav>

              {/* Language Switcher */}
              <div className="mt-6 flex items-center gap-2">
                <Image
                  alt="Language"
                  src={lang === "bn" ? Bangla : English}
                  width={20}
                  height={20}
                />
                <select
                  value={lang}
                  onChange={(e) =>
                    handleLanguageChange(e.target.value as "en" | "bn")
                  }
                  className="rounded-md border border-gray-300 px-2 py-1 text-sm outline-none"
                >
                  <option value="en">English</option>
                  <option value="bn">বাংলা</option>
                </select>
                {user ? (
                  <button
                    onClick={handleLogOut}
                    className="rounded-md bg-secondaryLiteBlue px-4 py-1 text-sm text-primaryDarkBlue transition hover:bg-primaryDarkBlue hover:text-primaryWhite"
                  >
                    Log Out
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link
                      href="/auth/login"
                      className="rounded-md bg-secondaryLiteBlue px-4 py-1 text-sm text-primaryDarkBlue transition hover:bg-primaryDarkBlue hover:text-primaryWhite"
                    >
                      Login
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="rounded-md border border-primary px-4 py-1 text-sm text-primaryDarkBlue transition hover:bg-primaryDarkBlue hover:text-primaryWhite"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>

              {/* Bottom Icons */}
              <div className="mt-5 grid grid-cols-3 gap-4 text-center text-sm">
                <Link href="/user/profile" onClick={handleDrawerClose}>
                  <div className="flex flex-col items-center justify-center hover:text-primary">
                    <FaUser className="text-xl" />
                    <span className="mt-1">
                      {lang === "bn" ? "প্রোফাইল" : "Profile"}
                    </span>
                  </div>
                </Link>
                <Link href="/user/wishlist" onClick={handleDrawerClose}>
                  <div className="relative flex flex-col items-center hover:text-primary">
                    <FaRegHeart className="text-xl" />
                    <span className="absolute -top-1 right-7 flex h-4 w-4 items-center justify-center rounded-full bg-primaryBlue text-[10px] text-white">
                      {wishlist ? wishlist.data.length : "0"}
                    </span>
                    <span className="mt-1">
                      {lang === "bn" ? "ইচ্ছেতালিকা" : "Wishlist"}
                    </span>
                  </div>
                </Link>
                <Link href="/user/cart" onClick={handleDrawerClose}>
                  <div className="relative flex flex-col items-center hover:text-primary">
                    <FaShoppingCart className="text-xl" />
                    <span className="absolute -top-1 right-7 flex h-4 w-4 items-center justify-center rounded-full bg-primaryBlue text-[10px] text-white">
                      {cart ? cart.cart.length : "0"}
                    </span>
                    <span className="mt-1">
                      {lang === "bn" ? "কার্ট" : "Cart"}
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-3 border-b-2 border-t-2 border-primaryBlue bg-[#f0f8ff] text-sm text-gray-700">
            <HeadLineText />
          </div>
        </div>
      </CustomDrawer>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute left-1/2 top-24 z-50 mt-2 flex h-[80vh] w-[95%] -translate-x-1/2 flex-col overflow-hidden rounded-xl border bg-white py-3 shadow-lg sm:w-[90%] md:w-[85%] lg:top-[100px] lg:w-[80%] lg:flex-row"
        >
          {isFetching ? (
            <div className="flex h-full w-full items-center justify-center">
              <FaSpinner size={40} className="animate-spin text-blue-500" />
            </div>
          ) : products.length > 0 ? (
            <>
              {/* LEFT: Categories */}
              <div className="w-full px-6 py-4 pb-4 lg:w-[30%] lg:border-r">
                <h4 className="mb-2 border-b pb-4 text-lg font-bold text-black">
                  Categories
                </h4>
                <div className="search-custom-scrollbar h-full overflow-hidden overflow-y-auto pb-4 pt-2">
                  <ul className="pb-2">
                    {categories?.flatMap((category) => {
                      const subCategories = category.sub_category;

                      if (!subCategories?.length) {
                        // Category has no sub-categories — it's a leaf
                        return (
                          <li key={category.title} className="mb-1 text-black">
                            <Link
                              href={`category?categoryId=${category.title}`}
                              onClick={() => setIsOpen(false)}
                              className="text-sm font-medium hover:text-secondaryBlue"
                            >
                              {category.title}
                            </Link>
                          </li>
                        );
                      }

                      return subCategories.flatMap((subCat) => {
                        const subSubCategories = subCat.sub_sub_category;

                        if (!subSubCategories?.length) {
                          // Sub-category has no sub-sub-categories — it's a leaf
                          return (
                            <li key={subCat.title} className="mb-1 text-black">
                              <Link
                                href={`category?categoryId=${category.title}&subCategoryId=${subCat.title}`}
                                onClick={() => setIsOpen(false)}
                                className="text-sm font-medium hover:text-secondaryBlue"
                              >
                                {subCat.title}
                              </Link>
                            </li>
                          );
                        }

                        // Sub-sub-categories exist — they are the leaf nodes
                        return subSubCategories.map((subSub) => (
                          <li key={subSub.title} className="mb-1 text-black">
                            <Link
                              href={`category?categoryId=${category.title}&subCategoryId=${subCat.title}&subSubCategoryId=${subSub.title}`}
                              onClick={() => setIsOpen(false)}
                              className="text-sm font-medium hover:text-secondaryBlue"
                            >
                              {subSub.title}
                            </Link>
                          </li>
                        ));
                      });
                    })}
                  </ul>
                </div>
              </div>

              {/* RIGHT: Product Cards */}
              <div className="search-custom-scrollbar grid max-h-[80vh] w-full grid-cols-1 gap-4 overflow-y-auto p-4 sm:grid-cols-2 lg:w-[70%] lg:grid-cols-3">
                {products.map((product: any, index: number) => (
                  <div key={index}>
                    <ProductCard product={product} setIsOpen={setIsOpen} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            // No Products Found – Full Width Centered
            <div className="flex h-full w-full items-center justify-center text-lg text-gray-500">
              No products found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
