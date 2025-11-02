'use client';
import { Product } from '@/app/(root)/types/ProductType';
import { useAddToCartMutation } from '@/redux/services/client/myCart';
import { setCart } from '@/redux/slices/authSlice';
import { AppDispatch, RootState } from '@/redux/store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Rating } from 'react-simple-star-rating';
import { setLocalStorage } from '@/utils/localStorage';

const PriceInfo = ({
  product,
  setIsOpen,
}: {
  product: Product;
  setIsOpen?: (open: boolean) => void;
}) => {
  const lang = useSelector((state: RootState) => state.language.language);

  const router = useRouter();
  const [addToCart, { isLoading }] = useAddToCartMutation();
  const hasDiscount = !!product?.discount && Number(product.discount) > 0;
  const price = Number(product?.price) || 0;
  const discount = Number(product?.discount) || 0;
  const discountType = product?.discount_type;

  const user = useSelector((state: RootState) => state.auth.user);

  const dispatch = useDispatch<AppDispatch>();
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
        delivery_info: product.delivery_info,
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

    const cartObject = buildCartObject(product);
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

    const optionIds = product?.items?.length
      ? product?.items.map((item: any) => item.options?.[0]?.id).filter(Boolean)
      : [];

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
    <div
      onClick={() => {
        // window.open(`/product/${product.slug}`, "_blank");
        router.push(`/product/${product.slug}`);
        if (setIsOpen) setIsOpen(false);
      }}
      className="group cursor-pointer"
    >
      <div className="flex flex-col justify-between space-y-2 p-2 text-center md:h-[150px] md:space-y-1 lg:space-y-2 xl:h-[200px] xl:space-y-0 xl:p-6 2xl:h-[170px]">
        <div className="flex w-full flex-wrap items-center justify-center gap-1">
          <span
            className={`hidden text-sm font-medium text-red-400 sm:block md:text-[15px] ${hasDiscount ? 'line-through' : ''}`}
          >
            {price?.toLocaleString('en-US')} BDT
          </span>

          {hasDiscount && (
            <span className="ml-2 text-sm font-semibold text-primaryBlue md:text-lg">
              {/* {lang === 'bn' ? 'মূল্য ' : 'Price '} */}
              {Math.round(discountPrice).toLocaleString('en-US')} BDT
            </span>
          )}
        </div>
        <h3
          className="truncate text-center text-sm font-semibold text-primaryDarkBlue transition-all duration-300 group-hover:text-secondaryBlue md:line-clamp-2 md:whitespace-normal md:text-[14px]"
          style={{ maxWidth: '100%' }}
          title={product.title}
        >
          {product.title}
          {/* ({product.storage}) */}
        </h3>
        {/* <div className="flex flex-wrap items-center justify-center text-sm text-secondaryBlue">
          <Rating
            readonly
            size={18}
            initialValue={product?.avgRate}
            SVGstyle={{ display: "inline-block" }}
            fillColor="#facc15" // Tailwind yellow-400
            emptyColor="#d1d5db" // Tailwind gray-300
          />

          <span className="ml-2 text-gray-500">
            ({product.review ? product.review.length : 0} Reviews)
          </span>
        </div> */}

        {/* Buttons */}
        {product?.stock === 0 ? (
          <div className="flex items-center justify-evenly">
            <div>
              <button className="group relative cursor-pointer overflow-hidden rounded bg-primaryBlue px-5 py-1.5 text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-primaryBlue hover:to-primaryBlue/20 hover:ring-2 hover:ring-primaryBlue/20 hover:ring-offset-2">
                <span className="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-1000 group-hover:-translate-x-40"></span>
                <span className="relative">{lang === 'bn' ? 'পূর্ব অর্ডার' : 'Pre Order'}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-evenly">
            <div onClick={(e) => handleBuyNow(e)}>
              {/* <p className="text-primbg-primaryWhite scale-90 cursor-pointer rounded-full bg-primaryBlue px-4 py-1 text-sm font-normal text-secondaryWhite transition-all duration-300 hover:bg-primaryDarkBlue hover:text-white md:scale-100 md:px-4 md:font-semibold lg:text-sm">
                {lang === 'bn' ? 'এখনই কিনুন' : 'BUY NOW'}
              </p> */}
              <button className="group relative cursor-pointer overflow-hidden rounded bg-primaryBlue px-5 py-1.5 text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-primaryBlue hover:to-primaryBlue/20 hover:ring-2 hover:ring-primaryBlue/20 hover:ring-offset-2">
                <span className="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-1000 group-hover:-translate-x-40"></span>
                <span className="relative">{lang === 'bn' ? 'এখনই কিনুন' : 'BUY NOW'}</span>
              </button>
            </div>

            <div
              onClick={(e) => handleAddToCart(e)}
              className="cursor-pointer rounded border-[2px] border-primaryBlue bg-white px-1 py-1.5 text-sm text-primaryBlue transition-transform duration-300 hover:scale-110 md:px-4 lg:text-base"
            >
              {isLoading ? (
                <svg
                  className="h-4 w-4 animate-spin text-primaryBlue"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
              ) : (
                <FaShoppingCart className="md:text-lg" />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default PriceInfo;
