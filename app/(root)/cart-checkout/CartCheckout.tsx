'use client';

import React, { useEffect, useState } from 'react';
import { PlusOutlined, MinusOutlined, CheckOutlined } from '@ant-design/icons';
import { Input, Button, notification, Checkbox, Modal } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import SendButton from '@/components/Button/SendButton';
import {
  useDeleteCartMutation,
  useGetMyCartQuery,
  useUpdateCartMutation,
} from '@/redux/services/client/myCart';
import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  useGetPaymentUrlMutation,
  useOrderCartProductsMutation,
  useOrderSingleProductMutation,
} from '@/redux/services/client/checkout';
import { setCart } from '@/redux/slices/authSlice';
import { BD_Division, BD_District } from '@/Data/addressData';
import { useCheckCouponCodeMutation } from '@/redux/services/client/applyCoupon';
import getSeoData from '../getSeoData';
import { getLocalStorage } from '@/utils/localStorage';

const CartCheckout: React.FC = () => {
  const lang = useSelector((state: RootState) => state.language.language);
  const user = useSelector((state: RootState) => state.auth.user);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>('cod');
  const [fullName, setFullName] = useState(user?.name || '');
  const [phone, setPhone] = useState<any>(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [division, setDivision] = useState(user?.address?.division || '');
  const [address, setAddress] = useState<any>(user?.address?.area || '');
  const [district, setDistrict] = useState(user?.address?.district || '');
  const [subDistrict, setSubDistrict] = useState('');
  const [area, setArea] = useState('');
  const [agree, setAgree] = useState(true);
  const [checkoutItems, setCheckoutItems] = useState<any>([]);
  const [couponCode, setCouponCode] = useState<string>('');
  const [couponDiscount, setCouponDiscount] = useState<any>({});

  const [deleteCart] = useDeleteCartMutation();
  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [cartUpdate] = useUpdateCartMutation();
  const [applyCoupon] = useCheckCouponCodeMutation();

  const { data, isLoading, isError, refetch } = useGetMyCartQuery();
  const [createOrder] = useOrderCartProductsMutation();

  const [privacy, setPrivacy] = useState();
  const [terms, setTerms] = useState();
  const [refund, setRefund] = useState();

  const getContentData = async () => {
    const p = await getSeoData('privacy_policy');
    const t = await getSeoData('terms_condition');
    const q = await getSeoData('return');
    setPrivacy(p?.data?.content);
    setTerms(t?.data?.content);
    setRefund(q?.data?.content);
  };

  // ✅ Load checkout_items from localStorage when component mounts
  useEffect(() => {
    const storedItems = getLocalStorage('checkout_items');

    if (storedItems) {
      setCheckoutItems(JSON.parse(storedItems));
      //console.log('stored items', JSON.parse(storedItems));
    } else {
      // router.push('/cart'); // redirect if nothing in storage
    }

    // ✅ Clear on browser unload
    const handleBeforeUnload = () => {
      // localStorage.removeItem('checkout_items');
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [router]);

  // ✅ Clear on route change (SPA navigation)
  useEffect(() => {
    getContentData();
    // When pathname changes, check and clear localStorage if needed
    if (!pathname.includes('checkout')) {
      //localStorage.removeItem('checkout_items');
    }
  }, [pathname]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [paymentUrl] = useGetPaymentUrlMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModal2 = () => {
    setIsModalOpen2(true);
  };

  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };

  const showModal3 = () => {
    setIsModalOpen3(true);
  };

  const handleCancel3 = () => {
    setIsModalOpen3(false);
  };
  // For right side

  const updateQuantity = (id: number, type: 'inc' | 'dec') => {
    // console.log(checkoutItems);

    const updated = checkoutItems.map((item: any) => {
      if (item.id === id) {
        let newQty = item.quantity;

        if (type === 'inc') {
          if (item.quantity < item.product.stock) {
            newQty = item.quantity + 1;
          } else {
            toast.warn('Stock limit reached!');
            newQty = item.quantity; // keep as is
          }
        } else if (type === 'dec') {
          newQty = item.quantity > 1 ? item.quantity - 1 : 1;
        }

        // call update API only if quantity actually changed
        if (newQty !== item.quantity) {
          handleUpdate(id, newQty);
        }

        return { ...item, quantity: newQty };
      }
      return item;
    });

    setCheckoutItems(updated);
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
  const subtotal = checkoutItems.reduce((acc: number, item: any) => {
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
  console.log('cartitem', checkoutItems);

  const handleCheckout = async () => {
    const productIds = checkoutItems.map((item: any) => item.id);
    const payload = {
      userId: user?.id,
      name: fullName,
      email,
      phone,
      division,
      district,
      sub_district: address,
      area: address,
      paymentType: paymentMethod,
      cartIds: productIds,
      deliveryFee: district === 'Dhaka' ? 60 : 120,
      order_type: !checkoutItems[0].product?.user?.isSeller ? 'in-house' : 'vendor',
      couponId: couponDiscount?.id || undefined,
      //options:
    };
    try {
      const res = await createOrder(payload).unwrap();
      if (paymentMethod === 'online') {
        const payData = await paymentUrl({
          cus_add1: address,
          cus_city: division,
          cus_country: 'Bangladesh',
          cus_email: email || 'admin@gmail.com',
          cus_name: fullName,
          cus_phone: phone,
          cus_postcode: '1206',
          order_ids: res.orders?.map((d: any) => d.id),
          product_category: 'Darkak',
          product_name: 'Darkak Product',
          product_profile: 'Darkak',
          ship_add1: address,
          ship_city: division,
          ship_country: 'Bangladesh',
          ship_name: fullName,
          ship_postcode: '1206',
          shipping_method: 'Courier',
          cus_add2: address,
          cus_fax: phone,
          cus_state: 'Bangladesh',
          ship_add2: address,
          ship_state: 'Bangladesh',
          cartIds: productIds,
        }).unwrap();

        return (window.location.href = payData.url);
      }
      dispatch(setCart(Math.random()));
      toast.success(res?.message || 'Order placed successfully!');
      localStorage.removeItem('checkout_items');
      router.push(
        `/order-placed?orderIds=${encodeURIComponent(
          JSON.stringify(res?.orders?.map((d: any) => d.orderId))
        )}`
      );
    } catch (error: any) {
      toast.error(error?.data?.message);
      console.log(error);
    }
  };

  // For dependent district dropdown using addressData.ts
  const divisionOptions = BD_Division.divisions;
  const districtOptions = division
    ? BD_District.districts.filter(
        (d) => d.division_id === divisionOptions.find((div) => div.name === division)?.id
      )
    : [];

  const handleApplyCoupon = async () => {
    const visitorId = getLocalStorage('visitorId');
    const productIds = checkoutItems.map((item: any) => item.productId);

    const payload: {
      total: number;
      userId?: number;
      productIds: number[];
      visitorId: string;
    } = {
      total: subtotal,
      productIds: productIds,
      visitorId: visitorId || 'saa-adas-as',
    };

    if (user && user?.id) {
      payload.userId = Number(user?.id);
    }

    console.log('payload ofr coupon', payload);

    try {
      const res = await applyCoupon({
        code: couponCode,
        data: payload,
      }).unwrap();
      toast.success(res?.message || 'Coupon Applied');
      setCouponDiscount(res?.coupon);
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  console.log('coupon', couponDiscount);

  return (
    <div className="px-2 py-6 md:container md:mx-auto md:px-4 xl:px-6">
      {/* Animated Info Alert */}
      <AnimatePresence mode="wait">
        <motion.div
          key={paymentMethod}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.4 }}
          className="mb-6 rounded border border-primaryBlue bg-[#E6EFFF] px-2 py-1.5 text-center text-primaryBlue md:px-4 md:py-3"
        >
          {paymentMethod === 'cod' ? (
            <>
              অর্ডার সংক্রান্ত যেকোনো প্রয়োজনে কথা বলুন আমাদের কাস্টমার সার্ভিস প্রতিনিধির সাথে -{' '}
              <strong> 01711726501</strong>
            </>
          ) : (
            <>
              অনলাইন পেমেন্ট সংক্রান্ত সহায়তার জন্য হেল্পলাইন - <strong> 01711726501</strong>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Payment Method */}
      <div className="flex w-full flex-col gap-4 p-4 md:flex-row md:p-0">
        {/* left-side */}
        <div className="w-full md:w-1/2">
          {contextHolder}
          <p className="text-xl font-medium md:text-2xl">
            {lang === 'bn' ? 'পেমেন্ট মেথড' : 'Payment Method'}
          </p>

          <div className="mt-5 flex w-full justify-evenly rounded border border-primaryBlue bg-[#E6EFFF] px-2 py-1 transition-all duration-500 md:w-[90%] md:px-3 md:py-2">
            <button
              className={`flex items-center gap-2 rounded px-3 py-1 font-medium transition-all duration-300 md:px-3 md:py-1.5 ${
                paymentMethod === 'cod'
                  ? 'bg-primaryBlue text-white'
                  : 'text-black hover:bg-slate-50 hover:text-primaryBlue'
              }`}
              onClick={() => setPaymentMethod('cod')}
            >
              {paymentMethod === 'cod' && <CheckOutlined className="text-xl" />}
              {lang === 'bn' ? 'ক্যাশ অন ডেলিভারি' : 'Cash on Delivery'}
            </button>

            <button
              className={`flex items-center gap-2 rounded px-3 py-1.5 font-medium transition-all duration-300 ${
                paymentMethod === 'online'
                  ? 'bg-primaryBlue text-white'
                  : 'text-black hover:bg-slate-50 hover:text-primaryBlue'
              }`}
              onClick={() => setPaymentMethod('online')}
            >
              {paymentMethod === 'online' && <CheckOutlined className="text-xl" />}
              {lang === 'bn' ? 'অনলাইন পেমেন্ট' : 'Online Payment'}
            </button>
          </div>

          <div className="mt-5 md:mt-10">
            <h2 className="mb-3 text-lg font-semibold">
              {lang === 'bn' ? 'বিলিং বিবরণ' : 'Billing Details'}
            </h2>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              {/* Full Name */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  {lang === 'bn' ? 'পুরো নাম' : 'Full Name'}{' '}
                  <span className="text-primaryBlue">*</span>
                </label>
                <Input
                  placeholder="Full Name"
                  className="border border-primaryBlue px-3 py-2"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {/* Email */}
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    {lang === 'bn' ? 'ইমেইল ঠিকানা' : 'Email Address'}{' '}
                  </label>
                  <Input
                    type="email"
                    placeholder="Email"
                    className="border border-primaryBlue px-3 py-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    {lang === 'bn' ? 'ফোন নম্বর' : 'Phone Number'}{' '}
                    <span className="text-primaryBlue">*</span>
                  </label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Phone Number"
                      className="border border-primaryBlue px-3 py-2"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {/* Division */}
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    {lang === 'bn' ? 'বিভাগ' : 'Division'}{' '}
                    <span className="text-primaryBlue">*</span>
                  </label>
                  <select
                    className="w-full rounded border border-primaryBlue px-3 py-2"
                    value={division}
                    onChange={(e) => {
                      setDivision(e.target.value);
                      setDistrict(''); // reset district when division changes
                    }}
                    required
                  >
                    <option value="">Select Division</option>
                    {divisionOptions.map((div) => (
                      <option key={div.id} value={div.name}>
                        {div.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* District */}
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    {lang === 'bn' ? 'জেলা' : 'District'}{' '}
                    <span className="text-primaryBlue">*</span>
                  </label>
                  <select
                    className="w-full rounded border border-primaryBlue px-3 py-2"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    required
                    disabled={!division}
                  >
                    <option value="">
                      {division ? 'Select District' : 'Select Division First'}
                    </option>
                    {districtOptions.map((dist) => (
                      <option key={dist.id} value={dist.name}>
                        {dist.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    {lang === 'bn' ? 'উপজেলা / সাব-ডিস্ট্রিক্ট' : 'Sub-district / Upazila'}{' '}
                    <span className="text-primaryBlue">*</span>
                  </label>
                  <Input
                    placeholder="e.g., Dhanmondi"
                    className="border border-primaryBlue px-3 py-2"
                    value={subDistrict}
                    onChange={(e) => setSubDistrict(e.target.value)}
                    required
                  />
                </div>

                
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    {lang === 'bn' ? 'ডেলিভারি এরিয়া / ঠিকানা' : 'Delivery Area / Address'}{' '}
                    <span className="text-primaryBlue">*</span>
                  </label>
                  <Input
                    placeholder="e.g., House #12, Road #5"
                    className="border border-primaryBlue px-3 py-2"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    required
                  />
                </div>
              </div> */}

              {/* Full Address */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  {lang === 'bn' ? 'অতিরিক্ত ঠিকানা' : 'Additional Address'}{' '}
                  <span className="text-primaryBlue">*</span>
                </label>
                <Input.TextArea
                  placeholder="Additional address details"
                  className="border border-primaryBlue px-3 py-2"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              {/* Agreement Checkbox */}
              <Checkbox checked={agree} onChange={(e) => setAgree(e.target.checked)} required>
                {lang === 'bn' ? 'আমি পড়েছি এবং একমত ' : 'I have read and agree to the '}
                <button onClick={showModal} className="font-semibold text-primaryBlue">
                  {lang === 'bn' ? ' শর্তাবলী, ' : 'Terms & Conditions, '}
                </button>
                <button onClick={showModal3} className="font-semibold text-primaryBlue">
                  {lang === 'bn' ? ' রিটার্ন & রিফান্ড ' : ' Return & Refund '}
                </button>
                {lang === 'bn' ? ' এবং ' : ' and '}
                <button onClick={showModal2} className="font-semibold text-primaryBlue">
                  {lang === 'bn' ? 'গোপনীয়তা নীতি' : 'Privacy Policy'}
                </button>
              </Checkbox>
            </form>

            <div className="mt-5 hidden md:block">
              <button
                className="w-full rounded-md bg-primaryBlue px-6 py-2 font-medium text-white transition-all duration-300 hover:bg-primaryBlue/90"
                onClick={handleCheckout}
              >
                {lang === 'bn' ? 'অর্ডার করুন' : 'Order'}
              </button>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="w-full md:w-1/2 md:pl-[10%]">
          <h2 className="mb-0 mt-5 text-lg font-semibold md:mb-3">
            {lang === 'bn' ? 'আপনার অর্ডারের বিস্তারিত' : 'Your Order Details'}
          </h2>

          {checkoutItems?.map((item: any) => (
            <div
              key={item.id}
              className="flex items-start justify-between gap-4 border-b pb-3 pt-3"
            >
              <Image
                src={item.product.thumbnail}
                alt={item.product.title}
                width={64}
                height={64}
                className="rounded"
              />
              <div className="flex-1">
                <div className="text-sm font-semibold">{item?.product?.title}</div>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  {item?.cart_items &&
                    item?.cart_items.map((cart_item: any, i: number) => (
                      <div key={i} className="text-xs text-blue-600">
                        {cart_item?.option?.title}
                      </div>
                    ))}
                </div>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="font-semibold text-black">
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
                  })()}
                </div>

                <div className="flex">
                  <button
                    onClick={() => updateQuantity(item.id, 'dec')}
                    className="bg-primaryBlue px-1.5 py-1 text-white opacity-80 transition-all duration-300 hover:opacity-100"
                  >
                    <MinusOutlined />
                  </button>
                  <p className="w-[30px] border border-primaryBlue text-center text-xl text-black opacity-80">
                    {item.quantity}
                  </p>
                  <button
                    onClick={() => updateQuantity(item.id, 'inc')}
                    className="bg-primaryBlue px-1.5 py-1 text-white opacity-80 transition-all duration-300 hover:opacity-100"
                  >
                    <PlusOutlined />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {couponDiscount?.id ? (
            <p className="animate-bounce py-3 text-right font-bold text-teal-400">
              {lang === 'bn' ? 'কুপন প্রয়োগ হয়েছে' : 'Coupon Applied'}
            </p>
          ) : (
            <div className="mt-3 flex items-center gap-2">
              <Input
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Coupon Code"
                className="flex-1"
              />
              <Button onClick={handleApplyCoupon} type="primary">
                {lang === 'bn' ? 'প্রয়োগ করুন' : 'Apply'}
              </Button>
            </div>
          )}

          <div className="mt-5 space-y-1 text-sm">
            <div className="flex justify-between">
              <span>{lang === 'bn' ? 'সাবটোটাল' : 'Subtotal'}</span>
              <span>
                {subtotal} {lang === 'bn' ? 'টাকা' : 'BDT'}
              </span>
            </div>
            <div className="flex justify-between text-primaryBlue">
              <span>
                {lang === 'bn'
                  ? 'ডেলিভারি চার্জ'
                  : `Delivery Charge${
                      checkoutItems.length > 1
                        ? ` For ${checkoutItems.length} Product${checkoutItems.length > 1 ? 's' : ''}`
                        : ''
                    }`}
              </span>
              <span>
                {district === 'Dhaka' ? 60 : 120} {lang === 'bn' ? 'টাকা' : 'BDT'}
              </span>
            </div>
            {couponDiscount?.id && (
              <div className="flex justify-between text-primaryBlue">
                <span>{lang === 'bn' ? 'কুপন ছাড়' : 'Coupon Discount'}</span>
                <span>{`-${couponDiscount?.discount_type === 'flat' ? 'Tk' : ''} ${couponDiscount?.discount_amount}${couponDiscount?.discount_type === 'percentage' ? '%' : ''} `}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-semibold text-black">
              <span>{lang === 'bn' ? 'মোট' : 'Total'}</span>
              <span>
                {couponDiscount?.id
                  ? couponDiscount?.discount_type === 'flat'
                    ? subtotal - couponDiscount?.discount_amount
                    : subtotal - subtotal * (couponDiscount?.discount_amount / 100)
                  : subtotal + (district === 'Dhaka' ? 60 : 120)}{' '}
                {lang === 'bn' ? 'টাকা' : 'BDT'}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-5 block md:hidden">
          <button
            className="w-full rounded-md bg-primaryBlue px-6 py-2 font-medium text-white transition-all duration-300 hover:bg-primaryBlue/90"
            onClick={handleCheckout}
          >
            {lang === 'bn' ? 'অর্ডার করুন' : 'Order'}
          </button>
        </div>
      </div>

      <Modal
        title={lang === 'bn' ? 'শর্তাবলী' : 'Terms and Conditions'}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
      >
        <div dangerouslySetInnerHTML={{ __html: terms || `<div>Loading..</div>` }} />
      </Modal>

      <Modal
        title={lang === 'bn' ? 'গোপনীয়তা নীতি' : 'Privacy Policy'}
        open={isModalOpen2}
        onCancel={handleCancel2}
        footer={false}
      >
        <div dangerouslySetInnerHTML={{ __html: privacy || `<div>Loading..</div>` }} />
      </Modal>

      <Modal
        title={lang === 'bn' ? 'রিটার্ন এবং রিফান্ড নীতি' : 'Return and Refund Policy'}
        open={isModalOpen3}
        onCancel={handleCancel3}
        footer={false}
      >
        <div dangerouslySetInnerHTML={{ __html: refund || `<div>Loading..</div>` }} />
      </Modal>
    </div>
  );
};

export default CartCheckout;
