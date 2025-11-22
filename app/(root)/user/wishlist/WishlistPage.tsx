'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Modal, Pagination, Spin } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { FaShoppingCart } from 'react-icons/fa';
import { WishlistItem } from '@/types/client/myWishlistType';
import {
  useGetMyWishListQuery,
  useDeleteWishListMutation,
} from '@/redux/services/client/myWishList';
import ClientLoading from '../../components/ClientLoading';
import { setCart, setWish } from '@/redux/slices/authSlice';
import { useDispatch } from 'react-redux';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useAddToCartMutation } from '@/redux/services/client/myCart';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { setLocalStorage } from '@/utils/localStorage';
import Button from '@/components/Button/Button';

const WishlistPage: React.FC = () => {
  const lang = useSelector((state: RootState) => state.language.language);
  const [page, setPage] = useState(1);
  const limit = 10; // items per page

  const { data, isLoading, isError, refetch } = useGetMyWishListQuery({
    page,
    limit,
  });
  const [wishlist, setWishlist] = useState<WishlistItem[] | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const dispatch = useDispatch();

  const [deleteWishList, { isLoading: isDeleting }] = useDeleteWishListMutation();
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const [addToCart, { isLoading: cartLoading }] = useAddToCartMutation();

  useEffect(() => {
    setWishlist(data?.data || null);
  }, [data]);

  const handleDelete = async () => {
    if (deleteId !== null) {
      try {
        await deleteWishList(deleteId).unwrap();
        setWishlist((prev) => prev?.filter((item) => item.id !== deleteId) || null);
        dispatch(setWish(Math.random()));
        setDeleteId(null);
      } catch (error) {
        console.error('Failed to delete wishlist item:', error);
      }
    }
  };



  
  if (isLoading) return <ClientLoading />;
  if (isError) return <div>Failed to load wishlist!</div>;
  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-2xl font-bold text-primaryBlue">
            {lang === 'bn' ? 'আপনার উইশলিস্ট খালি!' : 'Your wishlist is empty!'}
          </p>
          <Link href="/" className="text-xl text-primaryBlue underline">
            {lang === 'bn' ? 'হোমে যান' : 'Go to Home'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex h-[60px] w-full items-center justify-center bg-gradient-to-r from-[#00153B] to-[#00286EF2] md:h-[100px]">
        <p className="text-xl text-white md:text-2xl">
          {lang === 'bn' ? 'ইচ্ছেতালিকা' : 'Wishlist'}
        </p>
      </div>

      {/* Wishlist Items */}
      <div className="flex justify-center px-2 py-6 md:container md:mx-auto md:px-2 md:py-6 xl:px-4 xl:py-12">
        <div className="flex w-full flex-col gap-6 lg:w-[70%] xl:w-[60%]">
          {wishlist?.map((item) => {
            const product = item.product;
            const hasDiscount = !!product?.discount && Number(product.discount) > 0;
            const price = Number(product?.price) || 0;
            const discount = Number(product?.discount) || 0;
            const discountType = product?.discount_type;

            let discountPrice = price;

            if (hasDiscount) {
              if (discountType === 'flat') {
                discountPrice = price - discount;
              } else if (discountType === 'percentage') {
                discountPrice = price - (price * discount) / 100;
              }
            }

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

            const handleBuyNow = async (e: React.MouseEvent<HTMLDivElement>) => {
              e.stopPropagation(); // Prevent navigation to product detail page

              const cartObject = buildCartObject(item.product);
              console.log('cartobject', cartObject);
              try {
                setLocalStorage('checkout_items', JSON.stringify([cartObject]));
                dispatch(setCart(Math.random()));
                // toast.success("Item added to cart!");
                router.push('/easy-checkout');
              } catch (error: any) {
                if (error?.status === 401) {
                  return router.replace('/auth/login');
                }
                toast.error(error?.data?.message || 'Failed to add to cart');
              }
            };

            const handleAddToCart = async (e: React.MouseEvent<HTMLDivElement>) => {
              e.stopPropagation(); // Prevent navigation to product detail page

              const optionIds = item.product?.items?.length
                ? item?.product?.items.map((item: any) => item.options?.[0]?.id).filter(Boolean)
                : [];

              try {
                const result = await addToCart({
                  productId: item.product.id,
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
              <div
                key={item.id}
                className="w-full rounded-xl border bg-white p-4 shadow-sm transition hover:shadow-md md:flex md:items-center md:gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="relative h-[90px] w-[90px] shrink-0 overflow-hidden rounded-lg bg-gray-50 md:h-[120px] md:w-[120px]">
                    <Image
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      width={120}
                      height={120}
                      className="object-contain"
                    />
                    {hasDiscount && (
                      <span className="absolute left-2 top-2 rounded-full bg-red-600 px-2 py-1 text-xs font-semibold text-white">
                        {discountType === 'percentage' ? `${discount}%` : `Tk ${discount}`}
                      </span>
                    )}
                  </div>

                  <div className="max-w-[60%]">
                    <Link href={`/product/${item.product.slug}`} className="text-base font-semibold text-[#00153B] hover:underline md:text-lg">
                      {item.product.title}
                    </Link>
                    <p className="mt-1 text-sm text-gray-600">{lang === 'bn' ? 'ব্র্যান্ড' : 'Brand'}: <span className="text-[#00153B]">{item.product.brand.title}</span></p>

                    <div className="mt-2 flex items-center gap-3">
                      <div className="text-lg font-bold text-black">
                        {discountPrice}
                        <span className="ml-1 text-sm font-medium text-gray-500">{lang === 'bn' ? 'টাকা' : 'BDT'}</span>
                      </div>
                      {hasDiscount && (
                        <div className="text-sm text-gray-400 line-through">{price} {lang === 'bn' ? 'টাকা' : 'BDT'}</div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between md:mt-0 md:ml-auto md:flex-col md:items-end md:gap-3">
                  <button
                    onClick={() => setDeleteId(item.id)}
                    className="inline-flex items-center justify-center rounded-full border border-gray-200 p-2 text-red-500 hover:border-red-500"
                    aria-label="Remove wishlist item"
                  >
                    <DeleteOutlined />
                  </button>

                  <div className="flex items-center gap-3">
                    <Button onClick={(e: any) => handleBuyNow(e)} className="rounded-full bg-primaryBlue px-4 py-2 text-sm font-semibold text-nowrap text-white hover:bg-primaryBlue/90">
                      {lang === 'bn' ? 'এখনই কিনুন' : 'Buy Now'}
                    </Button>

                    <Button loading={cartLoading} onClick={(e: any) => handleAddToCart(e)} className="rounded-full border border-primaryBlue bg-white px-3 py-2 text-primaryBlue hover:bg-primaryBlue hover:text-white">
                      <FaShoppingCart />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <Pagination
          current={page}
          pageSize={limit}
          total={data?.totalPage || 0}
          onChange={(p) => {
            setPage(p);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          showSizeChanger={false}
          showQuickJumper
          className="ant-pagination"
        />
      </div>

      {/* Delete Modal */}
      <Modal
        title={
          lang === 'bn'
            ? 'আপনি কি নিশ্চিতভাবে এই আইটেমটি মুছে ফেলতে চান?'
            : 'Are you sure you want to remove this item?'
        }
        open={deleteId !== null}
        onOk={handleDelete}
        onCancel={() => setDeleteId(null)}
        okText={isDeleting ? 'Deleting...' : 'Yes, Delete'}
        cancelText="Cancel"
        confirmLoading={isDeleting}
      />
    </div>
  );
};

export default WishlistPage;
