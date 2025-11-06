'use client';
import { useEffect, useState } from 'react';
import ReactImageMagnify from 'react-image-magnify';
import { BsWhatsapp } from 'react-icons/bs';
import DeliveryDetails from './DeliveryDetails';
import Image from 'next/image';
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useAddToCartMutation } from '@/redux/services/client/myCart';
import { setCart } from '@/redux/slices/authSlice';
import { setLocalStorage } from '@/utils/localStorage';

interface ProductShowProps {
  data: {
    product: {
      id: number;
      title: string;
      short_description: string;
      brand: {
        title: string;
      };
      Image: {
        url: string;
      }[];
      thumbnail: string;
      discount: string;
      discount_type: string;
      stock: number;
      available: string;
      price: string;
      code: string;
      warranty_time: string;
      warranty: string;
      delivery_info: {
        delivery_time: string;
        delivery_charge: number;
        return_days: string;
        delivery_time_outside: string;
        delivery_charge_outside: number;
      };
      items: {
        id: number;
        title: string;
        options: {
          id: number;
          title: string;
          image?: string;
          stock?: number;
          price?: string;
        }[];
      }[];
    };
  };
  slug?: string;
}

const ProductShow = ({ data, slug }: ProductShowProps) => {
  const lang = useSelector((state: RootState) => state.language.language);

  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<{
    [itemId: number]: number;
  }>({});

  // redux hooks
  const [addToCart, { isLoading }] = useAddToCartMutation();

  // redux state
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  // Detect if device is mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Collect all images: product images, thumbnail, color option images
  const productImagesArr = data?.product?.Image?.map((img: any) => img.url) || [];
  const thumbnailImg = data?.product?.thumbnail ? [data.product.thumbnail] : [];
  const colorOptionImagesArr =
    data?.product?.items
      ?.filter((item: any) => item.title?.toLowerCase() === 'color')
      .flatMap((item: any) =>
        Array.isArray(item.options) ? item.options.map((opt: any) => opt.image).filter(Boolean) : []
      ) || [];

  const allImages = Array.from(
    new Set([...productImagesArr, ...thumbnailImg, ...colorOptionImagesArr].filter(Boolean))
  );

  const stockkkk = !data?.product?.items.length
    ? data?.product?.stock
    : data?.product?.items.map((item: any) => {
        if (item?.id === Object.keys(selectedOptions)[0]) {
          return (
            item.options.find((option: any) => option.id === selectedOptions[item.id])?.stock || 0
          );
        }
      });

  //console.log('stockkkk', stockkkk);
  //console.log('product stock, items stock', data?.product?.stock, data?.product);

  //console.log('slectedOptions', selectedOptions);

  const fallbackImage = '/images/fallback.png';

  //  Selected image state
  const [selectedImage, setSelectedImage] = useState<string>(allImages[0] || fallbackImage);

  //  Update selectedImage if productImages change
  useEffect(() => {
    setSelectedImage(allImages[0] || fallbackImage);
  }, [JSON.stringify(allImages)]);

  //  Check if product has discount
  const hasDiscount = !!data?.product?.discount && Number(data.product.discount) > 0;
  const price = Number(data?.product?.price) || 0;
  const discount = Number(data?.product?.discount) || 0;
  const discountType = data?.product?.discount_type;
  let discountPrice = price;

  // Calculate discount price based on type
  if (hasDiscount) {
    if (discountType === 'flat') {
      discountPrice = price - discount;
    } else if (discountType === 'percentage') {
      discountPrice = price - (price * discount) / 100;
    }
  }

  //  Set initial selected options
  //  If product has images, set the first image as selected
  useEffect(() => {
    if (data?.product?.Image && data.product.Image.length > 0) {
      setSelectedImage(data.product.Image[0].url);
    } else {
      setSelectedImage(fallbackImage);
    }
    if (data?.product?.items) {
      const initialSelected: { [itemId: number]: number } = {};
      data.product.items.forEach((item: any) => {
        if (item.options && item.options.length > 0) {
          initialSelected[item.id] = item.options[0].id;
        }
      });
      setSelectedOptions(initialSelected);
    }
  }, [data?.product?.items, data?.product?.Image]);

  // Helper to get max quantity based on Color option or fallback to product stock
  const getMaxQuantity = () => {
    const colorItem = data?.product?.items?.find(
      (item: any) => item.title?.toLowerCase() === 'color'
    );
    if (colorItem) {
      const selectedOptionId = selectedOptions[colorItem.id];
      const selectedOption = colorItem.options.find((opt: any) => opt.id === selectedOptionId);
      return selectedOption?.stock ?? 1;
    }
    return data?.product?.stock || 1;
  };

  //  Build cart object
  //  This function creates a cart object based on the product data
  const buildCartObject = (product: any) => {
    const cart = {
      id: Math.floor(Math.random() * 100000), // Random ID, replace if needed
      userId: user?.id,
      productId: product.id,
      quantity: quantity,
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
        delivery_info: product.delivery_info,
      },
    };

    // Extract first option from each item (if any)

    const selectedOption = product.items
      ?.map((item: any) => {
        if (selectedOptions[item.id]) {
          return item.options?.find((d: any) => d.id === selectedOptions[item.id]);
        }
      })
      .filter(Boolean);
    cart.cart_items = selectedOption.map((option: any) => ({ option }));

    return cart;
  };
  console.log(data?.product);
  //  Handle Buy Now
  //  This function handles the "Buy Now" button click
  const handleBuyNow = async () => {
    const cartObject = buildCartObject(data?.product);
    console.log('cartobject', cartObject);
    try {
      setLocalStorage('checkout_items', JSON.stringify([cartObject]));
      router.push('/easy-checkout');
    } catch (error: any) {
      if (error?.status === 401) {
        return router.replace('/auth/login');
      }
      toast.error(error?.data?.message || 'Failed to add to cart');
    }
  };

  //  Handle Add to Cart
  //  This function handles the "Add to Cart" button click
  const handleAddToCart = async (e: any) => {
    e.stopPropagation(); // Prevent navigation to product detail page

    // const optionIds = data?.product?.items?.length
    //   ? data?.product?.items.map((item: any) => item.options?.[0]?.id).filter(Boolean)
    //   : [];
    const optionIds = data?.product?.items?.length
      ? data?.product?.items
          .map((item: any) => {
            if (selectedOptions[item.id]) {
              return item.options?.find((d: any) => d.id === selectedOptions[item.id])?.id;
            }
          })
          .filter(Boolean)
      : [];
    try {
      const result = await addToCart({
        productId: data?.product?.id,
        quantity: quantity,
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
    <div className="py-6">
      <div className="flex flex-col justify-between gap-4 md:gap-10 xl:flex-row">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:gap-10 xl:w-[80%]">
          {/* Image Section */}
          <div className="rounded-md p-2 md:p-4">
            <div className="relative mx-auto w-full border-primaryBlue sm:max-w-sm md:max-w-md md:border-b-2 md:border-l-2 lg:max-w-lg">
              {isMobile ? (
                <Image
                  width={600}
                  height={600}
                  src={selectedImage}
                  alt={data?.product.title}
                  className="h-auto w-full rounded object-cover"
                  style={{ maxHeight: '60vh' }}
                />
              ) : (
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: data?.product.title,
                      isFluidWidth: true,
                      src: selectedImage,
                      width: 400,
                      height: 400,
                    },
                    largeImage: {
                      src: selectedImage,
                      width: 900,
                      height: 900,
                    },
                    enlargedImageContainerDimensions: {
                      width: '180%',
                      height: '100%',
                    },
                    enlargedImageContainerStyle: {
                      background: '#fff',
                      border: '1px solid #ccc',
                      borderRadius: '0.5rem',
                      zIndex: 99,
                    },
                    enlargedImagePosition: 'beside',
                    isHintEnabled: true,
                    hintTextMouse: 'Hover to zoom',
                    lensStyle: {
                      backgroundColor: 'rgba(255,255,255,0.4)',
                      border: '1px solid #ccc',
                    },
                    lensDimensions: {
                      width: 80,
                      height: 60,
                    },
                  }}
                />
              )}
              {data?.product.discount && (
                <div className="absolute left-0 top-6 rounded-r-full bg-primaryBlue px-3 py-2 text-xs font-medium text-white shadow-md">
                  {data?.product.discount}
                  {data?.product?.discount_type === 'flat' ? '৳' : '%'}{' '}
                  {lang === 'bn' ? 'ছাড়' : 'OFF'}
                </div>
              )}
            </div>

            <div
              className="scrollbar-thin hide-scrollbar scrollbar-thumb-gray-300 scrollbar-track-gray-100 mx-auto mt-4 flex max-w-[320px] flex-row gap-x-3 overflow-x-auto py-2 sm:max-w-sm md:max-w-md lg:max-w-lg"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {allImages.map((img, idx) => (
                <Image
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  src={img}
                  className={`h-16 w-16 min-w-16 flex-shrink-0 cursor-pointer rounded border object-cover ${
                    selectedImage === img ? 'border-primaryBlue ring-2 ring-primaryBlue' : ''
                  }`}
                  alt={`thumb-${idx}`}
                  style={{
                    transition: 'box-shadow 0.2s',
                    scrollSnapAlign: 'start',
                  }}
                />
              ))}
            </div>

            {/* BsWhatsapp Buttons */}
            <div className="mt-6 flex w-full items-center justify-center gap-4 xl:hidden">
              <a
                href="https://api.whatsapp.com/send?phone=8801711726501&text=hello%F0%9F%98%87"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-max items-center justify-center border-2 border-green-100 hover:border-green-700 gap-2 rounded bg-green-100 px-4 py-2.5 md:w-[60%] text-xs text-green-700 md:px-4 md:py-2 md:text-sm"
              >
                <BsWhatsapp className="h-5 w-5" />
                {lang === 'bn' ? 'হোয়াটসঅ্যাপে বার্তা দিন' : 'Message on Whatsapp'}
              </a>
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-1 flex-col items-center justify-center md:items-start md:justify-start">
            <p className="text-sm uppercase text-[#4B4E55]">
              {lang === 'bn' ? 'ব্র্যান্ড: ' : 'Brand: '}
              {data?.product?.brand?.title}
            </p>
            <h1 className="mt-2 text-xl font-semibold text-[#4B4E55]">{data?.product?.title}</h1>

            <div className="mt-4 flex flex-wrap gap-2">
              <span
                className={`rounded bg-secondaryWhite px-4 py-2 text-sm font-medium text-primaryBlue shadow-1 md:text-lg ${
                  hasDiscount ? 'line-through' : ''
                }`}
              >
                {price?.toLocaleString('en-US')} BDT
              </span>
              {hasDiscount && (
                <span className="rounded bg-secondaryWhite px-4 py-2 text-sm font-semibold text-primaryBlue shadow-1 md:text-lg">
                  {discountPrice?.toLocaleString('en-US')} BDT
                </span>
              )}
              <span className="">
                {data?.product?.stock > 0 ? (
                  <div className="flex items-center gap-2 rounded bg-secondaryWhite px-4 py-2 text-sm font-medium text-primaryBlue shadow-1 md:text-lg">
                    <p>{lang === 'bn' ? 'স্টকে আছে: ' : 'In Stock: '}</p>
                    <p>{`(${data?.product?.stock} items)`}</p>
                  </div>
                ) : (
                  <p className="rounded bg-red-100 px-4 py-2 text-sm font-medium text-red shadow-1 md:text-lg">
                    {lang === 'bn' ? 'স্টকে নেই' : 'Out of Stock'}
                  </p>
                )}
              </span>
            </div>

            <div className="mt-2 flex items-center gap-4 md:mt-4">
              {' '}
              <div className="text-sm font-semibold text-[#323232]">
                <p className="inline text-sm text-gray-500">
                  {lang === 'bn' ? 'প্রোডাক্ট কোড: ' : 'Product Code: '}
                </p>{' '}
                <p className="inline animate-pulse text-xs md:text-base">{data?.product.code}</p>
              </div>{' '}
              <div className="text-sm font-semibold text-[#323232]">
                <p className="inline text-sm text-gray-500">
                  {lang === 'bn' ? 'ওয়ারেন্টির ধরন: ' : 'Warranty Type: '}
                </p>{' '}
                {data?.product.warranty}{' '}
                <p className="inline animate-pulse text-xs md:text-base">{`(${data?.product.warranty_time})`}</p>
              </div>
            </div>

            {/* Color */}
            {data?.product?.items.map((item: any, i: number) => (
              <div key={item.id} className="mt-4 flex flex-col gap-4 md:flex-row">
                <p className="mt-1 text-sm font-medium">{item?.title}:</p>
                <div className="flex flex-wrap gap-3">
                  {item.options.map((option: any, idx: number) => {
                    const isOutOfStock = Number(option.stock) <= 0;
                    return (
                      <div
                        key={option.id}
                        onClick={() => {
                          if (isOutOfStock) return;
                          setQuantity(1);
                          setSelectedOptions((prev) => ({
                            ...prev,
                            [item.id]: option.id,
                          }));

                          if (option.image) {
                            setSelectedImage(option.image);
                          }
                        }}
                        className={`cursor-pointer rounded border-2 px-4 py-0.5 transition-colors duration-200 ${
                          selectedOptions[item.id] === option.id
                            ? 'border-primaryBlue bg-primaryBlue text-white shadow-2'
                            : isOutOfStock
                              ? 'cursor-not-allowed border border-red-500 bg-gray-100 text-red-500'
                              : 'border border-blue-300 bg-white text-primaryBlue hover:border-primaryBlue'
                        }`}
                        title={isOutOfStock ? 'This option is stock out' : ''}
                        style={isOutOfStock ? { pointerEvents: 'none' } : {}}
                      >
                        {option.title}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Quantity */}
            <div className="mt-6 flex items-center gap-4">
              <p className="text-sm font-medium">{lang === 'bn' ? 'পরিমাণ' : 'Quantity'}</p>
              <div className="flex items-center overflow-hidden rounded border">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="mt-[-1px] border-[1.5px] border-primaryBlue bg-primaryBlue px-4 py-1 text-xl font-medium text-white transition-all duration-300 hover:border-secondaryBlue hover:bg-secondaryBlue"
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-4 text-xl font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(quantity + 1, getMaxQuantity()))}
                  className="border-[1.5px] border-primaryBlue bg-primaryBlue px-4 py-1 text-xl font-medium text-white transition-all duration-300 hover:border-secondaryBlue hover:bg-secondaryBlue"
                  disabled={quantity >= getMaxQuantity()}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Short Description with See More/Less */}
            {data?.product?.short_description && (
              <div className="mt-6 h-fit w-full">
                {/* <p className="inline">Description:</p> */}
                <div className="prose prose-table:border prose-td:border prose-th:border prose-td:p-2 prose-th:p-2 prose-table:bg-white prose-tr:bg-white prose-tr:odd:bg-gray-50 max-w-none">
                  <div
                    className="rendered-html"
                    dangerouslySetInnerHTML={{
                      __html: data?.product?.short_description,
                    }}
                  />
                </div>
              </div>
            )}

            {/* Buttons */}
            {data?.product?.stock > 0 ? (
              <div className="mt-6 flex w-full items-center gap-4">
                {/* ADD TO CART Button */}
                <button
                  className="group relative overflow-hidden rounded bg-primaryBlue px-5 py-2.5 text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-primaryBlue hover:to-primaryBlue/80 hover:ring-2 hover:ring-primaryBlue/80 hover:ring-offset-2 md:w-[50%] xl:w-[60%]"
                  onClick={(e) => {
                    if (data?.product?.stock > 0) {
                      handleAddToCart(e);
                    } else {
                      toast.info('Product is out of stock');
                    }
                  }}
                >
                  <span className="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-1000 group-hover:-translate-x-40 md:group-hover:-translate-x-100"></span>
                  <span className="relative font-medium">
                    {lang === 'bn' ? 'কার্টে যোগ করুন' : 'ADD TO CART'}
                  </span>
                </button>

                {/* BUY NOW Button */}
                <button
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded border-2 border-primaryBlue p-4 px-5 py-2 font-medium text-primaryBlue shadow-md transition duration-300 ease-out"
                  onClick={() => {
                    if (data?.product?.stock > 0) {
                      handleBuyNow();
                    } else {
                      toast.info('Product is out of stock');
                    }
                  }}
                >
                  <span className="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-primaryBlue text-white duration-300 group-hover:translate-x-0">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </span>

                  <span className="ease absolute flex h-full w-full transform items-center justify-center text-primaryBlue transition-all duration-300 group-hover:translate-x-full">
                    {lang === 'bn' ? 'এখনই কিনুন' : 'BUY NOW'}
                  </span>
                  <span className="invisible relative">
                    {lang === 'bn' ? 'এখনই কিনুন' : 'BUY NOW'}
                  </span>
                </button>
              </div>
            ) : (
              <button
                className="mt-6 rounded border-2 bg-rose-600 px-8 py-2 font-medium text-white transition-all duration-300 hover:border-rose-600 hover:bg-rose-50 hover:text-rose-600"
                onClick={() => {
                  handleBuyNow();
                }}
              >
                {lang === 'bn' ? 'পূর্ব অর্ডার' : 'Pre Order'}
              </button>
            )}

            {/* BsWhatsapp Buttons for Desktop */}
            <div className="mt-6 xl:flex w-full items-center gap-4 hidden">
              <a
                href="https://api.whatsapp.com/send?phone=8801711726501&text=hello%F0%9F%98%87"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-max items-center justify-center border-2 border-green-100 hover:border-green-700 gap-2 rounded bg-green-100 px-4 py-2.5 md:w-[60%] text-xs text-green-700 md:px-4 md:py-2 md:text-sm"
              >
                <BsWhatsapp className="h-5 w-5" />
                {lang === 'bn' ? 'হোয়াটসঅ্যাপে বার্তা দিন' : 'Message on Whatsapp'}
              </a>
            </div>
          </div>
        </div>

        {/* delivery section */}
        <div className="mx-auto w-full xl:w-[20%]">
          <DeliveryDetails deliveryInfo={data?.product?.delivery_info}></DeliveryDetails>
        </div>
      </div>
    </div>
  );
};

export default ProductShow;
