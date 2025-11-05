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
import Button from '@/app/admin/components/Button';
import { setLocalStorage } from '@/utils/localStorage';

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
        <div className="flex w-full flex-col gap-6 md:w-[60%]">
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
                className="relative flex items-center justify-start gap-4 rounded-xl border p-4 shadow-sm md:justify-between"
              >
                {/* Product Image */}
                <div className="h-[80px] w-[80px] flex-shrink-0 overflow-hidden rounded-md md:h-[120px] md:w-[120px]">
                  <Image
                    src={item.product.thumbnail}
                    alt={item.product.title}
                    width={120}
                    height={120}
                    className="object-contain"
                  />
                </div>

                <div className="w-[80%]">
                  <div className="flex-1 space-y-1">
                    <Link
                      href={`/product/${item.product.slug}`}
                      className="cursor-pointer text-base font-semibold text-[#00153B] hover:underline md:text-lg"
                    >
                      {lang === 'bn' ? 'পণ্যের নাম:' : 'Product Name:'} {item.product.title}
                    </Link>
                    <p className="text-[#00153B]">
                      {lang === 'bn' ? 'ব্র্যান্ড:' : 'Brand:'} {item.product.brand.title}
                    </p>
                    <p className="font-medium text-[#00153B]">
                      {lang === 'bn' ? 'মূল্য: ' : 'Price: '}
                      {discountPrice}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-end justify-end gap-2 md:flex-col md:justify-center md:gap-4">
                    <button
                      onClick={() => setDeleteId(item.id)}
                      className="h-[35px] w-[35px] rounded-full border text-red-500 transition-all duration-300 hover:border-red-500 md:h-[40px] md:w-[40px]"
                    >
                      <DeleteOutlined className="md:text-xl" />
                    </button>

                    <div className="flex items-center justify-evenly gap-4">
                      <Button className='bg-transparent p-0' onClick={(e: any) => handleBuyNow(e)}>
                        <p className="text-primbg-primaryWhite scale-90 cursor-pointer rounded-full bg-primaryBlue px-4 py-2 text-sm font-medium text-secondaryWhite transition-all duration-300 hover:bg-primary hover:text-white md:scale-100 md:px-6 md:font-semibold lg:text-base">
                          {lang === 'bn' ? 'এখনই কিনুন' : 'BUY NOW'}
                        </p>
                      </Button>

                      <Button className='bg-transparent p-0' loading={cartLoading} onClick={(e: any) => handleAddToCart(e)}>
                        <div className="flex h-[35px] w-[35px] items-center justify-center rounded-full border text-primaryBlue transition-all duration-300 hover:border-primaryBlue md:h-[40px] md:w-[40px]">
                          <FaShoppingCart className="md:text-xl" />
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )
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
