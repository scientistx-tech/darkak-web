'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { FaCartPlus, FaHeart } from 'react-icons/fa';
import Link from 'next/link';
import { useAddToCartMutation } from '@/redux/services/client/myCart';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { toast } from 'react-toastify';
import { Product } from '../types';
import { setCart, setWish } from '@/redux/slices/authSlice';
import { useRouter } from 'next/navigation';
import { useAddToWishListMutation } from '@/redux/services/client/myWishList';

interface WatchCardProps {
  href: any;
  img1: any;
  img2: any;
  name: string;
  price: number;
  discount: number;
  discountType: string;
  img1Alt: string;
  img2Alt: string;
  product: Product;
}

export default function WatchCard({
  href,
  img1,
  img2,
  name,
  price,
  discount,
  discountType,
  img1Alt,
  img2Alt,
  product,
}: WatchCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const p = discountType === 'flat' ? price - discount : price - (price * discount) / 100;
  const [addToCart, { isLoading }] = useAddToCartMutation();
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const [addToWishList, { isLoading: wishLoading }] = useAddToWishListMutation();

  const dispatch = useDispatch<AppDispatch>();
  const buildCartObject = (product: any) => {
    const cart = {
      id: Math.floor(Math.random() * 100000), // Random ID, replace if needed
      userId: user?.id,
      productId: product.id,
      quantity: 1,
      date: new Date().toISOString(),
      cart_items: [],
      product: {
        title: product.title,
        thumbnail: product.thumbnail,
        stock: product.stock,
        minOrder: product.minOrder,
        price: product.price,
        discount: product.discount,
        discount_type: product.discount_type,
      },
    };

    // Extract first option from each item (if any)
    const selectedOptions = product.items?.map((item: any) => item.options?.[0]).filter(Boolean);
    cart.cart_items = selectedOptions.map((option: any) => ({ option }));

    return cart;
  };
  // console.log("product fro card", product);

  const handleAddToWishlist = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // Prevent parent click actions
    try {
      const result = await addToWishList({ productId: product.id }).unwrap();
      toast.success('Item added to wishlist!');
      dispatch(setWish(Math.random()));
    } catch (error: any) {
      //console.log(error);
      if (error?.status === 401) {
        return router.replace('/auth/login');
      }
      toast.error(error?.data?.message || 'Failed to add to wishlist');
    }
  };
  const handleAddToCart = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // Prevent navigation to product detail page

    const optionIds: any[] = [];

    try {
      const result = await addToCart({
        productId: product.id,
        quantity: 1,
        optionIds,
      }).unwrap();
      dispatch(setCart(Math.random()));
      toast.success('Item added to cart!');
    } catch (error: any) {
      if (error?.status === 401) {
        return router.replace('/auth/login');
      }
      toast.error(error?.data?.message || 'Failed to add to cart');
    }
  };
  return (
    <div className="transition-transform duration-500 hover:scale-105">
      <div
        className="group relative block h-[300px] w-full flex-1 cursor-pointer overflow-hidden md:h-[400px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Discount and Buttons */}
        <div className="absolute z-30 mt-10 flex w-full items-center justify-between">
          {/* Discount Badge */}
          <div className="rounded-r-full bg-primary p-1 pl-3 pr-4 text-[14px] text-white transition-all duration-500">
            <p>
              {discount}
              {discountType === 'flat' ? 'BDT' : '%'}
            </p>
            <p className="mt-[-5px]">Off</p>
          </div>

          {/* Action Buttons */}
          <div className="z-30 mr-3 flex translate-y-4 flex-col items-center gap-3 rounded-md bg-primary p-2 pr-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <button
              onClick={(e: any) => {
                handleAddToCart(e);
              }}
              className="text-xl text-white transition-colors duration-300 hover:text-primaryBlue"
            >
              <FaCartPlus />
            </button>

            <button
              onClick={(e: any) => {
                handleAddToWishlist(e);
              }}
              className="text-xl text-white transition-colors duration-300 hover:text-primaryBlue"
            >
              <FaHeart />
            </button>
          </div>
        </div>
        <Link href={href}>
          {/* Image */}
          <div className="relative mt-3 h-[70%] w-full rounded-xl bg-primaryBlue shadow-lg group-hover:shadow-none transition-all duration-500 md:h-[75%]">
            <Image
              src={isHovered ? img2 : img1}
              alt={isHovered ? img2Alt : img1Alt}
              fill
              className="rounded-xl object-cover transition-opacity duration-500"
            />
          </div>

          {/* Details */}
          <div className="flex h-[30%] flex-col p-2 md:h-[25%] md:p-4">
            <h3 className="line-clamp-1 truncate font-semibold text-gray-800 md:text-lg">{name}</h3>
            <p className="font-bold text-primary md:text-xl">৳ {p.toLocaleString()}</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
