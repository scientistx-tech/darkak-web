'use client';

import React, { useEffect, useState } from 'react';
import { PlusOutlined, MinusOutlined, DeleteOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { Modal, message, Tooltip } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import ShopNowButton from '@/components/Button/ShopNowButton';
import { Cart } from '@/types/client/myCartTypes';
import {
  useDeleteCartMutation,
  useGetMyCartQuery,
  useUpdateCartMutation,
} from '@/redux/services/client/myCart';
import ClientLoading from '../../components/ClientLoading';
import { setCart } from '@/redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { setLocalStorage } from '@/utils/localStorage';

const CartPage: React.FC = () => {
  const lang = useSelector((state: RootState) => state.language.language);

  const [deleteCart, { isLoading: isDeleting }] = useDeleteCartMutation();
  const [cartUpdate] = useUpdateCartMutation();
  const [cartItems, setCartItems] = useState<Cart[]>();
  const { data, isLoading, isError, refetch } = useGetMyCartQuery();
  // For Delete Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  // Message For Coupon / Voucher
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();

  const router = useRouter();

  //  console.log(cartItems)

  useEffect(() => {
    if (data) {
      setCartItems(data.cart);
    }
  }, [data]);
  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) return <ClientLoading></ClientLoading>;
  if (isError) return <div>Failed to load cart.!</div>;
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-2xl font-bold text-primaryBlue">
            {lang === 'bn' ? 'আপনার কার্ট খালি!' : 'Your cart is empty!'}
          </p>
          <Link href="/" className="text-xl text-primaryBlue underline">
            {lang === 'bn' ? 'হোমে যান' : 'Go to Home'}
          </Link>
        </div>
      </div>
    );
  }
  const increaseQty = (id: number) => {
    setCartItems((prev) =>
      prev?.map((item) => {
        if (item.id === id) {
          const maxQty = item.product.stock ?? Infinity;
          if (item.quantity >= maxQty) {
            messageApi.open({
              type: 'warning',
              content: `Maximum stock limit (${maxQty}) reached!`,
            });
            return item;
          }
          const newQty = item.quantity + 1;
          handleUpdate(id, newQty);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const decreaseQty = (id: number) => {
    setCartItems((prev) =>
      prev?.map((item) => {
        if (item.id === id) {
          const minQty = item.product.minOrder ?? 1;
          if (item.quantity <= minQty) {
            messageApi.open({
              type: 'warning',
              content: `Minimum order quantity is ${minQty}.`,
            });
            return item;
          }
          const newQty = item.quantity - 1;
          handleUpdate(id, newQty);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const subtotal = cartItems.reduce((acc: number, item: any) => {
    const price = item.product?.price ?? 0;
    const discount = item.product?.discount ?? 0;
    const discountType = item.product?.discount_type ?? 'flat';

    let finalPrice = price;

    if (discountType === 'percentage') {
      finalPrice = price - (price * discount) / 100;
    } else if (discountType === 'flat') {
      finalPrice = price - discount;
    }

    return acc + finalPrice * item.quantity;
  }, 0);

  const showModal = (id: number) => {
    setItemToDelete(id);
    setIsModalOpen(true);
  };

  const handleUpdate = async (id: number, quantity: number) => {
    try {
      await cartUpdate({ id, quantity }).unwrap(); // call API with ID
    } catch (error) {
      console.error('Delete failed:', error);
      // Optional: show toast or notification
      toast.error('Failed to update!');
    }
  };
  const handleOk = async () => {
    if (itemToDelete !== null) {
      try {
        await deleteCart(itemToDelete).unwrap(); // call API with ID
        setCartItems((prev) => prev?.filter((item) => item.id !== itemToDelete)); // update UI
        dispatch(setCart(Math.random()));
        setItemToDelete(null);
      } catch (error) {
        console.error('Delete failed:', error);
        // Optional: show toast or notification
      }
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setItemToDelete(null);
  };

  const coupon = () => {
    messageApi.open({
      type: 'success',
      content: 'This coupon applied successfully!',
    });
  };

  const voucher = () => {
    messageApi.open({
      type: 'warning',
      content: 'This voucher is not found! Please try again.',
    });
  };
  return (
    <div className="w-full">
      {contextHolder}
      <div className="flex h-[60px] w-full items-center justify-center bg-gradient-to-r from-[#00153B] to-[#00286EF2] md:h-[100px]">
        <p className="text-xl text-white md:text-2xl">
          {lang === 'bn' ? 'শপিং কার্ট' : 'Shopping Cart'}
        </p>
      </div>

      <div className="px-1 py-6 md:container md:mx-auto md:px-2 md:py-6 xl:px-4 xl:py-12">
        <div className="w-full rounded-md bg-white p-2 shadow-md md:p-4">
          {/* Header */}
          <div className="mb-2 mt-5 flex items-center justify-between">
            <div className="flex w-[19%] items-center justify-center rounded-md bg-[#E6EFFF] py-2 md:w-[12%] xl:w-[10%]">
              {lang === 'bn' ? 'ছবি' : 'Image'}
            </div>
            <div className="flex w-[42%] items-center justify-start rounded-md bg-[#E6EFFF] px-6 py-2 xl:w-[40%]">
              {lang === 'bn' ? 'পণ্যের নাম' : 'Product Name'}
            </div>
            <div className="hidden w-[20%] items-center justify-center rounded-md bg-[#E6EFFF] py-2 md:w-[12%] xl:flex xl:w-[10%]">
              {lang === 'bn' ? 'মডেল' : 'Model'}
            </div>
            <div className="flex w-[19%] items-center justify-center rounded-md bg-[#E6EFFF] py-2 md:w-[12%] xl:w-[10%]">
              {lang === 'bn' ? 'পরিমাণ' : 'Quantity'}
            </div>
            <div className="hidden w-[12%] items-center justify-center rounded-md bg-[#E6EFFF] py-2 md:flex xl:w-[10%]">
              {lang === 'bn' ? 'একক মূল্য' : 'Unit Price'}
            </div>
            <div className="flex w-[19%] items-center justify-center rounded-md bg-[#E6EFFF] py-2 md:w-[12%] xl:w-[10%]">
              {lang === 'bn' ? 'মোট' : 'Total'}
            </div>
          </div>

          {/* Cart Items */}
          {cartItems?.map((item) => (
            <div
              key={item.id}
              className="mt-3 flex items-center justify-between rounded-md bg-[#E6EFFF]"
            >
              <div className="relative flex w-[19%] items-center justify-center rounded-md py-2 md:w-[12%] xl:w-[10%]">
                <div className="relative h-[50px] w-[50px] md:h-[80px] md:w-[80px]">
                  <Image
                    src={item.product.thumbnail}
                    alt="product image"
                    fill
                    className="rounded-md bg-white object-cover"
                  />
                </div>
              </div>
              <div className="flex w-[42%] flex-col items-start justify-start rounded-md px-6 py-2 xl:w-[40%]">
                <Link
                  href={`/product/${item.product.slug}`}
                  className="cursor-pointer text-base font-bold text-primaryBlue hover:underline md:text-xl"
                >
                  {item.product.title}
                </Link>
                <p className="hidden text-sm md:block xl:text-base">
                  <span className="text-black">{lang === 'bn' ? 'ব্র্যান্ড: ' : 'Brand: '}</span>{' '}
                  {item.product.brand.title}
                </p>
                <p className="text-sm xl:hidden xl:text-base">
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    {item?.cart_items &&
                      item?.cart_items.map((cart_item: any, i: number) => (
                        <div key={i} className="text-xs text-blue-600">
                          {cart_item?.option?.title}
                        </div>
                      ))}
                  </div>
                </p>
              </div>

              <div className="hidden w-[12%] items-center justify-center rounded-md py-2 xl:flex xl:w-[10%]">
                <p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    {item?.cart_items &&
                      item?.cart_items.map((cart_item: any, i: number) => (
                        <div key={i} className="text-lg font-medium text-blue-600">
                          {cart_item?.option?.title}
                        </div>
                      ))}
                  </div>
                </p>
              </div>

              <div className="flex w-[19%] items-center justify-center rounded-md py-2 md:w-[12%] xl:w-[10%]">
                <div className="flex">
                  <Tooltip
                    title={
                      item.quantity <= (item.product.minOrder ?? 1)
                        ? `Minimum order quantity is ${item.product.minOrder ?? 1}`
                        : ''
                    }
                  >
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="bg-primaryBlue px-1.5 py-1 text-white transition-all duration-300 hover:bg-primary md:rounded-bl-full md:rounded-tl-full md:px-3 md:py-1.5 md:text-xl"
                      disabled={item.quantity <= (item.product.minOrder ?? 1)}
                    >
                      <MinusOutlined />
                    </button>
                  </Tooltip>
                  <p className="border border-b-primaryBlue border-t-primaryBlue px-2 text-xl text-black md:py-1.5">
                    {item.quantity}
                  </p>
                  <Tooltip
                    title={
                      item.quantity >= (item.product.stock ?? Infinity)
                        ? `Maximum stock limit (${item.product.stock}) reached!`
                        : ''
                    }
                  >
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="bg-primaryBlue px-1.5 py-1 text-white transition-all duration-300 hover:bg-primary md:rounded-br-full md:rounded-tr-full md:px-3 md:py-1.5 md:text-xl"
                      disabled={item.quantity >= (item.product.stock ?? Infinity)}
                    >
                      <PlusOutlined />
                    </button>
                  </Tooltip>
                </div>
              </div>
              <div className="hidden w-[12%] items-center justify-center rounded-md py-2 text-black md:flex xl:w-[10%]">
                {(() => {
                  const price = item?.product?.price ?? 0;
                  const discount = item?.product?.discount ?? 0;
                  const discountType = item?.product?.discount_type ?? 'flat';
                  let finalPrice = price;

                  if (discountType === 'percentage') {
                    finalPrice = price - (price * discount) / 100;
                  } else if (discountType === 'flat') {
                    finalPrice = price - discount;
                  }

                  return finalPrice;
                })()}{' '}
                TK
              </div>
              <div className="flex w-[19%] flex-col items-center justify-evenly rounded-md py-2 md:w-[12%] md:flex-row xl:w-[10%]">
                <p className="font-medium text-primaryDarkBlue">
                  {(() => {
                    const price = item?.product?.price ?? 0;
                    const discount = item?.product?.discount ?? 0;
                    const discountType = item?.product?.discount_type ?? 'flat';
                    let finalPrice = price;

                    if (discountType === 'percentage') {
                      finalPrice = price - (price * discount) / 100;
                    } else if (discountType === 'flat') {
                      finalPrice = price - discount;
                    }

                    return finalPrice * item.quantity;
                  })()}{' '}
                  TK
                </p>
                <button
                  onClick={() => showModal(item.id)}
                  className="text-xl text-red-500 hover:text-red-600"
                >
                  <DeleteOutlined />
                </button>
              </div>
            </div>
          ))}

          {/* Totals */}
          <div className="mt-5 flex w-full flex-col items-end justify-center gap-2">
            <p className="text-black md:text-xl">
              {lang === 'bn' ? 'সাব-টোটাল:' : 'Sub-Total:'}
              <span className="ml-2 text-primaryBlue md:ml-5">{subtotal} TK</span>
            </p>
            <p className="text-black md:text-xl">
              {lang === 'bn' ? 'ডেলিভারি চার্জ:' : 'Delivery Charge:'}
              <span className="ml-2 text-primaryBlue md:ml-5">
                {lang === 'bn' ? 'যোগ করা হবে' : 'Will be added'}
              </span>
            </p>
            <p className="text-black md:text-xl">
              {lang === 'bn' ? 'ছাড়:' : 'Discount:'}{' '}
              <span className="ml-2 text-primaryBlue md:ml-5">0</span>
            </p>
            <p className="text-black md:text-xl">
              {lang === 'bn' ? 'মোট:' : 'Total:'}
              <span className="ml-2 text-primaryBlue md:ml-5">{subtotal} TK</span>
            </p>
          </div>

          {/* Coupon / Voucher */}
          {/* <div className="mt-5 flex w-full flex-col justify-between gap-2 rounded-md bg-[#F6F9FF] px-6 py-2 md:flex-row">
            <div className="flex w-full rounded-full bg-[#E6EFFF] md:w-[40%]">
              <input
                placeholder="Promo/Coupon"
                className="w-1/2 rounded-md border-none bg-[#E6EFFF] px-3 py-2 outline-none placeholder:text-primaryBlue md:w-2/3"
              />
              <button
                onClick={coupon}
                className="w-1/2 rounded-full border-[5px] border-white bg-primaryBlue px-3 py-1 text-white transition-all duration-300 hover:bg-primary md:w-1/3"
              >
                Apply Coupon
              </button>
            </div>
            <div className="flex w-full rounded-full bg-[#E6EFFF] md:w-[40%]">
              <input
                placeholder="Gift voucher"
                className="w-1/2 rounded-md border-none bg-[#E6EFFF] px-3 py-2 outline-none placeholder:text-primaryBlue md:w-2/3"
              />
              <button
                onClick={voucher}
                className="w-1/2 rounded-full border-[5px] border-white bg-primaryBlue px-3 py-1 text-white transition-all duration-300 hover:bg-primary md:w-1/3"
              >
                Apply Voucher
              </button>
            </div>
          </div> */}

          {/* Buttons */}
          <div className="mb-10 mt-16 flex w-full items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 rounded-full bg-primaryBlue px-6 py-2.5 text-white transition-all duration-300 hover:bg-primary"
            >
              {' '}
              <FaAngleLeft className="hidden md:block" />
              {lang === 'bn' ? 'কেনাকাটা চালিয়ে যান' : 'Continue Shopping'}
            </button>

            <button
              className="flex items-center gap-2 rounded-full bg-primaryBlue px-6 py-2 text-white transition-all duration-300 ease-in hover:bg-blue-600"
              onClick={() => {
                setLocalStorage('checkout_items', JSON.stringify(cartItems));
                router.push('/cart-checkout');
              }}
            >
              {lang === 'bn' ? 'চেকআউট' : 'Checkout'}
              <FaAngleRight className="hidden md:block" />
            </button>
          </div>
        </div>

        <Modal
          title={lang === 'bn' ? 'আপনি কি নিশ্চিত?' : 'Are you sure?'}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Yes, Delete"
          cancelText="Cancel"
        >
          <p>
            {lang === 'bn'
              ? 'আপনি কি সত্যিই এই পণ্যটি আপনার কার্ট থেকে মুছে ফেলতে চান?'
              : 'Do you really want to delete this product from your cart?'}
          </p>
        </Modal>
      </div>
    </div>
  );
};

export default CartPage;
